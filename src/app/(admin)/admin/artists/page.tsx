"use client"

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Plus, 
  Search,  
  Eye, 
  Edit, 
  Trash2, 
  Music, 
  MapPin, 
  Users, 
  
  Star,
 
  Youtube,
  Instagram,
  
  Grid3X3,
  List
} from 'lucide-react'

interface Artist {
  id: string
  name: string
  slug: string
  imageUrl?: string
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
  albums: Array<{
    id: string
    title: string
    year: number
    coverUrl?: string
    tracksCount: number
    link?: string
  }>
  topTracks?: Array<{
    id: string
    title: string
    duration: string
  }>
  featured: boolean
  status: 'draft' | 'published' | 'archived'
  createdAt: string
  updatedAt: string
}

interface PaginationInfo {
  page: number
  limit: number
  total: number
  pages: number
}

export default function ArtistsPage() {
  const [artists, setArtists] = useState<Artist[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'published' | 'archived'>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 12,
    total: 0,
    pages: 0
  })

  const fetchArtists = useCallback(async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        ...(statusFilter !== 'all' && { status: statusFilter })
      })

      const response = await fetch(`/api/artists?${params}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors du chargement des artistes')
      }

      setArtists(data.artists)
      setPagination(data.pagination)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inattendue')
    } finally {
      setLoading(false)
    }
  }, [pagination.page, pagination.limit, statusFilter])

  useEffect(() => {
    fetchArtists()
  }, [fetchArtists])

  const filteredArtists = artists.filter(artist =>
    artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    artist.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    artist.specialty?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toLocaleString()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800'
      case 'draft': return 'bg-yellow-100 text-yellow-800'
      case 'archived': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'published': return 'Publié'
      case 'draft': return 'Brouillon'
      case 'archived': return 'Archivé'
      default: return status
    }
  }

  if (loading && artists.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-soft p-6">
                  <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 flex items-center gap-2 lg:gap-3">
              <Music className="w-6 h-6 lg:w-8 lg:h-8 text-blue-600" />
              Artistes
            </h1>
            <p className="text-sm lg:text-base text-gray-600 mt-2">
              Gérez votre collection d&apos;artistes et leurs informations
            </p>
          </div>
          <Link
            href="/admin/artists/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors mt-4 lg:mt-0"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Nouvel Artiste</span>
            <span className="sm:hidden">Ajouter</span>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-3 lg:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">Total Artistes</p>
                <p className="text-lg lg:text-xl font-bold text-gray-900">{pagination.total}</p>
              </div>
              <Music className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-3 lg:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">Publiés</p>
                <p className="text-lg lg:text-xl font-bold text-green-600">
                  {artists.filter(a => a.status === 'published').length}
                </p>
              </div>
              <Eye className="w-5 h-5 lg:w-6 lg:h-6 text-green-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-3 lg:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">Brouillons</p>
                <p className="text-lg lg:text-xl font-bold text-yellow-600">
                  {artists.filter(a => a.status === 'draft').length}
                </p>
              </div>
              <Edit className="w-5 h-5 lg:w-6 lg:h-6 text-yellow-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-3 lg:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">Vedettes</p>
                <p className="text-lg lg:text-xl font-bold text-purple-600">
                  {artists.filter(a => a.featured).length}
                </p>
              </div>
              <Star className="w-5 h-5 lg:w-6 lg:h-6 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Rechercher un artiste..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as 'all' | 'draft' | 'published' | 'archived')}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm"
              >
                <option value="all">Tous les statuts</option>
                <option value="published">Publiés</option>
                <option value="draft">Brouillons</option>
                <option value="archived">Archivés</option>
              </select>
              
              {/* View Mode Toggle */}
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-2 py-2 transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                  title="Vue grille"
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-2 py-2 transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                  title="Vue liste"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Artists Display */}
        {filteredArtists.length === 0 ? (
          <div className="text-center py-12">
            <Music className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm ? 'Aucun artiste trouvé' : 'Aucun artiste'}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm 
                ? 'Essayez de modifier vos critères de recherche'
                : 'Commencez par ajouter votre premier artiste'
              }
            </p>
            <Link
              href="/admin/artists/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Ajouter un artiste
            </Link>
          </div>
        ) : viewMode === 'grid' ? (
          // Grid View
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredArtists.map((artist) => (
              <div key={artist.id} className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col h-full">
                {/* Image */}
                <div className="relative h-40 bg-gradient-to-br from-blue-500 to-purple-600">
                  {artist.imageUrl ? (
                    <Image
                      src={artist.imageUrl}
                      alt={artist.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-lg"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center rounded-t-lg">
                      <Music className="w-12 h-12 text-white opacity-50" />
                    </div>
                  )}
                  
                  {/* Status Badge */}
                  <div className="absolute top-2 left-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(artist.status)}`}>
                      {getStatusText(artist.status)}
                    </span>
                  </div>

                  {/* Featured Badge */}
                  {artist.featured && (
                    <div className="absolute top-2 right-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    </div>
                  )}

                  {/* Social Links */}
                  <div className="absolute bottom-2 right-2 flex gap-1">
                    {artist.socials?.youtube && (
                      <a
                        href={artist.socials.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      >
                        <Youtube className="w-3 h-3" />
                      </a>
                    )}
                    {artist.socials?.instagram && (
                      <a
                        href={artist.socials.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors"
                      >
                        <Instagram className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-base font-semibold text-gray-900 mb-2 truncate">
                    {artist.name}
                  </h3>
                  
                  <div className="space-y-1 mb-3">
                    {artist.location && (
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <MapPin className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{artist.location}</span>
                      </div>
                    )}
                    {artist.specialty && (
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <Music className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{artist.specialty}</span>
                      </div>
                    )}
                    {artist.stats?.followers && (
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <Users className="w-3 h-3 flex-shrink-0" />
                        <span>{formatNumber(artist.stats.followers)} abonnés</span>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-gray-600 line-clamp-2 mb-3 min-h-[2rem] flex-1">
                    {artist.biography}
                  </p>

                  {/* Albums & Tracks */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <span>{artist.albums.length} albums</span>
                    <span>{artist.topTracks?.length || 0} top tracks</span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <Link
                      href={`/admin/artists/${artist.slug}`}
                      className="text-blue-600 hover:text-blue-700 text-xs font-medium flex items-center gap-1 px-2 py-1 rounded hover:bg-blue-50 transition-colors"
                    >
                      <span>Voir détails</span>
                    </Link>
                    <div className="flex items-center gap-1">
                      <Link
                        href={`/admin/artists/${artist.slug}/edit`}
                        className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                        title="Modifier"
                      >
                        <Edit className="w-3 h-3" />
                      </Link>
                      <button 
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // List View
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Artiste
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                      Localisation
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                      Spécialité
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                      Abonnés
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                      Albums
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {filteredArtists.map((artist) => (
                    <tr key={artist.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-3 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            {artist.imageUrl ? (
                              <Image
                                src={artist.imageUrl}
                                alt={artist.name}
                                width={40}
                                height={40}
                                className="h-10 w-10 rounded-lg object-cover"
                              />
                            ) : (
                              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                <Music className="w-5 h-5 text-white" />
                              </div>
                            )}
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900 flex items-center gap-1">
                              <span className="truncate max-w-[150px]">{artist.name}</span>
                              {artist.featured && (
                                <Star className="w-3 h-3 text-yellow-400 fill-current flex-shrink-0" />
                              )}
                            </div>
                            <div className="text-xs text-gray-500 truncate max-w-[200px]">
                              {artist.biography}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-xs text-gray-900 hidden sm:table-cell">
                        {artist.location ? (
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-gray-400 flex-shrink-0" />
                            <span className="truncate max-w-[100px]">{artist.location}</span>
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-xs text-gray-900 hidden md:table-cell">
                        <span className="truncate max-w-[120px] block">
                          {artist.specialty || <span className="text-gray-400">-</span>}
                        </span>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-xs text-gray-900 hidden lg:table-cell">
                        {artist.stats?.followers ? (
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3 text-gray-400 flex-shrink-0" />
                            <span>{formatNumber(artist.stats.followers)}</span>
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-xs text-gray-900 hidden md:table-cell">
                        <div className="flex items-center gap-1">
                          <span>{artist.albums.length}</span>
                          <span className="text-gray-400">•</span>
                          <span>{artist.topTracks?.length || 0}</span>
                        </div>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(artist.status)}`}>
                          {getStatusText(artist.status)}
                        </span>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-right text-xs font-medium">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            href={`/admin/artists/${artist.slug}`}
                            className="text-blue-600 hover:text-blue-900 p-1"
                            title="Voir détails"
                          >
                            <Eye className="w-3 h-3" />
                          </Link>
                          <Link
                            href={`/admin/artists/${artist.slug}/edit`}
                            className="text-gray-600 hover:text-blue-600 p-1"
                            title="Modifier"
                          >
                            <Edit className="w-3 h-3" />
                          </Link>
                          <button 
                            className="text-gray-600 hover:text-red-600 p-1"
                            title="Supprimer"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="flex items-center justify-center mt-8">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPagination(prev => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
                  disabled={pagination.page === 1}
                  className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 text-sm"
                >
                  Précédent
                </button>
                
                <span className="px-4 py-2 text-sm text-gray-600">
                  Page {pagination.page} sur {pagination.pages}
                </span>
                
                <button
                  onClick={() => setPagination(prev => ({ ...prev, page: Math.min(pagination.pages, prev.page + 1) }))}
                  disabled={pagination.page === pagination.pages}
                  className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 text-sm"
                >
                  Suivant
                </button>
              </div>
              
              <div className="text-xs text-gray-500">
                {pagination.total} artistes au total
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
