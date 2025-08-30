"use client"

import { useState } from 'react'
import Image from 'next/image'
import { User } from 'lucide-react'

interface UserAvatarProps {
  src?: string | null
  alt?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function UserAvatar({ 
  src, 
  alt = 'User', 
  size = 'md',
  className = '' 
}: UserAvatarProps) {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-6 h-6'
  }

  const imageSizes = {
    sm: 24,
    md: 32,
    lg: 48
  }

  const handleImageError = () => {
    console.log('❌ Erreur de chargement de l\'image:', src)
    setImageError(true)
  }

  const handleImageLoad = () => {
    console.log('✅ Image chargée avec succès:', src)
    setImageLoaded(true)
  }

  // Si pas d'image ou erreur de chargement, afficher l'icône
  if (!src || imageError) {
    return (
      <div className={`${sizeClasses[size]} bg-gradient-primary rounded-full flex items-center justify-center shadow-glow ${className}`}>
        <User className={`${iconSizes[size]} text-white`} />
      </div>
    )
  }

  return (
    <div className={`${sizeClasses[size]} bg-gradient-primary rounded-full flex items-center justify-center shadow-glow overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={imageSizes[size]}
        height={imageSizes[size]}
        className={`${sizeClasses[size]} rounded-full object-cover transition-opacity duration-200 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onError={handleImageError}
        onLoad={handleImageLoad}
      />
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
        </div>
      )}
    </div>
  )
}
