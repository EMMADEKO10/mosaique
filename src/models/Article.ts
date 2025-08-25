import mongoose, { Schema, Document } from 'mongoose'

export interface IArticle extends Document {
  _id: string
  title: string
  slug: string
  content: string
  excerpt: string
  featuredImage?: string
  category: 'ACTUALITES' | 'CULTURE' | 'SPORTS' | 'POLITIQUE' | 'ECONOMIE' | 'SOCIETE' | 'TECHNOLOGIE' | 'MODE' | 'DIVERTISSEMENT'
  tags: string[]
  authorId: mongoose.Types.ObjectId
  status: 'DRAFT' | 'PENDING' | 'PUBLISHED' | 'ARCHIVED'
  viewCount: number
  publishedAt?: Date
  createdAt: Date
  updatedAt: Date
}

export interface IComment extends Document {
  _id: string
  content: string
  articleId?: mongoose.Types.ObjectId
  eventId?: mongoose.Types.ObjectId
  authorId: mongoose.Types.ObjectId
  parentId?: mongoose.Types.ObjectId
  isApproved: boolean
  createdAt: Date
  updatedAt: Date
}

const ArticleSchema = new Schema<IArticle>({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  content: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    required: true,
    maxlength: 300
  },
  featuredImage: {
    type: String
  },
  category: {
    type: String,
    required: true,
    enum: ['ACTUALITES', 'CULTURE', 'SPORTS', 'POLITIQUE', 'ECONOMIE', 'SOCIETE', 'TECHNOLOGIE', 'MODE', 'DIVERTISSEMENT']
  },
  tags: [{
    type: String,
    trim: true
  }],
  authorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['DRAFT', 'PENDING', 'PUBLISHED', 'ARCHIVED'],
    default: 'DRAFT'
  },
  viewCount: {
    type: Number,
    default: 0
  },
  publishedAt: {
    type: Date
  }
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

// Index pour améliorer les performances
ArticleSchema.index({ slug: 1 })
ArticleSchema.index({ category: 1, status: 1 })
ArticleSchema.index({ authorId: 1 })
ArticleSchema.index({ publishedAt: -1 })
ArticleSchema.index({ tags: 1 })
ArticleSchema.index({ title: 'text', content: 'text' }) // Index de recherche textuelle

// Middleware pour générer automatiquement publishedAt quand le statut passe à PUBLISHED
ArticleSchema.pre('save', function(next) {
  if (this.isModified('status') && this.status === 'PUBLISHED' && !this.publishedAt) {
    this.publishedAt = new Date()
  }
  next()
})

const CommentSchema = new Schema<IComment>({
  content: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000
  },
  articleId: {
    type: Schema.Types.ObjectId,
    ref: 'Article'
  },
  eventId: {
    type: Schema.Types.ObjectId,
    ref: 'Event'
  },
  authorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  parentId: {
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  },
  isApproved: {
    type: Boolean,
    default: false
  }
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

// Index pour les commentaires
CommentSchema.index({ articleId: 1, isApproved: 1 })
CommentSchema.index({ eventId: 1, isApproved: 1 })
CommentSchema.index({ authorId: 1 })
CommentSchema.index({ parentId: 1 })

// Validation pour s'assurer qu'un commentaire appartient soit à un article soit à un événement
CommentSchema.pre('save', function(next) {
  if (!this.articleId && !this.eventId) {
    next(new Error('Un commentaire doit appartenir soit à un article soit à un événement'))
  } else if (this.articleId && this.eventId) {
    next(new Error('Un commentaire ne peut pas appartenir à la fois à un article et à un événement'))
  } else {
    next()
  }
})

export const Article = mongoose.models.Article || mongoose.model<IArticle>('Article', ArticleSchema)
export const Comment = mongoose.models.Comment || mongoose.model<IComment>('Comment', CommentSchema)
