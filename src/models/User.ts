import mongoose, { Schema, Document } from 'mongoose'
import bcrypt from 'bcryptjs'

export interface IUser extends Document {
  _id: string
  email: string
  name: string
  password?: string
  avatar?: string
  role: 'USER' | 'ARTIST' | 'JOURNALIST' | 'ADMIN' | 'MODERATOR'
  isVerified: boolean
  emailVerificationToken?: string
  emailVerificationExpires?: Date
  passwordResetToken?: string
  passwordResetExpires?: Date
  lastLoginAt?: Date
  createdAt: Date
  updatedAt: Date
  comparePassword(candidatePassword: string): Promise<boolean>
}

export interface IUserProfile extends Document {
  userId: mongoose.Types.ObjectId
  bio?: string
  website?: string
  socialLinks?: {
    facebook?: string
    instagram?: string
    twitter?: string
    youtube?: string
    tiktok?: string
    spotify?: string
  }
  location?: string
  phoneNumber?: string
  artistType?: 'MUSICIAN' | 'ACTOR' | 'COMEDIAN' | 'DANCER' | 'WRITER' | 'VISUAL_ARTIST' | 'FILMMAKER' | 'OTHER'
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>({
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
  password: {
    type: String,
    select: false // Ne pas inclure le mot de passe par défaut dans les requêtes
  },
  avatar: {
    type: String
  },
  role: {
    type: String,
    enum: ['USER', 'ARTIST', 'JOURNALIST', 'ADMIN', 'MODERATOR'],
    default: 'USER'
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: {
    type: String,
    select: false
  },
  emailVerificationExpires: {
    type: Date,
    select: false
  },
  passwordResetToken: {
    type: String,
    select: false
  },
  passwordResetExpires: {
    type: Date,
    select: false
  },
  lastLoginAt: {
    type: Date
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret: Record<string, unknown>) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { _id, __v, password, ...rest } = ret
      return {
        id: _id,
        ...rest
      }
    }
  }
})

// Index pour améliorer les performances
UserSchema.index({ email: 1 })
UserSchema.index({ role: 1 })

// Middleware pour hasher le mot de passe avant sauvegarde
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next()
  
  if (this.password) {
    this.password = await bcrypt.hash(this.password, 12)
  }
  next()
})

// Méthode pour comparer les mots de passe
UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  if (!this.password) return false
  return bcrypt.compare(candidatePassword, this.password)
}

const UserProfileSchema = new Schema<IUserProfile>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  bio: {
    type: String,
    maxlength: 500
  },
  website: {
    type: String
  },
  socialLinks: {
    facebook: String,
    instagram: String,
    twitter: String,
    youtube: String,
    tiktok: String,
    spotify: String
  },
  location: {
    type: String
  },
  phoneNumber: {
    type: String
  },
  artistType: {
    type: String,
    enum: ['MUSICIAN', 'ACTOR', 'COMEDIAN', 'DANCER', 'WRITER', 'VISUAL_ARTIST', 'FILMMAKER', 'OTHER']
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret: Record<string, unknown>) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { _id, __v, ...rest } = ret
      return {
        id: _id,
        ...rest
      }
    }
  }
})

UserProfileSchema.index({ userId: 1 })

export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema)
export const UserProfile = mongoose.models.UserProfile || mongoose.model<IUserProfile>('UserProfile', UserProfileSchema)
