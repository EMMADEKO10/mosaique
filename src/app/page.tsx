'use client'

import { useState, useEffect } from 'react'
import { 
  ChevronRight, 
  Play, 
  Trophy, 
  ArrowRight, 
  Crown,
  Zap
} from 'lucide-react'
import Header from '../components/layout/Header'
import Link from 'next/link'
import { getFeaturedArticles, getAllArticles, Article } from '../data/actualites'
import Image from 'next/image'

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0)
  const [isClient, setIsClient] = useState(false)
  // const [shuffleSeed, setShuffleSeed] = useState(Date.now()) // Pour forcer un nouveau mélange - Non utilisé pour l'instant
  const [globalSortOption, setGlobalSortOption] = useState<'recent' | 'featured' | 'popular' | 'random'>('recent')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  // Récupérer les articles pour le carrousel
  const featuredArticles = getFeaturedArticles().slice(0, 6) // Article central qui change
  const allArticles = getAllArticles()
  const orbitingArticles = allArticles.slice(0, 20) // Articles qui circulent un par un

  useEffect(() => {
    setIsVisible(true)
    setIsClient(true) // S'assurer que le rendu se fait côté client
  }, [])

  // Rotation automatique du carrousel
  useEffect(() => {
    if (!isClient || featuredArticles.length === 0) return // Ne pas démarrer avant que le client soit prêt
    
    console.log('🎠 Carrousel démarré avec', featuredArticles.length, 'articles')
    
    const interval = setInterval(() => {
      setCurrentArticleIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % featuredArticles.length
        console.log('📰 Article changé:', prevIndex, '→', nextIndex)
        return nextIndex
      })
    }, 3000) // Change toutes les 3 secondes pour plus de dynamisme

    return () => {
      console.log('🛑 Carrousel arrêté')
      clearInterval(interval)
    }
  }, [featuredArticles.length, isClient])

  // Fonction de mélange aléatoire
  const shuffleArray = (array: Article[]) => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  // Fonction de tri global de tous les articles
  const sortAllArticles = (articles: Article[], sortBy: 'recent' | 'featured' | 'popular' | 'random') => {
    let sortedArticles: Article[]
    
    switch (sortBy) {
      case 'recent':
        sortedArticles = [...articles].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
        break
      case 'featured':
        sortedArticles = [...articles].sort((a, b) => {
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        })
        break
      case 'popular':
        sortedArticles = [...articles].sort((a, b) => a.readTime - b.readTime) // Articles courts = plus populaires
        break
      case 'random':
        sortedArticles = shuffleArray(articles)
        break
      default:
        sortedArticles = articles
    }
    
    return sortedArticles
  }

  // Filtrer les articles par catégorie si nécessaire
  const getFilteredArticles = () => {
    const allArticles = getAllArticles()
    if (selectedCategory === 'all') {
      return allArticles
    }
    return allArticles.filter(article => article.category === selectedCategory)
  }

  // Obtenir tous les articles filtrés et triés
  const allSortedArticles = sortAllArticles(getFilteredArticles(), globalSortOption)

  // Liste des catégories disponibles
  const availableCategories = [
    { key: 'all', name: 'Toutes les catégories', emoji: '🌟', count: getAllArticles().length },
    { key: 'cinema', name: 'Cinéma', emoji: '🎬', count: getAllArticles().filter(a => a.category === 'cinema').length },
    { key: 'clash', name: 'Clash', emoji: '⚡', count: getAllArticles().filter(a => a.category === 'clash').length },
    { key: 'comedie', name: 'Comédie', emoji: '😄', count: getAllArticles().filter(a => a.category === 'comedie').length },
    { key: 'decouverte', name: 'Découverte', emoji: '🔍', count: getAllArticles().filter(a => a.category === 'decouverte').length },
    { key: 'education', name: 'Éducation', emoji: '📚', count: getAllArticles().filter(a => a.category === 'education').length },
    { key: 'enquete', name: 'Enquête', emoji: '🕵️', count: getAllArticles().filter(a => a.category === 'enquete').length },
    { key: 'evenements', name: 'Événements', emoji: '🎉', count: getAllArticles().filter(a => a.category === 'evenements').length },
    { key: 'recompense', name: 'Récompense', emoji: '🏆', count: getAllArticles().filter(a => a.category === 'recompense').length },
    { key: 'lifestyle', name: 'Lifestyle', emoji: '✨', count: getAllArticles().filter(a => a.category === 'lifestyle').length }
  ]

  // Couleurs pour les badges de catégorie
  const categoryColors: Record<string, string> = {
    'cinema': 'from-purple-600 to-pink-600',
    'clash': 'from-red-600 to-orange-600',
    'comedie': 'from-yellow-600 to-orange-600',
    'decouverte': 'from-green-600 to-teal-600',
    'education': 'from-blue-600 to-indigo-600',
    'enquete': 'from-gray-600 to-slate-600',
    'evenements': 'from-pink-600 to-purple-600',
    'recompense': 'from-amber-600 to-yellow-600',
    'lifestyle': 'from-teal-600 to-cyan-600'
  }

  // const stats = [
  //   { icon: Users, value: '2,500+', label: 'Artistes Inscrits', color: 'bg-primary-600' },
  //   { icon: Calendar, value: '150+', label: 'Événements', color: 'bg-accent-green' },
  //   { icon: Trophy, value: '50+', label: 'Trophées Distribués', color: 'bg-accent-yellow' },
  //   { icon: Star, value: '25k+', label: 'Votes Enregistrés', color: 'bg-accent-purple' },
  // ]

  // const categories = [
  //   {
  //     title: 'Musique',
  //     description: 'Des rythmes traditionnels aux beats modernes, découvrez les talents musicaux congolais',
  //     icon: Music,
  //     image: '🎵',
  //     gradient: 'from-accent-purple to-primary-600',
  //     stats: '500+ artistes'
  //   },
  //   {
  //     title: 'Arts Visuels', 
  //     description: 'Peinture, sculpture, art digital - explorez la créativité visuelle sans limites',
  //     icon: Palette,
  //     image: '🎨',
  //     gradient: 'from-accent-green to-primary-600',
  //     stats: '300+ œuvres'
  //   },
  //   {
  //     title: 'Cinéma & Vidéo',
  //     description: 'Courts-métrages, documentaires, clips - le cinéma congolais à l&apos;honneur',
  //     icon: Camera,
  //     image: '🎬',
  //     gradient: 'from-accent-orange to-primary-600',
  //     stats: '100+ films'
  //   },
  //   {
  //     title: 'Littérature',
  //     description: 'Romans, poésie, nouvelles - plongez dans l&apos;univers littéraire local',
  //     icon: BookOpen,
  //     image: '📚',
  //     gradient: 'from-accent-red to-primary-600',
  //     stats: '200+ auteurs'
  //   },
  // ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-100">
      {/* Header Component */}
      <Header />

      {/* Hero Section Spectaculaire */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-purple/5">
        {/* Émetteur en arrière-plan - Hidden on mobile */}
        <div className="absolute right-4 sm:right-8 top-1/4 transform -translate-y-1/4 opacity-10 sm:opacity-15 pointer-events-none z-0 hidden sm:block">
          <div className="w-48 h-72 sm:w-64 sm:h-96 lg:w-80 lg:h-[480px]">
            {/* Tour de l'émetteur */}
            <div className="relative w-full h-full">
              {/* Antenne principale */}
              <div className="absolute left-1/2 transform -translate-x-1/2 top-0 w-2 h-32 bg-gradient-to-t from-gray-600 to-gray-800 rounded-full"></div>
              
              {/* Antennes horizontales */}
              <div className="absolute left-1/2 transform -translate-x-1/2 top-8 w-12 h-1 bg-gray-700 rounded-full"></div>
              <div className="absolute left-1/2 transform -translate-x-1/2 top-16 w-16 h-1 bg-gray-700 rounded-full"></div>
              <div className="absolute left-1/2 transform -translate-x-1/2 top-24 w-12 h-1 bg-gray-700 rounded-full"></div>
              
              {/* Corps principal de l'émetteur */}
              <div className="absolute left-1/2 transform -translate-x-1/2 top-32 w-24 h-48 bg-gradient-to-b from-gray-700 to-gray-900 rounded-t-lg shadow-2xl">
                {/* Panneaux sur la tour */}
                <div className="absolute inset-2 grid grid-cols-2 gap-1">
                  <div className="bg-blue-600 rounded-sm opacity-80"></div>
                  <div className="bg-white rounded-sm"></div>
                  <div className="bg-white rounded-sm"></div>
                  <div className="bg-blue-600 rounded-sm opacity-80"></div>
                  <div className="bg-blue-600 rounded-sm opacity-80"></div>
                  <div className="bg-white rounded-sm"></div>
                </div>
                
                {/* Antennes de diffusion */}
                <div className="absolute -left-8 top-4 w-16 h-2 bg-gray-600 rounded-full"></div>
                <div className="absolute -right-8 top-4 w-16 h-2 bg-gray-600 rounded-full"></div>
                <div className="absolute -left-6 top-12 w-12 h-2 bg-gray-600 rounded-full"></div>
                <div className="absolute -right-6 top-12 w-12 h-2 bg-gray-600 rounded-full"></div>
              </div>
              
              {/* Base de l'émetteur */}
              <div className="absolute left-1/2 transform -translate-x-1/2 bottom-16 w-32 h-32 bg-gradient-to-b from-gray-800 to-black rounded-2xl shadow-2xl">
                {/* Écran/Panneau de contrôle */}
                <div className="absolute inset-4 bg-gray-900 rounded-xl border-2 border-gray-600">
                  <div className="absolute inset-2 grid grid-cols-3 gap-1">
                    <div className="bg-blue-600 rounded-sm"></div>
                    <div className="bg-blue-500 rounded-sm"></div>
                    <div className="bg-blue-600 rounded-sm"></div>
                    <div className="bg-blue-500 rounded-sm"></div>
                    <div className="bg-white rounded-sm"></div>
                    <div className="bg-blue-500 rounded-sm"></div>
                    <div className="bg-blue-600 rounded-sm"></div>
                    <div className="bg-blue-500 rounded-sm"></div>
                    <div className="bg-blue-600 rounded-sm"></div>
                  </div>
                </div>
              </div>
              
              {/* Support de base */}
              <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-40 h-16 bg-gradient-to-b from-gray-800 to-black rounded-b-2xl shadow-xl"></div>
              
              {/* Ondes de transmission animées */}
              <div className="absolute left-1/2 top-0 transform -translate-x-1/2">
                <div className="w-4 h-4 border-2 border-blue-400 rounded-full animate-ping opacity-30"></div>
                <div className="absolute top-0 left-0 w-4 h-4 border-2 border-blue-500 rounded-full animate-ping opacity-20" style={{animationDelay: '0.5s'}}></div>
                <div className="absolute top-0 left-0 w-4 h-4 border-2 border-blue-600 rounded-full animate-ping opacity-10" style={{animationDelay: '1s'}}></div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-8 sm:py-12 lg:py-24 xl:py-32 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Contenu principal */}
            <div className={`text-left transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              {/* Badge de nouveauté - Hidden on mobile */}
              <div className="hidden sm:inline-flex items-center space-x-1 sm:space-x-2 bg-gradient-creative text-white px-2 sm:px-4 lg:px-6 py-1.5 sm:py-2 rounded-full text-xs font-semibold mb-3 sm:mb-4 lg:mb-6 shadow-glow animate-fade-in-down">
                <Crown className="w-3 h-3 sm:w-4 sm:h-4 lg:w-4 lg:h-4" />
                <span className="hidden sm:inline">La Première Plateforme Culturelle Congolaise</span>
                <span className="sm:hidden">Plateforme Culturelle Congo</span>
                <Zap className="w-3 h-3 sm:w-4 sm:h-4 lg:w-4 lg:h-4" />
              </div>
              
                          {/* Titre principal avec carte RDC */}
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start mb-4 sm:mb-6 lg:mb-8">
              {/* Carte géographique RDC - Hidden on mobile */}
              <div className="hidden sm:relative mb-4 sm:mb-0 sm:mr-4 lg:mr-6">
                <div className="w-20 h-24 sm:w-24 sm:h-30 lg:w-28 lg:h-36 xl:w-36 xl:h-44 relative bg-gradient-to-br from-green-50 to-blue-50 rounded-xl sm:rounded-2xl p-1.5 sm:p-2 shadow-lg border border-green-200/50">
                  {/* Vraie forme de la RDC selon l'image fournie */}
                  <svg viewBox="0 0 120 80" className="w-full h-full">
                    {/* Vraie forme de la RDC basée exactement sur votre image */}
                    <path d="M8 45 
                             C8 43 12 42 18 42
                             C25 41 35 40 48 39
                             C62 38 78 37 92 38
                             C102 39 108 41 110 43
                             C112 45 110 47 106 48
                             C100 49 92 50 82 50
                             C70 50 58 50 48 50
                             C38 50 28 50 20 49
                             C14 48 10 47 8 45 Z" 
                          className="fill-emerald-100 stroke-emerald-600 stroke-2" />
                    
                    {/* Fleuve Congo traversant le pays */}
                    <path d="M75 42 Q60 45 45 46 Q30 47 18 47" 
                          className="stroke-blue-400 stroke-1 fill-none" />
                    
                    {/* Kinshasa (à l'ouest, queue étroite) */}
                    <circle cx="18" cy="46" r="2" className="fill-red-500 animate-pulse" />
                    <text x="8" y="52" className="text-[5px] sm:text-[6px] lg:text-[7px] fill-red-700 font-bold">Kinshasa</text>
                    
                    {/* Lubumbashi (sud-est du territoire principal) - Hidden on small screens */}
                    <circle cx="90" cy="48" r="1.5" className="fill-blue-500 hidden sm:block" />
                    <text x="78" y="54" className="text-[4px] sm:text-[5px] lg:text-[6px] fill-blue-700 font-semibold hidden sm:block">Lubumbashi</text>
                    
                    {/* Goma (à l'est) - Hidden on small screens */}
                    <circle cx="105" cy="44" r="1.5" className="fill-green-500 hidden sm:block" />
                    <text x="95" y="40" className="text-[4px] sm:text-[5px] lg:text-[6px] fill-green-700 font-semibold hidden sm:block">Goma</text>
                    
                    {/* Kisangani (centre du pays) - Hidden on small screens */}
                    <circle cx="75" cy="43" r="1.5" className="fill-purple-500 hidden sm:block" />
                    <text x="65" y="39" className="text-[4px] sm:text-[5px] lg:text-[6px] fill-purple-700 font-semibold hidden sm:block">Kisangani</text>
                  </svg>
                  
                  {/* Drapeau RDC animé */}
                  <div className="absolute -top-2 sm:-top-3 -right-2 sm:-right-3 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-600 via-yellow-400 to-red-600 rounded-full flex items-center justify-center animate-bounce shadow-md">
                    <span className="text-white text-xs font-bold">⭐</span>
                  </div>
                  
                  {/* Badge "Cœur de l'Afrique" */}
                  <div className="absolute -bottom-1 sm:-bottom-2 left-1/2 transform -translate-x-1/2 bg-green-600 text-white text-[8px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full font-bold shadow-sm">
                    <span className="hidden sm:inline">💚 Cœur de l&apos;Afrique</span>
                    <span className="sm:hidden">💚 Congo</span>
                  </div>
                </div>
              </div>

              {/* Titre */}
              <div className="text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold text-neutral-900 leading-none mb-2 sm:mb-3">
                  <span className="block text-blue-700">La Grande</span>
                  <span className="block text-neutral-900">Mosaïque</span>
                </h1>
                <div className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl text-neutral-600 font-semibold mb-2 sm:mb-3">
                  République Démocratique du Congo
                </div>
                
                {/* Textes accrocheurs - Hidden on mobile */}
                <div className="hidden sm:space-y-1 mb-2 sm:mb-3">
                  <div className="text-xs sm:text-sm text-blue-600 font-medium italic text-center sm:text-left">
                    &ldquo;Là où chaque talent congolais brille comme une étoile&rdquo;
                  </div>
                  <div className="text-xs text-emerald-600 font-semibold text-center sm:text-left">
                    🌟 Plus de 80 millions de talents à découvrir
                  </div>
                  <div className="text-xs text-purple-600 font-semibold text-center sm:text-left">
                    🎭 De Kinshasa à Lubumbashi, une richesse culturelle infinie
                  </div>
                </div>
                
                {/* Badge spécial - Hidden on mobile */}
                <div className="hidden sm:inline-flex items-center space-x-1 sm:space-x-2 bg-gradient-to-r from-green-100 to-yellow-100 border border-green-300 rounded-full px-2 sm:px-3 py-1 text-xs font-bold text-green-800">
                  <span>🏆</span>
                  <span className="hidden sm:inline">Première plateforme culturelle du Congo</span>
                  <span className="sm:hidden">Plateforme culturelle Congo</span>
                  <span>🇨🇩</span>
                </div>
              </div>
            </div>
              

              
              {/* Boutons d'action */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 items-center sm:items-start">
                <button className="group bg-gradient-primary text-white px-5 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base lg:text-lg hover:shadow-glow-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 sm:space-x-3 w-full sm:w-auto justify-center">
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 lg:w-5 lg:h-5" />
                  <span>Découvrir Maintenant</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button className="group bg-white/90 backdrop-blur-sm text-neutral-900 px-5 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base lg:text-lg border-2 border-neutral-200 hover:border-primary-300 hover:shadow-strong transition-all duration-300 flex items-center space-x-2 sm:space-x-3 w-full sm:w-auto justify-center">
                  <Trophy className="w-4 h-4 sm:w-5 sm:h-5 lg:w-5 lg:h-5 text-accent-yellow" />
                  <span className="hidden sm:inline">Voir les Trophées</span>
                  <span className="sm:hidden">Trophées</span>
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Carrousel avec actualités défilantes */}
            <div className="relative flex items-center justify-center mt-8 lg:mt-0">
              <div className="relative w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] md:w-[450px] md:h-[450px] lg:w-[450px] lg:h-[450px] xl:w-[500px] xl:h-[500px]">
                {/* Cercle de base */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-50 via-white to-purple-50 shadow-2xl border border-slate-200/30"></div>
                
                {/* Orbite guide visible - sans espaces */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute border-2 border-dashed border-blue-300/30 rounded-full w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] md:w-[340px] md:h-[340px] lg:w-[320px] lg:h-[320px] xl:w-[360px] xl:h-[360px] animate-pulse"></div>
                  <div className="absolute border border-blue-200/20 rounded-full w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] md:w-[360px] md:h-[360px] lg:w-[340px] lg:h-[340px] xl:w-[380px] xl:h-[380px]"></div>
                </div>
                
                {/* État de chargement */}
                {!isClient && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                  </div>
                )}
                
                {/* Actualités qui tournent en cercle */}
                {isClient && orbitingArticles.slice(0, 6).map((article, index) => (
                  <div
                    key={`orbiting-${article.id}-${index}`}
                    className="absolute top-1/2 left-1/2 w-16 h-16 sm:w-20 sm:h-20 lg:w-20 lg:h-20 xl:w-24 xl:h-24 -translate-x-1/2 -translate-y-1/2"
                    style={{
                      animation: `orbitContinuous 12s linear infinite`,
                      animationDelay: `${index * 2}s`, // Décalage de 2s entre chaque actualité (12s / 6 = 2s)
                    }}
                  >
                    <div className="relative w-full h-full group cursor-pointer">
                      <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110">
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          className="object-cover rounded-xl sm:rounded-2xl opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-xl sm:rounded-2xl"></div>
                        
                        {/* Contenu de l'actualité - Optimisé pour tous les écrans */}
                        <div className="absolute bottom-0 left-0 right-0 p-1.5 sm:p-2 text-white">
                          <div className="text-xs font-semibold mb-1 bg-blue-600 px-1.5 py-0.5 rounded-full w-fit opacity-90">
                            {article.category}
                          </div>
                          <h3 className="font-bold text-xs sm:text-sm line-clamp-2 leading-tight mb-0.5">
                            {article.title}
                          </h3>
                          <p className="text-xs opacity-90 line-clamp-2 leading-relaxed">
                            {article.excerpt}
                          </p>
                        </div>
                      </div>
                      
                      {/* Badge numéro */}
                      <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 w-4 h-4 sm:w-6 sm:h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md">
                        <span className="hidden sm:inline">📰</span>
                        <span className="sm:hidden text-[8px]">📰</span>
                      </div>
                    </div>
                  </div>
                ))}

                                {/* Article central (article actuel) */}
                {isClient && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-36 lg:h-36 xl:w-40 xl:h-40 relative group cursor-pointer">
                      <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-white shadow-2xl border-2 sm:border-4 border-blue-500/20 overflow-hidden transform group-hover:scale-105 transition-all duration-500">
                        <Image
                          key={`central-${currentArticleIndex}`} // Force re-render pour transition
                          src={featuredArticles[currentArticleIndex]?.image || ''}
                          alt={featuredArticles[currentArticleIndex]?.title || ''}
                          fill
                          className="object-cover transition-opacity duration-700 ease-in-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent"></div>
                        
                        {/* Contenu de l'article */}
                        <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 lg:p-4 text-white">
                          <div className="text-xs font-semibold mb-1.5 bg-blue-600 px-2 py-1 rounded-full w-fit animate-pulse">
                            {featuredArticles[currentArticleIndex]?.category}
                          </div>
                          <h3 className="font-bold text-sm sm:text-base lg:text-lg line-clamp-2 leading-tight transition-all duration-500 mb-1.5">
                            {featuredArticles[currentArticleIndex]?.title}
                          </h3>
                          <p className="text-xs sm:text-sm opacity-90 line-clamp-2 leading-relaxed transition-all duration-500 mb-1">
                            {featuredArticles[currentArticleIndex]?.excerpt}
                          </p>
                          <p className="text-xs opacity-90 transition-all duration-500">
                            ⏱️ {featuredArticles[currentArticleIndex]?.readTime}min • 🔥 À la une
                          </p>
                        </div>
                      </div>

                      {/* Effet de pulsation renforcé */}
                      <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border-2 border-blue-500 animate-ping opacity-30"></div>
                      <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border-2 sm:border-4 border-blue-300 animate-ping opacity-10" style={{animationDelay: '0.5s'}}></div>
                    </div>
                  </div>
                )}

                {/* Indicateurs de progression */}
                {isClient && (
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {featuredArticles.map((_, index) => (
                      <button
                        key={`carousel-indicator-${index}`}
                        onClick={() => setCurrentArticleIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentArticleIndex
                            ? 'bg-blue-600 scale-125'
                            : 'bg-slate-300 hover:bg-slate-400'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Éléments flottants améliorés - Hidden on mobile */}
        <div className="absolute top-32 left-8 sm:left-16 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-creative rounded-3xl opacity-20 animate-float shadow-glow hidden sm:block"></div>
        <div className="absolute top-48 right-8 sm:right-24 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-success rounded-full opacity-25 animate-float shadow-medium hidden sm:block" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-accent-yellow rounded-2xl opacity-30 animate-float hidden sm:block" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-64 right-1/3 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-accent-orange rounded-full opacity-25 animate-float hidden sm:block" style={{ animationDelay: '0.5s' }}></div>
        
        {/* Logo mosaïque décoratif - Hidden on mobile */}
        <div className="absolute top-1/2 left-4 sm:left-10 transform -translate-y-1/2 opacity-10 hidden lg:block">
          <div className="w-24 h-32 sm:w-28 sm:h-36 lg:w-32 lg:h-40 relative">
            {/* Écran de la tablette */}
            <div className="w-24 h-32 bg-neutral-800 rounded-2xl mx-auto relative overflow-hidden">
              {/* Grille mosaïque 3x3 */}
              <div className="absolute inset-2 grid grid-cols-3 gap-1">
                <div className="bg-primary-600 rounded-sm"></div>
                <div className="bg-primary-500 rounded-sm"></div>
                <div className="bg-primary-600 rounded-sm"></div>
                <div className="bg-primary-500 rounded-sm"></div>
                <div className="bg-white rounded-sm"></div>
                <div className="bg-primary-500 rounded-sm"></div>
                <div className="bg-primary-600 rounded-sm"></div>
                <div className="bg-primary-500 rounded-sm"></div>
                <div className="bg-primary-600 rounded-sm"></div>
              </div>
            </div>
            {/* Support de la tablette */}
            <div className="w-20 h-8 bg-neutral-800 rounded-b-lg mx-auto"></div>
            <div className="w-16 h-2 bg-neutral-800 rounded-full mx-auto"></div>
          </div>
        </div>
      </section>

      {/* Section Articles par Catégorie */}
      <section className="py-6 sm:py-8 lg:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 mb-2">
              Actualités du Congo
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mb-4">
              {allSortedArticles.length} articles {selectedCategory === 'all' ? '' : `- ${availableCategories.find(cat => cat.key === selectedCategory)?.name}`}
            </p>
            
            {/* Contrôles compacts */}
            <div className="bg-white rounded-lg sm:rounded-xl p-2 sm:p-3 shadow-sm border border-slate-200 max-w-6xl mx-auto">
              {/* Filtrage par catégorie - compact */}
              <div className="mb-2 sm:mb-3">
                <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
                  {availableCategories.map((category) => (
                    <button
                      key={`category-filter-${category.key}`}
                      onClick={() => setSelectedCategory(category.key)}
                      className={`flex items-center space-x-1 px-1.5 sm:px-2 py-1 rounded-md sm:rounded-lg text-xs font-medium transition-all duration-200 ${
                        selectedCategory === category.key
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-neutral-700 hover:bg-slate-200'
                      }`}
                    >
                      <span className="text-xs sm:text-sm">{category.emoji}</span>
                      <span className="hidden sm:inline">{category.name}</span>
                      <span className="sm:hidden text-xs">{category.name.split(' ')[0]}</span>
                      <span className={`text-xs px-1 py-0.5 rounded ${
                        selectedCategory === category.key 
                          ? 'bg-white/20 text-white' 
                          : 'bg-white text-slate-600'
                      }`}>
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Boutons de tri global - compact */}
              <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
                <span className="text-xs font-medium text-neutral-600 mr-1 hidden sm:inline">Tri :</span>
              
                <button
                  onClick={() => setGlobalSortOption('recent')}
                  className={`px-2 sm:px-3 py-1 rounded-md text-xs font-medium transition-all duration-200 ${
                    globalSortOption === 'recent'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <span className="hidden sm:inline">📅 Récents</span>
                  <span className="sm:hidden">📅</span>
                </button>
                
                <button
                  onClick={() => setGlobalSortOption('featured')}
                  className={`px-2 sm:px-3 py-1 rounded-md text-xs font-medium transition-all duration-200 ${
                    globalSortOption === 'featured'
                      ? 'bg-red-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <span className="hidden sm:inline">🔥 Une</span>
                  <span className="sm:hidden">🔥</span>
                </button>
                
                <button
                  onClick={() => setGlobalSortOption('popular')}
                  className={`px-2 sm:px-3 py-1 rounded-md text-xs font-medium transition-all duration-200 ${
                    globalSortOption === 'popular'
                      ? 'bg-green-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <span className="hidden sm:inline">⚡ Rapide</span>
                  <span className="sm:hidden">⚡</span>
                </button>

                <button
                  onClick={() => {
                    setGlobalSortOption('random')
                  }}
                  className={`px-2 sm:px-3 py-1 rounded-md text-xs font-medium transition-all duration-200 ${
                    globalSortOption === 'random'
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <span className="hidden sm:inline">🎲 Aléa</span>
                  <span className="sm:hidden">🎲</span>
                </button>
              </div>
            </div>
          </div>

                    {/* Une seule grille avec tous les articles triés */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 lg:gap-4">
            {allSortedArticles.map((article, index) => (
              <div 
                key={`global-article-${article.id}-${index}`} 
                className="group bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-slate-200/50 overflow-hidden"
              >
                {/* Image de l'article */}
                <div className="relative h-16 sm:h-20 lg:h-24 overflow-hidden">
          <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  
                  {/* Badge catégorie avec couleur dynamique */}
                  <div className={`absolute top-0.5 sm:top-1 left-0.5 sm:left-1 bg-gradient-to-r ${categoryColors[article.category] || 'from-gray-600 to-gray-700'} text-white text-xs px-1 sm:px-1.5 py-0.5 rounded-sm sm:rounded-md font-medium`}>
                    <span className="hidden sm:inline">{article.category}</span>
                    <span className="sm:hidden text-xs">{article.category.slice(0, 3)}</span>
                  </div>
                  
                  {/* Badge "À la une" si featured */}
                  {article.featured && (
                    <div className="absolute top-0.5 sm:top-1 right-0.5 sm:right-1 bg-red-600 text-white text-xs px-1 sm:px-1.5 py-0.5 rounded-sm sm:rounded-md font-medium">
                      🔥
                    </div>
                  )}
                </div>

                {/* Contenu de l'article */}
                <div className="p-1.5 sm:p-2">
                  <h4 className="font-semibold text-neutral-900 text-xs mb-1 line-clamp-2 group-hover:text-blue-700 transition-colors leading-tight">
                    {article.title}
                  </h4>
                  
                  <p className="text-neutral-600 text-xs mb-1 sm:mb-2 line-clamp-1 leading-relaxed hidden sm:block">
                    {article.excerpt}
                  </p>
                  
                  {/* Métadonnées compactes */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-neutral-500 space-y-1 sm:space-y-0">
                    <span className="font-medium truncate text-xs">{article.author}</span>
                    <div className="flex items-center space-x-1 text-xs">
                      <span>{article.readTime}min</span>
                      <span className="hidden sm:inline">•</span>
                      <span className="hidden sm:inline">
                        {new Date(article.publishedAt).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'short'
                        })}
                      </span>
                    </div>
                  </div>
                  
                  {/* Tags réduits - Hidden on mobile */}
                  {article.tags && article.tags.length > 0 && (
                    <div className="hidden sm:flex gap-1 mt-1">
                      {article.tags.slice(0, 1).map((tag: string, tagIndex: number) => (
                        <span 
                          key={`global-tag-${article.id}-${tagIndex}`}
                          className="bg-slate-100 text-slate-600 text-xs px-1.5 py-0.5 rounded-md"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Message si pas d'articles */}
          {allSortedArticles.length === 0 && (
            <div className="text-center py-12 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-300">
              <div className="text-6xl mb-4">📰</div>
              <h4 className="text-xl font-semibold text-slate-600 mb-2">Aucun article disponible</h4>
              <p className="text-slate-500">Les articles seront bientôt disponibles.</p>
            </div>
          )}

          
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-neutral-900 text-neutral-300 py-8 sm:py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-12 lg:mb-16">
            <div className="sm:col-span-2 lg:col-span-2">
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 mb-6 sm:mb-8">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-primary rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-glow p-2 sm:p-3">
                  {/* Logo mosaïque footer */}
                  <div className="grid grid-cols-3 gap-1 w-full h-full">
                    <div className="bg-white rounded-sm"></div>
                    <div className="bg-white/90 rounded-sm"></div>
                    <div className="bg-white rounded-sm"></div>
                    <div className="bg-white/90 rounded-sm"></div>
                    <div className="bg-primary-300 rounded-sm"></div>
                    <div className="bg-white/90 rounded-sm"></div>
                    <div className="bg-white rounded-sm"></div>
                    <div className="bg-white/90 rounded-sm"></div>
                    <div className="bg-white rounded-sm"></div>
                  </div>
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">La Grande Mosaïque</h3>
                  <span className="text-primary-400 text-sm sm:text-base lg:text-lg font-semibold">Culture • Arts • Talents • Congo</span>
                </div>
              </div>
              <p className="text-neutral-400 leading-relaxed text-sm sm:text-base lg:text-lg max-w-md mb-6 sm:mb-8 text-center sm:text-left">
                La plateforme de référence pour la promotion et la célébration de la richesse culturelle 
                et artistique du Congo. Ensemble, construisons notre mosaïque culturelle.
              </p>
            </div>
            
            <div className="text-center sm:text-left">
              <h4 className="text-white font-bold text-lg sm:text-xl mb-4 sm:mb-6">Navigation</h4>
              <ul className="space-y-2 sm:space-y-4">
                <li><Link href="/artistes" className="hover:text-primary-400 transition-colors text-sm sm:text-base lg:text-lg">Artistes</Link></li>
                <li><Link href="/culture" className="hover:text-primary-400 transition-colors text-sm sm:text-base lg:text-lg">Culture</Link></li>
                <li><Link href="/sports" className="hover:text-primary-400 transition-colors text-sm sm:text-base lg:text-lg">Sports</Link></li>
                <li><Link href="/votes" className="hover:text-primary-400 transition-colors text-sm sm:text-base lg:text-lg">Votes</Link></li>
              </ul>
            </div>
            
            <div className="text-center sm:text-left">
              <h4 className="text-white font-bold text-lg sm:text-xl mb-4 sm:mb-6">Communauté</h4>
              <ul className="space-y-2 sm:space-y-4">
                <li><Link href="/inscription" className="hover:text-primary-400 transition-colors text-sm sm:text-base lg:text-lg">Inscription</Link></li>
                <li><Link href="/connexion" className="hover:text-primary-400 transition-colors text-sm sm:text-base lg:text-lg">Connexion</Link></li>
                <li><Link href="/contact" className="hover:text-primary-400 transition-colors text-sm sm:text-base lg:text-lg">Contact</Link></li>
                <li><Link href="/aide" className="hover:text-primary-400 transition-colors text-sm sm:text-base lg:text-lg">Aide</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-neutral-800 pt-6 sm:pt-8 lg:pt-12">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
              <p className="text-neutral-400 text-sm sm:text-base lg:text-lg text-center lg:text-left">
                © 2024 La Grande Mosaïque. Tous droits réservés. 
                <span className="block sm:inline sm:ml-2">Fait avec ❤️ pour la culture congolaise.</span>
              </p>
              <div className="flex flex-wrap justify-center lg:justify-end space-x-4 sm:space-x-6 lg:space-x-8 text-xs sm:text-sm">
                <span className="text-neutral-500">🌟 +25k votes</span>
                <span className="text-neutral-500">🎨 +2.5k artistes</span>
                <span className="text-neutral-500">🏆 +50 trophées</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}