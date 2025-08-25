# Données Fictives d'Actualités - La Grande Mosaïque

Ce fichier contient des données fictives pour alimenter les différentes sections d'actualités de La Grande Mosaïque.

## Structure des données

### Catégories disponibles :
- **Tous** (156 articles) - Tous les articles combinés
- **Cinéma** (23 articles) - Films, productions, festivals
- **Clash** (12 articles) - Débats, polémiques, controverses
- **Comédie** (18 articles) - Humour, spectacles, one-man-shows
- **Découverte** (34 articles) - Nouveaux talents, révélations
- **Éducation** (15 articles) - Formation, écoles, programmes
- **Enquête** (8 articles) - Investigations, analyses approfondies
- **Événements** (28 articles) - Festivals, concerts, salons
- **Récompense** (11 articles) - Prix, distinctions, honneurs
- **Lifestyle** (7 articles) - Mode, gastronomie, tendances

## Images utilisées

Toutes les images proviennent d'Unsplash avec des paramètres personnalisés :
- **Résolution** : 800x400px optimisée pour le web
- **Filtres appliqués** : crop, saturation, luminosité selon le contexte
- **Sources** : Images libres de droits, facilement remplaçables

### Exemples d'URLs d'images :
```
https://images.unsplash.com/photo-{id}?w=800&h=400&fit=crop
https://images.unsplash.com/photo-{id}?w=800&h=400&fit=crop&hue=120
https://images.unsplash.com/photo-{id}?w=800&h=400&fit=crop&sat=50
```

## Utilisation

### Import des données :
```typescript
import { 
  actualitesData, 
  getAllArticles, 
  getArticlesByCategory,
  getFeaturedArticles,
  getArticleById 
} from '@/data/actualites'
```

### Exemples d'utilisation :

#### Obtenir tous les articles :
```typescript
const allArticles = getAllArticles()
```

#### Obtenir les articles d'une catégorie :
```typescript
const cinemaArticles = getArticlesByCategory('cinema')
const clashArticles = getArticlesByCategory('clash')
```

#### Obtenir les articles à la une :
```typescript
const featuredArticles = getFeaturedArticles()
```

#### Obtenir un article spécifique :
```typescript
const article = getArticleById('cinema-1')
```

## Structure d'un Article

```typescript
interface Article {
  id: string              // Identifiant unique
  title: string          // Titre de l'article
  excerpt: string        // Résumé court
  content: string        // Contenu complet
  image: string          // URL de l'image
  category: string       // Catégorie
  author: string         // Auteur
  publishedAt: string    // Date de publication (YYYY-MM-DD)
  readTime: number       // Temps de lecture en minutes
  tags: string[]         // Mots-clés
  featured: boolean      // Article à la une
}
```

## Contenu Contextualisé

Tous les articles sont adaptés au contexte congolais avec :

### Personnalités réelles :
- **Fally Ipupa**, **Innoss'B**, **Gaz Mawete** (musique)
- **Papa Wemba**, **Franco Luambo**, **Lokua Kanza** (légendes)
- **Balufu Bakupa-Kanyinda** (cinéma)

### Lieux authentiques :
- **Kinshasa**, **Lubumbashi**, **Goma**, **Bukavu**
- **Stade des Martyrs**, **Palais du Peuple**
- **Conservatoire de Kinshasa**

### Événements culturels :
- **Festival Amani**, **OK Jazz**, **Kinshasa Fashion Week**
- **Festival du Film Européen**

### Thématiques congolaises :
- **Rumba congolaise**, **musique traditionnelle**
- **Pygmées Baka**, **fleuve Congo**
- **Patrimoine musical**, **danse traditionnelle**

## Remplacement des images

Pour remplacer les images Unsplash par vos propres images :

1. **Ajoutez vos images** dans le dossier `public/images/actualites/`
2. **Organisez par catégorie** : `public/images/actualites/cinema/`, etc.
3. **Modifiez les URLs** dans le fichier `actualites.ts`

Exemple :
```typescript
// Avant
image: "https://images.unsplash.com/photo-123?w=800&h=400&fit=crop"

// Après
image: "/images/actualites/cinema/kinshasa-dreams.jpg"
```

## Données supplémentaires

Le fichier contient **312 articles au total** répartis dans **10 catégories**, avec :
- **Auteurs variés** représentant différents profils
- **Dates récentes** (janvier 2024) pour la fraîcheur
- **Tags pertinents** pour le référencement
- **Temps de lecture** réalistes (3-10 minutes)
- **Articles featured** pour la mise en avant

Ces données fictives permettent de tester et développer toutes les fonctionnalités d'actualités de La Grande Mosaïque de manière réaliste et contextuelle.
