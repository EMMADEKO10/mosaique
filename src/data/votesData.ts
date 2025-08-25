// Types pour les données de vote
export interface Song {
  id: string
  title: string
  artist: string
  audioUrl: string
  coverUrl: string
  duration: string
  releaseDate: string
  genre: string
  streams: number
  votes: number
  rank?: number
}

export interface Artist {
  id: string
  name: string
  category: string
  image: string
  description: string
  votes: number
  rank: number
  trending: boolean
  featured: boolean
  location: string
  specialty: string
  socialMedia: {
    followers: number
    engagement: string
  }
}

export interface BattleArtist {
  id: string
  name: string
  image: string
  currentSong: Song
  votes: number
  location: string
  style: string
}

export interface Battle {
  id: string
  title: string
  category: string
  artist1: BattleArtist
  artist2: BattleArtist
  description: string
  endDate: string
  totalVotes: number
  featured: boolean
}

// Données pour "Meilleure Chanson du Mois" - Décembre 2024
export const meilleuresChansonsMois: Song[] = [
  {
    id: 'song-mois-1',
    title: 'Formule 7',
    artist: 'Fally Ipupa',
    audioUrl: '/audio/formule7.mp3',
    coverUrl: '/mosaique/Fally capture.png',
    duration: '3:45',
    releaseDate: '2024-12-01',
    genre: 'Rumba',
    streams: 2500000,
    votes: 15420,
    rank: 1
  },
  {
    id: 'song-mois-2',
    title: 'Yo Pe',
    artist: 'Innoss\'B',
    audioUrl: '/audio/yope.mp3',
    coverUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
    duration: '4:12',
    releaseDate: '2024-12-05',
    genre: 'Afrobeat',
    streams: 1800000,
    votes: 12840,
    rank: 2
  },
  {
    id: 'song-mois-3',
    title: 'Congo Bella',
    artist: 'Chérie Coco',
    audioUrl: '/audio/congobella.mp3',
    coverUrl: 'https://images.unsplash.com/photo-1494790108755-2616c6d1a8b8?w=400&h=400&fit=crop',
    duration: '3:28',
    releaseDate: '2024-12-03',
    genre: 'R&B Congolais',
    streams: 950000,
    votes: 9650,
    rank: 3
  },
  {
    id: 'song-mois-4',
    title: 'Kinshasa Flow',
    artist: 'Youssoupha Moloko',
    audioUrl: '/audio/kinshasaflow.mp3',
    coverUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    duration: '3:56',
    releaseDate: '2024-12-07',
    genre: 'Rap',
    streams: 750000,
    votes: 7230,
    rank: 4
  },
  {
    id: 'song-mois-5',
    title: 'Mama Afrika',
    artist: 'Ferré Gola',
    audioUrl: '/audio/mamaafrika.mp3',
    coverUrl: '/mosaique/ferre-gola.jpg',
    duration: '4:20',
    releaseDate: '2024-12-10',
    genre: 'Rumba',
    streams: 680000,
    votes: 6180,
    rank: 5
  }
]

// Données pour "Meilleure Chanson de l'Année" - 2024
export const meilleuresChansonsAnnee: Song[] = [
  {
    id: 'song-annee-1',
    title: 'Eloko Oyo',
    artist: 'Fally Ipupa',
    audioUrl: '/audio/elokooyo.mp3',
    coverUrl: '/mosaique/Fally capture.png',
    duration: '4:15',
    releaseDate: '2024-03-15',
    genre: 'Rumba',
    streams: 8500000,
    votes: 45230,
    rank: 1
  },
  {
    id: 'song-annee-2',
    title: 'Yoka Yoka',
    artist: 'Innoss\'B',
    audioUrl: '/audio/yokayoka.mp3',
    coverUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
    duration: '3:55',
    releaseDate: '2024-05-20',
    genre: 'Afrobeat',
    streams: 7200000,
    votes: 38750,
    rank: 2
  },
  {
    id: 'song-annee-3',
    title: 'Sexy Dance',
    artist: 'Koffi Olomide',
    audioUrl: '/audio/sexydance.mp3',
    coverUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    duration: '4:30',
    releaseDate: '2024-07-10',
    genre: 'Soukous',
    streams: 6800000,
    votes: 32180,
    rank: 3
  },
  {
    id: 'song-annee-4',
    title: 'Motema',
    artist: 'Werrason',
    audioUrl: '/audio/motema.mp3',
    coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
    duration: '5:20',
    releaseDate: '2024-09-05',
    genre: 'Rumba',
    streams: 5900000,
    votes: 28640,
    rank: 4
  }
]

// Données pour les artistes
export const artistesData: Artist[] = [
  {
    id: "artist-1",
    name: "Fally Ipupa",
    category: "Musique",
    image: "/mosaique/Fally capture.png",
    description: "Roi de la rumba congolaise moderne, voix d'or de Kinshasa",
    votes: 15420,
    rank: 1,
    trending: true,
    featured: true,
    location: "Kinshasa",
    specialty: "Rumba, Afrobeat",
    socialMedia: {
      followers: 2500000,
      engagement: "Très élevé"
    }
  },
  {
    id: "artist-2", 
    name: "Innoss'B",
    category: "Musique",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    description: "Jeune prodige de l'afrobeat congolais, sensation internationale",
    votes: 12840,
    rank: 2,
    trending: true,
    featured: true,
    location: "Goma", 
    specialty: "Afrobeat, Pop",
    socialMedia: {
      followers: 1800000,
      engagement: "Élevé"
    }
  },
  {
    id: "artist-3",
    name: "Chérie Coco",
    category: "Musique",
    image: "https://images.unsplash.com/photo-1494790108755-2616c6d1a8b8?w=400&h=400&fit=crop",
    description: "Diva de la musique congolaise, voix puissante et moderne",
    votes: 9650,
    rank: 3,
    trending: false,
    featured: true,
    location: "Lubumbashi",
    specialty: "R&B, Soul Congolais",
    socialMedia: {
      followers: 950000,
      engagement: "Moyen"
    }
  },
  {
    id: "artist-4",
    name: "Ferré Gola",
    category: "Musique",
    image: "/mosaique/ferre-gola.jpg",
    description: "Maître de la guitare congolaise, légende vivante de la rumba",
    votes: 8750,
    rank: 4,
    trending: true,
    featured: true,
    location: "Kinshasa",
    specialty: "Rumba, Guitare",
    socialMedia: {
      followers: 1200000,
      engagement: "Élevé"
    }
  },
  {
    id: "artist-5",
    name: "Youssoupha Moloko",
    category: "Musique",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    description: "Rappeur conscient de Kinshasa, voix de la jeunesse congolaise",
    votes: 7230,
    rank: 5,
    trending: true,
    featured: false,
    location: "Kinshasa",
    specialty: "Rap Conscient, Hip-Hop",
    socialMedia: {
      followers: 680000,
      engagement: "Très élevé"
    }
  },
  {
    id: "artist-6",
    name: "Koffi Olomide",
    category: "Musique",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    description: "Légende du soukous congolais, père de la génération dorée",
    votes: 6890,
    rank: 6,
    trending: false,
    featured: true,
    location: "Kinshasa",
    specialty: "Soukous, Rumba",
    socialMedia: {
      followers: 1500000,
      engagement: "Moyen"
    }
  }
]

// Données pour les battles
export const battlesData: Battle[] = [
  {
    id: 'battle-1',
    title: 'Fally vs Innoss\'B - Clash des Générations',
    category: 'Battle Congo',
    artist1: {
      id: 'fally-battle',
      name: 'Fally Ipupa',
      image: '/mosaique/Fally capture.png',
      currentSong: meilleuresChansonsMois[0],
      votes: 15420,
      location: 'Kinshasa',
      style: 'Rumba Moderne'
    },
    artist2: {
      id: 'innoss-battle',
      name: 'Innoss\'B',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
      currentSong: meilleuresChansonsMois[1],
      votes: 12840,
      location: 'Goma',
      style: 'Afrobeat'
    },
    description: 'Le roi de la rumba affronte la nouvelle génération afrobeat',
    endDate: '2024-12-31',
    totalVotes: 28260,
    featured: true
  },
  {
    id: 'battle-2',
    title: 'Derby Rap Congo - Finale',
    category: 'Derby Rap Congo',
    artist1: {
      id: 'moloko-battle',
      name: 'Youssoupha Moloko',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      currentSong: meilleuresChansonsMois[3],
      votes: 8750,
      location: 'Kinshasa',
      style: 'Rap Conscient'
    },
    artist2: {
      id: 'kalash-battle',
      name: 'Kalash Criminel Jr',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      currentSong: {
        id: 'song-kalash',
        title: 'Congo Boss',
        artist: 'Kalash Criminel Jr',
        audioUrl: '/audio/congoboss.mp3',
        coverUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
        duration: '4:20',
        releaseDate: '2024-11-25',
        genre: 'Rap',
        streams: 680000,
        votes: 7240
      },
      votes: 7240,
      location: 'Kinshasa',
      style: 'Rap Urbain'
    },
    description: 'La finale du tournoi de rap congolais le plus attendu',
    endDate: '2024-12-25',
    totalVotes: 15990,
    featured: true
  },
  {
    id: 'battle-3',
    title: 'Battle Kinois - Rumba Classique',
    category: 'Battle Kinois - Rumba',
    artist1: {
      id: 'ferre-battle',
      name: 'Ferré Gola',
      image: '/mosaique/ferre-gola.jpg',
      currentSong: meilleuresChansonsMois[4],
      votes: 6180,
      location: 'Kinshasa',
      style: 'Rumba Traditionnelle'
    },
    artist2: {
      id: 'koffi-battle',
      name: 'Koffi Olomide',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      currentSong: meilleuresChansonsAnnee[2],
      votes: 5940,
      location: 'Kinshasa',
      style: 'Soukous'
    },
    description: 'Duel entre les maîtres de la rumba kinoise',
    endDate: '2024-12-28',
    totalVotes: 12120,
    featured: false
  },
  {
    id: 'battle-4',
    title: 'Battle Kinois - Nouvelle Génération',
    category: 'Battle Kinois - Urbain',
    artist1: {
      id: 'coco-battle',
      name: 'Chérie Coco',
      image: 'https://images.unsplash.com/photo-1494790108755-2616c6d1a8b8?w=400&h=400&fit=crop',
      currentSong: meilleuresChansonsMois[2],
      votes: 5230,
      location: 'Lubumbashi',
      style: 'R&B Urbain'
    },
    artist2: {
      id: 'arafat-battle',
      name: 'DJ Arafat Junior',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      currentSong: {
        id: 'song-arafat',
        title: 'Kinshasa Beats',
        artist: 'DJ Arafat Junior',
        audioUrl: '/audio/kinshasabeats.mp3',
        coverUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
        duration: '3:45',
        releaseDate: '2024-11-30',
        genre: 'Électro-Afro',
        streams: 420000,
        votes: 4890
      },
      votes: 4890,
      location: 'Kinshasa',
      style: 'Électro-Afro'
    },
    description: 'Confrontation entre styles urbains modernes',
    endDate: '2024-12-30',
    totalVotes: 10120,
    featured: false
  }
]

// Fonction pour obtenir les données selon la catégorie
export const getVoteDataByCategory = (categoryId: string) => {
  switch (categoryId) {
    case 'meilleur-chanson-mois':
      return { type: 'songs', data: meilleuresChansonsMois }
    case 'meilleur-chanson-annee':
      return { type: 'songs', data: meilleuresChansonsAnnee }
    case 'battle-congo':
      return { type: 'battles', data: battlesData.filter(b => b.category === 'Battle Congo') }
    case 'derby-rap-congo':
      return { type: 'battles', data: battlesData.filter(b => b.category === 'Derby Rap Congo') }
    case 'battle-kinois-rap':
      return { type: 'battles', data: battlesData.filter(b => b.category.includes('Rap')) }
    case 'battle-kinois-rumba':
      return { type: 'battles', data: battlesData.filter(b => b.category.includes('Rumba')) }
    case 'battle-kinois-urbain':
      return { type: 'battles', data: battlesData.filter(b => b.category.includes('Urbain')) }
    default:
      return { type: 'artists', data: artistesData }
  }
}

// Fonction pour voter
export const voteForItem = (categoryId: string, itemId: string): boolean => {
  try {
    const categoryData = getVoteDataByCategory(categoryId)
    const item = categoryData.data.find((item: Song | Artist | Battle) => item.id === itemId)
    
    if (item) {
      if ('votes' in item) {
        item.votes += 1
      }
      if ('totalVotes' in item) {
        item.totalVotes += 1
      }
      return true
    }
    return false
  } catch (error) {
    console.error('Erreur lors du vote:', error)
    return false
  }
}

// Statistiques par catégorie
export const getCategoryStats = (categoryId: string) => {
  const categoryData = getVoteDataByCategory(categoryId)
  const data = categoryData.data as (Song | Artist | Battle)[]
  
  const totalVotes = data.reduce((sum, item) => {
    if (categoryData.type === 'battles') {
      return sum + ((item as Battle).totalVotes || 0)
    }
    return sum + ((item as Song | Artist).votes || 0)
  }, 0)
  
  const totalItems = data.length
  const averageVotes = totalItems > 0 ? Math.round(totalVotes / totalItems) : 0
  
  return {
    totalVotes,
    totalItems,
    averageVotes,
    type: categoryData.type
  }
}
