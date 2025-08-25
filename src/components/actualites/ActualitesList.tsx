// Composant exemple pour afficher les actualités

import { Article, getArticlesByCategory, getFeaturedArticles } from '@/data/actualites'
import Image from 'next/image'
import Link from 'next/link'

interface ActualitesListProps {
  category?: string
  limit?: number
  featured?: boolean
}

export default function ActualitesList({ 
  category = 'tous', 
  limit, 
  featured = false 
}: ActualitesListProps) {
  
  const articles = featured 
    ? getFeaturedArticles() 
    : getArticlesByCategory(category)
  
  const displayedArticles = limit ? articles.slice(0, limit) : articles

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {displayedArticles.map((article) => (
        <Link
          key={article.id}
          href={`/actualites/${article.category}/${article.id}`}
          className="group"
        >
          <article className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-strong transition-all duration-300 transform hover:-translate-y-1">
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold capitalize">
                  {article.category}
                </span>
              </div>
              {article.featured && (
                <div className="absolute top-4 right-4">
                  <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    À la une
                  </span>
                </div>
              )}
            </div>

            {/* Contenu */}
            <div className="p-6">
              <div className="flex items-center justify-between text-sm text-slate-500 mb-3">
                <span>Par {article.author}</span>
                <span>{formatDate(article.publishedAt)}</span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors line-clamp-2">
                {article.title}
              </h3>

              <p className="text-slate-600 mb-4 line-clamp-3">
                {article.excerpt}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {article.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="bg-slate-100 text-slate-600 px-2 py-1 rounded-full text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <span className="text-sm text-slate-500">
                  {article.readTime} min de lecture
                </span>
              </div>
            </div>
          </article>
        </Link>
      ))}
    </div>
  )
}

// Exemple d'utilisation :
// <ActualitesList category="cinema" limit={6} />
// <ActualitesList featured={true} limit={3} />
// <ActualitesList category="tous" />
