'use client'

import { useState } from 'react'
import { 
  Trophy, 
  Star, 
  Vote,
  ChevronRight,
  Music,
  Mic,
  TrendingUp,
  Zap,
  Sword,
  Calendar,
  Headphones,
  Volume2,
  Heart
} from 'lucide-react'
import Header from '../../../components/layout/Header'
import { 
  getVoteDataByCategory, 
  voteForItem, 
  getCategoryStats,
  type Song,
  type Artist,
  type Battle
} from '../../../data/votesData'

// Types pour les catégories de vote
interface VoteCategory {
  id: string
  title: string
  description: string
  type: 'song' | 'artist' | 'battle'
  icon: React.ComponentType<{className?: string}>
  color: string
  period: string
  featured: boolean
}

// Données pour les catégories de vote
const voteCategories: VoteCategory[] = [
  {
    id: 'meilleur-chanson-mois',
    title: 'Meilleure Chanson du Mois',
    description: 'Votez pour la chanson qui vous a le plus marqué ce mois-ci',
    type: 'song',
    icon: Music,
    color: 'from-blue-600 to-indigo-600',
    period: 'Décembre 2024',
    featured: true
  },
  {
    id: 'meilleur-chanson-annee',
    title: 'Meilleure Chanson de l\'Année',
    description: 'La chanson congolaise qui a dominé toute l\'année 2024',
    type: 'song',
    icon: Trophy,
    color: 'from-yellow-600 to-orange-600',
    period: '2024',
    featured: true
  },
  {
    id: 'battle-congo',
    title: 'Battle Congo',
    description: 'Confrontation directe entre deux artistes avec leurs derniers hits',
    type: 'battle',
    icon: Sword,
    color: 'from-red-600 to-pink-600',
    period: 'En cours',
    featured: true
  },
  {
    id: 'derby-rap-congo',
    title: 'Derby Rap Congo',
    description: 'Le clash ultime entre les rappeurs congolais',
    type: 'battle',
    icon: Mic,
    color: 'from-purple-600 to-violet-600',
    period: 'Finale',
    featured: true
  },
  {
    id: 'battle-kinois-rap',
    title: 'Battle Kinois - Rap',
    description: 'Les rappeurs de Kinshasa s\'affrontent',
    type: 'battle',
    icon: Zap,
    color: 'from-green-600 to-teal-600',
    period: 'Live',
    featured: false
  },
  {
    id: 'battle-kinois-rumba',
    title: 'Battle Kinois - Rumba',
    description: 'La rumba kinoise à l\'honneur',
    type: 'battle',
    icon: Headphones,
    color: 'from-cyan-600 to-blue-600',
    period: 'Live',
    featured: false
  },
  {
    id: 'battle-kinois-urbain',
    title: 'Battle Kinois - Urbain',
    description: 'Musique urbaine de la capitale',
    type: 'battle',
    icon: Volume2,
    color: 'from-pink-600 to-rose-600',
    period: 'Live',
    featured: false
  }
]

// Composants pour les différents types de vote
interface VoteSectionProps {
  onVote: (itemId: string) => void
  votedItems: Set<string>
}

// Section de vote pour les chansons
function SongsVoteSection({ songs, onVote, votedItems }: VoteSectionProps & { songs: Song[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {songs.map((song, index) => (
        <div key={song.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-slate-200">
          <div className="relative">
            <img 
              src={song.coverUrl} 
              alt={song.title}
              className="w-full h-48 object-cover"
            />
            <div className="absolute top-3 left-3 bg-black/70 text-white px-2 py-1 rounded-full text-sm font-semibold">
              #{index + 1}
            </div>
            <div className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded-full text-sm font-semibold">
              {song.duration}
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-bold text-lg text-slate-900 mb-1">{song.title}</h3>
            <p className="text-slate-600 mb-2">{song.artist}</p>
            <div className="flex items-center justify-between text-sm text-slate-500 mb-3">
              <span>{song.genre}</span>
              <span>{song.streams?.toLocaleString()} streams</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Vote className="w-4 h-4 text-blue-600" />
                <span className="font-semibold text-blue-600">{song.votes?.toLocaleString()} votes</span>
              </div>
              <button
                onClick={() => onVote(song.id)}
                disabled={votedItems.has(song.id)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  votedItems.has(song.id)
                    ? 'bg-green-100 text-green-700 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {votedItems.has(song.id) ? '✓ Voté' : 'Voter'}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// Section de vote pour les artistes
function ArtistsVoteSection({ artists, onVote, votedItems }: VoteSectionProps & { artists: Artist[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {artists.map((artist) => (
        <div key={artist.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-slate-200">
          <div className="relative">
            <img 
              src={artist.image} 
              alt={artist.name}
              className="w-full h-48 object-cover"
            />
            <div className="absolute top-3 left-3 bg-black/70 text-white px-2 py-1 rounded-full text-sm font-semibold">
              #{artist.rank}
            </div>
            {artist.trending && (
              <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
                🔥 Trending
              </div>
            )}
          </div>
          <div className="p-4">
            <h3 className="font-bold text-lg text-slate-900 mb-1">{artist.name}</h3>
            <p className="text-slate-600 text-sm mb-2">{artist.location} • {artist.specialty}</p>
            <p className="text-slate-500 text-sm mb-3 line-clamp-2">{artist.description}</p>
            <div className="flex items-center justify-between text-sm text-slate-500 mb-3">
              <span>{artist.socialMedia.followers.toLocaleString()} followers</span>
              <span>{artist.socialMedia.engagement}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Heart className="w-4 h-4 text-red-500" />
                <span className="font-semibold text-red-500">{artist.votes.toLocaleString()} votes</span>
              </div>
              <button
                onClick={() => onVote(artist.id)}
                disabled={votedItems.has(artist.id)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  votedItems.has(artist.id)
                    ? 'bg-green-100 text-green-700 cursor-not-allowed'
                    : 'bg-red-500 text-white hover:bg-red-600'
                }`}
              >
                {votedItems.has(artist.id) ? '✓ Voté' : 'Voter'}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// Section de vote pour les battles
function BattlesVoteSection({ battles, onVote, votedItems }: VoteSectionProps & { battles: Battle[] }) {
  return (
    <div className="space-y-8">
      {battles.map((battle) => (
        <div key={battle.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
          <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">{battle.title}</h3>
                <p className="text-red-100">{battle.description}</p>
              </div>
              <div className="text-right">
                <div className="text-sm opacity-90">Se termine le</div>
                <div className="font-semibold">{new Date(battle.endDate).toLocaleDateString('fr-FR')}</div>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Artiste 1 */}
              <div className="text-center">
                <img 
                  src={battle.artist1.image} 
                  alt={battle.artist1.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-blue-200"
                />
                <h4 className="text-lg font-bold text-slate-900">{battle.artist1.name}</h4>
                <p className="text-slate-600 text-sm">{battle.artist1.location} • {battle.artist1.style}</p>
                <p className="text-blue-600 font-semibold mt-2">{battle.artist1.votes.toLocaleString()} votes</p>
                <button
                  onClick={() => onVote(battle.artist1.id)}
                  disabled={votedItems.has(battle.artist1.id)}
                  className={`mt-3 px-6 py-2 rounded-lg font-semibold transition-all ${
                    votedItems.has(battle.artist1.id)
                      ? 'bg-green-100 text-green-700 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {votedItems.has(battle.artist1.id) ? '✓ Voté' : 'Voter'}
                </button>
              </div>

              {/* Artiste 2 */}
              <div className="text-center">
                <img 
                  src={battle.artist2.image} 
                  alt={battle.artist2.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-red-200"
                />
                <h4 className="text-lg font-bold text-slate-900">{battle.artist2.name}</h4>
                <p className="text-slate-600 text-sm">{battle.artist2.location} • {battle.artist2.style}</p>
                <p className="text-red-600 font-semibold mt-2">{battle.artist2.votes.toLocaleString()} votes</p>
                <button
                  onClick={() => onVote(battle.artist2.id)}
                  disabled={votedItems.has(battle.artist2.id)}
                  className={`mt-3 px-6 py-2 rounded-lg font-semibold transition-all ${
                    votedItems.has(battle.artist2.id)
                      ? 'bg-green-100 text-green-700 cursor-not-allowed'
                      : 'bg-red-500 text-white hover:bg-red-600'
                  }`}
                >
                  {votedItems.has(battle.artist2.id) ? '✓ Voté' : 'Voter'}
                </button>
              </div>
            </div>

            {/* Barre de progression */}
            <div className="mt-6">
              <div className="flex justify-between text-sm font-semibold mb-2">
                <span className="text-blue-600">{((battle.artist1.votes / battle.totalVotes) * 100).toFixed(1)}%</span>
                <span className="text-red-600">{((battle.artist2.votes / battle.totalVotes) * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div className="h-full flex">
                  <div 
                    className="bg-blue-500" 
                    style={{ width: `${(battle.artist1.votes / battle.totalVotes) * 100}%` }}
                  ></div>
                  <div 
                    className="bg-red-500" 
                    style={{ width: `${(battle.artist2.votes / battle.totalVotes) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="text-center mt-2">
                <span className="text-sm text-slate-500">Total: {battle.totalVotes.toLocaleString()} votes</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function VotePage() {
  const [activeVoteCategory, setActiveVoteCategory] = useState<string>('')
  const [showCategories, setShowCategories] = useState(true)
  const [votedItems, setVotedItems] = useState<Set<string>>(new Set())

  // Obtenir la catégorie active
  const activeCategory = voteCategories.find(cat => cat.id === activeVoteCategory)
  
  // Obtenir les données de la catégorie active
  const categoryData = activeVoteCategory ? getVoteDataByCategory(activeVoteCategory) : null
  const categoryStats = activeVoteCategory ? getCategoryStats(activeVoteCategory) : null

  // Fonction pour voter
  const handleVote = (itemId: string) => {
    if (votedItems.has(itemId) || !activeVoteCategory) return
    
    const success = voteForItem(activeVoteCategory, itemId)
    if (success) {
      setVotedItems(prev => new Set([...prev, itemId]))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/20">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-6 overflow-hidden bg-cover bg-center bg-no-repeat" style={{backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.6)), url('/mosaique/Fally capture.png')"}}>
        {/* Decorative Musical Notes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-16 left-1/4 text-yellow-400/30 text-3xl animate-pulse">♪</div>
          <div className="absolute bottom-16 right-1/4 text-yellow-400/30 text-2xl animate-pulse" style={{animationDelay: '1s'}}>♫</div>
          <div className="absolute top-1/2 right-1/3 text-yellow-400/30 text-xl animate-pulse" style={{animationDelay: '0.5s'}}>♬</div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
          {/* Badge principal */}
          <div className="inline-flex items-center space-x-2 bg-white/15 backdrop-blur-md px-4 py-2 rounded-full mb-3 shadow-lg border border-yellow-400/30">
            <Vote className="w-4 h-4 text-yellow-400" />
            <span className="font-semibold text-sm">La Grande Mosaïque</span>
            <Trophy className="w-4 h-4 text-yellow-400" />
          </div>
          
          {/* Titre principal avec effet gradient */}
          <div className="mb-3">
            <h1 className="text-2xl lg:text-4xl font-black mb-1 leading-tight">
              {showCategories ? (
                <>
                  <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-orange-400 bg-clip-text text-transparent">
                    Vote
                  </span>
                  <br />
                  <span className="text-white drop-shadow-lg">
                    Congo
                  </span>
                </>
              ) : (
                <>
                  <span className="bg-gradient-to-r from-red-300 via-white to-red-300 bg-clip-text text-transparent animate-gradient">
                    Battle
                  </span>
                  <br />
                  <span className="bg-white/90 text-transparent bg-clip-text px-6 py-3 rounded-4xl shadow-glow-lg border-2 border-white/30 inline-block">
                    Arena
                  </span>
                </>
              )}
            </h1>
            
            {/* Sous-titre stylé */}
            <div className="max-w-2xl mx-auto">
              <p className="text-sm lg:text-base mb-2 leading-relaxed font-medium text-white/95 drop-shadow-lg">
                {showCategories 
                  ? "🎵 Découvrez nos différentes catégories de vote et soutenez vos artistes préférés ! 🇨🇩"
                  : activeCategory?.description || "⚔️ Participez aux votes et battles de la musique congolaise ! 🔥"
                }
              </p>
              
              <div className="flex items-center justify-center space-x-4 text-sm font-semibold text-yellow-300">
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 animate-pulse" />
                  <span>En Direct</span>
                </div>
                <div className="w-1 h-1 bg-yellow-300 rounded-full animate-pulse"></div>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-3 h-3 animate-pulse" />
                  <span>Temps Réel</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation stylée */}
          <div className="flex justify-center mb-4">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-1 flex shadow-lg border border-white/10">
              <button
                onClick={() => {
                  setShowCategories(true)
                  setActiveVoteCategory('')
                }}
                className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  showCategories 
                    ? 'bg-white text-blue-600 shadow-md' 
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                🗳️ Catégories
              </button>
              {activeCategory && (
                <button
                  onClick={() => setShowCategories(false)}
                  className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center space-x-2 ${
                    !showCategories 
                      ? 'bg-white text-blue-600 shadow-md' 
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {activeCategory && <activeCategory.icon className="w-4 h-4" />}
                  <span>{activeCategory?.title}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Section Vote */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {showCategories ? (
            /* Affichage des catégories de vote */
            <div>
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-neutral-900 mb-4">
                  Catégories de Vote
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Choisissez votre catégorie et participez aux votes qui vous passionnent
                </p>
              </div>

              {/* Catégories Featured */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center">
                  <Star className="w-6 h-6 mr-2 text-yellow-500" />
                  Votes Populaires
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {voteCategories.filter(cat => cat.featured).map((category) => (
                    <div
                      key={category.id}
                      onClick={() => {
                        setActiveVoteCategory(category.id)
                        setShowCategories(false)
                      }}
                      className="group cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200 overflow-hidden"
                    >
                      <div className={`h-32 bg-gradient-to-r ${category.color} relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-black/20"></div>
                        <div className="relative z-10 h-full flex items-center justify-center">
                          <category.icon className="w-12 h-12 text-white" />
                        </div>
                        <div className="absolute top-3 right-3">
                          <div className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                            <span className="text-white text-sm font-semibold">{category.period}</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <h4 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-purple-600 transition-colors">
                          {category.title}
                        </h4>
                        <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                          {category.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            category.type === 'battle' 
                              ? 'bg-red-100 text-red-700' 
                              : category.type === 'song'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-green-100 text-green-700'
                          }`}>
                            {category.type === 'battle' ? '⚔️ Battle' : category.type === 'song' ? '🎵 Chanson' : '👤 Artiste'}
                          </span>
                          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-purple-600 transition-colors" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Autres catégories */}
              <div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center">
                  <Music className="w-6 h-6 mr-2 text-purple-500" />
                  Autres Catégories
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {voteCategories.filter(cat => !cat.featured).map((category) => (
                    <div
                      key={category.id}
                      onClick={() => {
                        setActiveVoteCategory(category.id)
                        setShowCategories(false)
                      }}
                      className="group cursor-pointer bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-slate-200 p-4"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center`}>
                          <category.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-neutral-900 group-hover:text-purple-600 transition-colors">
                            {category.title}
                          </h4>
                          <p className="text-sm text-slate-600">{category.period}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600 transition-colors" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : activeCategory ? (
            /* Affichage du contenu de vote */
            <div>
              {/* En-tête de la catégorie */}
              <div className={`bg-gradient-to-r ${activeCategory?.color} rounded-2xl p-8 mb-8 text-white`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">{activeCategory?.title}</h2>
                    <p className="text-lg opacity-90 mb-4">{activeCategory?.description}</p>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-5 h-5" />
                        <span>Période: {activeCategory?.period}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-5 h-5" />
                        <span>
                          {categoryStats
                            ? `${categoryStats.totalItems} ${categoryStats.type === 'battles' ? 'battle(s)' : categoryStats.type === 'songs' ? 'chansons' : 'artistes'}`
                            : '0 éléments'
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <button
                      onClick={() => setShowCategories(true)}
                      className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-xl transition-all"
                    >
                      ← Retour aux catégories
                    </button>
                  </div>
                </div>
              </div>

              {/* Contenu dynamique selon le type */}
              {categoryData && (
                <div className="space-y-6">
                  {categoryData.type === 'songs' && (
                    <SongsVoteSection 
                      songs={categoryData.data as Song[]} 
                      onVote={handleVote}
                      votedItems={votedItems}
                    />
                  )}
                  
                  {categoryData.type === 'artists' && (
                    <ArtistsVoteSection 
                      artists={categoryData.data as Artist[]} 
                      onVote={handleVote}
                      votedItems={votedItems}
                    />
                  )}
                  
                  {categoryData.type === 'battles' && (
                    <BattlesVoteSection 
                      battles={categoryData.data as Battle[]} 
                      onVote={handleVote}
                      votedItems={votedItems}
                    />
                  )}
                </div>
              )}
            </div>
          ) : null}
        </div>
      </section>
    </div>
  )
}