import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const token = req.headers.get('Authorization')?.split(' ')[1]
  const pathname = req.nextUrl.pathname

  // Check if the route is an admin route
  const isAdminRoute = pathname.startsWith('/api/admin')

  // Allow visitors to access non-admin routes freely
  if (!isAdminRoute) {
    return NextResponse.next()
  }

  // Admin routes require authentication
  if (!token) {
    return NextResponse.json(
      { error: 'Unauthorized - Token Missing' },
      { status: 401 }
    )
  }

  // ✅ Call the verification API instead of verifying JWT in the middleware
  const verifyResponse = await fetch(
    `${req.nextUrl.origin}/api/auth/verify-token`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    }
  )

  if (!verifyResponse.ok) {
    return NextResponse.json({ error: 'Invalid Token' }, { status: 403 })
  }

  const { decoded } = await verifyResponse.json()

  if (decoded.role !== 'admin') {
    return NextResponse.json(
      { error: 'Forbidden - Admin Access Required' },
      { status: 403 }
    )
  }

  return NextResponse.next()
}

// ✅ Apply middleware only to `/api/*` routes
export const config = {
  matcher: ['/api/:path*'],
}
