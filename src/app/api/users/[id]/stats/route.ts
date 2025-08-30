import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { UserService } from '@/lib/userService'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession()
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const { id: userId } = await params

    // Vérifier que l'utilisateur demande ses propres stats ou est admin
    if ((session.user as any).id !== userId && (session.user as any).role !== 'admin') {
      return NextResponse.json({ error: 'Accès refusé' }, { status: 403 })
    }

    const stats = await UserService.getUserStats(userId)

    if (!stats) {
      return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 })
    }

    return NextResponse.json({
      stats,
      message: 'Statistiques récupérées avec succès'
    })
  } catch (error) {
    console.error('❌ Erreur API GET /api/users/[id]/stats:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}
