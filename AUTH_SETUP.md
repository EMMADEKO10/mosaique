# Configuration de l'Authentification NextAuth avec Google

## 🚀 Installation et Configuration

### 1. Variables d'Environnement

Créez un fichier `.env.local` à la racine du projet avec les variables suivantes :

```env
# NextAuth Configuration
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
```

### 2. Configuration Google OAuth

1. Allez sur [Google Cloud Console](https://console.cloud.google.com/)
2. Créez un nouveau projet ou sélectionnez un projet existant
3. Activez l'API Google+ 
4. Allez dans "Identifiants" > "Créer des identifiants" > "ID client OAuth 2.0"
5. Configurez les URIs de redirection autorisés :
   - `http://localhost:3000/api/auth/callback/google` (développement)
   - `https://votre-domaine.com/api/auth/callback/google` (production)

## 📁 Structure des Fichiers

```
src/
├── app/
│   ├── api/auth/[...nextauth]/route.ts    # Configuration NextAuth
│   ├── (auth)/
│   │   ├── connexion/page.tsx             # Page de connexion
│   │   └── inscription/page.tsx           # Page d'inscription
│   ├── providers.tsx                      # Provider NextAuth
│   └── layout.tsx                         # Layout avec provider
├── components/auth/
│   ├── AuthNav.tsx                        # Navigation avec auth
│   ├── ProtectedRoute.tsx                 # Protection des routes
│   └── SignOutButton.tsx                  # Bouton de déconnexion
├── hooks/
│   └── useAuth.ts                         # Hook d'authentification
├── types/
│   └── next-auth.d.ts                     # Types TypeScript
└── middleware.ts                          # Middleware de protection
```

## 🔧 Fonctionnalités Implémentées

### ✅ Authentification Google OAuth
- Connexion avec Google
- Gestion des sessions
- Redirection automatique

### ✅ Pages d'Authentification
- **Connexion** (`/connexion`) : Connexion avec email/mot de passe ou Google
- **Inscription** (`/inscription`) : Création de compte avec validation

### ✅ Protection des Routes
- Middleware pour protéger `/admin/*`
- Composant `ProtectedRoute` pour les pages protégées
- Redirection automatique vers la connexion

### ✅ Navigation Intelligente
- Affichage conditionnel selon l'état d'authentification
- Menu utilisateur avec déconnexion
- Gestion des états de chargement

### ✅ Types TypeScript
- Types personnalisés pour NextAuth
- Support complet de l'autocomplétion

## 🎯 Utilisation

### Dans un Composant

```tsx
import { useSession } from 'next-auth/react'

export default function MonComposant() {
  const { data: session, status } = useSession()

  if (status === 'loading') return <div>Chargement...</div>
  if (status === 'unauthenticated') return <div>Non connecté</div>

  return <div>Bonjour {session?.user?.name} !</div>
}
```

### Protection d'une Route

```tsx
import ProtectedRoute from '@/components/auth/ProtectedRoute'

export default function PageAdmin() {
  return (
    <ProtectedRoute>
      <div>Contenu protégé</div>
    </ProtectedRoute>
  )
}
```

### Navigation avec Auth

```tsx
import AuthNav from '@/components/auth/AuthNav'

export default function Header() {
  return (
    <header>
      <nav>
        <AuthNav />
      </nav>
    </header>
  )
}
```

## 🔒 Sécurité

- **Middleware** : Protection automatique des routes admin
- **Validation** : Validation des formulaires côté client
- **Redirection** : Redirection sécurisée après authentification
- **Sessions** : Gestion sécurisée des sessions NextAuth

## 🚀 Déploiement

### Variables d'Environnement de Production

```env
NEXTAUTH_URL=https://votre-domaine.com
NEXTAUTH_SECRET=votre-secret-securise
GOOGLE_CLIENT_ID=votre-client-id
GOOGLE_CLIENT_SECRET=votre-client-secret
```

### Configuration Google OAuth pour Production

1. Ajoutez votre domaine de production dans les URIs autorisés
2. Configurez les origines JavaScript autorisées
3. Testez l'authentification en production

## 🐛 Dépannage

### Erreurs Courantes

1. **"Invalid redirect_uri"** : Vérifiez les URIs de redirection dans Google Console
2. **"NEXTAUTH_URL not set"** : Définissez NEXTAUTH_URL dans vos variables d'environnement
3. **"Invalid client"** : Vérifiez vos GOOGLE_CLIENT_ID et GOOGLE_CLIENT_SECRET

### Debug

Activez le mode debug en ajoutant dans `.env.local` :

```env
DEBUG=next-auth:*
```

## 📚 Ressources

- [Documentation NextAuth.js](https://next-auth.js.org/)
- [Google OAuth 2.0](https://developers.google.com/identity/protocols/oauth2)
- [Next.js Middleware](https://nextjs.org/docs/advanced-features/middleware)
