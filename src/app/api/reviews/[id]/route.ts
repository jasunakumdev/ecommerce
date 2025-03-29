import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/** GET: Fetch a review by ID */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const review = await prisma.review.findUnique({
      where: { id: Number(params.id) },
      include: { user: true, product: true },
    })

    if (!review) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 })
    }

    return NextResponse.json(review)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch review' },
      { status: 500 }
    )
  }
}
