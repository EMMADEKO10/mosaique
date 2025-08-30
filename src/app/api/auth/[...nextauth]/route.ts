import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const handler = (NextAuth as any)({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NEXTAUTH_DEBUG === 'true',
  pages: {
    signIn: '/connexion',
    signUp: '/inscription',
  },
  callbacks: {
    async signIn({ user }: { user: any }) {
      // Appelé quand un utilisateur se connecte
      console.log('🔐 Utilisateur en cours de connexion:', user.email)
      console.log('📸 Image utilisateur:', user.image)
      return true
    },
    async jwt({ token, user, account }: { token: any; user: any; account: any }) {
      if (account && user) {
        token.accessToken = account.access_token
        // Ajouter l'ID utilisateur au token
        token.userId = user.id
        // S'assurer que l'image est transmise
        if (user.image) {
          token.picture = user.image
        }
      }
      return token
    },
    async session({ session, token }: { session: any; token: any }) {
      // Ajouter l'ID utilisateur à la session
      if (token.userId) {
        session.user.id = token.userId as string
      }
      // S'assurer que l'image est dans la session
      if (token.picture) {
        session.user.image = token.picture as string
      }
      session.accessToken = token.accessToken
      
      console.log('🎭 Session créée avec image:', session.user.image)
      return session
    },
  },
  events: {
    async createUser({ user }: { user: any }) {
      console.log('👤 Nouvel utilisateur créé:', user.email)
      // Ici vous pouvez ajouter des actions supplémentaires
      // comme envoyer un email de bienvenue, créer un profil, etc.
    },
    async signIn({ user, account, isNewUser }: { user: any; account: any; isNewUser: boolean }) {
      if (isNewUser) {
        console.log('🎉 Nouvel utilisateur inscrit via', account?.provider)
      } else {
        console.log('🔑 Utilisateur existant connecté:', user.email)
      }
    },
  },
  session: {
    strategy: "jwt",
  },
})

export { handler as GET, handler as POST }
