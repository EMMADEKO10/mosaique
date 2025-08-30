import User, { IUser } from '@/models/User'

export class UserService {
  /**
   * Créer un nouvel utilisateur
   */
  static async createUser(userData: {
    email: string
    name: string
    image?: string
    provider: string
    providerId: string
  }): Promise<IUser> {
    try {
      const user = new User({
        ...userData,
        emailVerified: new Date(),
        isVerified: true,
        stats: {
          loginCount: 1,
          lastLogin: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      })

      await user.save()
      console.log('✅ Utilisateur créé avec succès:', user.email)
      return user
    } catch (error) {
      console.error('❌ Erreur lors de la création de l\'utilisateur:', error)
      throw error
    }
  }

  /**
   * Trouver un utilisateur par email
   */
  static async findByEmail(email: string): Promise<IUser | null> {
    try {
      return await User.findOne({ email })
    } catch (error) {
      console.error('❌ Erreur lors de la recherche par email:', error)
      return null
    }
  }

  /**
   * Trouver un utilisateur par provider et providerId
   */
  static async findByProvider(provider: string, providerId: string): Promise<IUser | null> {
    try {
      return await User.findOne({ 
        'accounts.provider': provider, 
        'accounts.providerAccountId': providerId 
      })
    } catch (error) {
      console.error('❌ Erreur lors de la recherche par provider:', error)
      return null
    }
  }

  /**
   * Mettre à jour les statistiques de connexion
   */
  static async updateLoginStats(userId: string): Promise<void> {
    try {
      const user = await User.findById(userId)
      if (user) {
        await user.incrementLoginCount()
        console.log('📊 Statistiques de connexion mises à jour pour:', user.email)
      }
    } catch (error) {
      console.error('❌ Erreur lors de la mise à jour des stats:', error)
    }
  }

  /**
   * Mettre à jour le profil utilisateur
   */
  static async updateProfile(userId: string, profileData: Partial<IUser['profile']>): Promise<IUser | null> {
    try {
      const user = await User.findById(userId)
      if (user) {
        await user.updateProfile(profileData)
        console.log('📝 Profil mis à jour pour:', user.email)
        return user
      }
      return null
    } catch (error) {
      console.error('❌ Erreur lors de la mise à jour du profil:', error)
      return null
    }
  }

  /**
   * Obtenir les statistiques utilisateur
   */
  static async getUserStats(userId: string): Promise<{
    loginCount: number
    lastLogin: Date
    createdAt: Date
    isActive: boolean
  } | null> {
    try {
      const user = await User.findById(userId).select('stats isActive')
      if (user) {
        return {
          loginCount: user.stats.loginCount,
          lastLogin: user.stats.lastLogin,
          createdAt: user.stats.createdAt,
          isActive: user.isActive
        }
      }
      return null
    } catch (error) {
      console.error('❌ Erreur lors de la récupération des stats:', error)
      return null
    }
  }

  /**
   * Désactiver un utilisateur
   */
  static async deactivateUser(userId: string): Promise<boolean> {
    try {
      const result = await User.findByIdAndUpdate(userId, { isActive: false })
      return !!result
    } catch (error) {
      console.error('❌ Erreur lors de la désactivation:', error)
      return false
    }
  }

  /**
   * Réactiver un utilisateur
   */
  static async activateUser(userId: string): Promise<boolean> {
    try {
      const result = await User.findByIdAndUpdate(userId, { isActive: true })
      return !!result
    } catch (error) {
      console.error('❌ Erreur lors de la réactivation:', error)
      return false
    }
  }

  /**
   * Obtenir tous les utilisateurs (pour l'admin)
   */
  static async getAllUsers(limit = 50, skip = 0): Promise<{
    users: IUser[]
    total: number
  }> {
    try {
      const [users, total] = await Promise.all([
        User.find({ isActive: true })
          .select('email name role stats.isActive stats.lastLogin stats.loginCount')
          .sort({ 'stats.lastLogin': -1 })
          .limit(limit)
          .skip(skip),
        User.countDocuments({ isActive: true })
      ])

      return { users, total }
    } catch (error) {
      console.error('❌ Erreur lors de la récupération des utilisateurs:', error)
      return { users: [], total: 0 }
    }
  }
}
