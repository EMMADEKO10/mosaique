import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    // Vérifier si l'utilisateur est authentifié pour les routes admin
    if (req.nextUrl.pathname.startsWith("/admin") && !req.nextauth.token) {
      return NextResponse.redirect(new URL("/connexion", req.url))
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = {
  matcher: ["/admin/:path*"]
}
