import { NextResponse } from 'next/server'
import { verifyAccessToken } from '@/lib/jwt'

export async function GET(req: Request) {
  try {
    const token = req.headers.get('Authorization')?.split(' ')[1]
    if (!token)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const decoded = verifyAccessToken(token)
    return NextResponse.json(decoded)
  } catch (error) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 403 })
  }
}
