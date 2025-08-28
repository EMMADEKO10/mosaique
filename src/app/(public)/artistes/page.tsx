"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import ArtistCard from "@/components/cards/ArtistCard"
import { getAllArtists } from "@/data/artists"
import Header from "@/components/layout/Header"

type SortKey = "name" | "rank"
type Genre = "tous" | "rumba" | "gospel" | "rap" | "afrobeat" | "rnb" | "soukous" | "urbain"
type ViewMode = "grid" | "list"

export default function ArtistesPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [query, setQuery] = useState("")
  const [sortKey, setSortKey] = useState<SortKey>("rank")
  
  const [genre, setGenre] = useState<Genre>("tous")
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const artists = useMemo(() => {
    const normalized = query.trim().toLowerCase()

    let list = getAllArtists().map((a, index) => ({ 
    ...a, 
    category: a.specialty || 'Musique',
    description: a.biography,
    rank: index + 1,
    trending: Boolean(a.stats?.followers && a.stats.followers > 1000000),
    featured: Boolean(a.stats?.awards && a.stats.awards > 5)
  }))

    if (normalized) {
      list = list.filter(a =>
        a.name.toLowerCase().includes(normalized) ||
        a.location.toLowerCase().includes(normalized) ||
        a.specialty.toLowerCase().includes(normalized)
      )
    }

    

    if (genre !== "tous") {
      const contains = (text: string | undefined, needle: string) =>
        (text ?? "").toLowerCase().includes(needle)

      list = list.filter(a => {
        const spec = a.specialty?.toLowerCase() ?? ""
        switch (genre) {
          case "rumba":
            return contains(spec, "rumba")
          case "gospel":
            return contains(spec, "gospel")
          case "rap":
            return contains(spec, "rap")
          case "afrobeat":
            return contains(spec, "afrobeat") || contains(spec, "afro")
          case "rnb":
            return contains(spec, "r&b") || contains(spec, "rnb") || contains(spec, "soul")
          case "soukous":
            return contains(spec, "soukous")
          case "urbain":
            return contains(spec, "urbain") || contains(spec, "urbain")
          default:
            return true
        }
      })
    }

    list.sort((a, b) => {
      switch (sortKey) {
        case "name":
          return a.name.localeCompare(b.name)
        
        case "rank":
        default:
          return (a.rank ?? Number.MAX_SAFE_INTEGER) - (b.rank ?? Number.MAX_SAFE_INTEGER)
      }
    })

    return list
  }, [query, sortKey, genre])

  

  const genreOptions = [
    { value: "tous", label: "Tous les genres", icon: "🎵" },
    { value: "rumba", label: "Rumba", icon: "🎸" },
    { value: "gospel", label: "Gospel", icon: "🙏" },
    { value: "rap", label: "Rap", icon: "🎤" },
    { value: "afrobeat", label: "Afrobeat", icon: "🥁" },
    { value: "rnb", label: "R&B", icon: "💫" },
    { value: "soukous", label: "Soukous", icon: "🎺" },
    { value: "urbain", label: "Urbain", icon: "🏙️" }
  ]

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 animate-pulse">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10">
          <div className="h-12 bg-gray-200 rounded-xl mb-6"></div>
          <div className="h-32 bg-gray-200 rounded-2xl"></div>
        </div>
      </div>
    )
  }

  const resetFilters = () => {
    setQuery("")
    setSortKey("rank")
    setGenre("tous")
  }

  const hasActiveFilters = query || sortKey !== "rank" || genre !== "tous"

  return (
    <>
    <Header />
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 relative overflow-hidden">
      {/* Éléments décoratifs animés */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-creative rounded-full opacity-10 blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-success rounded-full opacity-15 blur-3xl animate-float" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-primary rounded-full opacity-5 blur-2xl animate-spin-very-slow"></div>
      </div>

      {/* Hero Section Améliorée */}
     

      {/* Barre de recherche et filtres */}
      <section className="relative mt-2 z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-3xl shadow-strong p-6">
          {/* Recherche principale */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <span className="text-gray-400 text-lg">🔍</span>
              </div>
              <input
                type="text"
                placeholder="Rechercher un artiste, une ville, un style musical..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl text-base placeholder-gray-500 outline-none transition-all duration-300 focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 group-hover:border-gray-300"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <span className="text-lg">✕</span>
                </button>
              )}
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                className="px-4 py-4 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-2xl transition-all duration-300 hover:scale-105"
                title={`Basculer vers la vue ${viewMode === "grid" ? "liste" : "grille"}`}
              >
                <span className="text-lg">{viewMode === "grid" ? "📋" : "⬜"}</span>
              </button>
              
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`px-6 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 ${
                  hasActiveFilters 
                    ? "bg-gradient-primary text-white shadow-glow" 
                    : "bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-700"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>🎛️</span>
                  Filtres
                  {hasActiveFilters && <span className="bg-white/30 text-xs px-2 py-1 rounded-full">●</span>}
                </span>
              </button>
            </div>
          </div>

          {/* Panneau de filtres */}
          <div className={`transition-all duration-500 overflow-hidden ${
            isFilterOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}>
            <div className="border-t border-gray-200/50 pt-6 space-y-6">
              {/* Genre sélection avec icônes */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Genre musical</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
                  {genreOptions.map(option => (
                    <button
                      key={option.value}
                      onClick={() => setGenre(option.value as Genre)}
                      className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-300 hover:scale-105 ${
                        genre === option.value
                          ? "bg-gradient-primary text-white shadow-glow"
                          : "bg-gray-50 hover:bg-gray-100 border border-gray-200"
                      }`}
                     >
                      <span className="text-lg">{option.icon}</span>
                      <span className="text-xs font-medium">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Options de tri et filtres */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Trier par</label>
                  <select
                    value={sortKey}
                    onChange={e => setSortKey(e.target.value as SortKey)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none transition-all duration-300 focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10"
                  >
                    <option value="rank">🏆 Classement</option>
                    <option value="name">📝 Nom (A→Z)</option>
                  </select>
                </div>

                <div>
                  
                </div>

                <div className="flex flex-col justify-end">
                  {hasActiveFilters && (
                    <button
                      onClick={resetFilters}
                      className="px-6 py-3 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                    >
                      <span className="flex items-center gap-2">
                        <span>🔄</span>
                        Réinitialiser
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Résultats */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        {/* En-tête des résultats */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-gray-900">
              {artists.length} {artists.length === 1 ? 'Artiste' : 'Artistes'}
              {hasActiveFilters && <span className="text-blue-600"> trouvé{artists.length > 1 ? 's' : ''}</span>}
            </h2>
            {hasActiveFilters && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Filtres actifs:</span>
                <div className="flex gap-1">
                  {query && <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-lg">🔍 &quot;{query}&quot;</span>}
                  {genre !== "tous" && <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-lg">🎵 {genreOptions.find(g => g.value === genre)?.label}</span>}
                  
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Grille/Liste des artistes */}
        {artists.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mb-6 animate-pulse">
              <span className="text-3xl">🎭</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Aucun artiste trouvé</h3>
            <p className="text-gray-600 mb-6 max-w-md">
              Essayez de modifier vos critères de recherche ou de supprimer certains filtres pour découvrir plus d&apos;artistes.
            </p>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="px-6 py-3 bg-gradient-primary text-white rounded-xl font-semibold shadow-glow hover:shadow-glow-lg transition-all duration-300 hover:scale-105"
              >
                Voir tous les artistes
              </button>
            )}
          </div>
        ) : (
          <div className={`transition-all duration-500 ${
            viewMode === "grid"
              ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6"
              : "space-y-4"
          }`}>
            {artists.map((artist, index) => (
              <div
                key={artist.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ArtistCard
                  id={artist.id}
                  name={artist.name}
                  image={artist.image}
                  category={artist.category}
                  description={artist.description}
                  location={artist.location}
                  specialty={artist.specialty}
                  rank={artist.rank}
                  trending={artist.trending}
                  featured={artist.featured}
                  compact={viewMode === "grid"}
                  href={`/artistes/${artist.id}`}
                />
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
    </>
  )
}