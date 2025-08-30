import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
  email: string
  name: string
  image?: string
  emailVerified?: Date
  provider: string
  providerId: string
  role: 'user' | 'admin' | 'moderator'
  profile: {
    firstName?: string
    lastName?: string
    bio?: string
    location?: string
    website?: string
    phone?: string
    dateOfBirth?: Date
    gender?: 'male' | 'female' | 'other' | 'prefer-not-to-say'
  }
  preferences: {
    language: string
    timezone: string
    notifications: {
      email: boolean
      push: boolean
      sms: boolean
    }
    privacy: {
      profileVisibility: 'public' | 'private' | 'friends'
      showEmail: boolean
      showPhone: boolean
    }
  }
  stats: {
    loginCount: number
    lastLogin: Date
    createdAt: Date
    updatedAt: Date
  }
  isActive: boolean
  isVerified: boolean
}

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    trim: true
  },
  emailVerified: {
    type: Date
  },
  provider: {
    type: String,
    required: true,
    enum: ['google', 'facebook', 'twitter', 'github', 'credentials']
  },
  providerId: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'moderator'],
    default: 'user'
  },
  profile: {
    firstName: String,
    lastName: String,
    bio: {
      type: String,
      maxlength: 500
    },
    location: String,
    website: String,
    phone: String,
    dateOfBirth: Date,
    gender: {
      type: String,
      enum: ['male', 'female', 'other', 'prefer-not-to-say']
    }
  },
  preferences: {
    language: {
      type: String,
      default: 'fr'
    },
    timezone: {
      type: String,
      default: 'Europe/Paris'
    },
    notifications: {
      email: {
        type: Boolean,
        default: true
      },
      push: {
        type: Boolean,
        default: true
      },
      sms: {
        type: Boolean,
        default: false
      }
    },
    privacy: {
      profileVisibility: {
        type: String,
        enum: ['public', 'private', 'friends'],
        default: 'public'
      },
      showEmail: {
        type: Boolean,
        default: false
      },
      showPhone: {
        type: Boolean,
        default: false
      }
    }
  },
  stats: {
    loginCount: {
      type: Number,
      default: 0
    },
    lastLogin: {
      type: Date,
      default: Date.now
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isVerified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

// Index pour améliorer les performances
UserSchema.index({ email: 1 })
UserSchema.index({ provider: 1, providerId: 1 })
UserSchema.index({ role: 1 })
UserSchema.index({ 'stats.lastLogin': -1 })

// Méthodes statiques
UserSchema.statics.findByEmail = function(email: string) {
  return this.findOne({ email: email.toLowerCase() })
}

UserSchema.statics.findByProvider = function(provider: string, providerId: string) {
  return this.findOne({ provider, providerId })
}

// Méthodes d'instance
UserSchema.methods.incrementLoginCount = function() {
  this.stats.loginCount += 1
  this.stats.lastLogin = new Date()
  return this.save()
}

UserSchema.methods.updateProfile = function(profileData: Partial<IUser['profile']>) {
  this.profile = { ...this.profile, ...profileData }
  this.stats.updatedAt = new Date()
  return this.save()
}

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema)
