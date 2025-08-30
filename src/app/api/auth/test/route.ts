import { NextResponse } from 'next/server'

export async function GET() {
  const envCheck = {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? '✅ Configuré' : '❌ Manquant',
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ? '✅ Configuré' : '❌ Manquant',
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ? '✅ Configuré' : '❌ Manquant',
    NEXTAUTH_DEBUG: process.env.NEXTAUTH_DEBUG,
    NODE_ENV: process.env.NODE_ENV,
  }

  return NextResponse.json({
    message: 'Test des variables d\'environnement NextAuth',
    environment: envCheck,
    timestamp: new Date().toISOString(),
  })
}
