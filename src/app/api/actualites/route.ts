import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { PublicArticle } from '@/models/PublicArticle'
import { uploadToCloudinary } from '@/lib/cloudinary'

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
      title,
      excerpt,
      content,
      image, // can be a URL or base64
      category,
      author,
      tags = [],
      featured = false,
      readTime = 4,
      publishedAt,
    } = data

    if (!title || !content || !excerpt || !category) {
      return NextResponse.json({ message: 'Champs requis manquants' }, { status: 400 })
    }

    const slug = slugify(title)

    let imageUrl: string | undefined
    let imagePublicId: string | undefined

    if (image && typeof image === 'string') {
      try {
        const uploaded = await uploadToCloudinary(image, 'mosaique')
        imageUrl = uploaded.secureUrl
        imagePublicId = uploaded.publicId
      } catch (e) {
        console.warn('Cloudinary upload failed, keeping provided image if URL')
        if (/^https?:\/\//i.test(image)) {
          imageUrl = image
        }
      }
    }

    const doc = await PublicArticle.create({
      title,
      slug,
      excerpt,
      content,
      imageUrl,
      imagePublicId,
      category,
      author: author || 'Rédaction',
      tags,
      featured: !!featured,
      readTime: Math.max(1, Number(readTime) || 1),
      publishedAt: publishedAt ? new Date(publishedAt) : undefined,
    })

    return NextResponse.json({ ok: true, article: doc.toJSON() }, { status: 201 })
  } catch (error) {
    console.error('POST /api/actualites error', error)
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 })
  }
}


