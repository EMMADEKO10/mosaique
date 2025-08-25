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
  Music,
  Palette,
  Camera,
  BookOpen,
  Crown,
  Zap
} from 'lucide-react'
import Header from '../components/layout/Header'
import { getFeaturedArticles, getAllArticles } from '../data/actualites'
import Image from 'next/image'

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0)
  const [isClient, setIsClient] = useState(false)

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
      {/* Header Component */}
      <Header />

      {/* Hero Section Spectaculaire */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-purple/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Contenu principal */}
            <div className={`text-left transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              {/* Badge de nouveauté */}
              <div className="inline-flex items-center space-x-2 bg-gradient-creative text-white px-8 py-3 rounded-full text-sm font-semibold mb-8 shadow-glow animate-fade-in-down">
                <Crown className="w-5 h-5" />
                <span>La Première Plateforme Culturelle Congolaise</span>
                <Zap className="w-5 h-5" />
              </div>
              
              {/* Titre principal */}
              <h1 className="text-5xl lg:text-7xl font-bold text-neutral-900 mb-8 leading-none">
                <span className="block">Découvrez la</span>
                <span className="block bg-gradient-creative bg-clip-text text-transparent animate-gradient">
                  Grande Mosaïque
                </span>
                <span className="block text-4xl lg:text-5xl text-neutral-700">culturelle du Congo</span>
              </h1>
              
              {/* Sous-titre */}
              <p className="text-xl text-neutral-600 max-w-2xl mb-12 leading-relaxed">
                <span className="text-2xl">🎨 Explorez • 🎵 Célébrez • 🏆 Votez</span>
                <br />
                pour les talents artistiques exceptionnels du Congo
                <br />
                <span className="text-lg text-neutral-500 mt-2 block">
                  Une plateforme qui unit tradition et modernité dans un écrin numérique unique
                </span>
              </p>
              
              {/* Boutons d'action */}
              <div className="flex flex-col sm:flex-row gap-6 items-start">
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

            {/* Carrousel avec actualités défilantes */}
            <div className="relative flex items-center justify-center">
              <div className="relative w-[500px] h-[500px] lg:w-[600px] lg:h-[600px]">
                {/* Cercle de base */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-50 via-white to-purple-50 shadow-2xl border border-slate-200/30"></div>
                
                {/* Orbite guide (optionnel) */}
                <div className="absolute inset-0 flex items-center justify-center opacity-5">
                  <div className="absolute border border-blue-300 rounded-full w-[400px] h-[400px]"></div>
                </div>
                
                {/* État de chargement */}
                {!isClient && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                  </div>
                )}
                
                {/* Actualités qui défilent une par une autour du cercle */}
                {isClient && orbitingArticles.map((article, index) => (
                  <div
                    key={`orbiting-${article.id}-${index}`}
                    className="absolute top-1/2 left-1/2 w-20 h-20 lg:w-24 lg:h-24 -translate-x-1/2 -translate-y-1/2"
                    style={{
                      animation: `orbitContinuous 8s linear infinite`,
                      animationDelay: `${index * 0.4}s`, // Décalage de 0.4s entre chaque actualité
                    }}
                  >
                    <div className="relative w-full h-full group cursor-pointer">
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110">
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          className="object-cover rounded-2xl opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl"></div>
                        
                        {/* Contenu de l'actualité */}
                        <div className="absolute bottom-0 left-0 right-0 p-2 text-white">
                          <div className="text-xs font-semibold mb-1 bg-blue-600 px-2 py-0.5 rounded-full w-fit opacity-90">
                            {article.category}
                          </div>
                          <h3 className="font-bold text-xs line-clamp-1 leading-tight">
                            {article.title}
                          </h3>
                        </div>
                      </div>
                      
                      {/* Badge numéro */}
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md">
                        📰
                      </div>
                    </div>
                  </div>
                ))}

                                {/* Article central (article actuel) */}
                {isClient && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-40 h-40 lg:w-48 lg:h-48 relative group cursor-pointer">
                      <div className="absolute inset-0 rounded-3xl bg-white shadow-2xl border-4 border-blue-500/20 overflow-hidden transform group-hover:scale-105 transition-all duration-500">
                        <Image
                          key={`central-${currentArticleIndex}`} // Force re-render pour transition
                          src={featuredArticles[currentArticleIndex]?.image || ''}
                          alt={featuredArticles[currentArticleIndex]?.title || ''}
                          fill
                          className="object-cover transition-opacity duration-700 ease-in-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                        
                        {/* Contenu de l'article */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                          <div className="text-xs font-semibold mb-1 bg-blue-600 px-2 py-1 rounded-full w-fit animate-pulse">
                            {featuredArticles[currentArticleIndex]?.category}
                          </div>
                          <h3 className="font-bold text-sm line-clamp-2 leading-tight transition-all duration-500">
                            {featuredArticles[currentArticleIndex]?.title}
                          </h3>
                          <p className="text-xs opacity-90 mt-1 transition-all duration-500">
                            ⏱️ {featuredArticles[currentArticleIndex]?.readTime}min • 🔥 À la une
                          </p>
                        </div>
                      </div>

                      {/* Effet de pulsation renforcé */}
                      <div className="absolute inset-0 rounded-3xl border-2 border-blue-500 animate-ping opacity-30"></div>
                      <div className="absolute inset-0 rounded-3xl border-4 border-blue-300 animate-ping opacity-10" style={{animationDelay: '0.5s'}}></div>
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

              {/* Texte "Actualités en Orbite" */}
              <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 text-center">
                <p className="text-xl font-bold text-slate-700 mb-2 animate-pulse">🌍 Actualités en Orbite</p>
                <p className="text-sm text-slate-500 mb-2">
                  📰 Actualités défilantes • ⭐ Article central qui change • 🔄 Information continue
                </p>
                <p className="text-xs text-slate-400">
                  20 actualités circulent • Une nouvelle toutes les 0.4s • Défilement infini
                </p>
                {isClient && (
                  <div className="mt-2 flex justify-center items-center space-x-4 text-xs font-medium">
                    <div className="text-blue-600">🔄 Orbite: 8s par tour</div>
                    <div className="text-green-600">📰 Centre: Change toutes les 3s</div>
                  </div>
                )}
              </div>
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
              <div key={`stat-${index}-${stat.label}`} className="text-center group">
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
              <div key={`category-${index}-${category.title}`} className="group cursor-pointer">
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