import mongoose, { Schema, Document } from 'mongoose'

// Type helper pour les transformations toJSON
type MongooseDoc = {
  _id?: unknown
  __v?: unknown
  id?: unknown
  [key: string]: unknown
}

export interface IArtist extends Document {
  _id: string
  userId: mongoose.Types.ObjectId
  stageName: string
  realName: string
  biography?: string
  artistType: 'MUSICIAN' | 'ACTOR' | 'COMEDIAN' | 'DANCER' | 'WRITER' | 'VISUAL_ARTIST' | 'FILMMAKER' | 'OTHER'
  profileImage?: string
  coverImage?: string
  socialStats: {
    followers?: number
    streams?: number
    downloads?: number
    monthlyListeners?: number
    updatedAt: Date
  }
  isVerified: boolean
  createdAt: Date
  updatedAt: Date
}

export interface IPortfolio extends Document {
  _id: string
  artistId: mongoose.Types.ObjectId
  title: string
  description?: string
  mediaUrl: string
  mediaType: 'IMAGE' | 'VIDEO' | 'AUDIO' | 'DOCUMENT'
  orderIndex: number
  createdAt: Date
}

export interface IAchievement extends Document {
  _id: string
  artistId: mongoose.Types.ObjectId
  title: string
  description: string
  achievedAt: Date
  category: string
  source?: string
  createdAt: Date
}

const ArtistSchema = new Schema<IArtist>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  stageName: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  realName: {
    type: String,
    required: true,
    trim: true
  },
  biography: {
    type: String,
    maxlength: 1000
  },
  artistType: {
    type: String,
    required: true,
    enum: ['MUSICIAN', 'ACTOR', 'COMEDIAN', 'DANCER', 'WRITER', 'VISUAL_ARTIST', 'FILMMAKER', 'OTHER']
  },
  profileImage: {
    type: String
  },
  coverImage: {
    type: String
  },
  socialStats: {
    followers: {
      type: Number,
      default: 0
    },
    streams: {
      type: Number,
      default: 0
    },
    downloads: {
      type: Number,
      default: 0
    },
    monthlyListeners: {
      type: Number,
      default: 0
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  isVerified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret: MongooseDoc) {
      ret.id = ret._id
      delete ret._id
      delete ret.__v
      return ret
    }
  }
})

const PortfolioSchema = new Schema<IPortfolio>({
  artistId: {
    type: Schema.Types.ObjectId,
    ref: 'Artist',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    maxlength: 500
  },
  mediaUrl: {
    type: String,
    required: true
  },
  mediaType: {
    type: String,
    required: true,
    enum: ['IMAGE', 'VIDEO', 'AUDIO', 'DOCUMENT']
  },
  orderIndex: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret: MongooseDoc) {
      ret.id = ret._id
      delete ret._id
      delete ret.__v
      return ret
    }
  }
})

const AchievementSchema = new Schema<IAchievement>({
  artistId: {
    type: Schema.Types.ObjectId,
    ref: 'Artist',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  achievedAt: {
    type: Date,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  source: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret: MongooseDoc) {
      ret.id = ret._id
      delete ret._id
      delete ret.__v
      return ret
    }
  }
})

// Index pour améliorer les performances
ArtistSchema.index({ userId: 1 })
ArtistSchema.index({ stageName: 1 })
ArtistSchema.index({ artistType: 1 })
ArtistSchema.index({ isVerified: 1 })
ArtistSchema.index({ stageName: 'text', realName: 'text', biography: 'text' })

PortfolioSchema.index({ artistId: 1, orderIndex: 1 })
PortfolioSchema.index({ mediaType: 1 })

AchievementSchema.index({ artistId: 1, achievedAt: -1 })
AchievementSchema.index({ category: 1 })

export const Artist = mongoose.models.Artist || mongoose.model<IArtist>('Artist', ArtistSchema)
export const Portfolio = mongoose.models.Portfolio || mongoose.model<IPortfolio>('Portfolio', PortfolioSchema)
export const Achievement = mongoose.models.Achievement || mongoose.model<IAchievement>('Achievement', AchievementSchema)
