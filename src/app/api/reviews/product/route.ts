import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/** GET: Fetch reviews by Product ID */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const reviews = await prisma.review.findMany({
      where: { productId: Number(params.id) },
      include: { user: true },
    })

    if (!reviews.length) {
      return NextResponse.json(
        { error: 'No reviews found for this product' },
        { status: 404 }
      )
    }

    return NextResponse.json(reviews)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    )
  }
}
