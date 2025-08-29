import mongoose, { Schema, Document } from 'mongoose'

export interface IPublicArticle extends Document {
  _id: string
  title: string
  slug: string
  excerpt: string
  content: string
  imageUrl?: string
  imagePublicId?: string
  category: string
  author: string
  tags: string[]
  featured: boolean
  sponsored: boolean
  status: 'draft' | 'published' | 'archived'
  metaTitle?: string
  metaDescription?: string
  readTime: number
  publishedAt?: Date
  createdAt: Date
  updatedAt: Date
}

const PublicArticleSchema = new Schema<IPublicArticle>({
  title: { type: String, required: true, trim: true, maxlength: 200 },
  slug: { type: String, required: true, unique: true, lowercase: true },
  excerpt: { type: String, required: true, maxlength: 300 },
  content: { type: String, required: true },
  imageUrl: { type: String },
  imagePublicId: { type: String },
  category: { type: String, required: true },
  author: { type: String, required: true },
  tags: [{ type: String, trim: true }],
  featured: { type: Boolean, default: false },
  sponsored: { type: Boolean, default: false },
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
  metaTitle: { type: String, trim: true, maxlength: 60 },
  metaDescription: { type: String, trim: true, maxlength: 160 },
  readTime: { type: Number, default: 4, min: 1 },
  publishedAt: { type: Date },
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
PublicArticleSchema.index({ category: 1 })
PublicArticleSchema.index({ status: 1 })
PublicArticleSchema.index({ publishedAt: -1 })
PublicArticleSchema.index({ title: 'text', content: 'text' })

// Méthode statique pour générer un slug unique
PublicArticleSchema.statics.generateUniqueSlug = async function(baseSlug: string): Promise<string> {
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

export const PublicArticle = mongoose.models.PublicArticle || mongoose.model<IPublicArticle>('PublicArticle', PublicArticleSchema)


