"use client"

import { useSession } from 'next-auth/react'
import { signIn, signOut } from 'next-auth/react'
import Image from 'next/image'
import AuthNav from '@/components/auth/AuthNav'
import ConnectionStatus from '@/components/auth/ConnectionStatus'

export default function TestAuthPage() {
  const { data: session, status } = useSession()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Test d&apos;Authentification</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Statut de connexion */}
          <div className="bg-white rounded-xl shadow-soft p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Statut de Connexion</h2>
            <ConnectionStatus />
            
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Informations de Session :</h3>
              <pre className="text-xs text-gray-600 overflow-auto">
                {JSON.stringify({ status, session }, null, 2)}
              </pre>
            </div>
          </div>

          {/* Composant AuthNav */}
          <div className="bg-white rounded-xl shadow-soft p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Composant AuthNav</h2>
            <div className="flex justify-center">
              <AuthNav />
            </div>
          </div>

          {/* Actions de test */}
          <div className="bg-white rounded-xl shadow-soft p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Actions de Test</h2>
            
            <div className="space-y-4">
              <button
                onClick={() => signIn('google')}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Se connecter avec Google
              </button>
              
              <button
                onClick={() => signOut()}
                className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Se déconnecter
              </button>
            </div>
          </div>

                     {/* Informations utilisateur */}
           <div className="bg-white rounded-xl shadow-soft p-6">
             <h2 className="text-xl font-semibold text-gray-900 mb-4">Informations Utilisateur</h2>
             
             {status === 'loading' && (
               <p className="text-gray-600">Chargement...</p>
             )}
             
             {status === 'unauthenticated' && (
               <p className="text-red-600">Non connecté</p>
             )}
             
             {status === 'authenticated' && session?.user && (
               <div className="space-y-3">
                 <div className="flex items-center space-x-3">
                   {session.user.image && (
                     <Image
                       src={session.user.image}
                       alt={session.user.name || 'User'}
                       width={48}
                       height={48}
                       className="w-12 h-12 rounded-full"
                     />
                   )}
                   <div>
                     <p className="font-semibold text-gray-900">{session.user.name}</p>
                     <p className="text-sm text-gray-600">{session.user.email}</p>
                                           {(session.user as { id?: string }).id && (
                        <p className="text-xs text-gray-500">ID: {(session.user as { id?: string }).id}</p>
                      )}
                   </div>
                 </div>
                 
                 <div className="p-3 bg-green-50 rounded-lg">
                   <p className="text-sm text-green-700">
                     ✅ Connecté avec succès !
                   </p>
                   <p className="text-xs text-green-600 mt-1">
                     {(session.user as { id?: string }).id ? 'Utilisateur sauvegardé en base de données' : 'Session temporaire'}
                   </p>
                 </div>
               </div>
             )}
           </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Instructions de Test</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Vérifiez que le statut de connexion s&apos;affiche correctement</li>
            <li>Testez la connexion avec Google</li>
            <li>Vérifiez que les informations utilisateur s&apos;affichent après connexion</li>
            <li>Testez la déconnexion</li>
            <li>Vérifiez que le composant AuthNav fonctionne dans le header</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
