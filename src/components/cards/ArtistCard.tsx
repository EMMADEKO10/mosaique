"use client"

import Image from "next/image"
import Link from "next/link"
import { useMemo } from "react"

export interface ArtistCardProps {
  id: string
  name: string
  image: string
  category?: string
  description?: string
  location?: string
  specialty?: string
  rank?: number
  trending?: boolean
  featured?: boolean
  onClick?: (id: string) => void
  compact?: boolean
  href?: string
}

export default function ArtistCard(props: ArtistCardProps) {
  const {
    id,
    name,
    image,
    category,
    description,
    location,
    specialty,
    rank,
    featured,
    onClick,
    compact,
    href
  } = props

  const badge = useMemo(() => {
    if (featured) return { label: "À la une", color: "bg-amber-500/10 text-amber-600 ring-1 ring-amber-500/20" }
    return null
  }, [featured])

  // Removed number formatting since votes/followers are not displayed on article listing

  const CardContent = (
    <article
      className={`group relative overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-all hover:shadow-xl hover:-translate-y-0.5 ${compact ? '': ''} ${href || onClick ? 'cursor-pointer' : ''}`}
      onClick={() => !href && onClick?.(id)}
      role={(href || onClick) ? "button" : undefined}
    >
      <div className={`relative w-full ${compact ? 'h-44' : 'h-56'}`}>
        {/* Image */}
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
          priority={featured || rank === 1}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Top badges */}
        <div className={`absolute left-3 top-3 flex items-center gap-2 ${compact ? '' : ''}`}>
          {badge && (
            <span className={`inline-flex items-center rounded-full ${compact ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs'} font-medium ${badge.color}`}>
              {badge.label}
            </span>
          )}
          {rank && (
            <span className={`inline-flex items-center rounded-full bg-white/90 ${compact ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs'} font-semibold text-gray-800 shadow ring-1 ring-black/5`}>
              #{rank}
            </span>
          )}
        </div>

        {/* Bottom info over image */}
        <div className={`${compact ? 'absolute bottom-2 left-2 right-2' : 'absolute bottom-3 left-3 right-3'}`}
        >
          <div className="flex items-end justify-between gap-2">
            <div>
              <h3 className={`text-white ${compact ? 'text-base' : 'text-lg'} font-bold drop-shadow-sm`}>{name}</h3>
              {category && (
                <p className={`mt-0.5 text-white/80 ${compact ? 'text-[11px]' : 'text-xs'} font-medium`}>{category}</p>
              )}
            </div>
            {/* Vote badge removed on article listing page */}
          </div>
        </div>
      </div>

      <div className={`${compact ? 'space-y-2 p-3' : 'space-y-3 p-4'}`}>
        {description && (
          <p className={`${compact ? 'line-clamp-2 text-[13px]' : 'line-clamp-2 text-sm'} text-gray-600`}>{description}</p>
        )}

        <div className={`flex flex-wrap items-center gap-1.5 ${compact ? 'text-[11px]' : 'text-xs'} text-gray-600`}>
          {location && (
            <span className={`inline-flex items-center gap-1 rounded-full bg-gray-50 ${compact ? 'px-2 py-0.5' : 'px-2.5 py-1'} ring-1 ring-gray-200`}>
              <span>📍</span>
              <span className="font-medium">{location}</span>
            </span>
          )}
          {specialty && (
            <span className={`inline-flex items-center gap-1 rounded-full bg-gray-50 ${compact ? 'px-2 py-0.5' : 'px-2.5 py-1'} ring-1 ring-gray-200`}>
              <span>🎵</span>
              <span className="font-medium">{specialty}</span>
            </span>
          )}
        </div>

        <div className={`flex items-center justify-end ${compact ? 'pt-0.5' : 'pt-1'}`}>
          <button
            className={`inline-flex items-center justify-center rounded-lg bg-primary-600 ${compact ? 'px-3 py-1.5 text-xs' : 'px-3.5 py-2 text-sm'} font-semibold text-white shadow-sm transition-colors hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/40`}
            type="button"
          >
            Voir l’article
          </button>
        </div>
      </div>
    </article>
  )

  if (href) {
    return (
      <Link href={href} className="block">
        {CardContent}
      </Link>
    )
  }

  return CardContent
}


