# Configuration de l'API YouTube

## 🎯 Objectif
Intégrer l'API YouTube pour récupérer automatiquement les statistiques des chaînes YouTube (nombre d'abonnés, vues totales, etc.) dans le formulaire d'ajout d'artiste.

## 📋 Prérequis

### 1. Créer un projet Google Cloud
1. Allez sur [Google Cloud Console](https://console.cloud.google.com/)
2. Créez un nouveau projet ou sélectionnez un projet existant
3. Activez l'API YouTube Data API v3

### 2. Créer une clé API
1. Dans la console Google Cloud, allez dans "APIs & Services" > "Credentials"
2. Cliquez sur "Create Credentials" > "API Key"
3. Copiez la clé API générée

### 3. Configurer les variables d'environnement
Créez un fichier `.env.local` à la racine du projet avec :

```env
# YouTube API Configuration
YOUTUBE_API_KEY=votre_cle_api_youtube_ici

# Autres configurations existantes

```

## 🚀 Utilisation

### Dans le formulaire d'artiste :
1. Entrez l'URL YouTube de l'artiste dans le champ "YouTube"
2. Cliquez sur le bouton 🔄 à côté du champ YouTube
3. Les statistiques seront automatiquement récupérées et remplies dans :
   - **Abonnés** : Nombre d'abonnés de la chaîne
   - **Auditeurs mensuels** : Nombre total de vues de la chaîne

### Formats d'URL YouTube supportés :
- `https://youtube.com/channel/CHANNEL_ID`
- `https://youtube.com/c/CHANNEL_NAME`
- `https://youtube.com/user/USERNAME`
- `https://youtube.com/@HANDLE`
- `https://youtube.com/watch?v=VIDEO_ID`

## 🔧 Fonctionnalités

### Service YouTube (`src/lib/youtube.ts`)
- **Extraction d'ID** : Extrait automatiquement l'ID de chaîne/vidéo depuis une URL
- **Statistiques de chaîne** : Abonnés, vues totales, nombre de vidéos
- **Statistiques de vidéo** : Vues, likes, commentaires
- **Formatage** : Conversion automatique (1.2M, 500K, etc.)

### API Route (`src/app/api/youtube/stats/route.ts`)
- **Validation** : Vérifie que l'URL est une URL YouTube valide
- **Gestion d'erreurs** : Messages d'erreur clairs
- **Sécurité** : Validation côté serveur

### Interface utilisateur
- **Bouton de récupération** : Icône de rafraîchissement avec animation
- **États de chargement** : Indicateur visuel pendant la récupération
- **Feedback utilisateur** : Alertes avec les statistiques récupérées

## ⚠️ Limitations

### Quotas YouTube API
- **Quota quotidien** : 10,000 unités par jour (gratuit)
- **Coût par requête** : ~1-5 unités selon le type de requête
- **Limite de requêtes** : ~2,000-10,000 requêtes par jour

### Formats d'URL
- Seules les URLs YouTube standard sont supportées
- Les URLs personnalisées complexes peuvent ne pas fonctionner
- Les playlists ne sont pas encore supportées

## 🛠️ Développement

### Ajouter de nouvelles fonctionnalités :
1. **Statistiques de vidéo** : Récupérer les stats d'une vidéo spécifique
2. **Playlists** : Statistiques des playlists
3. **Commentaires** : Récupération des commentaires récents
4. **Mise à jour automatique** : Actualisation périodique des stats

### Tests :
```bash
# Tester l'API directement
curl -X POST http://localhost:3000/api/youtube/stats \
  -H "Content-Type: application/json" \
  -d '{"url": "https://youtube.com/channel/UC..."}'
```

## 🔒 Sécurité

### Bonnes pratiques :
- **Clé API** : Ne jamais exposer la clé API dans le code client
- **Validation** : Toujours valider les URLs côté serveur
- **Rate limiting** : Implémenter une limitation de taux si nécessaire
- **Caching** : Mettre en cache les résultats pour éviter les requêtes répétées

### Variables d'environnement :
- `.env.local` est automatiquement ignoré par Git
- Les clés API ne sont jamais commitées
- Utilisez des variables d'environnement pour tous les secrets
