"use client"

import { signOut } from 'next-auth/react'
import { LogOut } from 'lucide-react'

interface SignOutButtonProps {
  className?: string
  children?: React.ReactNode
}

export default function SignOutButton({ className = '', children }: SignOutButtonProps) {
  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' })
  }

  return (
    <button
      onClick={handleSignOut}
      className={`flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors ${className}`}
    >
      <LogOut className="w-4 h-4" />
      {children || 'Se déconnecter'}
    </button>
  )
}
