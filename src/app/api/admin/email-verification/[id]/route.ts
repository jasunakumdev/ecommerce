import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/** GET: Fetch email verification entry by ID */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const emailVerification = await prisma.emailVerification.findUnique({
      where: { id: Number(params.id) },
      include: { user: true },
    })

    if (!emailVerification) {
      return NextResponse.json(
        { error: 'Email verification entry not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(emailVerification)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch email verification entry' },
      { status: 500 }
    )
  }
}

/** PUT: Update email verification entry by ID */
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json()
    const emailVerification = await prisma.emailVerification.update({
      where: { id: Number(params.id) },
      data: {
        token: body.token,
        isVerified: body.isVerified,
      },
    })

    return NextResponse.json(emailVerification)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update email verification entry' },
      { status: 500 }
    )
  }
}

/** DELETE: Remove email verification entry by ID */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.emailVerification.delete({
      where: { id: Number(params.id) },
    })

    return NextResponse.json({
      message: 'Email verification entry deleted successfully',
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete email verification entry' },
      { status: 500 }
    )
  }
}
