'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/layout/Header'
import { getArtistById, getRelatedArtists, type ArtistDetails } from '@/data/artists'

import { ArrowLeft, Calendar, Disc3, MapPin, Music2, Share2, Users2 } from 'lucide-react'

export default function ArtistDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const [artist, setArtist] = useState<ArtistDetails | null>(null)
  const [related, setRelated] = useState<ArtistDetails[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const load = () => {
      setIsLoading(true)
      const id = String(params.id)
      const a = getArtistById(id)
      if (a) {
        setArtist(a)
        setRelated(getRelatedArtists(id, 4))
      }
      setIsLoading(false)
    }
    load()
  }, [params.id])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 w-40 bg-gray-200 rounded mb-6" />
            <div className="h-72 bg-gray-200 rounded-2xl" />
          </div>
        </div>
      </div>
    )
  }

  if (!artist) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Artiste introuvable</h1>
            <Link href="/artistes" className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <ArrowLeft className="w-4 h-4" /> Retour à la liste
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <button onClick={() => router.back()} className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900">
          <ArrowLeft className="w-4 h-4" /> Retour
        </button>

        <section className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl shadow-sm ring-1 ring-black/5 overflow-hidden">
              <div className="relative h-64">
                <Image src={artist.image} alt={artist.name} fill className="object-cover" />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{artist.name}</h1>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mt-2">
                      {artist.location && (
                        <span className="inline-flex items-center gap-1"><MapPin className="w-4 h-4" /> {artist.location}</span>
                      )}
                      {artist.specialty && (
                        <span className="inline-flex items-center gap-1"><Music2 className="w-4 h-4" /> {artist.specialty}</span>
                      )}
                      {artist.stats?.followers && (
                        <span className="inline-flex items-center gap-1"><Users2 className="w-4 h-4" /> {artist.stats.followers.toLocaleString()} abonnés</span>
                      )}
                    </div>
                  </div>
                  <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 ring-1 ring-gray-200 text-gray-700">
                    <Share2 className="w-4 h-4" /> Partager
                  </button>
                </div>

                {/* Bio */}
                <div className="mt-5 text-gray-700 leading-relaxed">
                  {artist.biography}
                </div>

                {/* Stats */}
                {artist.stats && (
                  <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="rounded-xl bg-gray-50 p-4 text-center">
                      <div className="text-2xl font-bold text-gray-900">{artist.stats.monthlyListeners?.toLocaleString() ?? '—'}</div>
                      <div className="text-xs text-gray-500">Auditeurs mensuels</div>
                    </div>
                    <div className="rounded-xl bg-gray-50 p-4 text-center">
                      <div className="text-2xl font-bold text-gray-900">{artist.stats.followers?.toLocaleString() ?? '—'}</div>
                      <div className="text-xs text-gray-500">Abonnés</div>
                    </div>
                    <div className="rounded-xl bg-gray-50 p-4 text-center">
                      <div className="text-2xl font-bold text-gray-900">{artist.stats.awards ?? '—'}</div>
                      <div className="text-xs text-gray-500">Récompenses</div>
                    </div>
                  </div>
                )}

                {/* Top tracks */}
                {artist.topTracks && artist.topTracks.length > 0 && (
                  <div className="mt-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">Titres populaires</h2>
                    <ul className="divide-y divide-gray-100 rounded-xl ring-1 ring-gray-100 overflow-hidden">
                      {artist.topTracks.map(t => (
                        <li key={t.id} className="flex items-center justify-between gap-4 bg-white px-4 py-3">
                          <div className="flex items-center gap-3">
                            <Disc3 className="w-4 h-4 text-gray-400" />
                            <span className="font-medium text-gray-800">{t.title}</span>
                          </div>
                          <span className="text-sm text-gray-500">{t.duration}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Albums */}
                <div className="mt-8">
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">Albums</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {artist.albums.map(album => (
                      <div key={album.id} className="group rounded-xl overflow-hidden bg-white ring-1 ring-gray-200 hover:shadow-md transition">
                        <div className="relative w-full h-40">
                          <Image src={album.coverUrl} alt={album.title} fill className="object-cover" />
                        </div>
                        <div className="p-3">
                          <div className="text-sm font-semibold text-gray-900 line-clamp-1">{album.title}</div>
                          <div className="text-xs text-gray-500">{album.year} • {album.tracksCount} titres</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-16">
              <div className="mb-6 rounded-2xl bg-white ring-1 ring-black/5 p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Renseignements</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  {artist.yearsActive && <li><span className="text-gray-500">Période: </span>{artist.yearsActive}</li>}
                  {artist.label && <li><span className="text-gray-500">Label: </span>{artist.label}</li>}
                  {artist.socials?.website && (
                    <li>
                      <a href={artist.socials.website} target="_blank" className="text-blue-600 hover:underline">Site officiel</a>
                    </li>
                  )}
                </ul>
              </div>

              {related.length > 0 && (
                <div className="rounded-2xl bg-white ring-1 ring-black/5 p-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Artistes similaires</h3>
                  <div className="space-y-3">
                    {related.map(r => (
                      <Link key={r.id} href={`/artistes/${r.id}`} className="flex items-center gap-3 group">
                        <div className="relative w-14 h-14 rounded-lg overflow-hidden ring-1 ring-gray-200">
                          <Image src={r.image} alt={r.name} fill className="object-cover" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium text-gray-900 group-hover:text-blue-600 truncate">{r.name}</div>
                          <div className="text-xs text-gray-500 truncate">{r.specialty ?? 'Artiste'}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </section>

        <div className="mt-10 text-center">
          <Link href="/artistes" className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <ArrowLeft className="w-4 h-4" /> Voir tous les artistes
          </Link>
        </div>
      </div>
    </div>
  )
}


