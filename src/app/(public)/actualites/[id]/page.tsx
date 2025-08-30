'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User,  
  Share2,
  Bookmark,
  Eye,
  MessageCircle
} from 'lucide-react'
import Header from '../../../../components/layout/Header'
import { getAllArticles, Article } from '../../../../data/actualites'
import Image from 'next/image'
import Link from 'next/link'

export default function ArticlePage() {
  const params = useParams()
  const router = useRouter()
  const [article, setArticle] = useState<Article | null>(null)
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [readProgress, setReadProgress] = useState(0)
  const [prevNext, setPrevNext] = useState<{ prev: Article | null; next: Article | null }>({ prev: null, next: null })

  useEffect(() => {
    const loadArticle = () => {
      setIsLoading(true)
      const allArticles = getAllArticles()
      const foundArticle = allArticles.find(a => a.id === params.id)
      
      if (foundArticle) {
        setArticle(foundArticle)
        
        // Articles liés (même catégorie, excluant l'article actuel)
        const related = allArticles
          .filter(a => a.category === foundArticle.category && a.id !== foundArticle.id)
          .slice(0, 6)
        setRelatedArticles(related)

        // Précédent / Suivant
        const currentIndex = allArticles.findIndex(a => a.id === foundArticle.id)
        const prev = currentIndex > 0 ? allArticles[currentIndex - 1] : null
        const next = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null
        setPrevNext({ prev, next })
      }
      
      setIsLoading(false)
    }

    loadArticle()
  }, [params.id])

  // Lecture: barre de progression
  useEffect(() => {
    const onScroll = () => {
      const articleContainer = document.getElementById('article-content')
      if (!articleContainer) return
      const total = articleContainer.scrollHeight - window.innerHeight
      const current = Math.max(0, Math.min(total, window.scrollY))
      const progress = total > 0 ? (current / total) * 100 : 0
      setReadProgress(progress)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      cinema: 'bg-purple-100 text-purple-800',
      clash: 'bg-red-100 text-red-800',
      culture: 'bg-blue-100 text-blue-800',
      sports: 'bg-green-100 text-green-800',
      politique: 'bg-yellow-100 text-yellow-800',
      economie: 'bg-indigo-100 text-indigo-800',
      technologie: 'bg-cyan-100 text-cyan-800',
      sante: 'bg-pink-100 text-pink-800',
      education: 'bg-orange-100 text-orange-800'
    }
    return colors[category] || 'bg-gray-100 text-gray-800'
  }

  const getCategoryName = (category: string) => {
    const names: Record<string, string> = {
      cinema: 'Cinéma',
      clash: 'Clash & Polémiques',
      culture: 'Culture',
      sports: 'Sports',
      politique: 'Politique',
      economie: 'Économie',
      technologie: 'Technologie',
      sante: 'Santé',
      education: 'Éducation'
    }
    return names[category] || category
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="h-96 bg-gray-200 rounded mb-8"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Article non trouvé</h1>
            <p className="text-gray-600 mb-8">L&apos;article que vous recherchez n&apos;existe pas.</p>
            <Link 
              href="/actualites"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour aux actualités
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Barre de progression de lecture */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-100 z-50">
        <div
          className="h-full bg-gradient-to-r from-blue-600 to-purple-500 transition-all duration-150"
          style={{ width: `${readProgress}%` }}
        />
      </div>

      <Header />

      <div className="container mx-auto px-4 py-6">
        {/* Fil d’Ariane + retour */}
        <div className="max-w-6xl mx-auto mb-6 flex items-center justify-between">
          <nav className="text-sm text-gray-600">
            <ol className="flex items-center gap-2">
              <li><Link href="/actualites" className="hover:text-gray-900">Actualités</Link></li>
              <li className="text-gray-400">/</li>
              <li><span className="hover:text-gray-900">{getCategoryName(article.category)}</span></li>
            </ol>
          </nav>
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour
          </button>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Colonne principale */}
          <div className="lg:col-span-8">
            {/* Titre et méta */}
            <div className="mb-4">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className={`${getCategoryColor(article.category)} px-3 py-1 rounded-full text-xs md:text-sm font-medium`}>
                  {getCategoryName(article.category)}
                </span>
                {article.featured && (
                  <span className="bg-red-500/90 text-white px-3 py-1 rounded-full text-xs md:text-sm font-medium">À la une</span>
                )}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-3">{article.title}</h1>
              <div className="flex flex-wrap items-center gap-5 text-xs md:text-sm text-gray-600">
                <span className="inline-flex items-center gap-2"><User className="w-4 h-4" /> {article.author}</span>
                <span className="inline-flex items-center gap-2"><Calendar className="w-4 h-4" /> {formatDate(article.publishedAt)}</span>
                <span className="inline-flex items-center gap-2"><Clock className="w-4 h-4" /> {article.readTime} min</span>
                <span className="inline-flex items-center gap-2"><Eye className="w-4 h-4" /> 1.2k vues</span>
              </div>
            </div>

            {/* Actions rapides */}
            <div className="mb-6 flex items-center gap-3">
              <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition">
                <Share2 className="w-4 h-4" /> Partager
              </button>
              <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition">
                <Bookmark className="w-4 h-4" /> Sauvegarder
              </button>
              <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition">
                <MessageCircle className="w-4 h-4" /> Commenter
              </button>
            </div>

            {/* Contenu */}
            <article id="article-content">
              <div className="prose max-w-none mb-10 prose-headings:scroll-mt-20">
                <div className="text-gray-800 leading-relaxed text-lg">
                  {article.content}
                </div>
              </div>

          {/* Tags */}
          {article.tags.length > 0 && (
            <div className="mb-12">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Auteur */}
          <div className="bg-gray-50 rounded-lg p-6 mb-12">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {article.author.charAt(0)}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{article.author}</h3>
                <p className="text-gray-600 text-sm">Journaliste à La Grande Mosaïque</p>
              </div>
            </div>
          </div>
            </article>

            {/* Navigation Précédent / Suivant */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-3">
              {prevNext.prev ? (
                <Link href={`/actualites/${prevNext.prev.id}`} className="group flex items-center justify-between gap-3 p-4 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 transition">
                  <div className="min-w-0">
                    <div className="text-xs text-gray-500 mb-1">Article précédent</div>
                    <div className="truncate font-semibold text-gray-900 group-hover:text-blue-600">{prevNext.prev.title}</div>
                  </div>
                  <div className="relative w-16 h-12 rounded-md overflow-hidden">
                    <Image src={prevNext.prev.image} alt={prevNext.prev.title} fill className="object-cover" />
                  </div>
                </Link>
              ) : <div />}
              {prevNext.next && (
                <Link href={`/actualites/${prevNext.next.id}`} className="group flex items-center justify-between gap-3 p-4 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 transition">
                  <div className="min-w-0 text-right">
                    <div className="text-xs text-gray-500 mb-1">Article suivant</div>
                    <div className="truncate font-semibold text-gray-900 group-hover:text-blue-600">{prevNext.next.title}</div>
                  </div>
                  <div className="relative w-16 h-12 rounded-md overflow-hidden">
                    <Image src={prevNext.next.image} alt={prevNext.next.title} fill className="object-cover" />
                  </div>
                </Link>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-16">
              {relatedArticles.length > 0 && (
                <section>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Articles similaires</h2>
                  <div className="space-y-3">
                    {relatedArticles.map((related) => (
                      <Link key={related.id} href={`/actualites/${related.id}`} className="group flex gap-3 p-2 rounded-lg hover:bg-gray-50 transition">
                        <div className="relative w-24 h-16 rounded-md overflow-hidden flex-shrink-0">
                          <Image src={related.image} alt={related.title} fill className="object-cover" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs text-gray-500 mb-1">{formatDate(related.publishedAt)}</div>
                          <div className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-blue-600">{related.title}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </aside>
        </div>

        {/* Autres articles */}
        <section className="max-w-7xl mx-auto mt-16 px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Autres articles qui pourraient vous intéresser</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {getAllArticles()
              .filter((a) => a.id !== article.id)
              .slice(0, 3)
              .map((other) => (
                <Link 
                  key={other.id}
                  href={`/actualites/${other.id}`}
                  className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-medium transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={other.image}
                      alt={other.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`${getCategoryColor(other.category)} px-3 py-1 rounded-full text-xs font-medium`}>
                        {getCategoryName(other.category)}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(other.publishedAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {other.readTime} min
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 line-clamp-2 mb-2">
                      {other.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {other.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </section>

        {/* Retour aux actualités */}
        <div className="max-w-4xl mx-auto mt-8 text-center">
          <Link 
            href="/actualites"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voir toutes les actualités
          </Link>
        </div>
      </div>
    </div>
  )
}
