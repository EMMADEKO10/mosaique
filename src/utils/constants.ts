// Constantes pour La Grande Mosaïque

export const APP_CONFIG = {
  name: "La Grande Mosaïque",
  description: "La plateforme culturelle congolaise de référence",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  version: "1.0.0",
}

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 12,
  MAX_PAGE_SIZE: 100,
  ARTICLE_PAGE_SIZE: 10,
  COMMENT_PAGE_SIZE: 20,
}

export const VOTE_CONFIG = {
  FREE_VOTES_PER_DAY: 3,
  SMS_VOTE_COST: 100, // Francs congolais
  PREMIUM_VOTE_WEIGHT: 5,
  VOTE_DURATION_DAYS: 30,
}

export const MEDIA_CONFIG = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  ALLOWED_VIDEO_TYPES: ['video/mp4', 'video/webm'],
  ALLOWED_AUDIO_TYPES: ['audio/mp3', 'audio/wav', 'audio/aac'],
}

export const SOCIAL_PLATFORMS = {
  FACEBOOK: 'facebook',
  INSTAGRAM: 'instagram',
  TWITTER: 'twitter',
  YOUTUBE: 'youtube',
  TIKTOK: 'tiktok',
  SPOTIFY: 'spotify',
} as const

export const ARTIST_CATEGORIES = {
  MUSICIAN: 'Musicien(ne)',
  ACTOR: 'Acteur/Actrice',
  COMEDIAN: 'Humoriste',
  DANCER: 'Danseur/Danseuse',
  WRITER: 'Écrivain(e)',
  VISUAL_ARTIST: 'Artiste Visuel(le)',
  FILMMAKER: 'Cinéaste',
  OTHER: 'Autre',
} as const

export const ARTICLE_CATEGORIES = {
  ACTUALITES: 'Actualités',
  CULTURE: 'Culture',
  SPORTS: 'Sports',
  POLITIQUE: 'Politique',
  ECONOMIE: 'Économie',
  SOCIETE: 'Société',
  TECHNOLOGIE: 'Technologie',
  MODE: 'Mode',
  DIVERTISSEMENT: 'Divertissement',
} as const

export const EVENT_TYPES = {
  CONCERT: 'Concert',
  THEATER: 'Théâtre',
  CONFERENCE: 'Conférence',
  WORKSHOP: 'Atelier',
  EXHIBITION: 'Exposition',
  CEREMONY: 'Cérémonie',
  FESTIVAL: 'Festival',
  OTHER: 'Autre',
} as const

export const NOTIFICATION_TYPES = {
  VOTE_STARTED: 'Nouveau vote ouvert',
  VOTE_ENDED: 'Vote terminé',
  TROPHY_WON: 'Trophée remporté',
  ARTICLE_PUBLISHED: 'Nouvel article publié',
  EVENT_REMINDER: 'Rappel d\'événement',
  COMMENT_REPLY: 'Réponse à votre commentaire',
  SYSTEM: 'Notification système',
} as const

export const DELIVERY_STATUS_LABELS = {
  PENDING: 'En attente',
  IN_PRODUCTION: 'En production',
  READY: 'Prêt',
  SHIPPED: 'Expédié',
  DELIVERED: 'Livré',
  FAILED: 'Échec de livraison',
} as const

export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_CD: /^(\+243|0)?[0-9]{9}$/, // Format téléphone RDC
  SLUG: /^[a-z0-9-]+$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
}

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/signin',
    LOGOUT: '/api/auth/signout',
    REGISTER: '/api/auth/register',
  },
  ARTICLES: {
    LIST: '/api/articles',
    CREATE: '/api/articles',
    BY_ID: (id: string) => `/api/articles/${id}`,
    BY_SLUG: (slug: string) => `/api/articles/slug/${slug}`,
  },
  VOTES: {
    CATEGORIES: '/api/votes/categories',
    SUBMIT: '/api/votes',
    RESULTS: '/api/votes/results',
  },
  ARTISTS: {
    LIST: '/api/artists',
    BY_ID: (id: string) => `/api/artists/${id}`,
    REGISTER: '/api/artists/register',
    PORTFOLIO: (id: string) => `/api/artists/${id}/portfolio`,
  },
  EVENTS: {
    LIST: '/api/events',
    CREATE: '/api/events',
    BY_ID: (id: string) => `/api/events/${id}`,
    REGISTER: (id: string) => `/api/events/${id}/register`,
  },
  ADMIN: {
    DASHBOARD: '/api/admin/dashboard',
    USERS: '/api/admin/users',
    MODERATE: '/api/admin/moderate',
  },
}
