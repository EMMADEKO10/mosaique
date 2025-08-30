import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Utilitaire pour combiner les classes CSS avec Tailwind
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Générer un slug à partir d'un titre
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Supprimer les caractères spéciaux
    .replace(/[\s_-]+/g, '-') // Remplacer les espaces et underscores par des tirets
    .replace(/^-+|-+$/g, '') // Supprimer les tirets au début et à la fin
}

// Formatage des dates en français
export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Africa/Kinshasa'
  }
  
  return dateObj.toLocaleDateString('fr-CD', { ...defaultOptions, ...options })
}

// Formatage des dates relatives (il y a X temps)
export function formatRelativeTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000)
  
  if (diffInSeconds < 60) {
    return 'À l\'instant'
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) {
    return `Il y a ${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''}`
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return `Il y a ${diffInHours} heure${diffInHours > 1 ? 's' : ''}`
  }
  
  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) {
    return `Il y a ${diffInDays} jour${diffInDays > 1 ? 's' : ''}`
  }
  
  const diffInWeeks = Math.floor(diffInDays / 7)
  if (diffInWeeks < 4) {
    return `Il y a ${diffInWeeks} semaine${diffInWeeks > 1 ? 's' : ''}`
  }
  
  const diffInMonths = Math.floor(diffInDays / 30)
  if (diffInMonths < 12) {
    return `Il y a ${diffInMonths} mois`
  }
  
  const diffInYears = Math.floor(diffInDays / 365)
  return `Il y a ${diffInYears} an${diffInYears > 1 ? 's' : ''}`
}

// Tronquer le texte avec des points de suspension
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}

// Capitaliser la première lettre
export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

// Formater les nombres (ex: 1000 -> 1K)
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
  }
  return num.toString()
}

// Générer une couleur aléatoire pour les avatars
export function generateAvatarColor(name: string): string {
  const colors = [
    'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500',
    'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500'
  ]
  
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return colors[hash % colors.length]
}

// Extraire les initiales d'un nom
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

// Valider l'extension d'un fichier
export function isValidFileType(fileName: string, allowedTypes: string[]): boolean {
  const extension = fileName.split('.').pop()?.toLowerCase()
  return extension ? allowedTypes.includes(extension) : false
}

// Convertir les bytes en format lisible
export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Octets'
  
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Octets', 'KB', 'MB', 'GB', 'TB']
  
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

// Détecter si c'est un appareil mobile
export function isMobile(): boolean {
  if (typeof window === 'undefined') return false
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
}

// Générer un ID unique simple
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}

// Debounce pour optimiser les recherches
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Copier du texte dans le presse-papiers
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    console.error('Erreur lors de la copie:', err)
    return false
  }
}

// Extraire le texte brut du HTML
export function stripHtml(html: string): string {
  if (typeof window === 'undefined') {
    // Côté serveur, utiliser une regex simple
    return html.replace(/<[^>]*>/g, '')
  }
  
  // Côté client, utiliser le DOM
  const temp = document.createElement('div')
  temp.innerHTML = html
  return temp.textContent || temp.innerText || ''
}

// Vérifier si une URL est valide
export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// Calculer le temps de lecture estimé
export function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200 // Vitesse de lecture moyenne
  const words = text.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

// Formater le prix en francs congolais
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('fr-CD', {
    style: 'currency',
    currency: 'CDF'
  }).format(price)
}

// Convertir une date en format ISO pour les inputs datetime-local
export function toISOStringLocal(date: Date): string {
  const offset = date.getTimezoneOffset()
  const adjustedDate = new Date(date.getTime() - offset * 60 * 1000)
  return adjustedDate.toISOString().slice(0, 16)
}
