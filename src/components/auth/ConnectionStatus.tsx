"use client"

import { useSession } from 'next-auth/react'
import { CheckCircle, XCircle } from 'lucide-react'

export default function ConnectionStatus() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
        <span className="text-xs text-slate-500">Connexion...</span>
      </div>
    )
  }

  if (status === 'authenticated') {
    return (
      <div className="flex items-center space-x-2">
        <CheckCircle className="w-4 h-4 text-green-500" />
        <span className="text-xs text-green-600 font-medium">
          Connecté en tant que {session?.user?.name}
        </span>
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-2">
      <XCircle className="w-4 h-4 text-red-500" />
      <span className="text-xs text-red-600 font-medium">
        Non connecté
      </span>
    </div>
  )
}
