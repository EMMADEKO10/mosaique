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
    image: '/mosaique/photoartiste/innosb.png',
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
        coverUrl: '/mosaique/photoartiste/innos\'b.png',
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
    name: 'Damso',
    image: '/mosaique/photoartiste/damso rappeur.png',
    location: 'Kinshasa',
    specialty: 'Rap, Hip-Hop',
    biography:
      'Rappeur congolais de renommée internationale, Damso est connu pour ses textes percutants et son style unique.',
    yearsActive: '2014 – présent',
    socials: {
      instagram: 'https://instagram.com/damso',
      youtube: 'https://youtube.com',
      twitter: 'https://twitter.com/damso',
    },
    stats: {
      followers: 3200000,
      monthlyListeners: 2000000,
      awards: 8,
    },
    albums: [
      {
        id: 'damso-album-1',
        title: 'Lithopédion',
        year: 2018,
        coverUrl: '/mosaique/photoartiste/damso rappeur.png',
        tracksCount: 16,
      },
      {
        id: 'damso-album-2',
        title: 'QALF',
        year: 2020,
        coverUrl: '/mosaique/photoartiste/damso rappeur.png',
        tracksCount: 20,
      },
    ],
    topTracks: [
      { id: 'damso-track-1', title: 'Macarena', duration: '3:45' },
      { id: 'damso-track-2', title: 'Θ. Macarena', duration: '4:12' },
      { id: 'damso-track-3', title: 'Θ. Macarena (Part.2)', duration: '3:58' },
    ],
  },
  'artist-4': {
    id: 'artist-4',
    name: 'Koffi Olomide',
    image: '/mosaique/photoartiste/koffi olomide.png',
    location: 'Kinshasa',
    specialty: 'Soukous, Rumba',
    biography:
      'Légende du soukous, Koffi Olomide a marqué plusieurs décennies par ses albums et performances scéniques exceptionnelles.',
    yearsActive: '1983 – présent',
    label: 'Antilles Records',
    socials: {
      instagram: 'https://instagram.com/koffiolomide',
      youtube: 'https://youtube.com',
      facebook: 'https://facebook.com/koffiolomide',
    },
    stats: {
      followers: 1500000,
      monthlyListeners: 800000,
      awards: 15,
    },
    albums: [
      {
        id: 'koffi-album-1',
        title: 'Noblesse',
        year: 1994,
        coverUrl: '/mosaique/photoartiste/koffi olomide.png',
        tracksCount: 10,
      },
      {
        id: 'koffi-album-2',
        title: 'Ultimatum',
        year: 1996,
        coverUrl: '/mosaique/photoartiste/koffi olomide.png',
        tracksCount: 12,
      },
    ],
    topTracks: [
      { id: 'koffi-track-1', title: 'Noblesse', duration: '5:20' },
      { id: 'koffi-track-2', title: 'Ultimatum', duration: '4:45' },
      { id: 'koffi-track-3', title: 'Loi', duration: '6:10' },
    ],
  },
  'artist-5': {
    id: 'artist-5',
    name: 'Ferré Gola',
    image: '/mosaique/ferre-gola.jpg',
    location: 'Kinshasa',
    specialty: 'Rumba, Guitare',
    biography:
      'Guitariste et chanteur d\'exception, Ferré Gola perpétue la grande tradition de la rumba congolaise avec brio.',
    yearsActive: '2006 – présent',
    label: 'Ferré Gola Music',
    socials: {
      instagram: 'https://instagram.com/ferregola',
      youtube: 'https://youtube.com',
      facebook: 'https://facebook.com/ferregola',
    },
    stats: {
      followers: 1200000,
      monthlyListeners: 700000,
      awards: 9,
    },
    albums: [
      {
        id: 'ferre-album-1',
        title: 'QQJD',
        year: 2017,
        coverUrl: '/mosaique/ferre-gola.jpg',
        tracksCount: 16,
      },
      {
        id: 'ferre-album-2',
        title: 'Dynastie',
        year: 2020,
        coverUrl: '/mosaique/ferre-gola.jpg',
        tracksCount: 18,
      },
    ],
    topTracks: [
      { id: 'ferre-track-1', title: 'Mama Yemo', duration: '4:20' },
      { id: 'ferre-track-2', title: 'QQJD', duration: '3:55' },
      { id: 'ferre-track-3', title: 'Dynastie', duration: '4:15' },
    ],
  },
  'artist-6': {
    id: 'artist-6',
    name: 'Youssoupha',
    image: '/mosaique/photoartiste/yousoupha rapeur.jpg',
    location: 'Kinshasa',
    specialty: 'Rap Conscient, Hip-Hop',
    biography:
      'Porte-voix de la jeunesse kinoise, ses textes engagés et poétiques inspirent une génération entière.',
    yearsActive: '2012 – présent',
    label: 'Def Jam France',
    socials: {
      instagram: 'https://instagram.com/youssoupha',
      youtube: 'https://youtube.com',
      twitter: 'https://twitter.com/youssoupha',
    },
    stats: {
      followers: 1800000,
      monthlyListeners: 1100000,
      awards: 7,
    },
    albums: [
      {
        id: 'youssoupha-album-1',
        title: 'Sur les chemins du retour',
        year: 2012,
        coverUrl: '/mosaique/photoartiste/yousoupha rapeur.jpg',
        tracksCount: 15,
      },
      {
        id: 'youssoupha-album-2',
        title: 'NGRTD',
        year: 2017,
        coverUrl: '/mosaique/photoartiste/yousoupha rapeur.jpg',
        tracksCount: 17,
      },
    ],
    topTracks: [
      { id: 'youssoupha-track-1', title: 'Désoin', duration: '4:30' },
      { id: 'youssoupha-track-2', title: 'NGRTD', duration: '3:45' },
      { id: 'youssoupha-track-3', title: 'Rêves', duration: '4:12' },
    ],
  },
  'artist-7': {
    id: 'artist-7',
    name: 'Werrason',
    image: '/mosaique/photoartiste/Werrason (1).jpg',
    location: 'Kinshasa',
    specialty: 'Soukous, Rumba',
    biography:
      'Légende du soukous congolais, Werrason est le fondateur du groupe Wenge Musica et un artiste de renommée internationale.',
    yearsActive: '1982 – présent',
    label: 'Wenge Musica',
    socials: {
      instagram: 'https://instagram.com/werrason',
      youtube: 'https://youtube.com',
      facebook: 'https://facebook.com/werrason',
    },
    stats: {
      followers: 2000000,
      monthlyListeners: 1200000,
      awards: 18,
    },
    albums: [
      {
        id: 'werrason-album-1',
        title: 'Kibuisa Mpimpa',
        year: 1997,
        coverUrl: '/mosaique/photoartiste/Werrason (1).jpg',
        tracksCount: 12,
      },
      {
        id: 'werrason-album-2',
        title: 'Solo Non Stop',
        year: 2003,
        coverUrl: '/mosaique/photoartiste/Werrason (1).jpg',
        tracksCount: 15,
      },
    ],
    topTracks: [
      { id: 'werrason-track-1', title: 'Kibuisa Mpimpa', duration: '6:15' },
      { id: 'werrason-track-2', title: 'Solo Non Stop', duration: '5:45' },
      { id: 'werrason-track-3', title: 'Mabele', duration: '7:20' },
    ],
  },
  'artist-8': {
    id: 'artist-8',
    name: 'JB Mpiana',
    image: '/mosaique/photoartiste/JB_Mpiana.jpg',
    location: 'Kinshasa',
    specialty: 'Soukous, Rumba',
    biography:
      'Artiste culte du soukous, JB Mpiana est connu pour ses performances scéniques spectaculaires et sa voix unique.',
    yearsActive: '1985 – présent',
    label: 'Wenge Musica',
    socials: {
      instagram: 'https://instagram.com/jbmpiana',
      youtube: 'https://youtube.com',
      facebook: 'https://facebook.com/jbmpiana',
    },
    stats: {
      followers: 1500000,
      monthlyListeners: 900000,
      awards: 12,
    },
    albums: [
      {
        id: 'jb-album-1',
        title: 'Feux de l\'amour',
        year: 1998,
        coverUrl: '/mosaique/photoartiste/JB_Mpiana.jpg',
        tracksCount: 14,
      },
      {
        id: 'jb-album-2',
        title: 'Toxi',
        year: 2001,
        coverUrl: '/mosaique/photoartiste/JB_Mpiana.jpg',
        tracksCount: 16,
      },
    ],
    topTracks: [
      { id: 'jb-track-1', title: 'Feux de l\'amour', duration: '5:30' },
      { id: 'jb-track-2', title: 'Toxi', duration: '6:15' },
      { id: 'jb-track-3', title: 'Maman', duration: '4:45' },
    ],
  },
  'artist-9': {
    id: 'artist-9',
    name: 'Gaz Mawete',
    image: '/mosaique/photoartiste/Gaz Mawete.png',
    location: 'Kinshasa',
    specialty: 'Rumba, Afrobeat',
    biography:
      'Nouvelle étoile montante de la rumba congolaise, Gaz Mawete apporte une touche moderne au genre traditionnel.',
    yearsActive: '2018 – présent',
    label: 'Gaz Music',
    socials: {
      instagram: 'https://instagram.com/gazmawete',
      youtube: 'https://youtube.com',
      tiktok: 'https://tiktok.com/@gazmawete',
    },
    stats: {
      followers: 800000,
      monthlyListeners: 500000,
      awards: 3,
    },
    albums: [
      {
        id: 'gaz-album-1',
        title: 'Gaz Mawete',
        year: 2020,
        coverUrl: '/mosaique/photoartiste/Gaz Mawete.png',
        tracksCount: 12,
      },
    ],
    topTracks: [
      { id: 'gaz-track-1', title: 'Gaz Mawete', duration: '4:20' },
      { id: 'gaz-track-2', title: 'Mama', duration: '3:55' },
      { id: 'gaz-track-3', title: 'Bébé', duration: '4:10' },
    ],
  },
  'artist-10': {
    id: 'artist-10',
    name: 'Rebo Tshulo',
    image: '/mosaique/photoartiste/rebo tshulo.png',
    location: 'Kinshasa',
    specialty: 'Rumba, Soukous',
    biography:
      'Artiste talentueux de la nouvelle génération, Rebo Tshulo perpétue la tradition de la rumba avec un style contemporain.',
    yearsActive: '2015 – présent',
    label: 'Rebo Music',
    socials: {
      instagram: 'https://instagram.com/rebotshulo',
      youtube: 'https://youtube.com',
      facebook: 'https://facebook.com/rebotshulo',
    },
    stats: {
      followers: 600000,
      monthlyListeners: 400000,
      awards: 2,
    },
    albums: [
      {
        id: 'rebo-album-1',
        title: 'Rebo Tshulo',
        year: 2019,
        coverUrl: '/mosaique/photoartiste/rebo tshulo.png',
        tracksCount: 10,
      },
    ],
    topTracks: [
      { id: 'rebo-track-1', title: 'Rebo Tshulo', duration: '4:15' },
      { id: 'rebo-track-2', title: 'Maman', duration: '3:50' },
      { id: 'rebo-track-3', title: 'Amour', duration: '4:25' },
    ],
  },
  'artist-11': {
    id: 'artist-11',
    name: 'Jean Goubal Kalala',
    image: '/mosaique/photoartiste/Jean Goubal kalala .png',
    location: 'Kinshasa',
    specialty: 'Gospel, Musique Chrétienne',
    biography:
      'Artiste gospel de renom, Jean Goubal Kalala inspire des milliers de fidèles avec sa musique spirituelle et ses messages d\'espoir.',
    yearsActive: '2000 – présent',
    label: 'Gospel Records',
    socials: {
      instagram: 'https://instagram.com/jeangoubal',
      youtube: 'https://youtube.com',
      facebook: 'https://facebook.com/jeangoubal',
    },
    stats: {
      followers: 1200000,
      monthlyListeners: 800000,
      awards: 8,
    },
    albums: [
      {
        id: 'goubal-album-1',
        title: 'Louange et Adoration',
        year: 2015,
        coverUrl: '/mosaique/photoartiste/Jean Goubal kalala .png',
        tracksCount: 15,
      },
      {
        id: 'goubal-album-2',
        title: 'Gloire à Dieu',
        year: 2020,
        coverUrl: '/mosaique/photoartiste/Jean Goubal kalala .png',
        tracksCount: 12,
      },
    ],
    topTracks: [
      { id: 'goubal-track-1', title: 'Louange et Adoration', duration: '5:30' },
      { id: 'goubal-track-2', title: 'Gloire à Dieu', duration: '4:45' },
      { id: 'goubal-track-3', title: 'Merci Seigneur', duration: '6:15' },
    ],
  },
  'artist-12': {
    id: 'artist-12',
    name: 'Ninho',
    image: '/mosaique/photoartiste/ninho artiste.png',
    location: 'Kinshasa',
    specialty: 'Rap, Hip-Hop',
    biography:
      'Rappeur français d\'origine congolaise, Ninho est devenu l\'un des artistes les plus populaires du rap français avec ses textes percutants.',
    yearsActive: '2013 – présent',
    label: 'Universal Music',
    socials: {
      instagram: 'https://instagram.com/ninho',
      youtube: 'https://youtube.com',
      twitter: 'https://twitter.com/ninho',
    },
    stats: {
      followers: 4500000,
      monthlyListeners: 3000000,
      awards: 15,
    },
    albums: [
      {
        id: 'ninho-album-1',
        title: 'Destin',
        year: 2016,
        coverUrl: '/mosaique/photoartiste/ninho artiste.png',
        tracksCount: 18,
      },
      {
        id: 'ninho-album-2',
        title: 'Comme prévu',
        year: 2019,
        coverUrl: '/mosaique/photoartiste/ninho artiste.png',
        tracksCount: 20,
      },
    ],
    topTracks: [
      { id: 'ninho-track-1', title: 'Destin', duration: '3:45' },
      { id: 'ninho-track-2', title: 'Comme prévu', duration: '4:12' },
      { id: 'ninho-track-3', title: 'Freestyle', duration: '3:30' },
    ],
  },
  'artist-13': {
    id: 'artist-13',
    name: 'Karmapa',
    image: '/mosaique/photoartiste/Karmapa rumba.png',
    location: 'Kinshasa',
    specialty: 'Rumba, Soukous',
    biography:
      'Artiste de rumba traditionnelle, Karmapa est connu pour ses mélodies envoûtantes et ses rythmes authentiques du Congo.',
    yearsActive: '1995 – présent',
    label: 'Karmapa Music',
    socials: {
      instagram: 'https://instagram.com/karmapa',
      youtube: 'https://youtube.com',
      facebook: 'https://facebook.com/karmapa',
    },
    stats: {
      followers: 900000,
      monthlyListeners: 600000,
      awards: 5,
    },
    albums: [
      {
        id: 'karmapa-album-1',
        title: 'Karmapa Rumba',
        year: 2005,
        coverUrl: '/mosaique/photoartiste/Karmapa rumba.png',
        tracksCount: 14,
      },
      {
        id: 'karmapa-album-2',
        title: 'Tradition',
        year: 2010,
        coverUrl: '/mosaique/photoartiste/Karmapa rumba.png',
        tracksCount: 16,
      },
    ],
    topTracks: [
      { id: 'karmapa-track-1', title: 'Karmapa Rumba', duration: '5:45' },
      { id: 'karmapa-track-2', title: 'Tradition', duration: '6:20' },
      { id: 'karmapa-track-3', title: 'Congo', duration: '4:55' },
    ],
  },
  'artist-14': {
    id: 'artist-14',
    name: 'Gally Garvey',
    image: '/mosaique/photoartiste/gally garvey.png',
    location: 'Kinshasa',
    specialty: 'Rumba, Afrobeat',
    biography:
      'Artiste polyvalent, Gally Garvey mélange rumba traditionnelle et afrobeat moderne pour créer un son unique et contemporain.',
    yearsActive: '2010 – présent',
    label: 'Gally Records',
    socials: {
      instagram: 'https://instagram.com/gallygarvey',
      youtube: 'https://youtube.com',
      tiktok: 'https://tiktok.com/@gallygarvey',
    },
    stats: {
      followers: 700000,
      monthlyListeners: 450000,
      awards: 4,
    },
    albums: [
      {
        id: 'gally-album-1',
        title: 'Gally Garvey',
        year: 2018,
        coverUrl: '/mosaique/photoartiste/gally garvey.png',
        tracksCount: 13,
      },
    ],
    topTracks: [
      { id: 'gally-track-1', title: 'Gally Garvey', duration: '4:30' },
      { id: 'gally-track-2', title: 'Afrobeat', duration: '3:55' },
      { id: 'gally-track-3', title: 'Rumba', duration: '4:15' },
    ],
  },
  'artist-15': {
    id: 'artist-15',
    name: 'Cindy Le Coeur',
    image: '/mosaique/photoartiste/cindy le coeur rumba.png',
    location: 'Kinshasa',
    specialty: 'Rumba, Soukous',
    biography:
      'Artiste féminine de rumba, Cindy Le Coeur apporte une touche féminine et moderne à la tradition musicale congolaise.',
    yearsActive: '2012 – présent',
    label: 'Cindy Music',
    socials: {
      instagram: 'https://instagram.com/cindylecoeur',
      youtube: 'https://youtube.com',
      facebook: 'https://facebook.com/cindylecoeur',
    },
    stats: {
      followers: 500000,
      monthlyListeners: 350000,
      awards: 3,
    },
    albums: [
      {
        id: 'cindy-album-1',
        title: 'Cindy Le Coeur',
        year: 2016,
        coverUrl: '/mosaique/photoartiste/cindy le coeur rumba.png',
        tracksCount: 11,
      },
    ],
    topTracks: [
      { id: 'cindy-track-1', title: 'Cindy Le Coeur', duration: '4:20' },
      { id: 'cindy-track-2', title: 'Rumba', duration: '3:45' },
      { id: 'cindy-track-3', title: 'Amour', duration: '4:10' },
    ],
  },
  'artist-16': {
    id: 'artist-16',
    name: 'Cool Matope',
    image: '/mosaique/photoartiste/cool Matope.png',
    location: 'Kinshasa',
    specialty: 'Rumba, Soukous',
    biography:
      'Artiste de rumba traditionnelle, Cool Matope est apprécié pour sa voix mélodieuse et ses compositions authentiques.',
    yearsActive: '2008 – présent',
    label: 'Cool Music',
    socials: {
      instagram: 'https://instagram.com/coolmatope',
      youtube: 'https://youtube.com',
      facebook: 'https://facebook.com/coolmatope',
    },
    stats: {
      followers: 400000,
      monthlyListeners: 280000,
      awards: 2,
    },
    albums: [
      {
        id: 'cool-album-1',
        title: 'Cool Matope',
        year: 2014,
        coverUrl: '/mosaique/photoartiste/cool Matope.png',
        tracksCount: 12,
      },
    ],
    topTracks: [
      { id: 'cool-track-1', title: 'Cool Matope', duration: '4:35' },
      { id: 'cool-track-2', title: 'Soukous', duration: '3:50' },
      { id: 'cool-track-3', title: 'Rumba', duration: '4:25' },
    ],
  },
  'artist-17': {
    id: 'artist-17',
    name: 'Jean Sylvain Akwala',
    image: '/mosaique/photoartiste/Jean sylvain akwala gospel.png',
    location: 'Kinshasa',
    specialty: 'Gospel, Musique Chrétienne',
    biography:
      'Artiste gospel de renom, Jean Sylvain Akwala inspire des milliers de fidèles avec sa musique spirituelle et ses messages d\'espoir.',
    yearsActive: '2005 – présent',
    label: 'Gospel Records',
    socials: {
      instagram: 'https://instagram.com/jeansylvain',
      youtube: 'https://youtube.com',
      facebook: 'https://facebook.com/jeansylvain',
    },
    stats: {
      followers: 800000,
      monthlyListeners: 600000,
      awards: 6,
    },
    albums: [
      {
        id: 'jean-album-1',
        title: 'Louange et Adoration',
        year: 2018,
        coverUrl: '/mosaique/photoartiste/Jean sylvain akwala gospel.png',
        tracksCount: 14,
      },
    ],
    topTracks: [
      { id: 'jean-track-1', title: 'Louange et Adoration', duration: '5:30' },
      { id: 'jean-track-2', title: 'Gloire à Dieu', duration: '4:45' },
      { id: 'jean-track-3', title: 'Merci Seigneur', duration: '6:15' },
    ],
  },
  'artist-18': {
    id: 'artist-18',
    name: 'Gaz Fabilous',
    image: '/mosaique/photoartiste/Gaz Fabilous rappeur congolais.png',
    location: 'Kinshasa',
    specialty: 'Rap, Hip-Hop',
    biography:
      'Rappeur congolais talentueux, Gaz Fabilous est connu pour ses textes percutants et son style unique dans la scène rap congolaise.',
    yearsActive: '2016 – présent',
    label: 'Gaz Records',
    socials: {
      instagram: 'https://instagram.com/gazfabilous',
      youtube: 'https://youtube.com',
      twitter: 'https://twitter.com/gazfabilous',
    },
    stats: {
      followers: 600000,
      monthlyListeners: 400000,
      awards: 4,
    },
    albums: [
      {
        id: 'gazf-album-1',
        title: 'Gaz Fabilous',
        year: 2020,
        coverUrl: '/mosaique/photoartiste/Gaz Fabilous rappeur congolais.png',
        tracksCount: 15,
      },
    ],
    topTracks: [
      { id: 'gazf-track-1', title: 'Gaz Fabilous', duration: '3:45' },
      { id: 'gazf-track-2', title: 'Rap Congo', duration: '4:12' },
      { id: 'gazf-track-3', title: 'Kinshasa', duration: '3:58' },
    ],
  },
  'artist-19': {
    id: 'artist-19',
    name: 'Mbilia Bel',
    image: '/mosaique/photoartiste/Mbilia bel.png',
    location: 'Kinshasa',
    specialty: 'Rumba, Soukous',
    biography:
      'Légende féminine de la rumba congolaise, Mbilia Bel est une artiste culte qui a marqué l\'histoire de la musique congolaise.',
    yearsActive: '1980 – présent',
    label: 'Afrisa International',
    socials: {
      instagram: 'https://instagram.com/mbiliabel',
      youtube: 'https://youtube.com',
      facebook: 'https://facebook.com/mbiliabel',
    },
    stats: {
      followers: 1200000,
      monthlyListeners: 800000,
      awards: 12,
    },
    albums: [
      {
        id: 'mbilia-album-1',
        title: 'Boya Ye',
        year: 1983,
        coverUrl: '/mosaique/photoartiste/Mbilia bel.png',
        tracksCount: 10,
      },
    ],
    topTracks: [
      { id: 'mbilia-track-1', title: 'Boya Ye', duration: '6:20' },
      { id: 'mbilia-track-2', title: 'Nakei Nairobi', duration: '5:45' },
      { id: 'mbilia-track-3', title: 'Eswi Yo Wapi', duration: '7:10' },
    ],
  },
  'artist-20': {
    id: 'artist-20',
    name: 'Cindy',
    image: '/mosaique/photoartiste/cindy.png',
    location: 'Kinshasa',
    specialty: 'Rumba, Soukous',
    biography:
      'Artiste féminine de rumba, Cindy apporte une touche moderne et féminine à la tradition musicale congolaise.',
    yearsActive: '2010 – présent',
    label: 'Cindy Music',
    socials: {
      instagram: 'https://instagram.com/cindy',
      youtube: 'https://youtube.com',
      facebook: 'https://facebook.com/cindy',
    },
    stats: {
      followers: 450000,
      monthlyListeners: 300000,
      awards: 3,
    },
    albums: [
      {
        id: 'cindy2-album-1',
        title: 'Cindy',
        year: 2015,
        coverUrl: '/mosaique/photoartiste/cindy.png',
        tracksCount: 12,
      },
    ],
    topTracks: [
      { id: 'cindy2-track-1', title: 'Cindy', duration: '4:15' },
      { id: 'cindy2-track-2', title: 'Rumba', duration: '3:50' },
      { id: 'cindy2-track-3', title: 'Amour', duration: '4:05' },
    ],
  },
  'artist-21': {
    id: 'artist-21',
    name: 'Matou Samuel',
    image: '/mosaique/photoartiste/Matou samuel gospel.png',
    location: 'Kinshasa',
    specialty: 'Gospel, Musique Chrétienne',
    biography:
      'Artiste gospel dévoué, Matou Samuel inspire avec sa musique spirituelle et ses messages d\'espoir pour la jeunesse congolaise.',
    yearsActive: '2012 – présent',
    label: 'Gospel Records',
    socials: {
      instagram: 'https://instagram.com/matousamuel',
      youtube: 'https://youtube.com',
      facebook: 'https://facebook.com/matousamuel',
    },
    stats: {
      followers: 700000,
      monthlyListeners: 500000,
      awards: 5,
    },
    albums: [
      {
        id: 'matou-album-1',
        title: 'Louange et Adoration',
        year: 2019,
        coverUrl: '/mosaique/photoartiste/Matou samuel gospel.png',
        tracksCount: 13,
      },
    ],
    topTracks: [
      { id: 'matou-track-1', title: 'Louange et Adoration', duration: '5:45' },
      { id: 'matou-track-2', title: 'Gloire à Dieu', duration: '4:30' },
      { id: 'matou-track-3', title: 'Merci Seigneur', duration: '6:20' },
    ],
  },
  'artist-22': {
    id: 'artist-22',
    name: 'Nadège Bumba',
    image: '/mosaique/photoartiste/Nadege bumba gospel.png',
    location: 'Kinshasa',
    specialty: 'Gospel, Musique Chrétienne',
    biography:
      'Artiste gospel féminine, Nadège Bumba apporte une voix douce et inspirante à la musique chrétienne congolaise.',
    yearsActive: '2015 – présent',
    label: 'Gospel Records',
    socials: {
      instagram: 'https://instagram.com/nadegebumba',
      youtube: 'https://youtube.com',
      facebook: 'https://facebook.com/nadegebumba',
    },
    stats: {
      followers: 550000,
      monthlyListeners: 380000,
      awards: 4,
    },
    albums: [
      {
        id: 'nadege-album-1',
        title: 'Louange et Adoration',
        year: 2020,
        coverUrl: '/mosaique/photoartiste/Nadege bumba gospel.png',
        tracksCount: 11,
      },
    ],
    topTracks: [
      { id: 'nadege-track-1', title: 'Louange et Adoration', duration: '5:15' },
      { id: 'nadege-track-2', title: 'Gloire à Dieu', duration: '4:20' },
      { id: 'nadege-track-3', title: 'Merci Seigneur', duration: '5:55' },
    ],
  },
  'artist-23': {
    id: 'artist-23',
    name: 'Athoms Bumba',
    image: '/mosaique/photoartiste/Athoms bumba gospel.png',
    location: 'Kinshasa',
    specialty: 'Gospel, Musique Chrétienne',
    biography:
      'Artiste gospel masculin, Athoms Bumba inspire avec sa musique spirituelle et ses messages d\'espoir.',
    yearsActive: '2013 – présent',
    label: 'Gospel Records',
    socials: {
      instagram: 'https://instagram.com/athomsbumba',
      youtube: 'https://youtube.com',
      facebook: 'https://facebook.com/athomsbumba',
    },
    stats: {
      followers: 480000,
      monthlyListeners: 320000,
      awards: 3,
    },
    albums: [
      {
        id: 'athoms-album-1',
        title: 'Louange et Adoration',
        year: 2018,
        coverUrl: '/mosaique/photoartiste/Athoms bumba gospel.png',
        tracksCount: 12,
      },
    ],
    topTracks: [
      { id: 'athoms-track-1', title: 'Louange et Adoration', duration: '5:30' },
      { id: 'athoms-track-2', title: 'Gloire à Dieu', duration: '4:15' },
      { id: 'athoms-track-3', title: 'Merci Seigneur', duration: '6:05' },
    ],
  },
  'artist-24': {
    id: 'artist-24',
    name: 'Lifoko du Ciel',
    image: '/mosaique/photoartiste/Lifoko du ciel gospel.png',
    location: 'Kinshasa',
    specialty: 'Gospel, Musique Chrétienne',
    biography:
      'Artiste gospel inspirant, Lifoko du Ciel apporte une dimension spirituelle unique à la musique chrétienne congolaise.',
    yearsActive: '2011 – présent',
    label: 'Gospel Records',
    socials: {
      instagram: 'https://instagram.com/lifokoduciel',
      youtube: 'https://youtube.com',
      facebook: 'https://facebook.com/lifokoduciel',
    },
    stats: {
      followers: 620000,
      monthlyListeners: 420000,
      awards: 5,
    },
    albums: [
      {
        id: 'lifoko-album-1',
        title: 'Louange et Adoration',
        year: 2017,
        coverUrl: '/mosaique/photoartiste/Lifoko du ciel gospel.png',
        tracksCount: 14,
      },
    ],
    topTracks: [
      { id: 'lifoko-track-1', title: 'Louange et Adoration', duration: '5:40' },
      { id: 'lifoko-track-2', title: 'Gloire à Dieu', duration: '4:25' },
      { id: 'lifoko-track-3', title: 'Merci Seigneur', duration: '6:10' },
    ],
  },
  'artist-25': {
    id: 'artist-25',
    name: 'Dena Mwana',
    image: '/mosaique/photoartiste/Dena Mwana gospel.png',
    location: 'Kinshasa',
    specialty: 'Gospel, Musique Chrétienne',
    biography:
      'Artiste gospel féminine, Dena Mwana inspire avec sa voix mélodieuse et ses messages spirituels touchants.',
    yearsActive: '2014 – présent',
    label: 'Gospel Records',
    socials: {
      instagram: 'https://instagram.com/denamwana',
      youtube: 'https://youtube.com',
      facebook: 'https://facebook.com/denamwana',
    },
    stats: {
      followers: 520000,
      monthlyListeners: 350000,
      awards: 4,
    },
    albums: [
      {
        id: 'dena-album-1',
        title: 'Louange et Adoration',
        year: 2019,
        coverUrl: '/mosaique/photoartiste/Dena Mwana gospel.png',
        tracksCount: 13,
      },
    ],
    topTracks: [
      { id: 'dena-track-1', title: 'Louange et Adoration', duration: '5:20' },
      { id: 'dena-track-2', title: 'Gloire à Dieu', duration: '4:10' },
      { id: 'dena-track-3', title: 'Merci Seigneur', duration: '5:50' },
    ],
  },
  'artist-26': {
    id: 'artist-26',
    name: 'Lord Lombo',
    image: '/mosaique/photoartiste/lord lombo gospel congo.png',
    location: 'Kinshasa',
    specialty: 'Gospel, Musique Chrétienne',
    biography:
      'Artiste gospel de renom, Lord Lombo est connu pour sa musique spirituelle inspirante et ses messages d\'espoir.',
    yearsActive: '2008 – présent',
    label: 'Gospel Records',
    socials: {
      instagram: 'https://instagram.com/lordlombo',
      youtube: 'https://youtube.com',
      facebook: 'https://facebook.com/lordlombo',
    },
    stats: {
      followers: 750000,
      monthlyListeners: 550000,
      awards: 7,
    },
    albums: [
      {
        id: 'lord-album-1',
        title: 'Louange et Adoration',
        year: 2016,
        coverUrl: '/mosaique/photoartiste/lord lombo gospel congo.png',
        tracksCount: 15,
      },
    ],
    topTracks: [
      { id: 'lord-track-1', title: 'Louange et Adoration', duration: '5:35' },
      { id: 'lord-track-2', title: 'Gloire à Dieu', duration: '4:30' },
      { id: 'lord-track-3', title: 'Merci Seigneur', duration: '6:15' },
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


