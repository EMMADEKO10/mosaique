// Données fictives d'actualités pour La Grande Mosaïque

export interface Article {
  id: string
  title: string
  excerpt: string
  content: string
  image: string
  category: string
  author: string
  publishedAt: string
  readTime: number
  tags: string[]
  featured: boolean
}

export const actualitesData: Record<string, Article[]> = {
  tous: [], // Sera rempli automatiquement avec tous les articles

  cinema: [
    {
      id: "cinema-1",
      title: "Sortie du film 'Kinshasa Dreams' : Un chef-d'œuvre du cinéma congolais",
      excerpt: "Le nouveau film de Balufu Bakupa-Kanyinda explore les rêves et réalités de la jeunesse kinoise.",
      content: "Le réalisateur congolais Balufu Bakupa-Kanyinda présente son dernier opus 'Kinshasa Dreams', une œuvre poignante qui suit trois jeunes de Kinshasa poursuivant leurs rêves dans une métropole en constante évolution...",
      image: "https://images.unsplash.com/photo-1489370603040-dc6c28a1d37a?w=800&h=400&fit=crop",
      category: "cinema",
      author: "Marie Kalala",
      publishedAt: "2024-01-15",
      readTime: 5,
      tags: ["film", "kinshasa", "jeunesse", "réalisateur"],
      featured: true
    },
    {
      id: "cinema-2", 
      title: "Festival du Film Européen à Kinshasa : 50 films en compétition",
      excerpt: "La 9ème édition du Festival du Film Européen ouvre ses portes avec une programmation exceptionnelle.",
      content: "Du 20 au 27 mars 2024, Kinshasa accueillera la 9ème édition du Festival du Film Européen. Cette année, 50 films de 15 pays européens seront projetés dans différents lieux emblématiques de la capitale...",
      image: "https://images.unsplash.com/photo-1489370603040-dc6c28a1d37a?w=800&h=400&fit=crop&sat=-30",
      category: "cinema",
      author: "Jean-Claude Mukendi",
      publishedAt: "2024-01-12",
      readTime: 4,
      tags: ["festival", "europe", "kinshasa", "programmation"],
      featured: false
    },
    {
      id: "cinema-3",
      title: "Partenariat Strongkin Moov : Soutien aux jeunes cinéastes congolais",
      excerpt: "Une initiative pour financer et promouvoir la nouvelle génération de réalisateurs du Congo.",
      content: "Le partenariat entre Strongkin et Moov Africa lance un programme de soutien aux jeunes talents du cinéma congolais. 20 projets seront sélectionnés pour bénéficier d'un financement...",
      image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&h=400&fit=crop",
      category: "cinema", 
      author: "Patrick Ilunga",
      publishedAt: "2024-01-10",
      readTime: 3,
      tags: ["partenariat", "financement", "jeunes", "talents"],
      featured: false
    },
    {
      id: "cinema-4",
      title: "Tournage du documentaire 'Mémoires du Fleuve Congo'",
      excerpt: "Un documentaire ambitieux sur l'histoire et la culture des peuples du fleuve Congo.",
      content: "L'équipe de production internationale débute le tournage d'un documentaire historique retraçant 500 ans d'histoire le long du fleuve Congo, des sources aux embouchures...",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
      category: "cinema",
      author: "Sarah Mbuyi",
      publishedAt: "2024-01-08",
      readTime: 6,
      tags: ["documentaire", "fleuve", "histoire", "culture"],
      featured: false
    },
    {
      id: "cinema-5",
      title: "Céline Banza présente son projet de film 'Yolande'",
      excerpt: "Portrait d'une femme congolaise extraordinaire dans le Kinshasa des années 80.",
      content: "La réalisatrice Céline Banza dévoile son nouveau projet cinématographique 'Yolande', un biopic retraçant la vie d'une figure féminine emblématique de Kinshasa...",
      image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=400&fit=crop",
      category: "cinema",
      author: "Emmanuel Tshisekedi Jr.",
      publishedAt: "2024-01-05",
      readTime: 4,
      tags: ["biopic", "femme", "années 80", "portrait"],
      featured: false
    }
  ],

  clash: [
    {
      id: "clash-1",
      title: "Polémique autour du dernier concert de Fally Ipupa",
      excerpt: "Le concert géant de Fally Ipupa fait débat suite aux incidents survenus lors de l'événement.",
      content: "Le concert de Fally Ipupa au Stade des Martyrs a attiré plus de 80 000 spectateurs, mais plusieurs incidents ont marqué la soirée, soulevant des questions sur l'organisation...",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop",
      category: "clash",
      author: "Rodrigue Mayenga",
      publishedAt: "2024-01-14",
      readTime: 5,
      tags: ["fally ipupa", "concert", "stade", "incidents"],
      featured: true
    },
    {
      id: "clash-2",
      title: "Débat houleux sur les droits d'auteur dans la musique congolaise",
      excerpt: "Les artistes congolais se divisent sur la question des droits d'auteur et des plateformes de streaming.",
      content: "Un débat passionné oppose les artistes établis aux nouveaux talents sur la répartition des revenus du streaming musical et la protection des œuvres...",
      image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=400&fit=crop",
      category: "clash",
      author: "Grace Mbendi",
      publishedAt: "2024-01-11",
      readTime: 7,
      tags: ["droits auteur", "streaming", "revenus", "débat"],
      featured: false
    },
    {
      id: "clash-3",
      title: "Controverse sur la sélection des artistes pour la Fête de l'Indépendance",
      excerpt: "Le choix des artistes pour célébrer le 30 juin divise l'opinion publique.",
      content: "La liste des artistes sélectionnés pour animer la célébration du 30 juin fait polémique. Certains dénoncent un manque de représentativité...",
      image: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?w=800&h=400&fit=crop",
      category: "clash",
      author: "Michel Boyoma",
      publishedAt: "2024-01-09",
      readTime: 4,
      tags: ["indépendance", "sélection", "polémique", "représentativité"],
      featured: false
    },
    {
      id: "clash-4",
      title: "Dispute entre promoteurs de concerts à Kinshasa",
      excerpt: "Une guerre commerciale éclate entre les principales maisons de production musicale.",
      content: "Les tensions s'intensifient entre les grands promoteurs de concerts kinois, chacun accusant l'autre de pratiques déloyales...",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=400&fit=crop",
      category: "clash",
      author: "Alain Mukuna",
      publishedAt: "2024-01-07",
      readTime: 6,
      tags: ["promoteurs", "concurrence", "guerre", "business"],
      featured: false
    },
    {
      id: "clash-5",
      title: "Accusations de plagiat dans le milieu de la rumba congolaise",
      excerpt: "Plusieurs artistes s'accusent mutuellement de vol de mélodies et de textes.",
      content: "Le monde de la rumba congolaise est secoué par une série d'accusations croisées de plagiat entre plusieurs figures emblématiques...",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop&hue=45",
      category: "clash",
      author: "Josephine Kikaya",
      publishedAt: "2024-01-04",
      readTime: 5,
      tags: ["plagiat", "rumba", "accusations", "mélodies"],
      featured: false
    }
  ],

  comedie: [
    {
      id: "comedie-1",
      title: "Papa Wemba Comedy Show cartonne à Lubumbashi",
      excerpt: "Le spectacle d'humour en hommage à Papa Wemba fait un carton plein dans la capitale du cuivre.",
      content: "Le spectacle humoristique rendant hommage à la légende Papa Wemba a conquis le public lubumbashois avec plus de 5000 spectateurs venus rire et se souvenir...",
      image: "https://images.unsplash.com/photo-1576085898323-218337e3e43c?w=800&h=400&fit=crop",
      category: "comedie",
      author: "Serge Kabeya",
      publishedAt: "2024-01-13",
      readTime: 4,
      tags: ["papa wemba", "hommage", "lubumbashi", "spectacle"],
      featured: true
    },
    {
      id: "comedie-2",
      title: "Festival d'Humour de Kinshasa : 20 humoristes en lice",
      excerpt: "La première édition du Festival d'Humour de Kinshasa promet des soirées mémorables.",
      content: "Du 15 au 22 février, Kinshasa accueillera son premier festival dédié à l'humour avec 20 humoristes locaux et internationaux...",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop",
      category: "comedie",
      author: "Christelle Mwamba",
      publishedAt: "2024-01-10",
      readTime: 3,
      tags: ["festival", "humour", "humoristes", "international"],
      featured: false
    },
    {
      id: "comedie-3",
      title: "L'humoriste Ebakata lance son spectacle 'Kinshasa la Blague'",
      excerpt: "Un spectacle qui tourne en dérision les petits travers de la vie kinoise avec finesse.",
      content: "Ebakata, figure montante de l'humour congolais, présente son nouveau one-man-show qui croque avec tendresse les habitudes des Kinois...",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
      category: "comedie",
      author: "Didier Lusamba",
      publishedAt: "2024-01-08",
      readTime: 5,
      tags: ["ebakata", "one-man-show", "kinois", "habitudes"],
      featured: false
    },
    {
      id: "comedie-4",
      title: "Comedy Club du Centre-Ville : nouveau rendez-vous hebdomadaire",
      excerpt: "Tous les vendredis soir, le Comedy Club ouvre ses portes aux talents émergents.",
      content: "Le nouveau Comedy Club du centre-ville de Kinshasa devient rapidement le point de rendez-vous des amateurs d'humour avec sa scène ouverte...",
      image: "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?w=800&h=400&fit=crop",
      category: "comedie",
      author: "Pascaline Kazadi",
      publishedAt: "2024-01-06",
      readTime: 3,
      tags: ["comedy club", "scène ouverte", "talents", "rendez-vous"],
      featured: false
    },
    {
      id: "comedie-5",
      title: "L'humour féminin congolais à l'honneur avec Mama Koko",
      excerpt: "Mama Koko, pionnière de l'humour féminin au Congo, prépare une tournée nationale.",
      content: "Première femme humoriste reconnue du Congo, Mama Koko annonce une tournée dans 10 villes pour promouvoir l'humour au féminin...",
      image: "https://images.unsplash.com/photo-1515041219749-89347f83291a?w=800&h=400&fit=crop",
      category: "comedie",
      author: "Julie Mpiana",
      publishedAt: "2024-01-03",
      readTime: 4,
      tags: ["mama koko", "humour féminin", "tournée", "pionnière"],
      featured: false
    }
  ],

  decouverte: [
    {
      id: "decouverte-1",
      title: "Jeune prodige de 16 ans révélé au Conservatoire de Kinshasa",
      excerpt: "Samuel Kibamba, 16 ans, impressionne par sa maîtrise exceptionnelle du piano et de la composition.",
      content: "Le Conservatoire de Kinshasa a découvert un talent exceptionnel en la personne de Samuel Kibamba, jeune pianiste compositeur de 16 ans seulement...",
      image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&h=400&fit=crop",
      category: "decouverte",
      author: "Professor Ngoma",
      publishedAt: "2024-01-12",
      readTime: 6,
      tags: ["prodige", "piano", "conservatoire", "composition"],
      featured: true
    },
    {
      id: "decouverte-2",
      title: "Découverte d'un manuscrit musical inédit de Franco Luambo",
      excerpt: "Un manuscrit oublié du maître Franco refait surface après 30 ans.",
      content: "Un manuscrit musical inédit de Franco Luambo Makiadi a été découvert dans les archives de l'OK Jazz, révélant de nouvelles compositions...",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop&sepia=50",
      category: "decouverte",
      author: "Archiviste Matondo",
      publishedAt: "2024-01-09",
      readTime: 5,
      tags: ["franco", "manuscrit", "ok jazz", "archives"],
      featured: false
    },
    {
      id: "decouverte-3",
      title: "Nouvelle école de danse traditionnelle ouvre à Mbandaka",
      excerpt: "L'école vise à préserver et transmettre les danses ancestrales du Congo.",
      content: "Une nouvelle école dédiée aux danses traditionnelles congolaises ouvre ses portes à Mbandaka avec l'ambition de préserver ce patrimoine...",
      image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=400&fit=crop",
      category: "decouverte",
      author: "Mama Nzuzi",
      publishedAt: "2024-01-07",
      readTime: 4,
      tags: ["danse", "traditionnelle", "mbandaka", "patrimoine"],
      featured: false
    },
    {
      id: "decouverte-4",
      title: "Artiste sculpteur autodidacte fait sensation à Bukavu",
      excerpt: "Jean-Baptiste Mulumba transforme le bois en œuvres d'art exceptionnelles.",
      content: "Jean-Baptiste Mulumba, sculpteur autodidacte de Bukavu, attire l'attention internationale avec ses sculptures monumentales en bois...",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop",
      category: "decouverte",
      author: "Critique Kasonga",
      publishedAt: "2024-01-05",
      readTime: 5,
      tags: ["sculpture", "autodidacte", "bukavu", "bois"],
      featured: false
    },
    {
      id: "decouverte-5",
      title: "Redécouverte des chants mystiques des Pygmées Baka",
      excerpt: "Une expédition musicologique révèle des trésors musicaux cachés en forêt.",
      content: "Une équipe de musicologues a enregistré des chants sacrés des Pygmées Baka, révélant une richesse musicale insoupçonnée...",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop",
      category: "decouverte",
      author: "Dr. Ethnomusicologue",
      publishedAt: "2024-01-02",
      readTime: 7,
      tags: ["pygmées", "chants", "forêt", "musicologie"],
      featured: false
    }
  ],

  education: [
    {
      id: "education-1",
      title: "Nouvelle école d'arts ouvre ses portes à Kinshasa",
      excerpt: "L'École Supérieure des Arts de Kinshasa accueille sa première promotion d'étudiants.",
      content: "La nouvelle École Supérieure des Arts de Kinshasa (ESAK) a officiellement ouvert ses portes avec 200 étudiants inscrits dans diverses disciplines artistiques...",
      image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=400&fit=crop",
      category: "education",
      author: "Directeur Académique",
      publishedAt: "2024-01-11",
      readTime: 4,
      tags: ["école", "arts", "étudiants", "formation"],
      featured: true
    },
    {
      id: "education-2",
      title: "Programme d'échange culturel avec la France lancé",
      excerpt: "20 étudiants congolais pourront étudier dans les conservatoires français.",
      content: "Le programme d'échange culturel Congo-France permet à 20 jeunes talents de poursuivre leur formation dans les prestigieux conservatoires français...",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=400&fit=crop",
      category: "education",
      author: "Attaché Culturel",
      publishedAt: "2024-01-08",
      readTime: 5,
      tags: ["échange", "france", "conservatoires", "bourse"],
      featured: false
    },
    {
      id: "education-3",
      title: "Masterclass de Lokua Kanza pour les jeunes musiciens",
      excerpt: "Le maître Lokua Kanza transmet son savoir aux nouvelles générations.",
      content: "Lokua Kanza anime une série de masterclass au Conservatoire de Kinshasa, partageant ses techniques vocales et ses secrets de composition...",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop&brightness=1.1",
      category: "education",
      author: "Coordonnateur Musical",
      publishedAt: "2024-01-06",
      readTime: 3,
      tags: ["lokua kanza", "masterclass", "vocal", "composition"],
      featured: false
    },
    {
      id: "education-4",
      title: "Bibliothèque numérique de la musique congolaise inaugurée",
      excerpt: "Plus de 10 000 œuvres musicales congolaises numérisées et accessibles en ligne.",
      content: "La première bibliothèque numérique dédiée à la musique congolaise est inaugurée, offrant un accès libre à un patrimoine musical exceptionnel...",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop&sat=30",
      category: "education",
      author: "Bibliothécaire Digital",
      publishedAt: "2024-01-04",
      readTime: 4,
      tags: ["bibliothèque", "numérique", "patrimoine", "accès"],
      featured: false
    },
    {
      id: "education-5",
      title: "Formation gratuite en production musicale pour 100 jeunes",
      excerpt: "Un programme intensif de 6 mois pour former la nouvelle génération de producteurs.",
      content: "Le programme 'Producteurs de Demain' offre une formation complète et gratuite en production musicale à 100 jeunes sélectionnés...",
      image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&h=400&fit=crop",
      category: "education",
      author: "Responsable Formation",
      publishedAt: "2024-01-01",
      readTime: 5,
      tags: ["formation", "production", "gratuit", "jeunes"],
      featured: false
    }
  ],

  enquete: [
    {
      id: "enquete-1",
      title: "Dans les coulisses des maisons de disques congolaises",
      excerpt: "Investigation sur les pratiques commerciales et les contrats d'artistes au Congo.",
      content: "Notre enquête exclusive révèle les dessous de l'industrie musicale congolaise, des négociations de contrats aux stratégies de promotion...",
      image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=400&fit=crop&contrast=20",
      category: "enquete",
      author: "Journaliste Investigateur",
      publishedAt: "2024-01-10",
      readTime: 8,
      tags: ["maisons disques", "contrats", "industrie", "investigation"],
      featured: true
    },
    {
      id: "enquete-2",
      title: "Le business caché des concerts à Kinshasa",
      excerpt: "Enquête sur les circuits financiers et les intermédiaires de l'événementiel musical.",
      content: "Une investigation approfondie sur l'économie des concerts à Kinshasa révèle un réseau complexe d'intermédiaires et de pratiques opaques...",
      image: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?w=800&h=400&fit=crop&brightness=0.8",
      category: "enquete",
      author: "Équipe Investigation",
      publishedAt: "2024-01-07",
      readTime: 9,
      tags: ["concerts", "business", "événementiel", "circuits"],
      featured: false
    },
    {
      id: "enquete-3",
      title: "Piratage musical : l'autre face de l'industrie congolaise",
      excerpt: "Comment le piratage impacte les revenus des artistes et producteurs locaux.",
      content: "Notre enquête sur le piratage musical au Congo révèle l'ampleur du phénomène et son impact sur l'économie de la musique...",
      image: "https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=800&h=400&fit=crop",
      category: "enquete",
      author: "Analyste Économique",
      publishedAt: "2024-01-05",
      readTime: 7,
      tags: ["piratage", "revenus", "impact", "économie"],
      featured: false
    },
    {
      id: "enquete-4",
      title: "Les réseaux d'influence dans la musique congolaise",
      excerpt: "Investigation sur les liens entre politique, business et célébrité musicale.",
      content: "Une enquête révélatrice sur les interconnexions entre le monde politique, économique et musical au Congo...",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=400&fit=crop&sat=-20",
      category: "enquete",
      author: "Reporter Senior",
      publishedAt: "2024-01-03",
      readTime: 10,
      tags: ["réseaux", "influence", "politique", "célébrité"],
      featured: false
    },
    {
      id: "enquete-5",
      title: "Patrimoine musical en péril : l'urgence de la sauvegarde",
      excerpt: "Enquête sur la disparition progressive des archives musicales congolaises.",
      content: "Une investigation alarmante sur l'état de conservation du patrimoine musical congolais et les initiatives de sauvegarde...",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop&vintage=30",
      category: "enquete",
      author: "Patrimoine Reporter",
      publishedAt: "2024-01-01",
      readTime: 6,
      tags: ["patrimoine", "archives", "sauvegarde", "urgence"],
      featured: false
    }
  ],

  evenements: [
    {
      id: "evenements-1",
      title: "Festival Amani prévu pour mars 2024",
      excerpt: "Le Festival Amani revient avec une programmation exceptionnelle réunissant 50 artistes.",
      content: "La 15ème édition du Festival Amani se déroulera du 15 au 17 mars 2024 dans la ville de Goma avec une programmation mêlant stars internationales et talents locaux...",
      image: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?w=800&h=400&fit=crop&hue=120",
      category: "evenements",
      author: "Directeur Festival",
      publishedAt: "2024-01-13",
      readTime: 5,
      tags: ["festival", "amani", "goma", "programmation"],
      featured: true
    },
    {
      id: "evenements-2",
      title: "Kinshasa Fashion Week 2024 : La mode congolaise à l'honneur",
      excerpt: "La semaine de la mode kinoise présente les créateurs émergents et établis.",
      content: "Du 25 au 30 avril 2024, Kinshasa accueillera sa Fashion Week avec 30 créateurs congolais et 10 invités internationaux...",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=400&fit=crop",
      category: "evenements",
      author: "Rédactrice Mode",
      publishedAt: "2024-01-11",
      readTime: 4,
      tags: ["fashion week", "mode", "créateurs", "kinshasa"],
      featured: false
    },
    {
      id: "evenements-3",
      title: "Nuit de la Rumba au Palais du Peuple",
      excerpt: "Une soirée exceptionnelle célébrant le patrimoine musical congolais.",
      content: "Le Palais du Peuple accueillera une soirée mémorable dédiée à la rumba congolaise avec les plus grands noms du genre...",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop&hue=60",
      category: "evenements",
      author: "Organisateur Cultural",
      publishedAt: "2024-01-09",
      readTime: 3,
      tags: ["rumba", "palais peuple", "patrimoine", "soirée"],
      featured: false
    },
    {
      id: "evenements-4",
      title: "Salon du Livre de Kinshasa accueille 200 auteurs",
      excerpt: "Le plus grand salon littéraire d'Afrique centrale ouvre ses portes.",
      content: "La 8ème édition du Salon du Livre de Kinshasa réunit 200 auteurs de toute l'Afrique centrale pour célébrer la littérature...",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=400&fit=crop",
      category: "evenements",
      author: "Coordinateur Salon",
      publishedAt: "2024-01-07",
      readTime: 4,
      tags: ["salon", "livre", "auteurs", "littérature"],
      featured: false
    },
    {
      id: "evenements-5",
      title: "Concert de charité pour l'éducation des enfants",
      excerpt: "Les stars congolaises s'unissent pour soutenir l'éducation des enfants défavorisés.",
      content: "Un concert exceptionnel réunit Fally Ipupa, Innoss'B et Gaz Mawete pour lever des fonds destinés à l'éducation...",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=400&fit=crop&hue=200",
      category: "evenements",
      author: "Organisateur Humanitaire",
      publishedAt: "2024-01-05",
      readTime: 5,
      tags: ["charité", "éducation", "concert", "stars"],
      featured: false
    }
  ],

  recompense: [
    {
      id: "recompense-1",
      title: "Prix de la meilleure chanson 2024 décerné à Innoss'B",
      excerpt: "Innoss'B remporte le prestigieux Prix de la Chanson Congolaise avec 'Yope Remix'.",
      content: "Lors de la cérémonie des Prix de la Musique Congolaise, Innoss'B a été couronné meilleur artiste avec sa chanson 'Yope Remix'...",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=400&fit=crop&hue=50",
      category: "recompense",
      author: "Journaliste Awards",
      publishedAt: "2024-01-12",
      readTime: 4,
      tags: ["innoss'b", "prix", "yope remix", "cérémonie"],
      featured: true
    },
    {
      id: "recompense-2",
      title: "Gaz Mawete honoré à l'African Music Awards",
      excerpt: "Le chanteur congolais reçoit le prix du Meilleur Artiste Afrique Centrale.",
      content: "Gaz Mawete a été distingué lors des African Music Awards à Lagos, confirmant son statut d'ambassadeur de la musique congolaise...",
      image: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?w=800&h=400&fit=crop&hue=300",
      category: "recompense",
      author: "Correspondant Lagos",
      publishedAt: "2024-01-10",
      readTime: 3,
      tags: ["gaz mawete", "african awards", "lagos", "distinction"],
      featured: false
    },
    {
      id: "recompense-3",
      title: "Trophée du Patrimoine Musical pour Papa Wemba posthume",
      excerpt: "Une reconnaissance spéciale pour l'œuvre immortelle du Roi de la Rumba.",
      content: "Un trophée spécial honore la mémoire et l'héritage musical exceptionnel de Papa Wemba, légende de la musique congolaise...",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop&sepia=70",
      category: "recompense",
      author: "Critique Musical",
      publishedAt: "2024-01-08",
      readTime: 5,
      tags: ["papa wemba", "patrimoine", "posthume", "héritage"],
      featured: false
    },
    {
      id: "recompense-4",
      title: "Prix de l'Innovation Musicale pour le producteur Kin-G",
      excerpt: "Kin-G récompensé pour son travail pionnier dans la fusion musicale congolaise.",
      content: "Le producteur Kin-G reçoit le Prix de l'Innovation pour son approche révolutionnaire mélangeant musique traditionnelle et moderne...",
      image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&h=400&fit=crop&hue=180",
      category: "recompense",
      author: "Expert Musical",
      publishedAt: "2024-01-06",
      readTime: 4,
      tags: ["kin-g", "innovation", "fusion", "producteur"],
      featured: false
    },
    {
      id: "recompense-5",
      title: "Médaille d'Excellence pour l'Orchestre Symphonique de Kinshasa",
      excerpt: "L'OSK distingué pour sa contribution exceptionnelle à la musique classique africaine.",
      content: "L'Orchestre Symphonique de Kinshasa reçoit la Médaille d'Excellence pour ses 25 années de promotion de la musique classique...",
      image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&h=400&fit=crop&hue=240",
      category: "recompense",
      author: "Critique Classique",
      publishedAt: "2024-01-04",
      readTime: 5,
      tags: ["orchestre", "médaille", "excellence", "classique"],
      featured: false
    }
  ],

  lifestyle: [
    {
      id: "lifestyle-1",
      title: "La mode congolaise brille à la Paris Fashion Week",
      excerpt: "Trois créateurs congolais présentent leurs collections lors de la semaine de la mode parisienne.",
      content: "Les créateurs Angie Mputu, Sakina M'Sa et Elie Kuame ont brillé à Paris, présentant des collections inspirées du patrimoine congolais...",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=400&fit=crop&hue=280",
      category: "lifestyle",
      author: "Correspondante Paris",
      publishedAt: "2024-01-11",
      readTime: 5,
      tags: ["mode", "paris", "créateurs", "patrimoine"],
      featured: true
    },
    {
      id: "lifestyle-2",
      title: "Tendance : Le wax congolais fait son comeback",
      excerpt: "Le tissu traditionnel congolais revient en force dans la mode urbaine.",
      content: "Le wax congolais connaît un renouveau spectaculaire, adopté par les jeunes créateurs et les influenceurs mode de Kinshasa...",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=400&fit=crop&sat=50",
      category: "lifestyle",
      author: "Styliste Urbain",
      publishedAt: "2024-01-09",
      readTime: 3,
      tags: ["wax", "traditionnel", "urbain", "tendance"],
      featured: false
    },
    {
      id: "lifestyle-3",
      title: "Les restaurants kinois revisitent la cuisine traditionnelle",
      excerpt: "Une nouvelle génération de chefs modernise les plats congolais classiques.",
      content: "Les jeunes chefs de Kinshasa proposent une approche contemporaine de la cuisine congolaise, alliant tradition et innovation...",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=400&fit=crop",
      category: "lifestyle",
      author: "Critique Gastronomique",
      publishedAt: "2024-01-07",
      readTime: 4,
      tags: ["cuisine", "chefs", "tradition", "innovation"],
      featured: false
    },
    {
      id: "lifestyle-4",
      title: "Kinshasa, nouvelle destination touristique culturelle",
      excerpt: "La capitale congolaise attire de plus en plus de touristes passionnés de culture.",
      content: "Kinshasa développe son attractivité touristique autour de sa richesse culturelle, attirant des visiteurs du monde entier...",
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=400&fit=crop",
      category: "lifestyle",
      author: "Guide Touristique",
      publishedAt: "2024-01-05",
      readTime: 6,
      tags: ["tourisme", "culture", "attractivité", "visiteurs"],
      featured: false
    },
    {
      id: "lifestyle-5",
      title: "L'art de vivre kinois inspire les influenceurs africains",
      excerpt: "Le style de vie unique de Kinshasa séduit une nouvelle génération d'influenceurs.",
      content: "L'art de vivre kinois, mélange unique de sophistication urbaine et de traditions ancestrales, inspire les réseaux sociaux...",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=400&fit=crop&sat=70",
      category: "lifestyle",
      author: "Social Media Expert",
      publishedAt: "2024-01-03",
      readTime: 4,
      tags: ["art de vivre", "influenceurs", "réseaux sociaux", "sophistication"],
      featured: false
    }
  ]
}

// Fonction pour obtenir tous les articles
export const getAllArticles = (): Article[] => {
  const allArticles: Article[] = []
  const seenIds = new Set<string>()

  Object.entries(actualitesData).forEach(([key, categoryArticles]) => {
    // Ignore the aggregated 'tous' bucket to avoid duplication
    if (key === 'tous') return
    if (Array.isArray(categoryArticles)) {
      categoryArticles.forEach(article => {
        if (!seenIds.has(article.id)) {
          seenIds.add(article.id)
          allArticles.push(article)
        }
      })
    }
  })

  return allArticles.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

// Fonction pour obtenir les articles par catégorie
export const getArticlesByCategory = (category: string): Article[] => {
  if (category === 'tous') {
    return getAllArticles()
  }
  return actualitesData[category] || []
}

// Fonction pour obtenir les articles à la une
export const getFeaturedArticles = (): Article[] => {
  return getAllArticles().filter(article => article.featured)
}

// Fonction pour obtenir un article par ID
export const getArticleById = (id: string): Article | undefined => {
  return getAllArticles().find(article => article.id === id)
}

// Remplir la catégorie "tous" avec tous les articles
actualitesData.tous = getAllArticles()
