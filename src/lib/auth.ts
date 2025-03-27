import { NextResponse } from 'next/server'
import { verifyAccessToken } from '@/lib/jwt'

export async function authenticate(
  req: Request,
  requiredRole: string = 'admin'
) {
  try {
    const token = req.headers.get('Authorization')?.split(' ')[1]
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

    // If required role is admin, check if user is an admin
    if (requiredRole === 'admin' && decoded?.role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden - Admin Access Required' },
        { status: 403 }
      )
    }

    return decoded // Pass the user data if valid
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}
