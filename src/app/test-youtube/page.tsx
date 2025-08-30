"use client"

import { useState } from 'react'

// Type definitions for the API response
interface YouTubeChannelStats {
  subscriberCount: number
  viewCount: number
  videoCount: number
  channelId: string
  channelTitle: string
}

interface YouTubeVideoStats {
  viewCount: number
  likeCount: number
  commentCount: number
  videoId: string
  videoTitle: string
}

interface YouTubeTestResult {
  success: boolean
  testUrl: string
  extracted: {
    channelId: string | null
    handle: string | null
    videoId: string | null
  }
  stats: {
    channelStats?: YouTubeChannelStats
    videoStats?: YouTubeVideoStats
  }
  koffiSpecificStats?: YouTubeChannelStats | null
}

export default function TestYouTubePage() {
  const [testUrl, setTestUrl] = useState('https://www.youtube.com/@KOFFI.OLOMIDE')
  const [result, setResult] = useState<YouTubeTestResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const testYouTubeAPI = async () => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch(`/api/youtube/test?url=${encodeURIComponent(testUrl)}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors du test')
      }

      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Test YouTube API</h1>
        
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL YouTube à tester
            </label>
            <input
              type="text"
              value={testUrl}
              onChange={(e) => setTestUrl(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://www.youtube.com/@KOFFI.OLOMIDE"
            />
          </div>

          <button
            onClick={testYouTubeAPI}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Test en cours...' : 'Tester l\'API'}
          </button>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md">
              <h3 className="text-red-800 font-medium">Erreur :</h3>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {result && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Résultats :</h3>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="font-medium text-gray-800 mb-2">URL testée :</h4>
                <p className="text-sm text-gray-600">{result.testUrl}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="font-medium text-gray-800 mb-2">Extraction :</h4>
                <pre className="text-sm text-gray-600 whitespace-pre-wrap">
                  {JSON.stringify(result.extracted, null, 2)}
                </pre>
              </div>

              {result.stats.channelStats && (
                <div className="bg-green-50 p-4 rounded-md">
                  <h4 className="font-medium text-green-800 mb-2">Statistiques de chaîne :</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <span className="text-sm text-green-600">Nom :</span>
                      <p className="font-medium">{result.stats.channelStats.channelTitle}</p>
                    </div>
                    <div>
                      <span className="text-sm text-green-600">Abonnés :</span>
                      <p className="font-medium">{result.stats.channelStats.subscriberCount?.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-sm text-green-600">Vues totales :</span>
                      <p className="font-medium">{result.stats.channelStats.viewCount?.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="font-medium text-gray-800 mb-2">Réponse complète :</h4>
                <pre className="text-xs text-gray-600 whitespace-pre-wrap overflow-auto max-h-96">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
