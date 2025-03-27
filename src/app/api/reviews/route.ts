import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/** GET: Fetch all reviews */
export async function GET() {
  try {
    const reviews = await prisma.review.findMany({
      include: { user: true, product: true },
    })
    return NextResponse.json(reviews)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    )
  }
}

/** POST: Create a new review */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { userId, productId, rating, comment } = body

    if (!userId || !productId || !rating) {
      return NextResponse.json(
        { error: 'User ID, Product ID, and Rating are required' },
        { status: 400 }
      )
    }

    const newReview = await prisma.review.create({
      data: { userId, productId, rating, comment },
    })

    return NextResponse.json(newReview, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create review' },
      { status: 500 }
    )
  }
}
