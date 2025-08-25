import mongoose, { Schema, Document } from 'mongoose'

export interface IVoteCategory extends Document {
  _id: string
  name: string
  description: string
  isActive: boolean
  startDate: Date
  endDate: Date
  nominees: mongoose.Types.ObjectId[]
  createdAt: Date
  updatedAt: Date
}

export interface IVote extends Document {
  _id: string
  userId: mongoose.Types.ObjectId
  categoryId: mongoose.Types.ObjectId
  nomineeId: mongoose.Types.ObjectId
  voteType: 'FREE' | 'SMS' | 'PREMIUM'
  weight: number
  ipAddress?: string
  userAgent?: string
  smsCode?: string
  paymentId?: string
  createdAt: Date
}

export interface ITrophy extends Document {
  _id: string
  categoryId: mongoose.Types.ObjectId
  winnerId: mongoose.Types.ObjectId
  year: number
  ceremonyDate?: Date
  isDelivered: boolean
  deliveryAddress?: {
    street: string
    city: string
    state?: string
    country: string
    zipCode?: string
    instructions?: string
  }
  deliveryStatus: 'PENDING' | 'IN_PRODUCTION' | 'READY' | 'SHIPPED' | 'DELIVERED' | 'FAILED'
  trackingNumber?: string
  createdAt: Date
  updatedAt: Date
}

const VoteCategorySchema = new Schema<IVoteCategory>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  nominees: [{
    type: Schema.Types.ObjectId,
    ref: 'Artist'
  }]
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      ret.id = ret._id
      delete ret._id
      delete ret.__v
      return ret
    }
  }
})

const VoteSchema = new Schema<IVote>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'VoteCategory',
    required: true
  },
  nomineeId: {
    type: Schema.Types.ObjectId,
    ref: 'Artist',
    required: true
  },
  voteType: {
    type: String,
    required: true,
    enum: ['FREE', 'SMS', 'PREMIUM']
  },
  weight: {
    type: Number,
    default: 1
  },
  ipAddress: {
    type: String
  },
  userAgent: {
    type: String
  },
  smsCode: {
    type: String
  },
  paymentId: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      ret.id = ret._id
      delete ret._id
      delete ret.__v
      return ret
    }
  }
})

const TrophySchema = new Schema<ITrophy>({
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'VoteCategory',
    required: true
  },
  winnerId: {
    type: Schema.Types.ObjectId,
    ref: 'Artist',
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  ceremonyDate: {
    type: Date
  },
  isDelivered: {
    type: Boolean,
    default: false
  },
  deliveryAddress: {
    street: String,
    city: String,
    state: String,
    country: String,
    zipCode: String,
    instructions: String
  },
  deliveryStatus: {
    type: String,
    enum: ['PENDING', 'IN_PRODUCTION', 'READY', 'SHIPPED', 'DELIVERED', 'FAILED'],
    default: 'PENDING'
  },
  trackingNumber: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      ret.id = ret._id
      delete ret._id
      delete ret.__v
      return ret
    }
  }
})

// Index pour améliorer les performances
VoteCategorySchema.index({ isActive: 1, startDate: 1, endDate: 1 })
VoteCategorySchema.index({ startDate: 1, endDate: 1 })

// Index composé pour éviter les votes multiples par utilisateur dans une catégorie
VoteSchema.index({ userId: 1, categoryId: 1 }, { unique: true })
VoteSchema.index({ categoryId: 1, nomineeId: 1 })
VoteSchema.index({ voteType: 1 })
VoteSchema.index({ createdAt: -1 })

// Index composé pour éviter les trophées multiples pour la même catégorie et année
TrophySchema.index({ categoryId: 1, year: 1 }, { unique: true })
TrophySchema.index({ winnerId: 1 })
TrophySchema.index({ deliveryStatus: 1 })

// Validation pour s'assurer que la date de fin est après la date de début
VoteCategorySchema.pre('save', function(next) {
  if (this.endDate <= this.startDate) {
    next(new Error('La date de fin doit être postérieure à la date de début'))
  } else {
    next()
  }
})

// Middleware pour définir le poids du vote selon le type
VoteSchema.pre('save', function(next) {
  switch (this.voteType) {
    case 'FREE':
      this.weight = 1
      break
    case 'SMS':
      this.weight = 3
      break
    case 'PREMIUM':
      this.weight = 5
      break
    default:
      this.weight = 1
  }
  next()
})

export const VoteCategory = mongoose.models.VoteCategory || mongoose.model<IVoteCategory>('VoteCategory', VoteCategorySchema)
export const Vote = mongoose.models.Vote || mongoose.model<IVote>('Vote', VoteSchema)
export const Trophy = mongoose.models.Trophy || mongoose.model<ITrophy>('Trophy', TrophySchema)
