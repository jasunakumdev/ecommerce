import { NextResponse } from 'next/server'
import { verifyRefreshToken, generateAccessToken } from '@/lib/jwt'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export async function POST(req: Request) {
  try {
    const { refreshToken } = await req.json()

    const decoded = verifyRefreshToken(refreshToken)
    if (!decoded)
      return NextResponse.json(
        { error: 'Invalid refresh token' },
        { status: 403 }
      )

    const user = await prisma.user.findUnique({ where: { id: decoded.id } })
    if (!user || user.refreshToken !== refreshToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const newAccessToken = generateAccessToken(user)
    return NextResponse.json({ accessToken: newAccessToken })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to refresh token' },
      { status: 500 }
    )
  }
}
