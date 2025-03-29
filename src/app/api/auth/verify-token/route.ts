import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string

export async function POST(req: Request) {
  try {
    const { token } = await req.json()
    if (!token) {
      return NextResponse.json({ error: 'Token missing' }, { status: 401 })
    }

    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET)
    return NextResponse.json({ success: true, decoded })
  } catch (error) {
    return NextResponse.json({ error: 'Invalid Token' }, { status: 403 })
  }
}
