import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/** GET: Fetch all email verification entries */
export async function GET() {
  try {
    const emailVerifications = await prisma.emailVerification.findMany({
      include: { user: true },
    })
    return NextResponse.json(emailVerifications)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch email verifications' },
      { status: 500 }
    )
  }
}

/** POST: Create a new email verification entry */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const emailVerification = await prisma.emailVerification.create({
      data: {
        userId: body.userId,
        token: body.token,
        isVerified: body.isVerified ?? false,
      },
    })

    return NextResponse.json(emailVerification, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create email verification entry' },
      { status: 500 }
    )
  }
}
