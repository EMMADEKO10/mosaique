import mongoose, { Schema, Document } from 'mongoose'

export interface IArtistAlbum {
  id: string
  title: string
  year: number
  coverUrl?: string
  tracksCount: number
  link?: string
}

export interface IArtistTrack {
  id: string
  title: string
  duration: string
}

export interface IArtistSocials {
  facebook?: string
  instagram?: string
  twitter?: string
  youtube?: string
  tiktok?: string
  website?: string
}

export interface IArtistStats {
  followers?: number
  monthlyListeners?: number
  awards?: number
}

export interface IArtist extends Document {
  _id: string
  name: string
  slug: string
  imageUrl?: string
  imagePublicId?: string
  location?: string
  specialty?: string
  biography: string
  label?: string
  yearsActive?: string
  socials?: IArtistSocials
  stats?: IArtistStats
  albums: IArtistAlbum[]
  topTracks?: IArtistTrack[]
  featured: boolean
  status: 'draft' | 'published' | 'archived'
  createdAt: Date
  updatedAt: Date
}

const ArtistAlbumSchema = new Schema<IArtistAlbum>({
  id: { type: String, required: true },
  title: { type: String, required: true, trim: true },
  year: { type: Number, required: true },
  coverUrl: { type: String },
  tracksCount: { type: Number, required: true },
  link: { type: String }
}, { _id: false })

const ArtistTrackSchema = new Schema<IArtistTrack>({
  id: { type: String, required: true },
  title: { type: String, required: true, trim: true },
  duration: { type: String, required: true }
}, { _id: false })

const ArtistSocialsSchema = new Schema<IArtistSocials>({
  facebook: { type: String },
  instagram: { type: String },
  twitter: { type: String },
  youtube: { type: String },
  tiktok: { type: String },
  website: { type: String }
}, { _id: false })

const ArtistStatsSchema = new Schema<IArtistStats>({
  followers: { type: Number, min: 0 },
  monthlyListeners: { type: Number, min: 0 },
  awards: { type: Number, min: 0 }
}, { _id: false })

const ArtistSchema = new Schema<IArtist>({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  slug: { type: String, required: true, unique: true, lowercase: true },
  imageUrl: { type: String },
  imagePublicId: { type: String },
  location: { type: String, trim: true, maxlength: 100 },
  specialty: { type: String, trim: true, maxlength: 200 },
  biography: { type: String, required: true, maxlength: 2000 },
  label: { type: String, trim: true, maxlength: 100 },
  yearsActive: { type: String, trim: true, maxlength: 50 },
  socials: { type: ArtistSocialsSchema },
  stats: { type: ArtistStatsSchema },
  albums: [{ type: ArtistAlbumSchema }],
  topTracks: [{ type: ArtistTrackSchema }],
  featured: { type: Boolean, default: false },
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' }
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret: Record<string, unknown>) {
      ret.id = ret._id
      delete ret._id
      delete ret.__v
      return ret
    }
  }
})

// Index pour améliorer les performances (sans dupliquer l'index unique sur slug)
ArtistSchema.index({ status: 1 })
ArtistSchema.index({ featured: 1 })
ArtistSchema.index({ name: 'text', biography: 'text' })

// Méthode statique pour générer un slug unique
ArtistSchema.statics.generateUniqueSlug = async function(baseSlug: string): Promise<string> {
  let slug = baseSlug
  let counter = 1
  
  while (true) {
    const existing = await this.findOne({ slug })
    if (!existing) {
      return slug
    }
    slug = `${baseSlug}-${counter}`
    counter++
  }
}

export const Artist = mongoose.models.Artist || mongoose.model<IArtist>('Artist', ArtistSchema)
