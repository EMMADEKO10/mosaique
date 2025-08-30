import { NextRequest, NextResponse } from 'next/server'
import { youtubeAPI } from '@/lib/youtube'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const testUrl = searchParams.get('url') || 'https://www.youtube.com/@KOFFI.OLOMIDE'
    
    console.log('Testing YouTube API with URL:', testUrl)
    console.log('API Key configured:', !!process.env.YOUTUBE_API_KEY)
    
    if (!process.env.YOUTUBE_API_KEY) {
      return NextResponse.json({
        error: 'YouTube API key not configured',
        message: 'Please add YOUTUBE_API_KEY to your .env.local file'
      }, { status: 500 })
    }

    // Test d'extraction
    const channelId = youtubeAPI.extractChannelId(testUrl)
    const handle = youtubeAPI.extractHandle(testUrl)
    const videoId = youtubeAPI.extractVideoId(testUrl)
    
    console.log('Extracted channelId:', channelId)
    console.log('Extracted handle:', handle)
    console.log('Extracted videoId:', videoId)

    // Test de récupération des statistiques avec plus de détails
    console.log('Starting stats retrieval...')
    const stats = await youtubeAPI.getStatsFromUrl(testUrl)
    console.log('Retrieved stats:', stats)

    // Test spécifique pour Koffi Olomidé
    let koffiStats = null
    if (testUrl.includes('KOFFI.OLOMIDE')) {
      console.log('Testing specific search for Koffi Olomidé...')
      koffiStats = await youtubeAPI.searchArtistChannel(testUrl)
      console.log('Koffi specific stats:', koffiStats)
    }

    return NextResponse.json({
      success: true,
      testUrl,
      extracted: {
        channelId,
        handle,
        videoId
      },
      stats,
      koffiSpecificStats: koffiStats
    })

  } catch (error: unknown) {
    console.error('YouTube test API error:', error)
    return NextResponse.json({
      error: error && typeof error === 'object' && 'message' in error ? String(error.message) : 'Unknown error',
      stack: error && typeof error === 'object' && 'stack' in error ? String(error.stack) : undefined
    }, { status: 500 })
  }
}
