import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { Artist } from '@/models/Artist'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB()
    
    const { slug } = await params
    
    if (!slug) {
      return NextResponse.json(
        { message: 'Slug requis' },
        { status: 400 }
      )
    }

    const artist = await Artist.findOne({ slug }).lean()

    if (!artist) {
      return NextResponse.json(
        { message: 'Artiste non trouvé' },
        { status: 404 }
      )
    }

    // Transformer les données pour correspondre à l'interface
    const transformedArtist = {
      ...artist,
      id: (artist as { _id: unknown })._id?.toString() || '',
      _id: undefined,
      __v: undefined
    }

    return NextResponse.json({
      success: true,
      artist: transformedArtist
    })

  } catch (error) {
    console.error('GET /api/artists/[slug] error:', error)
    return NextResponse.json(
      { message: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
