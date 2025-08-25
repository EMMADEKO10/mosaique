import { z } from 'zod'

// Schémas de validation avec Zod

// Validation pour l'inscription utilisateur
export const userRegistrationSchema = z.object({
  name: z.string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(50, 'Le nom ne peut pas dépasser 50 caractères'),
  email: z.string()
    .email('Adresse email invalide')
    .toLowerCase(),
  password: z.string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
      'Le mot de passe doit contenir au moins une minuscule, une majuscule, un chiffre et un caractère spécial'),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword']
})

// Validation pour la connexion
export const userLoginSchema = z.object({
  email: z.string().email('Adresse email invalide'),
  password: z.string().min(1, 'Mot de passe requis')
})

// Validation pour le profil artiste
export const artistRegistrationSchema = z.object({
  stageName: z.string()
    .min(2, 'Le nom de scène doit contenir au moins 2 caractères')
    .max(50, 'Le nom de scène ne peut pas dépasser 50 caractères'),
  realName: z.string()
    .min(2, 'Le nom réel doit contenir au moins 2 caractères')
    .max(100, 'Le nom réel ne peut pas dépasser 100 caractères'),
  artistType: z.enum(['MUSICIAN', 'ACTOR', 'COMEDIAN', 'DANCER', 'WRITER', 'VISUAL_ARTIST', 'FILMMAKER', 'OTHER']),
  biography: z.string()
    .max(1000, 'La biographie ne peut pas dépasser 1000 caractères')
    .optional(),
  socialLinks: z.object({
    facebook: z.string().url('URL Facebook invalide').optional().or(z.literal('')),
    instagram: z.string().url('URL Instagram invalide').optional().or(z.literal('')),
    twitter: z.string().url('URL Twitter invalide').optional().or(z.literal('')),
    youtube: z.string().url('URL YouTube invalide').optional().or(z.literal('')),
    tiktok: z.string().url('URL TikTok invalide').optional().or(z.literal('')),
    spotify: z.string().url('URL Spotify invalide').optional().or(z.literal(''))
  }).optional()
})

// Validation pour la création d'article
export const articleCreationSchema = z.object({
  title: z.string()
    .min(5, 'Le titre doit contenir au moins 5 caractères')
    .max(200, 'Le titre ne peut pas dépasser 200 caractères'),
  excerpt: z.string()
    .min(10, 'Le résumé doit contenir au moins 10 caractères')
    .max(300, 'Le résumé ne peut pas dépasser 300 caractères'),
  content: z.string()
    .min(50, 'Le contenu doit contenir au moins 50 caractères'),
  category: z.enum(['ACTUALITES', 'CULTURE', 'SPORTS', 'POLITIQUE', 'ECONOMIE', 'SOCIETE', 'TECHNOLOGIE', 'MODE', 'DIVERTISSEMENT']),
  tags: z.array(z.string()).max(10, 'Maximum 10 tags autorisés'),
  featuredImage: z.string().url('URL d\'image invalide').optional(),
  status: z.enum(['DRAFT', 'PENDING', 'PUBLISHED']).default('DRAFT')
})

// Validation pour les votes
export const voteSubmissionSchema = z.object({
  categoryId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'ID de catégorie invalide'),
  nomineeId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'ID de nominé invalide'),
  voteType: z.enum(['FREE', 'SMS', 'PREMIUM']),
  smsCode: z.string().optional()
}).refine(data => {
  if (data.voteType === 'SMS' && !data.smsCode) {
    return false
  }
  return true
}, {
  message: 'Code SMS requis pour les votes SMS',
  path: ['smsCode']
})

// Validation pour la création d'événement
export const eventCreationSchema = z.object({
  title: z.string()
    .min(5, 'Le titre doit contenir au moins 5 caractères')
    .max(100, 'Le titre ne peut pas dépasser 100 caractères'),
  description: z.string()
    .min(20, 'La description doit contenir au moins 20 caractères'),
  eventType: z.enum(['CONCERT', 'THEATER', 'CONFERENCE', 'WORKSHOP', 'EXHIBITION', 'CEREMONY', 'FESTIVAL', 'OTHER']),
  startDate: z.string().datetime('Date de début invalide'),
  endDate: z.string().datetime('Date de fin invalide').optional(),
  location: z.string().optional(),
  isOnline: z.boolean(),
  streamUrl: z.string().url('URL de streaming invalide').optional(),
  ticketPrice: z.number().min(0, 'Le prix ne peut pas être négatif').optional(),
  maxParticipants: z.number().min(1, 'Minimum 1 participant').optional()
}).refine(data => {
  if (!data.isOnline && !data.location) {
    return false
  }
  if (data.isOnline && !data.streamUrl) {
    return false
  }
  return true
}, {
  message: 'Lieu requis pour les événements physiques, URL de streaming requise pour les événements en ligne'
})

// Validation pour les commentaires
export const commentCreationSchema = z.object({
  content: z.string()
    .min(1, 'Le commentaire ne peut pas être vide')
    .max(1000, 'Le commentaire ne peut pas dépasser 1000 caractères'),
  parentId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'ID de commentaire parent invalide').optional()
})

// Validation pour la mise à jour du profil
export const profileUpdateSchema = z.object({
  name: z.string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(50, 'Le nom ne peut pas dépasser 50 caractères')
    .optional(),
  bio: z.string()
    .max(500, 'La bio ne peut pas dépasser 500 caractères')
    .optional(),
  website: z.string().url('URL de site web invalide').optional().or(z.literal('')),
  location: z.string().max(100, 'La localisation ne peut pas dépasser 100 caractères').optional(),
  phoneNumber: z.string()
    .regex(/^(\+243|0)?[0-9]{9}$/, 'Numéro de téléphone invalide (format RDC)')
    .optional()
    .or(z.literal(''))
})

// Types inférés des schémas
export type UserRegistrationInput = z.infer<typeof userRegistrationSchema>
export type UserLoginInput = z.infer<typeof userLoginSchema>
export type ArtistRegistrationInput = z.infer<typeof artistRegistrationSchema>
export type ArticleCreationInput = z.infer<typeof articleCreationSchema>
export type VoteSubmissionInput = z.infer<typeof voteSubmissionSchema>
export type EventCreationInput = z.infer<typeof eventCreationSchema>
export type CommentCreationInput = z.infer<typeof commentCreationSchema>
export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>
