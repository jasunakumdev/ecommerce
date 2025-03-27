import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyAccessToken } from '@/lib/jwt'

export function middleware(req: NextRequest) {
  const token = req.headers.get('Authorization')?.split(' ')[1]

  // Define routes that require admin authorization
  const protectedRoutes = [
    '/api/orders',
    '/api/orders/',
    '/api/payments',
    '/api/payments/',
    '/api/admin-users',
    '/api/admin-users/',
  ]

  // Skip middleware for public routes
  if (
    !protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))
  ) {
    return NextResponse.next()
  }

  if (!token) {
    return NextResponse.json(
      { error: 'Unauthorized - Token Missing' },
      { status: 401 }
    )
  }

  const decoded = verifyAccessToken(token)
  if (!decoded) {
    return NextResponse.json({ error: 'Invalid Token' }, { status: 403 })
  }

  if (decoded?.role !== 'admin') {
    return NextResponse.json(
      { error: 'Forbidden - Admin Access Required' },
      { status: 403 }
    )
  }

  return NextResponse.next() // Continue if authorized
}
