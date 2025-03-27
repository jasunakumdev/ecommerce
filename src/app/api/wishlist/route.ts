import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/** GET: Fetch all wishlist items */
export async function GET() {
  try {
    const wishlist = await prisma.wishlist.findMany({
      include: { product: true, user: true },
    })
    return NextResponse.json(wishlist)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch wishlist' },
      { status: 500 }
    )
  }
}

/** POST: Add a product to wishlist */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { userId, productId } = body

    if (!userId || !productId) {
      return NextResponse.json(
        { error: 'User ID and Product ID are required' },
        { status: 400 }
      )
    }

    const existingWishlistItem = await prisma.wishlist.findFirst({
      where: { userId, productId },
    })

    if (existingWishlistItem) {
      return NextResponse.json(
        { error: 'Product already in wishlist' },
        { status: 409 }
      )
    }

    const newWishlistItem = await prisma.wishlist.create({
      data: { userId, productId },
    })

    return NextResponse.json(newWishlistItem, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to add to wishlist' },
      { status: 500 }
    )
  }
}
