import mongoose, { Schema, Document } from 'mongoose'

export interface IEvent extends Document {
  _id: string
  title: string
  description: string
  eventType: 'CONCERT' | 'THEATER' | 'CONFERENCE' | 'WORKSHOP' | 'EXHIBITION' | 'CEREMONY' | 'FESTIVAL' | 'OTHER'
  startDate: Date
  endDate?: Date
  location?: string
  isOnline: boolean
  streamUrl?: string
  organizerId: mongoose.Types.ObjectId
  featuredImage?: string
  ticketPrice?: number
  maxParticipants?: number
  currentParticipants: number
  status: 'UPCOMING' | 'ONGOING' | 'COMPLETED' | 'CANCELLED' | 'POSTPONED'
  createdAt: Date
  updatedAt: Date
}

export interface IEventParticipant extends Document {
  _id: string
  eventId: mongoose.Types.ObjectId
  userId: mongoose.Types.ObjectId
  registeredAt: Date
  attended?: boolean
  paymentStatus?: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED'
  paymentId?: string
}

export interface INotification extends Document {
  _id: string
  userId: mongoose.Types.ObjectId
  title: string
  message: string
  type: 'VOTE_STARTED' | 'VOTE_ENDED' | 'TROPHY_WON' | 'ARTICLE_PUBLISHED' | 'EVENT_REMINDER' | 'COMMENT_REPLY' | 'SYSTEM'
  isRead: boolean
  actionUrl?: string
  createdAt: Date
}

const EventSchema = new Schema<IEvent>({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  eventType: {
    type: String,
    required: true,
    enum: ['CONCERT', 'THEATER', 'CONFERENCE', 'WORKSHOP', 'EXHIBITION', 'CEREMONY', 'FESTIVAL', 'OTHER']
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date
  },
  location: {
    type: String
  },
  isOnline: {
    type: Boolean,
    default: false
  },
  streamUrl: {
    type: String
  },
  organizerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  featuredImage: {
    type: String
  },
  ticketPrice: {
    type: Number,
    min: 0
  },
  maxParticipants: {
    type: Number,
    min: 1
  },
  currentParticipants: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['UPCOMING', 'ONGOING', 'COMPLETED', 'CANCELLED', 'POSTPONED'],
    default: 'UPCOMING'
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { _id, __v, ...rest } = ret
      return { id: _id, ...rest }
    }
  }
})

const EventParticipantSchema = new Schema<IEventParticipant>({
  eventId: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  registeredAt: {
    type: Date,
    default: Date.now
  },
  attended: {
    type: Boolean
  },
  paymentStatus: {
    type: String,
    enum: ['PENDING', 'PAID', 'FAILED', 'REFUNDED'],
    default: 'PENDING'
  },
  paymentId: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { _id, __v, ...rest } = ret
      return { id: _id, ...rest }
    }
  }
})

const NotificationSchema = new Schema<INotification>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['VOTE_STARTED', 'VOTE_ENDED', 'TROPHY_WON', 'ARTICLE_PUBLISHED', 'EVENT_REMINDER', 'COMMENT_REPLY', 'SYSTEM']
  },
  isRead: {
    type: Boolean,
    default: false
  },
  actionUrl: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { _id, __v, ...rest } = ret
      return { id: _id, ...rest }
    }
  }
})

// Index pour améliorer les performances
EventSchema.index({ startDate: 1, status: 1 })
EventSchema.index({ eventType: 1, status: 1 })
EventSchema.index({ organizerId: 1 })
EventSchema.index({ isOnline: 1 })
EventSchema.index({ title: 'text', description: 'text' })

// Index composé pour éviter les inscriptions multiples
EventParticipantSchema.index({ eventId: 1, userId: 1 }, { unique: true })
EventParticipantSchema.index({ paymentStatus: 1 })

NotificationSchema.index({ userId: 1, isRead: 1 })
NotificationSchema.index({ type: 1 })
NotificationSchema.index({ createdAt: -1 })

// Validation pour s'assurer que les événements en ligne ont une URL de stream
EventSchema.pre('save', function(next) {
  if (this.isOnline && !this.streamUrl) {
    next(new Error('Une URL de streaming est requise pour les événements en ligne'))
  } else if (!this.isOnline && !this.location) {
    next(new Error('Un lieu est requis pour les événements physiques'))
  } else {
    next()
  }
})

// Validation pour s'assurer que la date de fin est après la date de début
EventSchema.pre('save', function(next) {
  if (this.endDate && this.endDate <= this.startDate) {
    next(new Error('La date de fin doit être postérieure à la date de début'))
  } else {
    next()
  }
})

export const Event = mongoose.models.Event || mongoose.model<IEvent>('Event', EventSchema)
export const EventParticipant = mongoose.models.EventParticipant || mongoose.model<IEventParticipant>('EventParticipant', EventParticipantSchema)
export const Notification = mongoose.models.Notification || mongoose.model<INotification>('Notification', NotificationSchema)
