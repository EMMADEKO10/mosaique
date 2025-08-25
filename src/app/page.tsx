'use client'

import { useState, useEffect } from 'react'
import { 
  ChevronRight, 
  Play, 
  Users, 
  Calendar, 
  Trophy, 
  Star, 
  ArrowRight, 
  Sparkles,
  Music,
  Palette,
  Camera,
  BookOpen,
  Crown,
  Zap,
  ChevronDown,
  Film,
  Gamepad2,
  Smile,
  Eye,
  GraduationCap,
  Search,
  Award,
  TrendingUp,
  Coffee
} from 'lucide-react'
import { getArticlesByCategory } from '../data/actualites'
import Image from 'next/image'

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)
  const [isActualitesDropdownOpen, setIsActualitesDropdownOpen] = useState(false)
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Catégories d'actualités avec données fictives
  const actualitesCategories = [
    { 
      name: 'Tous', 
      icon: TrendingUp, 
      href: '/actualites', 
      description: 'Toutes les actualités',
      count: 156,
      latestArticle: 'Bilan culturel 2024 du Congo'
    },
    { 
      name: 'Cinéma', 
      icon: Film, 
      href: '/actualites/cinema', 
      description: 'Films et productions',
      count: 23,
      latestArticle: 'Sortie du film "Kinshasa Dreams"'
    },
    { 
      name: 'Clash', 
      icon: Gamepad2, 
      href: '/actualites/clash', 
      description: 'Débats et polémiques',
      count: 12,
      latestArticle: 'Polémique autour du dernier concert'
    },
    { 
      name: 'Comédie', 
      icon: Smile, 
      href: '/actualites/comedie', 
      description: 'Humour et spectacles',
      count: 18,
      latestArticle: 'Papa Wemba Comedy Show à Lubumbashi'
    },
    { 
      name: 'Découverte', 
      icon: Eye, 
      href: '/actualites/decouverte', 
      description: 'Nouveaux talents',
      count: 34,
      latestArticle: 'Jeune prodige de 16 ans révélé'
    },
    { 
      name: 'Éducation', 
      icon: GraduationCap, 
      href: '/actualites/education', 
      description: 'Formation et culture',
      count: 15,
      latestArticle: 'Nouvelle école d\'arts à Kinshasa'
    },
    { 
      name: 'Enquête', 
      icon: Search, 
      href: '/actualites/enquete', 
      description: 'Investigations',
      count: 8,
      latestArticle: 'Dans les coulisses des maisons de disques'
    },
    { 
      name: 'Événements', 
      icon: Calendar, 
      href: '/actualites/evenements', 
      description: 'Festivals et shows',
      count: 28,
      latestArticle: 'Festival Amani prévu en mars 2024'
    },
    { 
      name: 'Récompense', 
      icon: Award, 
      href: '/actualites/recompense', 
      description: 'Prix et distinctions',
      count: 11,
      latestArticle: 'Prix de la meilleure chanson 2024'
    },
    { 
      name: 'Lifestyle', 
      icon: Coffee, 
      href: '/actualites/lifestyle', 
      description: 'Mode de vie',
      count: 7,
      latestArticle: 'La mode congolaise à Paris Fashion Week'
    },
  ]

  const stats = [
    { icon: Users, value: '2,500+', label: 'Artistes Inscrits', color: 'bg-primary-600' },
    { icon: Calendar, value: '150+', label: 'Événements', color: 'bg-accent-green' },
    { icon: Trophy, value: '50+', label: 'Trophées Distribués', color: 'bg-accent-yellow' },
    { icon: Star, value: '25k+', label: 'Votes Enregistrés', color: 'bg-accent-purple' },
  ]

  const categories = [
    {
      title: 'Musique',
      description: 'Des rythmes traditionnels aux beats modernes, découvrez les talents musicaux congolais',
      icon: Music,
      image: '🎵',
      gradient: 'from-accent-purple to-primary-600',
      stats: '500+ artistes'
    },
    {
      title: 'Arts Visuels', 
      description: 'Peinture, sculpture, art digital - explorez la créativité visuelle sans limites',
      icon: Palette,
      image: '🎨',
      gradient: 'from-accent-green to-primary-600',
      stats: '300+ œuvres'
    },
    {
      title: 'Cinéma & Vidéo',
      description: 'Courts-métrages, documentaires, clips - le cinéma congolais à l&apos;honneur',
      icon: Camera,
      image: '🎬',
      gradient: 'from-accent-orange to-primary-600',
      stats: '100+ films'
    },
    {
      title: 'Littérature',
      description: 'Romans, poésie, nouvelles - plongez dans l&apos;univers littéraire local',
      icon: BookOpen,
      image: '📚',
      gradient: 'from-accent-red to-primary-600',
      stats: '200+ auteurs'
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-100">
      {/* Navigation Moderne */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50 shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-all duration-300 transform group-hover:scale-105 p-2">
                  {/* Mini mosaïque 3x3 */}
                  <div className="grid grid-cols-3 gap-0.5 w-full h-full">
                    <div className="bg-white rounded-sm"></div>
                    <div className="bg-white/80 rounded-sm"></div>
                    <div className="bg-white rounded-sm"></div>
                    <div className="bg-white/80 rounded-sm"></div>
                    <div className="bg-blue-300 rounded-sm"></div>
                    <div className="bg-white/80 rounded-sm"></div>
                    <div className="bg-white rounded-sm"></div>
                    <div className="bg-white/80 rounded-sm"></div>
                    <div className="bg-white rounded-sm"></div>
                  </div>
                </div>
                <div className="absolute -inset-1 bg-gradient-primary rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity blur"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold text-slate-900">La Grande</h1>
                <span className="text-blue-700 font-bold text-sm tracking-wider">MOSAÏQUE</span>
              </div>
            </div>
            
            <div className="hidden lg:flex items-center space-x-8">
              <a href="/artistes" className="text-slate-700 hover:text-blue-700 transition-colors font-medium relative group">
                Artistes
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </a>
              <a href="/culture" className="text-slate-700 hover:text-blue-700 transition-colors font-medium relative group">
                Culture
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </a>
              <a href="/sports" className="text-slate-700 hover:text-blue-700 transition-colors font-medium relative group">
                Sports
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </a>
              <a href="/votes" className="text-slate-700 hover:text-blue-700 transition-colors font-medium relative group">
                Votes
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </a>
              
              {/* Menu déroulant Actualités */}
              <div 
                className="relative group"
                onMouseEnter={() => setIsActualitesDropdownOpen(true)}
                onMouseLeave={() => setIsActualitesDropdownOpen(false)}
              >
                <button className="text-slate-700 hover:text-blue-700 transition-colors font-medium relative group flex items-center space-x-1">
                  <span>Actualités</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isActualitesDropdownOpen ? 'rotate-180' : ''}`} />
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
                </button>
                
                {/* Menu déroulant horizontal centré */}
                <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-[900px] bg-white rounded-2xl shadow-strong border border-slate-200/50 backdrop-blur-md transition-all duration-300 origin-top z-50 ${
                  isActualitesDropdownOpen 
                    ? 'opacity-100 scale-100 translate-y-0 -translate-x-1/2' 
                    : 'opacity-0 scale-95 -translate-y-2 -translate-x-1/2 pointer-events-none'
                }`}>
                  <div className="p-6">
                    {/* Header du menu */}
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-1">Catégories d&apos;Actualités</h3>
                        <p className="text-sm text-slate-600">Explorez toutes nos catégories de contenu</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full font-semibold">
                          {actualitesCategories.reduce((total, cat) => total + cat.count, 0)} articles
                        </span>
                        <p className="text-xs text-slate-500 mt-1">Au total</p>
                      </div>
                    </div>
                    
                    {/* Grille horizontale des catégories */}
                    <div className="grid grid-cols-5 gap-3 mb-6">
                      {actualitesCategories.map((category, index) => {
                        const categoryKey = category.name.toLowerCase().replace('é', 'e').replace(' & ', '').replace(' ', '').replace('è', 'e').replace('û', 'u')
                        const categoryArticles = getArticlesByCategory(categoryKey === 'tous' ? 'tous' : categoryKey).slice(0, 3)
                        
                        return (
                          <div
                            key={index}
                            className="relative group/item"
                            onMouseEnter={() => setHoveredCategory(categoryKey)}
                            onMouseLeave={() => setHoveredCategory(null)}
                          >
                            <a
                              href={category.href}
                              className="flex flex-col items-center text-center p-3 rounded-xl hover:bg-blue-50 transition-all duration-200 border border-transparent hover:border-blue-200/50 hover:shadow-md min-h-[160px]"
                            >
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center group-hover/item:scale-110 transition-transform duration-200 shadow-md mb-2">
                                <category.icon className="w-5 h-5 text-white" />
                              </div>
                              
                              <div className="w-full flex-1 flex flex-col">
                                <div className="flex items-center justify-center space-x-1 mb-1">
                                  <span className="text-sm font-bold text-slate-900 group-hover/item:text-blue-700 transition-colors">
                                    {category.name}
                                  </span>
                                  <span className="text-xs bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-full font-medium">
                                    {category.count}
                                  </span>
                                </div>
                                
                                <div className="text-xs text-slate-500 group-hover/item:text-slate-600 transition-colors mb-2 line-clamp-2 leading-relaxed">
                                  {category.description}
                                </div>
                                
                                <div className="text-xs text-blue-600 font-medium line-clamp-2 group-hover/item:text-blue-700 mt-auto">
                                  📰 {category.latestArticle}
                                </div>
                              </div>
                            </a>

                            {/* Aperçu des actualités au survol */}
                            {hoveredCategory === categoryKey && categoryArticles.length > 0 && (
                              <div className="absolute top-0 left-full ml-3 w-80 bg-white rounded-xl shadow-strong border border-slate-200/50 backdrop-blur-md z-[60] transition-all duration-300">
                                <div className="p-4">
                                  <div className="flex items-center space-x-2 mb-3 pb-2 border-b border-slate-200">
                                    <category.icon className="w-5 h-5 text-blue-600" />
                                    <h4 className="text-sm font-bold text-slate-900">Dernières actualités {category.name}</h4>
        </div>
                                  
                                  <div className="space-y-3">
                                    {categoryArticles.map((article, articleIndex) => (
                                      <a
                                        key={articleIndex}
                                        href={`/actualites/${article.category}/${article.id}`}
                                        className="group/article flex items-start space-x-3 p-2 rounded-lg hover:bg-blue-50 transition-all duration-200"
                                      >
                                        <div className="flex-shrink-0">
                                          <img
                                            src={article.image}
                                            alt={article.title}
                                            className="w-16 h-12 object-cover rounded-md"
                                          />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <h5 className="text-xs font-semibold text-slate-900 group-hover/article:text-blue-700 transition-colors line-clamp-2 leading-tight mb-1">
                                            {article.title}
                                          </h5>
                                          <div className="flex items-center justify-between text-xs text-slate-500">
                                            <span>{article.author}</span>
                                            <span>{article.readTime}min</span>
                                          </div>
                                          {article.featured && (
                                            <span className="inline-block mt-1 bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full font-medium">
                                              À la une
                                            </span>
                                          )}
                                        </div>
                                      </a>
                                    ))}
                                  </div>
                                  
                                  <div className="mt-3 pt-2 border-t border-slate-200">
                                    <a
                                      href={category.href}
                                      className="flex items-center justify-center space-x-2 w-full py-2 text-blue-600 hover:text-blue-700 font-semibold text-xs transition-colors"
                                    >
                                      <span>Voir tout {category.name}</span>
                                      <ArrowRight className="w-3 h-3" />
                                    </a>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                    
                    {/* Section trending et CTA en bas */}
                    <div className="grid grid-cols-2 gap-6">
                      {/* Section trending */}
                      <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-6 h-6 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                            <span className="text-xs text-white font-bold">🔥</span>
                          </div>
                          <span className="text-sm font-bold text-slate-900">Trending Aujourd&apos;hui</span>
                        </div>
                        <p className="text-xs text-slate-600 mb-3">Les sujets les plus chauds du moment</p>
                        <div className="flex flex-wrap gap-2">
                          <span className="inline-flex items-center px-2 py-1 bg-white rounded-full text-xs font-medium text-slate-700 border border-slate-200">
                            #KinshasaFestival
                          </span>
                          <span className="inline-flex items-center px-2 py-1 bg-white rounded-full text-xs font-medium text-slate-700 border border-slate-200">
                            #CongoleseMusic
                          </span>
                          <span className="inline-flex items-center px-2 py-1 bg-white rounded-full text-xs font-medium text-slate-700 border border-slate-200">
                            #ArtisteDuMois
                          </span>
                        </div>
                      </div>
                      
                      {/* CTA */}
                      <div className="flex flex-col justify-center">
                        <h4 className="text-sm font-bold text-slate-900 mb-2">Découvrez Plus</h4>
                        <p className="text-xs text-slate-600 mb-4">Accédez à toutes nos actualités et restez informé de l&apos;actualité culturelle congolaise</p>
                        <a 
                          href="/actualites" 
                          className="flex items-center justify-center space-x-2 w-full py-3 bg-gradient-primary text-white rounded-xl font-semibold hover:shadow-glow transition-all duration-300 transform hover:scale-105"
                        >
                          <TrendingUp className="w-5 h-5" />
                          <span>Voir Toutes les Actualités</span>
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="text-slate-700 hover:text-blue-700 transition-colors font-medium hidden sm:block">
                Connexion
              </button>
              <button className="bg-gradient-primary text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-glow transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
                <Sparkles className="w-4 h-4" />
                <span>Rejoindre</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section Spectaculaire */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-purple/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Badge de nouveauté */}
            <div className="inline-flex items-center space-x-2 bg-gradient-creative text-white px-8 py-3 rounded-full text-sm font-semibold mb-8 shadow-glow animate-fade-in-down">
              <Crown className="w-5 h-5" />
              <span>La Première Plateforme Culturelle Congolaise</span>
              <Zap className="w-5 h-5" />
            </div>
            
            {/* Titre principal */}
            <h1 className="text-6xl lg:text-8xl font-bold text-neutral-900 mb-8 leading-none">
              <span className="block">Découvrez la</span>
              <span className="block bg-gradient-creative bg-clip-text text-transparent animate-gradient">
                Grande Mosaïque
              </span>
              <span className="block text-5xl lg:text-6xl text-neutral-700">culturelle du Congo</span>
            </h1>
            
            {/* Sous-titre */}
            <p className="text-2xl text-neutral-600 max-w-4xl mx-auto mb-12 leading-relaxed">
              <span className="text-3xl">🎨 Explorez • 🎵 Célébrez • 🏆 Votez</span>
              <br />
              pour les talents artistiques exceptionnels du Congo
              <br />
              <span className="text-lg text-neutral-500 mt-2 block">
                Une plateforme qui unit tradition et modernité dans un écrin numérique unique
              </span>
            </p>
            
            {/* Boutons d'action */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="group bg-gradient-primary text-white px-10 py-5 rounded-2xl font-bold text-xl hover:shadow-glow-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-3">
                <Play className="w-6 h-6" />
                <span>Découvrir Maintenant</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="group bg-white/90 backdrop-blur-sm text-neutral-900 px-10 py-5 rounded-2xl font-bold text-xl border-2 border-neutral-200 hover:border-primary-300 hover:shadow-strong transition-all duration-300 flex items-center space-x-3">
                <Trophy className="w-6 h-6 text-accent-yellow" />
                <span>Voir les Trophées</span>
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Éléments flottants améliorés */}
        <div className="absolute top-32 left-16 w-24 h-24 bg-gradient-creative rounded-3xl opacity-20 animate-float shadow-glow"></div>
        <div className="absolute top-48 right-24 w-20 h-20 bg-gradient-success rounded-full opacity-25 animate-float shadow-medium" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-16 h-16 bg-accent-yellow rounded-2xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-64 right-1/3 w-12 h-12 bg-accent-orange rounded-full opacity-25 animate-float" style={{ animationDelay: '0.5s' }}></div>
        
        {/* Logo mosaïque décoratif */}
        <div className="absolute top-1/2 left-10 transform -translate-y-1/2 opacity-10">
          <div className="w-32 h-40 relative">
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

      {/* Section Statistiques */}
      <section className="py-20 bg-white/80 backdrop-blur-sm border-y border-neutral-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">
              Notre Impact Culturel
            </h2>
            <p className="text-xl text-neutral-600">
              Des chiffres qui témoignent de notre engagement pour la culture congolaise
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-primary rounded-3xl text-white mb-6 group-hover:shadow-glow-lg transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-3`}>
                  <stat.icon className="w-10 h-10" />
                </div>
                <div className="text-4xl font-bold text-neutral-900 mb-3">{stat.value}</div>
                <div className="text-neutral-600 font-semibold text-lg">{stat.label}</div>
                <div className={`w-16 h-1 ${stat.color} rounded-full mx-auto mt-3 opacity-60`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Catégories */}
      <section className="py-24 bg-gradient-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-neutral-900 mb-6">
              L&apos;Univers Culturel Congolais
            </h2>
            <p className="text-2xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Plongez dans la richesse et la diversité de notre patrimoine artistique
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="bg-white rounded-4xl p-8 shadow-soft hover:shadow-strong transition-all duration-700 transform group-hover:-translate-y-3 border border-neutral-100 hover:border-primary-200 relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  
                  <div className="relative flex items-center justify-between mb-6">
                    <div className={`w-20 h-20 bg-gradient-to-br ${category.gradient} rounded-3xl flex items-center justify-center text-4xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-medium`}>
                      {category.image}
                    </div>
                    <category.icon className="w-8 h-8 text-neutral-400 group-hover:text-primary-600 transition-colors" />
                  </div>
                  
                  <div className="relative">
                    <h3 className="text-2xl font-bold text-neutral-900 mb-4 group-hover:text-primary-700 transition-colors">
                      {category.title}
                    </h3>
                    
                    <p className="text-neutral-600 mb-6 leading-relaxed">
                      {category.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-sm font-semibold text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                        {category.stats}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-primary-700 font-bold group-hover:text-primary-800 text-lg">
                      <span>Explorer</span>
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-creative text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-12">
            <h2 className="text-6xl font-bold mb-8">
              Rejoignez La Grande Mosaïque
            </h2>
            <p className="text-2xl opacity-90 leading-relaxed">
              Partagez votre passion, découvrez de nouveaux talents et participez à la célébration 
              de notre richesse culturelle. Votre voix compte dans cette mosaïque exceptionnelle !
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-white text-primary-700 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-neutral-50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3 shadow-strong">
              <span>Devenir Membre</span>
            </button>
            
            <button className="bg-white/20 backdrop-blur-sm text-white px-10 py-5 rounded-2xl font-bold text-xl border-2 border-white/30 hover:bg-white/30 transition-all duration-300 flex items-center justify-center space-x-3">
              <Star className="w-6 h-6" />
              <span>Voter Maintenant</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-neutral-300 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-16 h-16 bg-gradient-primary rounded-3xl flex items-center justify-center shadow-glow p-3">
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
                <div>
                  <h3 className="text-3xl font-bold text-white">La Grande Mosaïque</h3>
                  <span className="text-primary-400 text-lg font-semibold">Culture • Arts • Talents • Congo</span>
                </div>
              </div>
              <p className="text-neutral-400 leading-relaxed text-lg max-w-md mb-8">
                La plateforme de référence pour la promotion et la célébration de la richesse culturelle 
                et artistique du Congo. Ensemble, construisons notre mosaïque culturelle.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold text-xl mb-6">Navigation</h4>
              <ul className="space-y-4">
                <li><a href="/artistes" className="hover:text-primary-400 transition-colors text-lg">Artistes</a></li>
                <li><a href="/culture" className="hover:text-primary-400 transition-colors text-lg">Culture</a></li>
                <li><a href="/sports" className="hover:text-primary-400 transition-colors text-lg">Sports</a></li>
                <li><a href="/votes" className="hover:text-primary-400 transition-colors text-lg">Votes</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold text-xl mb-6">Communauté</h4>
              <ul className="space-y-4">
                <li><a href="/inscription" className="hover:text-primary-400 transition-colors text-lg">Inscription</a></li>
                <li><a href="/connexion" className="hover:text-primary-400 transition-colors text-lg">Connexion</a></li>
                <li><a href="/contact" className="hover:text-primary-400 transition-colors text-lg">Contact</a></li>
                <li><a href="/aide" className="hover:text-primary-400 transition-colors text-lg">Aide</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-neutral-800 pt-12">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-neutral-400 text-lg">
                © 2024 La Grande Mosaïque. Tous droits réservés. 
                <span className="ml-2">Fait avec ❤️ pour la culture congolaise.</span>
              </p>
              <div className="flex space-x-8 mt-4 md:mt-0 text-sm">
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