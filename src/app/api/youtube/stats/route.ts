import { NextRequest, NextResponse } from 'next/server'
import { youtubeAPI } from '@/lib/youtube'

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json()

    if (!url) {
      return NextResponse.json(
        { error: 'URL YouTube requise' },
        { status: 400 }
      )
    }

    // Vérifier que c'est une URL YouTube valide
    if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
      return NextResponse.json(
        { error: 'URL YouTube invalide' },
        { status: 400 }
      )
    }

    const stats = await youtubeAPI.getStatsFromUrl(url)

    return NextResponse.json({
      success: true,
      data: stats
    })

  } catch (error: unknown) {
    console.error('YouTube stats API error:', error)
    
    if (error && typeof error === 'object' && 'message' in error && typeof error.message === 'string' && error.message.includes('API key not configured')) {
      return NextResponse.json(
        { error: 'YouTube API non configurée' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { error: 'Erreur lors de la récupération des statistiques YouTube' },
      { status: 500 }
    )
  }
}
