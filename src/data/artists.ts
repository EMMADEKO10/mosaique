// Enriched artists data and helpers for the Artistes details pages

export interface ArtistAlbum {
  id: string
  title: string
  year: number
  coverUrl: string
  tracksCount: number
  link?: string
}

export interface ArtistDetails {
  id: string
  name: string
  image: string
  location?: string
  specialty?: string
  biography: string
  label?: string
  yearsActive?: string
  socials?: {
    facebook?: string
    instagram?: string
    twitter?: string
    youtube?: string
    tiktok?: string
    website?: string
  }
  stats?: {
    followers?: number
    monthlyListeners?: number
    awards?: number
  }
  albums: ArtistAlbum[]
  topTracks?: { id: string; title: string; duration: string }[]
}

const baseCover = (fallback: string) => fallback

export const artistsDetails: Record<string, ArtistDetails> = {
  'artist-1': {
    id: 'artist-1',
    name: 'Fally Ipupa',
    image: '/mosaique/Fally capture.png',
    location: 'Kinshasa',
    specialty: 'Rumba, Afrobeat',
    biography:
      "Icône de la rumba congolaise moderne, Fally Ipupa a su fusionner les sonorités traditionnelles avec des influences afro-pop pour conquérir un public international.",
    label: 'FGM / Elektra France',
    yearsActive: '1999 – présent',
    socials: {
      instagram: 'https://instagram.com/fallyipupa',
      youtube: 'https://youtube.com',
      facebook: 'https://facebook.com',
    },
    stats: {
      followers: 2500000,
      monthlyListeners: 1500000,
      awards: 12,
    },
    albums: [
      {
        id: 'fally-album-1',
        title: 'Tokooos',
        year: 2017,
        coverUrl: baseCover('/mosaique/Fally capture.png'),
        tracksCount: 18,
      },
      {
        id: 'fally-album-2',
        title: 'Formule 7',
        year: 2022,
        coverUrl: baseCover('/mosaique/Fally capture.png'),
        tracksCount: 23,
      },
    ],
    topTracks: [
      { id: 'fally-track-1', title: 'Eloko Oyo', duration: '4:15' },
      { id: 'fally-track-2', title: 'Nidja', duration: '3:58' },
      { id: 'fally-track-3', title: 'Un coup', duration: '3:40' },
    ],
  },
  'artist-2': {
    id: 'artist-2',
    name: "Innoss'B",
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
    location: 'Goma',
    specialty: 'Afrobeat, Pop',
    biography:
      "Prodige de la scène urbaine congolaise, Innoss'B mélange afrobeat et rythmes congolais avec une énergie contagieuse.",
    yearsActive: '2010 – présent',
    socials: {
      instagram: 'https://instagram.com',
      youtube: 'https://youtube.com',
    },
    stats: {
      followers: 1800000,
      monthlyListeners: 900000,
      awards: 6,
    },
    albums: [
      {
        id: 'innoss-album-1',
        title: 'Yo Pe',
        year: 2019,
        coverUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
        tracksCount: 14,
      },
    ],
    topTracks: [
      { id: 'innoss-track-1', title: 'Yo Pe', duration: '4:12' },
      { id: 'innoss-track-2', title: 'Best', duration: '3:50' },
    ],
  },
  'artist-3': {
    id: 'artist-3',
    name: 'Chérie Coco',
    image: 'https://images.unsplash.com/photo-1494790108755-2616c6d1a8b8?w=400&h=400&fit=crop',
    location: 'Lubumbashi',
    specialty: 'R&B, Soul Congolais',
    biography:
      'Voix puissante et moderne, Chérie Coco représente la nouvelle génération de la soul congolaise.',
    yearsActive: '2015 – présent',
    albums: [
      {
        id: 'coco-album-1',
        title: 'Congo Bella',
        year: 2024,
        coverUrl: 'https://images.unsplash.com/photo-1494790108755-2616c6d1a8b8?w=400&h=400&fit=crop',
        tracksCount: 12,
      },
    ],
    topTracks: [
      { id: 'coco-track-1', title: 'Congo Bella', duration: '3:28' },
    ],
  },
  'artist-4': {
    id: 'artist-4',
    name: 'Ferré Gola',
    image: '/mosaique/ferre-gola.jpg',
    location: 'Kinshasa',
    specialty: 'Rumba, Guitare',
    biography:
      'Guitariste et chanteur d’exception, Ferré Gola perpétue la grande tradition de la rumba congolaise.',
    yearsActive: '2006 – présent',
    albums: [
      {
        id: 'ferre-album-1',
        title: 'QQJD',
        year: 2017,
        coverUrl: '/mosaique/ferre-gola.jpg',
        tracksCount: 16,
      },
    ],
    topTracks: [
      { id: 'ferre-track-1', title: 'Mama Yemo', duration: '4:20' },
    ],
  },
  'artist-5': {
    id: 'artist-5',
    name: 'Youssoupha Moloko',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    location: 'Kinshasa',
    specialty: 'Rap Conscient, Hip-Hop',
    biography:
      'Porte-voix de la jeunesse kinoise, ses textes engagés et poétiques inspirent une génération.',
    yearsActive: '2012 – présent',
    albums: [
      {
        id: 'moloko-album-1',
        title: 'Kinshasa Flow',
        year: 2024,
        coverUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
        tracksCount: 13,
      },
    ],
  },
  'artist-6': {
    id: 'artist-6',
    name: 'Koffi Olomide',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    location: 'Kinshasa',
    specialty: 'Soukous, Rumba',
    biography:
      'Légende du soukous, Koffi a marqué plusieurs décennies par ses albums et performances scéniques.',
    yearsActive: '1983 – présent',
    albums: [
      {
        id: 'koffi-album-1',
        title: 'Noblesse',
        year: 1994,
        coverUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
        tracksCount: 10,
      },
    ],
  },
}

export const getAllArtists = (): ArtistDetails[] => Object.values(artistsDetails)

export const getArtistById = (id: string): ArtistDetails | undefined => artistsDetails[id]

export const getRelatedArtists = (id: string, limit = 4): ArtistDetails[] => {
  const current = artistsDetails[id]
  if (!current) return []
  return Object.values(artistsDetails)
    .filter(a => a.id !== id && (a.specialty?.split(',')[0] === current.specialty?.split(',')[0] || a.location === current.location))
    .slice(0, limit)
}


