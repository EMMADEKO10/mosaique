import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { Artist, IArtist } from '@/models/Artist'
import { uploadToCloudinary } from '@/lib/cloudinary'
import { Model } from 'mongoose'

function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize('NFD').replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

export async function POST(req: NextRequest) {
  try {
    await connectDB()

    const data = await req.json()
    const {
      name,
      image,
      location,
      specialty,
      biography,
      label,
      yearsActive,
      socials = {},
      stats = {},
      albums = [],
      topTracks = [],
      featured = false,
      status = 'draft',
    } = data

    if (!name || !biography) {
      return NextResponse.json({ message: 'Nom et biographie sont requis' }, { status: 400 })
    }

    // Générer un slug unique
    const baseSlug = slugify(name)
    const slug = await (Artist as Model<IArtist> & { generateUniqueSlug(baseSlug: string): Promise<string> }).generateUniqueSlug(baseSlug)

    let imageUrl: string | undefined
    let imagePublicId: string | undefined

    if (image && typeof image === 'string') {
      try {
        const uploaded = await uploadToCloudinary(image, 'mosaique/artists')
        imageUrl = uploaded.secureUrl
        imagePublicId = uploaded.publicId
      } catch {
        console.warn('Cloudinary upload failed, keeping provided image if URL')
        if (/^https?:\/\//i.test(image)) {
          imageUrl = image
        }
      }
    }

    const doc = await Artist.create({
      name: name.trim(),
      slug,
      imageUrl,
      imagePublicId,
      location: location?.trim(),
      specialty: specialty?.trim(),
      biography: biography.trim(),
      label: label?.trim(),
      yearsActive: yearsActive?.trim(),
      socials,
      stats,
      albums,
      topTracks,
      featured: !!featured,
      status: status as 'draft' | 'published' | 'archived',
    })

    return NextResponse.json({ ok: true, artist: doc.toJSON() }, { status: 201 })
  } catch (error: unknown) {
    console.error('POST /api/artists error', error)
    
    // Gestion spécifique des erreurs de doublon
    if (error && typeof error === 'object' && 'code' in error && error.code === 11000) {
      return NextResponse.json({ 
        message: 'Un artiste avec ce nom existe déjà. Veuillez modifier le nom.' 
      }, { status: 409 })
    }
    
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status') || 'published'
    const limit = parseInt(searchParams.get('limit') || '50')
    const page = parseInt(searchParams.get('page') || '1')
    const skip = (page - 1) * limit

    const query = { status }
    const artists = await Artist.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()

    const total = await Artist.countDocuments(query)

    return NextResponse.json({
      artists: artists.map(artist => ({
        ...artist,
        id: (artist as { _id: unknown })._id?.toString() || '',
        _id: undefined,
        __v: undefined
      })),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('GET /api/artists error', error)
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 })
  }
}
