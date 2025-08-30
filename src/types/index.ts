// Types principaux pour La Grande Mosaïque

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  profile?: UserProfile;
}

export enum UserRole {
  USER = 'USER',
  ARTIST = 'ARTIST',
  JOURNALIST = 'JOURNALIST',
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR'
}

export interface UserProfile {
  id: string;
  userId: string;
  bio?: string;
  website?: string;
  socialLinks?: SocialLinks;
  location?: string;
  phoneNumber?: string;
  artistType?: ArtistType;
  createdAt: Date;
  updatedAt: Date;
}

export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  youtube?: string;
  tiktok?: string;
  spotify?: string;
}

export enum ArtistType {
  MUSICIAN = 'MUSICIAN',
  ACTOR = 'ACTOR',
  COMEDIAN = 'COMEDIAN',
  DANCER = 'DANCER',
  WRITER = 'WRITER',
  VISUAL_ARTIST = 'VISUAL_ARTIST',
  FILMMAKER = 'FILMMAKER',
  OTHER = 'OTHER'
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage?: string;
  category: ArticleCategory;
  tags: string[];
  authorId: string;
  author: User;
  status: ContentStatus;
  viewCount: number;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  comments?: Comment[];
}

export enum ArticleCategory {
  ACTUALITES = 'ACTUALITES',
  CULTURE = 'CULTURE',
  SPORTS = 'SPORTS',
  POLITIQUE = 'POLITIQUE',
  ECONOMIE = 'ECONOMIE',
  SOCIETE = 'SOCIETE',
  TECHNOLOGIE = 'TECHNOLOGIE',
  MODE = 'MODE',
  DIVERTISSEMENT = 'DIVERTISSEMENT'
}

export enum ContentStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED'
}

export interface Vote {
  id: string;
  userId: string;
  user: User;
  categoryId: string;
  category: VoteCategory;
  nomineeId: string;
  nominee: Artist;
  voteType: VoteType;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
}

export interface VoteCategory {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  startDate: Date;
  endDate: Date;
  nominees: Artist[];
  votes: Vote[];
  createdAt: Date;
  updatedAt: Date;
}

export enum VoteType {
  FREE = 'FREE',
  SMS = 'SMS',
  PREMIUM = 'PREMIUM'
}

export interface Artist {
  id: string;
  userId: string;
  user: User;
  stageName: string;
  realName: string;
  biography?: string;
  artistType: ArtistType;
  profileImage?: string;
  coverImage?: string;
  portfolio: Portfolio[];
  achievements: Achievement[];
  socialStats: SocialStats;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Portfolio {
  id: string;
  artistId: string;
  title: string;
  description?: string;
  mediaUrl: string;
  mediaType: MediaType;
  orderIndex: number;
  createdAt: Date;
}

export enum MediaType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
  DOCUMENT = 'DOCUMENT'
}

export interface Achievement {
  id: string;
  artistId: string;
  title: string;
  description: string;
  achievedAt: Date;
  category: string;
  source?: string;
  createdAt: Date;
}

export interface SocialStats {
  followers?: number;
  streams?: number;
  downloads?: number;
  monthlyListeners?: number;
  updatedAt: Date;
}

export interface Trophy {
  id: string;
  categoryId: string;
  category: VoteCategory;
  winnerId: string;
  winner: Artist;
  year: number;
  ceremonyDate?: Date;
  isDelivered: boolean;
  deliveryAddress?: Address;
  deliveryStatus: DeliveryStatus;
  createdAt: Date;
  updatedAt: Date;
}

export enum DeliveryStatus {
  PENDING = 'PENDING',
  IN_PRODUCTION = 'IN_PRODUCTION',
  READY = 'READY',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  FAILED = 'FAILED'
}

export interface Address {
  street: string;
  city: string;
  state?: string;
  country: string;
  zipCode?: string;
  instructions?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  eventType: EventType;
  startDate: Date;
  endDate?: Date;
  location?: string;
  isOnline: boolean;
  streamUrl?: string;
  organizerId: string;
  organizer: User;
  participants: EventParticipant[];
  featuredImage?: string;
  ticketPrice?: number;
  maxParticipants?: number;
  status: EventStatus;
  createdAt: Date;
  updatedAt: Date;
}

export enum EventType {
  CONCERT = 'CONCERT',
  THEATER = 'THEATER',
  CONFERENCE = 'CONFERENCE',
  WORKSHOP = 'WORKSHOP',
  EXHIBITION = 'EXHIBITION',
  CEREMONY = 'CEREMONY',
  FESTIVAL = 'FESTIVAL',
  OTHER = 'OTHER'
}

export enum EventStatus {
  UPCOMING = 'UPCOMING',
  ONGOING = 'ONGOING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  POSTPONED = 'POSTPONED'
}

export interface EventParticipant {
  id: string;
  eventId: string;
  userId: string;
  user: User;
  registeredAt: Date;
  attended?: boolean;
}

export interface Comment {
  id: string;
  content: string;
  articleId?: string;
  eventId?: string;
  authorId: string;
  author: User;
  parentId?: string;
  replies?: Comment[];
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  actionUrl?: string;
  createdAt: Date;
}

export enum NotificationType {
  VOTE_STARTED = 'VOTE_STARTED',
  VOTE_ENDED = 'VOTE_ENDED',
  TROPHY_WON = 'TROPHY_WON',
  ARTICLE_PUBLISHED = 'ARTICLE_PUBLISHED',
  EVENT_REMINDER = 'EVENT_REMINDER',
  COMMENT_REPLY = 'COMMENT_REPLY',
  SYSTEM = 'SYSTEM'
}

// Types pour les API responses
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Types pour les formulaires
export interface CreateArticleForm {
  title: string;
  content: string;
  excerpt: string;
  category: ArticleCategory;
  tags: string[];
  featuredImage?: string;
  status: ContentStatus;
}

export interface VoteSubmission {
  categoryId: string;
  nomineeId: string;
  voteType: VoteType;
  smsCode?: string;
}

export interface ArtistRegistration {
  stageName: string;
  realName: string;
  artistType: ArtistType;
  biography?: string;
  socialLinks?: SocialLinks;
}
