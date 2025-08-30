"use client"

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import { User, LogOut, Settings, Music, Sparkles } from 'lucide-react'
import { useState } from 'react'

export default function AuthNavMobile() {
  const { data: session, status } = useSession()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' })
  }

  if (status === 'loading') {
    return (
      <div className="w-8 h-8 bg-slate-200 rounded-full animate-pulse"></div>
    )
  }

  if (status === 'unauthenticated') {
    return (
      <button className="bg-gradient-primary text-white px-3 py-1.5 rounded-lg font-semibold flex items-center">
        <Sparkles className="w-3 h-3" />
      </button>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center space-x-2 text-slate-700 hover:text-blue-700 transition-colors"
      >
        <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow">
          {session?.user?.image ? (
            <Image
              src={session.user.image}
              alt={session.user.name || 'User'}
              width={32}
              height={32}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <User className="w-4 h-4 text-white" />
          )}
        </div>
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
