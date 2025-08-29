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

PublicArticleSchema.index({ slug: 1 })
PublicArticleSchema.index({ category: 1 })
PublicArticleSchema.index({ publishedAt: -1 })
PublicArticleSchema.index({ title: 'text', content: 'text' })

export const PublicArticle = mongoose.models.PublicArticle || mongoose.model<IPublicArticle>('PublicArticle', PublicArticleSchema)


