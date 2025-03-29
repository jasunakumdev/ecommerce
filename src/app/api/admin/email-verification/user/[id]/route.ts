import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/** 📌 GET: Fetch email verification entries by user ID */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const emailVerifications = await prisma.emailVerification.findMany({
      where: { userId: Number(params.id) },
      include: { user: true },
    })

    if (!emailVerifications.length) {
      return NextResponse.json(
        { error: 'No email verification entries found for this user' },
        { status: 404 }
      )
    }

    return NextResponse.json(emailVerifications)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch email verification entries' },
      { status: 500 }
    )
  }
}
