import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { UserService } from '@/lib/userService'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '50')
    const skip = parseInt(searchParams.get('skip') || '0')

    const { users, total } = await UserService.getAllUsers(limit, skip)

    return NextResponse.json({
      users,
      total,
      pagination: {
        limit,
        skip,
        hasMore: skip + limit < total
      }
    })
  } catch (error) {
    console.error('❌ Erreur API GET /api/users:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const body = await request.json()
    const { email, name, image, provider, providerId } = body

    // Validation des données
    if (!email || !name || !provider || !providerId) {
      return NextResponse.json(
        { error: 'Données manquantes' },
        { status: 400 }
      )
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await UserService.findByEmail(email)
    if (existingUser) {
      return NextResponse.json(
        { error: 'Utilisateur déjà existant' },
        { status: 409 }
      )
    }

    // Créer le nouvel utilisateur
    const newUser = await UserService.createUser({
      email,
      name,
      image,
      provider,
      providerId
    })

    return NextResponse.json({
      message: 'Utilisateur créé avec succès',
      user: {
        id: newUser._id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role
      }
    }, { status: 201 })
  } catch (error) {
    console.error('❌ Erreur API POST /api/users:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}
