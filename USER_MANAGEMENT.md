# Gestion des Utilisateurs avec NextAuth et MongoDB

## 🔍 **Réponse à votre Question**

**OUI**, maintenant avec la configuration mise à jour, **il y a création automatique des données utilisateur en base de données** lors de l'inscription via Google (ou tout autre provider).

## 🗄️ **Architecture de la Base de Données**

### **Collections MongoDB créées automatiquement :**
- `users` - Informations principales des utilisateurs
- `accounts` - Liens entre utilisateurs et providers OAuth
- `sessions` - Sessions actives des utilisateurs
- `verification_tokens` - Tokens de vérification email

### **Structure du Modèle Utilisateur :**

```typescript
interface IUser {
  email: string
  name: string
  image?: string
  emailVerified?: Date
  provider: string          // 'google', 'facebook', etc.
  providerId: string        // ID unique du provider
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
    notifications: { email: boolean, push: boolean, sms: boolean }
    privacy: { profileVisibility: string, showEmail: boolean, showPhone: boolean }
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
```

## 🔄 **Flux d'Inscription Automatique**

### **1. Première Connexion Google :**
```
Utilisateur clique "Continuer avec Google"
    ↓
Google OAuth redirige vers l'application
    ↓
NextAuth vérifie si l'utilisateur existe
    ↓
Si NOUVEL utilisateur → Création automatique en DB
    ↓
Session créée avec ID utilisateur
    ↓
Redirection vers /admin
```

### **2. Connexions Suivantes :**
```
Utilisateur se reconnecte
    ↓
NextAuth trouve l'utilisateur en DB
    ↓
Mise à jour des statistiques (loginCount, lastLogin)
    ↓
Session créée
    ↓
Redirection vers /admin
```

## 🛠️ **Configuration Requise**

### **1. Variables d'Environnement :**
```env
# Base de données
MONGODB_URI=mongodb://localhost:27017/mosaique
# ou
MONGODB_URI=mongodb+srv://username:password@your-cluster.mongodb.net/mosaique

# NextAuth
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
```

### **2. Installation des Dépendances :**
```bash
npm install @auth/mongodb-adapter mongodb mongoose
```

## 📊 **Fonctionnalités Implémentées**

### ✅ **Création Automatique d'Utilisateur**
- Création lors de la première connexion OAuth
- Récupération des données du provider (nom, email, photo)
- Attribution automatique du rôle 'user'

### ✅ **Gestion des Sessions**
- Sessions persistantes avec JWT
- Stockage sécurisé des tokens d'accès
- Gestion automatique de l'expiration

### ✅ **Statistiques Utilisateur**
- Compteur de connexions
- Date de dernière connexion
- Date de création du compte
- Statut actif/inactif

### ✅ **API de Gestion**
- `GET /api/users` - Liste des utilisateurs (admin)
- `POST /api/users` - Création d'utilisateur
- `GET /api/users/[id]/stats` - Statistiques utilisateur

### ✅ **Service Utilisateur**
- `UserService.createUser()` - Création d'utilisateur
- `UserService.findByEmail()` - Recherche par email
- `UserService.updateLoginStats()` - Mise à jour des stats
- `UserService.updateProfile()` - Mise à jour du profil

## 🔍 **Vérification de la Création**

### **1. Dans les Logs :**
```
🔐 Utilisateur en cours de connexion: user@example.com
👤 Nouvel utilisateur créé: user@example.com
🎉 Nouvel utilisateur inscrit via google
📊 Statistiques de connexion mises à jour pour: user@example.com
```

### **2. Dans MongoDB :**
```javascript
// Collection users
{
  "_id": ObjectId("..."),
  "email": "user@example.com",
  "name": "John Doe",
  "image": "https://lh3.googleusercontent.com/...",
  "provider": "google",
  "providerId": "123456789",
  "role": "user",
  "isVerified": true,
  "isActive": true,
  "stats": {
    "loginCount": 1,
    "lastLogin": ISODate("2024-01-15T10:30:00Z"),
    "createdAt": ISODate("2024-01-15T10:30:00Z"),
    "updatedAt": ISODate("2024-01-15T10:30:00Z")
  },
  "createdAt": ISODate("2024-01-15T10:30:00Z"),
  "updatedAt": ISODate("2024-01-15T10:30:00Z")
}

// Collection accounts
{
  "_id": ObjectId("..."),
  "userId": ObjectId("..."),
  "type": "oauth",
  "provider": "google",
  "providerAccountId": "123456789",
  "refresh_token": "...",
  "access_token": "...",
  "expires_at": 1705312200,
  "token_type": "Bearer",
  "scope": "openid email profile",
  "id_token": "...",
  "session_state": "..."
}
```

## 🚀 **Utilisation**

### **1. Test de l'Inscription :**
1. Allez sur `/test-auth`
2. Cliquez "Se connecter avec Google"
3. Vérifiez les logs dans la console
4. Vérifiez la base de données MongoDB

### **2. Vérification en Base :**
```javascript
// Dans MongoDB Compass ou shell
use mosaique
db.users.find().pretty()
db.accounts.find().pretty()
```

### **3. API de Test :**
```bash
# Obtenir les statistiques utilisateur
curl -H "Authorization: Bearer YOUR_SESSION_TOKEN" \
  http://localhost:3000/api/users/USER_ID/stats
```

## 🔒 **Sécurité**

- **Validation des données** : Toutes les entrées sont validées
- **Gestion des rôles** : Système de permissions intégré
- **Sessions sécurisées** : JWT avec expiration
- **Protection CSRF** : Intégrée dans NextAuth
- **Validation des tokens** : Vérification automatique

## 📈 **Avantages de cette Approche**

1. **Persistance** : Les utilisateurs sont sauvegardés définitivement
2. **Flexibilité** : Possibilité d'ajouter des champs personnalisés
3. **Statistiques** : Suivi des connexions et activités
4. **Évolutivité** : Facile d'ajouter de nouveaux providers
5. **Administration** : Interface d'administration possible
6. **Analytics** : Données pour l'analyse utilisateur

Maintenant, **chaque inscription via Google crée automatiquement un utilisateur en base de données** avec toutes ses informations et statistiques ! 🎉
