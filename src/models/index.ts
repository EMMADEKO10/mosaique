// Index de tous les modèles MongoDB pour La Grande Mosaïque
export { default as User, IUser } from './User'
export { Article, Comment } from './Article'
export { Artist, Portfolio, Achievement } from './Artist'
export { VoteCategory, Vote, Trophy } from './Vote'
export { Event, EventParticipant, Notification } from './Event'

// Types pour faciliter l'utilisation
export type {
  IUser,
  IUserProfile
} from './User'

export type {
  IArticle,
  IComment
} from './Article'

export type {
  IArtist,
  IPortfolio,
  IAchievement
} from './Artist'

export type {
  IVoteCategory,
  IVote,
  ITrophy
} from './Vote'

export type {
  IEvent,
  IEventParticipant,
  INotification
} from './Event'

export type { IArticle as IArticleType, IComment as ICommentType } from './Article'
export type { IArtist as IArtistType, IPortfolio as IPortfolioType, IAchievement as IAchievementType } from './Artist'
export type { IVoteCategory as IVoteCategoryType, IVote as IVoteType, ITrophy as ITrophyType } from './Vote'
export type { IEvent as IEventType, IEventParticipant as IEventParticipantType, INotification as INotificationType } from './Event'
