"use client"

import { useState } from 'react'
import { Youtube, Users, Eye, Video, RefreshCw, AlertCircle } from 'lucide-react'

interface YouTubeStatsProps {
  url: string
  onStatsUpdate: (stats: { followers?: number; monthlyListeners?: number }) => void
  className?: string
}

interface YouTubeStats {
  subscriberCount: number
  viewCount: number
  videoCount: number
  channelTitle: string
}

export default function YouTubeStats({ url, onStatsUpdate, className = '' }: YouTubeStatsProps) {
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState<YouTubeStats | null>(null)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = async () => {
    if (!url) {
      setError('Veuillez entrer une URL YouTube')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/youtube/stats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la récupération des statistiques')
      }

      if (data.data.channelStats) {
        const channelStats = data.data.channelStats
        setStats(channelStats)
        
        // Mettre à jour les statistiques dans le formulaire parent
        onStatsUpdate({
          followers: channelStats.subscriberCount,
          monthlyListeners: channelStats.viewCount
        })
      } else {
        console.log('YouTube API response:', data)
        setError('Aucune statistique de chaîne trouvée pour cette URL. Vérifiez que l&apos;URL est correcte et que la chaîne existe.')
      }
    } catch (error) {
      console.error('Erreur YouTube:', error)
      setError(error instanceof Error ? error.message : 'Erreur inconnue')
    } finally {
      setLoading(false)
    }
  }

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toLocaleString()
  }

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
          <Youtube className="w-4 h-4 text-red-500" />
          Statistiques YouTube
        </h3>
        <button
          onClick={fetchStats}
          disabled={loading || !url}
          className="px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1 text-sm"
          title="Récupérer les statistiques YouTube"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'Chargement...' : 'Actualiser'}
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <AlertCircle className="w-4 h-4" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {stats && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
          {stats.channelTitle && (
            <div className="text-sm font-medium text-gray-800">
              {stats.channelTitle}
            </div>
          )}
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-gray-200">
              <Users className="w-4 h-4 text-blue-500" />
              <div>
                <div className="text-xs text-gray-500">Abonnés</div>
                <div className="font-semibold text-gray-800">{formatNumber(stats.subscriberCount)}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-gray-200">
              <Eye className="w-4 h-4 text-green-500" />
              <div>
                <div className="text-xs text-gray-500">Vues totales</div>
                <div className="font-semibold text-gray-800">{formatNumber(stats.viewCount)}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-gray-200">
              <Video className="w-4 h-4 text-purple-500" />
              <div>
                <div className="text-xs text-gray-500">Vidéos</div>
                <div className="font-semibold text-gray-800">{formatNumber(stats.videoCount)}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {!stats && !error && !loading && (
        <div className="text-sm text-gray-500 text-center py-4">
          Cliquez sur &quot;Actualiser&quot; pour récupérer les statistiques YouTube
        </div>
      )}
    </div>
  )
}
