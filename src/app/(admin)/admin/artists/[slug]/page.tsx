"use client"

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  Music, 
  MapPin, 
  Users, 
  Calendar,
  Star,
  ExternalLink,
  Youtube,
  Instagram,
  Facebook,
  Twitter,
  Globe,
  Award,
  Play,
  Disc,
  Clock
} from 'lucide-react'

interface Artist {
  id: string
  name: string
  slug: string
  imageUrl?: string
  imagePublicId?: string
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

export default function ArtistDetailPage() {
  const params = useParams()
  const [artist, setArtist] = useState<Artist | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (params.slug) {
      fetchArtist(params.slug as string)
    }
  }, [params.slug])

  const fetchArtist = async (slug: string) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/artists/${slug}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Artiste non trouvé')
      }

      setArtist(data.artist)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inattendue')
    } finally {
      setLoading(false)
    }
  }

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-6">
              <div className="h-40 sm:h-48 md:h-56 lg:h-64 bg-gray-200 rounded-lg mb-6"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
              <div className="h-20 bg-gray-200 rounded mb-6"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                <div className="h-16 bg-gray-200 rounded"></div>
                <div className="h-16 bg-gray-200 rounded"></div>
                <div className="h-16 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !artist) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <Music className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              {error || 'Artiste non trouvé'}
            </h1>
            <p className="text-sm text-gray-600 mb-6">
              L&apos;artiste que vous recherchez n&apos;existe pas ou a été supprimé.
            </p>
            <Link
              href="/admin/artists"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour aux artistes
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <Link
            href="/admin/artists"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Retour aux artistes</span>
            <span className="sm:hidden">Retour</span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href={`/admin/artists/${artist.slug}/edit`}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm"
            >
              <Edit className="w-4 h-4" />
              <span className="hidden sm:inline">Modifier</span>
              <span className="sm:hidden">Éditer</span>
            </Link>
            <button className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors text-sm">
              <Trash2 className="w-4 h-4" />
              <span className="hidden sm:inline">Supprimer</span>
              <span className="sm:hidden">Suppr.</span>
            </button>
          </div>
        </div>

        {/* Artist Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          {/* Hero Section */}
          <div className="relative h-40 sm:h-48 md:h-56 lg:h-64 bg-gradient-to-br from-blue-500 to-purple-600">
            {artist.imageUrl ? (
              <Image
                src={artist.imageUrl}
                alt={artist.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Music className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-white opacity-50" />
              </div>
            )}
            
            {/* Status Badge */}
            <div className="absolute top-3 left-3">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(artist.status)}`}>
                {getStatusText(artist.status)}
              </span>
            </div>

            {/* Featured Badge */}
            {artist.featured && (
              <div className="absolute top-3 right-3">
                <div className="flex items-center gap-1 px-2 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-medium">
                  <Star className="w-3 h-3 fill-current" />
                  <span className="hidden sm:inline">Vedette</span>
                </div>
              </div>
            )}

            {/* Social Links */}
            <div className="absolute bottom-2 right-2 flex gap-1">
              {artist.socials?.youtube && (
                <a
                  href={artist.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  title="YouTube"
                >
                  <Youtube className="w-3 h-3" />
                </a>
              )}
              {artist.socials?.instagram && (
                <a
                  href={artist.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors"
                  title="Instagram"
                >
                  <Instagram className="w-3 h-3" />
                </a>
              )}
              {artist.socials?.facebook && (
                <a
                  href={artist.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                  title="Facebook"
                >
                  <Facebook className="w-3 h-3" />
                </a>
              )}
              {artist.socials?.twitter && (
                <a
                  href={artist.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition-colors"
                  title="Twitter"
                >
                  <Twitter className="w-3 h-3" />
                </a>
              )}
              {artist.socials?.tiktok && (
                <a
                  href={artist.socials.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
                  title="TikTok"
                >
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                </a>
              )}
              {artist.socials?.website && (
                <a
                  href={artist.socials.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors"
                  title="Site web"
                >
                  <Globe className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6">
            {/* Basic Info */}
            <div className="mb-6">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3">{artist.name}</h1>
              
              {/* Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-4">
                {artist.location && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{artist.location}</span>
                  </div>
                )}
                {artist.specialty && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Music className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{artist.specialty}</span>
                  </div>
                )}
                {artist.label && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Disc className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{artist.label}</span>
                  </div>
                )}
                {artist.yearsActive && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4 flex-shrink-0" />
                    <span>{artist.yearsActive}</span>
                  </div>
                )}
              </div>

              {/* Biography */}
              <div className="bg-gray-50 rounded-lg p-3 mb-6">
                              <p className="text-sm text-gray-700 leading-relaxed">{artist.biography}</p>
            </div>

            {/* Social Media Links */}
            {artist.socials && Object.values(artist.socials).some(social => social) && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Réseaux sociaux
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {artist.socials.youtube && (
                    <a
                      href={artist.socials.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <div className="p-2 bg-red-500 text-white rounded-full">
                        <Youtube className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">YouTube</p>
                        <p className="text-xs text-gray-600 truncate">{artist.socials.youtube}</p>
                      </div>
                    </a>
                  )}
                  {artist.socials.instagram && (
                    <a
                      href={artist.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-pink-50 border border-pink-200 rounded-lg hover:bg-pink-100 transition-colors"
                    >
                      <div className="p-2 bg-pink-500 text-white rounded-full">
                        <Instagram className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Instagram</p>
                        <p className="text-xs text-gray-600 truncate">{artist.socials.instagram}</p>
                      </div>
                    </a>
                  )}
                  {artist.socials.facebook && (
                    <a
                      href={artist.socials.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <div className="p-2 bg-blue-600 text-white rounded-full">
                        <Facebook className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Facebook</p>
                        <p className="text-xs text-gray-600 truncate">{artist.socials.facebook}</p>
                      </div>
                    </a>
                  )}
                  {artist.socials.twitter && (
                    <a
                      href={artist.socials.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-sky-50 border border-sky-200 rounded-lg hover:bg-sky-100 transition-colors"
                    >
                      <div className="p-2 bg-sky-500 text-white rounded-full">
                        <Twitter className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Twitter</p>
                        <p className="text-xs text-gray-600 truncate">{artist.socials.twitter}</p>
                      </div>
                    </a>
                  )}
                  {artist.socials.tiktok && (
                    <a
                      href={artist.socials.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="p-2 bg-black text-white rounded-full">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">TikTok</p>
                        <p className="text-xs text-gray-600 truncate">{artist.socials.tiktok}</p>
                      </div>
                    </a>
                  )}
                  {artist.socials.website && (
                    <a
                      href={artist.socials.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="p-2 bg-gray-600 text-white rounded-full">
                        <Globe className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Site web</p>
                        <p className="text-xs text-gray-600 truncate">{artist.socials.website}</p>
                      </div>
                    </a>
                  )}
                </div>
              </div>
            )}
            </div>

            {/* Stats */}
            {artist.stats && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Statistiques
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {artist.stats.followers && (
                    <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        <div>
                          <p className="text-xs font-medium text-blue-600">Abonnés</p>
                          <p className="text-lg font-bold text-gray-900">{formatNumber(artist.stats.followers)}</p>
                          <p className="text-xs text-gray-500">{artist.stats.followers.toLocaleString()} exact</p>
                        </div>
                      </div>
                    </div>
                  )}
                  {artist.stats.monthlyListeners && (
                    <div className="bg-green-50 rounded-lg p-3 border border-green-100">
                      <div className="flex items-center gap-2">
                        <Play className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <div>
                          <p className="text-xs font-medium text-green-600">Auditeurs mensuels</p>
                          <p className="text-lg font-bold text-gray-900">{formatNumber(artist.stats.monthlyListeners)}</p>
                          <p className="text-xs text-gray-500">{artist.stats.monthlyListeners.toLocaleString()} exact</p>
                        </div>
                      </div>
                    </div>
                  )}
                  {artist.stats.awards && (
                    <div className="bg-purple-50 rounded-lg p-3 border border-purple-100">
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-purple-600 flex-shrink-0" />
                        <div>
                          <p className="text-xs font-medium text-purple-600">Récompenses</p>
                          <p className="text-lg font-bold text-gray-900">{artist.stats.awards}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Albums */}
            {artist.albums.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Disc className="w-5 h-5" />
                  Albums ({artist.albums.length})
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {artist.albums.map((album) => (
                    <div key={album.id} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <div className="flex items-start gap-3">
                        {album.coverUrl ? (
                          <Image
                            src={album.coverUrl}
                            alt={album.title}
                            width={40}
                            height={40}
                            className="w-10 h-10 rounded object-cover flex-shrink-0"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-gray-300 rounded flex items-center justify-center flex-shrink-0">
                            <Music className="w-5 h-5 text-gray-500" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 text-sm truncate">{album.title}</h3>
                          <p className="text-xs text-gray-600">{album.year}</p>
                          <p className="text-xs text-gray-500">{album.tracksCount} pistes</p>
                        </div>
                        {album.link && (
                          <a
                            href={album.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-700 flex-shrink-0"
                            title="Voir l'album"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Top Tracks */}
            {artist.topTracks && artist.topTracks.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Top Tracks ({artist.topTracks.length})
                </h2>
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  {artist.topTracks.map((track, index) => (
                    <div key={track.id} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <span className="text-xs font-medium text-gray-500 w-4 flex-shrink-0">{index + 1}</span>
                        <span className="font-medium text-gray-900 text-sm truncate">{track.title}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500 flex-shrink-0">
                        <Clock className="w-3 h-3" />
                        <span>{track.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technical Info */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Informations techniques
              </h2>
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="font-medium text-gray-700">ID MongoDB :</span>
                    <p className="text-gray-600 font-mono break-all">{artist.id}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Slug :</span>
                    <p className="text-gray-600 font-mono">{artist.slug}</p>
                  </div>
                  {artist.imagePublicId && (
                    <div className="sm:col-span-2">
                      <span className="font-medium text-gray-700">ID Image Cloudinary :</span>
                      <p className="text-gray-600 font-mono break-all">{artist.imagePublicId}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Metadata */}
            <div className="border-t border-gray-200 pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-500">
                <div>
                  <span className="font-medium">Créé le :</span> {new Date(artist.createdAt).toLocaleDateString('fr-FR')}
                </div>
                <div>
                  <span className="font-medium">Modifié le :</span> {new Date(artist.updatedAt).toLocaleDateString('fr-FR')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
