'use client'

import { useState, useEffect } from 'react'
import { 
  Filter, 
  Calendar, 
  Clock, 
  User,
  ArrowRight,
  ChevronDown,
  Grid,
  List,
  Eye,
  Bookmark,
  Share2,
  Search,
  X
} from 'lucide-react'
import Header from '../../../components/layout/Header'
import { getAllArticles, Article } from '../../../data/actualites'
import Image from 'next/image'
import Link from 'next/link'

export default function ActualitesPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'recent' | 'featured' | 'popular' | 'alphabetical'>('recent')
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  // const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const articlesPerPage = 12

  // Catégories avec icons et couleurs
  const categories = [
    { id: 'all', name: 'Toutes', icon: '📰', gradient: 'bg-gradient-subtle', count: 0 },
    { id: 'cinema', name: 'Cinéma', icon: '🎬', gradient: 'bg-gradient-creative', count: 0 },
    { id: 'clash', name: 'Clash', icon: '⚡', gradient: 'bg-gradient-primary', count: 0 },
    { id: 'culture', name: 'Culture', icon: '🎭', gradient: 'bg-gradient-success', count: 0 },
    { id: 'sports', name: 'Sports', icon: '⚽', gradient: 'bg-gradient-primary', count: 0 },
    { id: 'politique', name: 'Politique', icon: '🏛️', gradient: 'bg-gradient-creative', count: 0 },
    { id: 'economie', name: 'Économie', icon: '📈', gradient: 'bg-gradient-success', count: 0 },
    { id: 'technologie', name: 'Tech', icon: '💻', gradient: 'bg-gradient-primary', count: 0 },
    { id: 'sante', name: 'Santé', icon: '🏥', gradient: 'bg-gradient-creative', count: 0 },
    { id: 'education', name: 'Éducation', icon: '📚', gradient: 'bg-gradient-success', count: 0 }
  ]

  useEffect(() => {
    setMounted(true)
    const loadArticles = () => {
      setIsLoading(true)
      const allArticles = getAllArticles()
      setArticles(allArticles)
      setIsLoading(false)
    }
    loadArticles()
  }, [])

  useEffect(() => {
    let filtered = [...articles]

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(article => article.category === selectedCategory)
    }

    if (searchTerm) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    switch (sortBy) {
      case 'recent':
        filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
        break
      case 'featured':
        filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        })
        break
      case 'popular':
        filtered.sort((a, b) => b.readTime - a.readTime)
        break
      case 'alphabetical':
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
    }

    setFilteredArticles(filtered)
    setCurrentPage(1)
  }, [articles, selectedCategory, searchTerm, sortBy])

  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage)
  const startIndex = (currentPage - 1) * articlesPerPage
  const endIndex = startIndex + articlesPerPage
  const currentArticles = filteredArticles.slice(startIndex, endIndex)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  const getCategoryData = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId) || categories[0]
  }


  if (!mounted) return null

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/50">
        <Header />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-6 animate-fade-in">
            <div className="skeleton h-12 w-80 rounded-2xl"></div>
            <div className="skeleton h-40 w-full rounded-4xl"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="skeleton h-80 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const hasActiveFilters = selectedCategory !== 'all' || searchTerm || sortBy !== 'recent'

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/20 to-indigo-50/30 relative overflow-hidden">
      <Header />
      
      {/* Éléments décoratifs flottants */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-gradient-creative opacity-10 blur-3xl animate-float"></div>
        <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-gradient-success opacity-15 blur-3xl animate-float" style={{ animationDelay: "1.5s" }}></div>
        <div className="absolute top-1/3 left-1/4 h-48 w-48 rounded-full bg-gradient-primary opacity-8 blur-2xl animate-spin-very-slow"></div>
      </div>
      
     
      {/* Contrôles et Filtres */}
      <section className="relative z-10 mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-3xl sm:rounded-4xl shadow-strong p-3 sm:p-6">
          {/* Barre de recherche mobile */}
          <div className="mb-4 sm:hidden">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher un article..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 pr-12 text-sm font-medium outline-none transition-all duration-300 focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-12 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Top Controls */}
          <div className="flex flex-col gap-4 mb-4">
            {/* Header avec compteur et filtres actifs */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                  {filteredArticles.length} Article{filteredArticles.length > 1 ? 's' : ''}
                </h2>
                {hasActiveFilters && (
                  <div className="flex flex-wrap items-center gap-2">
                    {searchTerm && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium">
                        &quot;{searchTerm}&quot;
                      </span>
                    )}
                    {selectedCategory !== 'all' && (
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs font-medium">
                        {getCategoryData(selectedCategory).name}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Barre de recherche desktop */}
              <div className="hidden sm:block relative">
                <input
                  type="text"
                  placeholder="Rechercher un article..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm font-medium outline-none transition-all duration-300 focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-8 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Contrôles de tri et vue */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                {/* Tri */}
                <div className="relative flex-1 sm:flex-none">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                    className="w-full sm:w-auto appearance-none bg-gray-50 border border-gray-200 rounded-xl px-3 sm:px-4 py-2.5 pr-8 sm:pr-10 text-sm font-medium outline-none transition-all duration-300 focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="recent">🕒 Plus récent</option>
                    <option value="featured">⭐ À la une</option>
                    <option value="popular">📈 Populaire</option>
                    <option value="alphabetical">📝 A→Z</option>
                  </select>
                  <ChevronDown className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>

                {/* Mode de vue */}
                <div className="flex bg-gray-100 border border-gray-200 rounded-xl p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 sm:p-2.5 rounded-lg transition-all duration-300 ${
                      viewMode === 'grid' ? 'bg-white text-blue-600 shadow-soft' : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 sm:p-2.5 rounded-lg transition-all duration-300 ${
                      viewMode === 'list' ? 'bg-white text-blue-600 shadow-soft' : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`w-full sm:w-auto px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 ${
                  hasActiveFilters 
                    ? "bg-gradient-primary text-white shadow-glow" 
                    : "bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-700"
                }`}
              >
                <span className="flex items-center justify-center sm:justify-start gap-1.5">
                  <Filter className="w-4 h-4" />
                  Catégories
                  {hasActiveFilters && <div className="w-1.5 h-1.5 bg-white/80 rounded-full"></div>}
                </span>
              </button>
            </div>
          </div>

          {/* Panneau Catégories */}
          <div className={`transition-all duration-500 overflow-hidden ${
            isFilterOpen ? "max-h-96 sm:max-h-40 opacity-100" : "max-h-0 opacity-0"
          }`}>
            <div className="border-t border-gray-200/50 pt-4">
              <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`relative group flex flex-col items-center gap-1.5 p-2 sm:p-3 rounded-xl transition-all duration-300 hover:scale-105 overflow-hidden ${
                      selectedCategory === category.id
                        ? "text-white shadow-glow"
                        : "bg-white border border-gray-200 hover:border-gray-300 text-gray-700"
                    }`}
                  >
                    {selectedCategory === category.id && (
                      <div className={`absolute inset-0 ${category.gradient} opacity-90`}></div>
                    )}
                    <span className="relative text-sm sm:text-base">{category.icon}</span>
                    <span className="relative text-xs font-medium leading-none text-center">{category.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="relative z-10 mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 pb-8 sm:pb-12">
        {filteredArticles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 sm:py-16 text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-primary rounded-full flex items-center justify-center mb-4 shadow-glow animate-float">
              <span className="text-xl sm:text-2xl text-white">📰</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Aucun article trouvé</h3>
            <p className="text-gray-600 mb-4 max-w-sm text-sm px-4">
              Modifiez vos critères de recherche ou filtres.
            </p>
            {hasActiveFilters && (
              <button
                onClick={() => {
                  setSelectedCategory('all')
                  setSearchTerm('')
                  setSortBy('recent')
                }}
                className="px-4 sm:px-6 py-2.5 bg-gradient-primary text-white rounded-2xl font-semibold shadow-glow hover:shadow-glow-lg transition-all duration-300 hover:scale-105 text-sm"
              >
                Voir tous les articles
              </button>
            )}
          </div>
        ) : (
          <>
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                {currentArticles.map((article, index) => (
                  <article 
                    key={`${article.id}-${index}`} 
                    className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-soft hover:shadow-strong overflow-hidden transition-all duration-300 hover:scale-105 animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="relative h-32 sm:h-36 overflow-hidden">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      
                      {article.featured && (
                        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-gradient-creative text-white px-2 sm:px-3 py-1 rounded-lg text-xs font-semibold shadow-soft">
                          ⭐ Une
                        </div>
                      )}
                      
                      <div className={`absolute top-2 sm:top-3 right-2 sm:right-3 ${getCategoryData(article.category).gradient} text-white px-2 sm:px-3 py-1 rounded-lg text-xs font-semibold shadow-soft`}>
                        <span className="hidden sm:inline">{getCategoryData(article.category).icon} </span>
                        <span className="sm:hidden">{getCategoryData(article.category).icon}</span>
                        <span className="hidden sm:inline">{getCategoryData(article.category).name}</span>
                      </div>

                      <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 flex items-center gap-2 sm:gap-3 text-white text-xs">
                        <div className="flex items-center gap-1 bg-black/30 px-1.5 sm:px-2 py-1 rounded-lg">
                          <Calendar className="w-3 h-3" />
                          <span className="hidden sm:inline">{formatDate(article.publishedAt)}</span>
                          <span className="sm:hidden">{new Date(article.publishedAt).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })}</span>
                        </div>
                        <div className="flex items-center gap-1 bg-black/30 px-1.5 sm:px-2 py-1 rounded-lg">
                          <Clock className="w-3 h-3" />
                          {article.readTime}min
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 sm:p-4">
                      <h3 className="font-bold text-sm sm:text-base mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
                        {article.title}
                      </h3>
                      
                      <p className="text-gray-600 text-xs mb-3 line-clamp-2 leading-relaxed">
                        {article.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <User className="w-3 h-3" />
                          <span className="font-medium truncate max-w-20 sm:max-w-none">{article.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                            <Bookmark className="w-3.5 h-3.5" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                            <Share2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      
                      <Link 
                        href={`/actualites/${article.id}`}
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-semibold group-hover:gap-3 transition-all"
                      >
                        Lire l&apos;article
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                      
                      {article.tags.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1">
                          {article.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-lg text-xs font-medium">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {currentArticles.map((article, index) => (
                  <article 
                    key={`${article.id}-${index}`} 
                    className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-soft hover:shadow-strong overflow-hidden transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex flex-col lg:flex-row">
                      <div className="relative lg:w-64 h-40 sm:h-48 lg:h-auto overflow-hidden">
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r lg:bg-gradient-to-t from-black/20 to-transparent"></div>
                        
                        {article.featured && (
                          <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-gradient-creative text-white px-2 sm:px-2.5 py-1 rounded-xl text-xs font-semibold shadow-soft">
                            ⭐ À la une
                          </div>
                        )}
                        
                        <div className={`absolute top-2 sm:top-3 right-2 sm:right-3 ${getCategoryData(article.category).gradient} text-white px-2 sm:px-2.5 py-1 rounded-xl text-xs font-semibold shadow-soft`}>
                          <span className="hidden sm:inline">{getCategoryData(article.category).icon} </span>
                          <span className="sm:hidden">{getCategoryData(article.category).icon}</span>
                          <span className="hidden sm:inline">{getCategoryData(article.category).name}</span>
                        </div>
                      </div>
                      
                      <div className="flex-1 p-3 sm:p-4">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-gray-500 mb-2 sm:mb-3">
                          <div className="flex items-center gap-1 sm:gap-1.5">
                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="font-medium">{formatDate(article.publishedAt)}</span>
                          </div>
                          <div className="flex items-center gap-1 sm:gap-1.5">
                            <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="font-medium">{article.readTime} min</span>
                          </div>
                          <div className="flex items-center gap-1 sm:gap-1.5">
                            <User className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="font-medium truncate max-w-24 sm:max-w-none">{article.author}</span>
                          </div>
                        </div>
                        
                        <h3 className="font-bold text-base sm:text-lg mb-2 group-hover:text-blue-600 transition-colors leading-tight">
                          {article.title}
                        </h3>
                        
                        <p className="text-gray-600 mb-3 line-clamp-2 text-sm leading-relaxed">
                          {article.excerpt}
                        </p>
                        
                        {article.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 sm:gap-2 mb-3">
                            {article.tags.slice(0, 4).map((tag) => (
                              <span key={tag} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-xl text-xs font-medium">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                          <Link 
                            href={`/actualites/${article.id}`}
                            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 bg-gradient-primary text-white rounded-xl font-semibold shadow-glow hover:shadow-glow-lg transition-all duration-300 hover:scale-105 text-sm"
                          >
                            Lire l&apos;article
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                          
                          <div className="flex items-center gap-1 sm:gap-2">
                            <button className="p-1.5 sm:p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 sm:p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                              <Bookmark className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 sm:p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                              <Share2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}

        {/* Pagination Moderne */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-2 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200/50">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium shadow-soft"
            >
              ← Précédent
            </button>
            
            <div className="flex items-center gap-1 sm:gap-2">
              {[...Array(totalPages)].map((_, i) => {
                const page = i + 1
                const isVisible = page === 1 || page === totalPages || (page >= currentPage - 2 && page <= currentPage + 2)
                
                if (!isVisible) {
                  if (page === currentPage - 3 || page === currentPage + 3) {
                    return <span key={page} className="px-1 sm:px-2 text-gray-400 font-medium text-sm">...</span>
                  }
                  return null
                }
                
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-medium transition-all text-sm sm:text-base ${
                      currentPage === page
                        ? 'bg-gradient-primary text-white shadow-glow'
                        : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                     }`}
                   >
                    {page}
                   </button>
                 )
               })}
            </div>
            
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium shadow-soft"
            >
              Suivant →
            </button>
          </div>
        )}
      </section>
    </div>
  )
}