'use client'

import { useState, useEffect, useRef } from 'react'
import { 
  ChevronDown,
  ArrowRight,
  TrendingUp,
  Film,
  Gamepad2,
  Smile,
  Eye,
  GraduationCap,
  Search,
  Calendar,
  Award,
  Coffee,
  Menu,
  X,
  ChevronRight,
  LayoutGrid
} from 'lucide-react'
import { getArticlesByCategory } from '../../data/actualites'
import Image from 'next/image'
import Link from 'next/link'
import AuthNav from '../auth/AuthNav'
import AuthNavMobile from '../auth/AuthNavMobile'
import ConnectionStatus from '../auth/ConnectionStatus'

export default function Header() {
  const [isActualitesDropdownOpen, setIsActualitesDropdownOpen] = useState(false)
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobileActualitesOpen, setIsMobileActualitesOpen] = useState(false)
  
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const hamburgerRef = useRef<HTMLButtonElement>(null)

  // Fermer le menu mobile quand on clique en dehors
  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  // Fermer le menu quand on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        hamburgerRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        !hamburgerRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMobileMenuOpen])

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

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50 shadow-soft">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-18">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="relative group">
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-primary rounded-xl sm:rounded-2xl flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-all duration-300 transform group-hover:scale-105 p-1.5 sm:p-2">
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
              <div className="absolute -inset-1 bg-gradient-primary rounded-xl sm:rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity blur"></div>
            </div>
            <div className="hidden sm:block">
              <Link href="/">
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900">La Grande</h1>
              <span className="text-blue-700 font-bold text-xs sm:text-sm tracking-wider">MOSAÏQUE</span>
              </Link> 
            </div>
            {/* Statut de connexion - visible uniquement sur desktop */}
            <div className="hidden lg:block">
              <ConnectionStatus />
            </div>
          </div>
          
          <div className="hidden lg:flex items-center space-x-8">
            <Link href="/artistes" className="text-slate-700 hover:text-blue-700 transition-colors font-medium relative group">
              Artistes
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
            </Link>
            {/* <a href="/actualites" className="text-slate-700 hover:text-blue-700 transition-colors font-medium relative group">
              Actualités
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
            </a> */}
            {/* <a href="/culture" className="text-slate-700 hover:text-blue-700 transition-colors font-medium relative group">
              Culture
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
            </a>
            <a href="/sports" className="text-slate-700 hover:text-blue-700 transition-colors font-medium relative group">
              Sports
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
            </a> */}
            <Link href="/votes" className="text-slate-700 hover:text-blue-700 transition-colors font-medium relative group">
              Votez Vos Artistes
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
            </Link>
            
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
              
              {/* Menu déroulant horizontal centré - Responsive */}
              <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-[280px] sm:w-[400px] md:w-[600px] lg:w-[800px] xl:w-[900px] bg-white rounded-xl sm:rounded-2xl shadow-strong border border-slate-200/50 backdrop-blur-md transition-all duration-300 origin-top z-50 ${
                isActualitesDropdownOpen 
                  ? 'opacity-100 scale-100 translate-y-0 -translate-x-1/2' 
                  : 'opacity-0 scale-95 -translate-y-2 -translate-x-1/2 pointer-events-none'
              }`}>
                <div className="p-3 sm:p-4 lg:p-6">
                  {/* Header du menu */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-slate-200">
                    <div>
                      <h3 className="text-base sm:text-lg lg:text-xl font-bold text-slate-900 mb-1">Catégories d&apos;Actualités</h3>
                      <p className="text-xs sm:text-sm text-slate-600">Explorez toutes nos catégories de contenu</p>
                    </div>
                    <div className="text-left sm:text-right mt-2 sm:mt-0">
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full font-semibold">
                        {actualitesCategories.reduce((total, cat) => total + cat.count, 0)} articles
                      </span>
                      <p className="text-xs text-slate-500 mt-1">Au total</p>
                    </div>
                  </div>
                  
                  {/* Grille horizontale des catégories - Responsive */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 mb-4 sm:mb-6">
                    {actualitesCategories.map((category, index) => {
                      // Mapping des noms de catégories vers les clés des données
                      const getCategoryKey = (name: string): string => {
                        const mappings: Record<string, string> = {
                          'Tous': 'tous',
                          'Cinéma': 'cinema',
                          'Clash': 'clash',
                          'Comédie': 'comedie',
                          'Découverte': 'decouverte',
                          'Éducation': 'education',
                          'Enquête': 'enquete',
                          'Événements': 'evenements',
                          'Récompense': 'recompense',
                          'Lifestyle': 'lifestyle'
                        }
                        return mappings[name] || name.toLowerCase()
                      }
                      
                      const categoryKey = getCategoryKey(category.name)
                      const categoryArticles = getArticlesByCategory(categoryKey).slice(0, 3)
                      
                      return (
                        <div
                          key={`header-category-${categoryKey}-${index}`}
                          className="relative group/item"
                          onMouseEnter={() => setHoveredCategory(categoryKey)}
                          onMouseLeave={() => setHoveredCategory(null)}
                        >
                          <Link
                            href={category.href}
                            className="flex flex-col items-center text-center p-2 sm:p-3 rounded-lg sm:rounded-xl hover:bg-blue-50 transition-all duration-200 border border-transparent hover:border-blue-200/50 hover:shadow-md min-h-[120px] sm:min-h-[140px] lg:min-h-[160px]"
                          >
                            <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-md sm:rounded-lg flex items-center justify-center group-hover/item:scale-110 transition-transform duration-200 shadow-md mb-1 sm:mb-2">
                              <category.icon className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" />
                            </div>
                            
                            <div className="w-full flex-1 flex flex-col">
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center sm:space-x-1 mb-1">
                                <span className="text-xs sm:text-sm font-bold text-slate-900 group-hover/item:text-blue-700 transition-colors">
                                  {category.name}
                                </span>
                                <span className="text-xs bg-slate-100 text-slate-600 px-1 sm:px-1.5 py-0.5 rounded-full font-medium mt-0.5 sm:mt-0">
                                  {category.count}
                                </span>
                              </div>
                              
                              <div className="text-xs text-slate-500 group-hover/item:text-slate-600 transition-colors mb-1 sm:mb-2 line-clamp-2 leading-relaxed hidden sm:block">
                                {category.description}
                              </div>
                              
                              <div className="text-xs text-blue-600 font-medium line-clamp-2 group-hover/item:text-blue-700 mt-auto hidden md:block">
                                📰 {category.latestArticle}
                              </div>
                            </div>
                          </Link>

                          {/* Aperçu des actualités au survol - Hidden on small screens */}
                          {hoveredCategory === categoryKey && categoryArticles.length > 0 && (
                            <div className="absolute top-0 left-full ml-3 w-80 bg-white rounded-xl shadow-strong border border-slate-200/50 backdrop-blur-md z-[60] transition-all duration-300 hidden lg:block">
                              <div className="p-4">
                                <div className="flex items-center space-x-2 mb-3 pb-2 border-b border-slate-200">
                                  <category.icon className="w-5 h-5 text-blue-600" />
                                  <h4 className="text-sm font-bold text-slate-900">Dernières actualités {category.name}</h4>
                                </div>
                                
                                                                  <div className="space-y-3">
                                    {categoryArticles.map((article, articleIndex) => (
                                      <Link
                                        key={`header-${categoryKey}-${article.id}-${articleIndex}`}
                                        href={`/actualites/${article.category}/${article.id}`}
                                        className="group/article flex items-start space-x-3 p-2 rounded-lg hover:bg-blue-50 transition-all duration-200"
                                      >
                                      <div className="flex-shrink-0 relative">
                                        <Image
                                          src={article.image}
                                          alt={article.title}
                                          width={64}
                                          height={48}
                                          className="object-cover rounded-md"
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
                                    </Link>
                                  ))}
                                </div>
                                
                                <div className="mt-3 pt-2 border-t border-slate-200">
                                  <Link
                                    href={category.href}
                                    className="flex items-center justify-center space-x-2 w-full py-2 text-blue-600 hover:text-blue-700 font-semibold text-xs transition-colors"
                                  >
                                    <span>Voir tout {category.name}</span>
                                    <ArrowRight className="w-3 h-3" />
                                  </Link>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                  
                  {/* Section trending et CTA en bas - Responsive */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                    {/* Section trending */}
                    <div className="p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg sm:rounded-xl border border-blue-100">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                          <span className="text-xs text-white font-bold">🔥</span>
                        </div>
                        <span className="text-xs sm:text-sm font-bold text-slate-900">Trending Aujourd&apos;hui</span>
                      </div>
                      <p className="text-xs text-slate-600 mb-2 sm:mb-3">Les sujets les plus chauds du moment</p>
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        <span className="inline-flex items-center px-2 py-1 bg-white rounded-full text-xs font-medium text-slate-700 border border-slate-200">
                          #KinshasaFestival
                        </span>
                        <span className="inline-flex items-center px-2 py-1 bg-white rounded-full text-xs font-medium text-slate-700 border border-slate-200">
                          #CongoleseMusic
                        </span>
                        <span className="items-center px-2 py-1 bg-white rounded-full text-xs font-medium text-slate-700 border border-slate-200 hidden sm:inline-flex">
                          #ArtisteDuMois
                        </span>
                      </div>
                    </div>
                    
                    {/* CTA */}
                    <div className="flex flex-col justify-center">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-2">Découvrez Plus</h4>
                      <p className="text-xs text-slate-600 mb-3 sm:mb-4 hidden sm:block">Accédez à toutes nos actualités et restez informé de l&apos;actualité culturelle congolaise</p>
                      <Link 
                        href="/actualites" 
                        className="flex items-center justify-center space-x-2 w-full py-2 sm:py-3 bg-gradient-primary text-white rounded-lg sm:rounded-xl font-semibold hover:shadow-glow transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm"
                      >
                        <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="hidden sm:inline">Voir Toutes les Actualités</span>
                        <span className="sm:hidden">Toutes les Actualités</span>
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Menu Hamburger pour mobile */}
            <button 
              ref={hamburgerRef}
              onClick={handleMobileMenuToggle}
              className="lg:hidden p-2 text-slate-700 hover:text-blue-700 transition-colors z-10 relative"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>

            {/* Bouton Dashboard - visible sur tous les devices */}
            <Link
              href="/admin"
              className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 group relative z-10"
              title="Dashboard Admin"
            >
              <LayoutGrid className="w-4 h-4 sm:w-5 sm:h-5" />
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg sm:rounded-xl opacity-20 group-hover:opacity-30 transition-opacity blur"></div>
            </Link>

            {/* Boutons desktop */}
            <div className="hidden sm:flex items-center space-x-2 lg:space-x-4">
              <AuthNav />
            </div>

            {/* Bouton mobile simplifié */}
            <div className="sm:hidden">
              <AuthNavMobile />
            </div>
          </div>
        </div>

        {/* Menu Mobile */}
        {isMobileMenuOpen && (
          <div ref={mobileMenuRef} className="lg:hidden border-t border-slate-200 bg-white/95 backdrop-blur-md relative z-20">
            <div className="px-3 py-4 space-y-3">
              {/* Statut de connexion mobile */}
              <div className="px-3 py-2 border-b border-slate-200">
                <ConnectionStatus />
              </div>
              {/* Navigation principale */}
              <div className="space-y-2">
                <Link 
                  href="/artistes" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 text-slate-700 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors font-medium"
                >
                  🎨 Artistes
                </Link>
                <Link 
                  href="/votes" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 text-slate-700 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors font-medium"
                >
                  🗳️ Votez Vos Artistes
                </Link>
                
                {/* Actualités avec sous-menu */}
                <div>
                  <button 
                    onClick={() => setIsMobileActualitesOpen(!isMobileActualitesOpen)}
                    className="w-full flex items-center justify-between px-3 py-2 text-slate-700 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors font-medium"
                  >
                    <span>📰 Actualités</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isMobileActualitesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Sous-menu actualités */}
                  {isMobileActualitesOpen && (
                    <div className="mt-2 ml-4 space-y-1">
                      {actualitesCategories.slice(0, 6).map((category) => (
                        <Link
                          key={category.name}
                          href={category.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center space-x-2 px-3 py-2 text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <category.icon className="w-4 h-4" />
                          <span>{category.name}</span>
                          <span className="text-xs bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded-full">
                            {category.count}
                          </span>
                        </Link>
                      ))}
                      <Link
                        href="/actualites"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center space-x-2 px-3 py-2 text-sm text-blue-600 font-semibold hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <TrendingUp className="w-4 h-4" />
                        <span>Voir toutes les actualités</span>
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Séparateur */}
              <div className="border-t border-slate-200"></div>
              
              {/* Boutons d'action mobile */}
              <div className="space-y-2">
                <div className="px-3 py-2">
                  <AuthNav />
                </div>
                
                {/* Accès Dashboard mobile */}
                <Link
                  href="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-3 px-3 py-3 bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 text-purple-700 hover:text-purple-800 hover:bg-gradient-to-r hover:from-purple-100 hover:to-indigo-100 rounded-lg transition-all duration-200 font-medium"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <LayoutGrid className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">Dashboard Admin</div>
                    <div className="text-xs text-purple-600">Gérer le contenu</div>
                  </div>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              
              {/* Trending tags */}
              <div className="pt-3">
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Trending</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-2 py-1 bg-blue-50 rounded-full text-xs font-medium text-blue-700">
                    #KinshasaFestival
                  </span>
                  <span className="inline-flex items-center px-2 py-1 bg-green-50 rounded-full text-xs font-medium text-green-700">
                    #CongoleseMusic
                  </span>
                  <span className="inline-flex items-center px-2 py-1 bg-purple-50 rounded-full text-xs font-medium text-purple-700">
                    #ArtisteDuMois
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
