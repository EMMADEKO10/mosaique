"use client"

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import { User, LogOut, Settings, Music, Sparkles } from 'lucide-react'
import { useState } from 'react'

export default function AuthNav() {
  const { data: session, status } = useSession()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  // Debug: Afficher les informations de session dans la console
  if (status === 'authenticated' && session?.user) {
    console.log('🔍 Session utilisateur:', {
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
      id: (session.user as any).id
    })
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' })
  }

  if (status === 'loading') {
    return (
      <div className="flex items-center space-x-2 lg:space-x-4">
        <div className="w-8 h-8 bg-slate-200 rounded-full animate-pulse"></div>
        <div className="w-20 h-4 bg-slate-200 rounded animate-pulse"></div>
      </div>
    )
  }

  if (status === 'unauthenticated') {
    return (
      <div className="flex items-center space-x-2 lg:space-x-4">
        <Link
          href="/connexion"
          className="text-slate-700 hover:text-blue-700 transition-colors font-medium text-sm lg:text-base"
        >
          Connexion
        </Link>
        <Link
          href="/inscription"
          className="bg-gradient-primary text-white px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2 lg:py-2.5 rounded-lg sm:rounded-xl font-semibold hover:shadow-glow transition-all duration-300 transform hover:scale-105 flex items-center space-x-1 sm:space-x-2 text-sm lg:text-base"
        >
          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Rejoindre</span>
          <span className="sm:hidden">+</span>
        </Link>
      </div>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center space-x-2 text-slate-700 hover:text-blue-700 transition-colors"
      >
        <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow overflow-hidden">
          {session?.user?.image ? (
            <Image
              src={session.user.image}
              alt={session.user.name || 'User'}
              width={32}
              height={32}
              className="w-8 h-8 rounded-full object-cover"
              onError={(e) => {
                console.log('❌ Erreur de chargement de l\'image:', session?.user?.image)
                e.currentTarget.style.display = 'none'
                e.currentTarget.nextElementSibling?.classList.remove('hidden')
              }}
            />
          ) : null}
          <User className={`w-4 h-4 text-white ${session?.user?.image ? 'hidden' : ''}`} />
        </div>
        <span className="font-medium hidden sm:block text-sm lg:text-base">
          {session?.user?.name || 'Utilisateur'}
        </span>
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-xl shadow-strong border border-slate-200/50 py-2 z-50">
          <div className="px-4 py-3 border-b border-slate-200/50">
            <p className="text-sm font-semibold text-slate-900">
              {session?.user?.name}
            </p>
            <p className="text-xs text-slate-500">
              {session?.user?.email}
            </p>
          </div>
          
          <Link
            href="/admin"
            className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 transition-colors"
            onClick={() => setIsDropdownOpen(false)}
          >
            <Music className="w-4 h-4 mr-3 text-blue-600" />
            Tableau de bord
          </Link>
          
          <Link
            href="/admin/profile"
            className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 transition-colors"
            onClick={() => setIsDropdownOpen(false)}
          >
            <Settings className="w-4 h-4 mr-3 text-slate-600" />
            Paramètres
          </Link>
          
          <button
            onClick={handleSignOut}
            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4 h-4 mr-3" />
            Se déconnecter
          </button>
        </div>
      )}
    </div>
  )
}
