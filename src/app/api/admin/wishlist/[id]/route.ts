import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/** GET: Fetch a wishlist item by ID */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const wishlistItem = await prisma.wishlist.findUnique({
      where: { id: Number(params.id) },
      include: { product: true, user: true },
    })

    if (!wishlistItem) {
      return NextResponse.json(
        { error: 'Wishlist item not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(wishlistItem)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch wishlist item' },
      { status: 500 }
    )
  }
}

/** DELETE: Remove a wishlist item by ID */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.wishlist.delete({ where: { id: Number(params.id) } })
    return NextResponse.json(
      { message: 'Wishlist item removed' },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to remove wishlist item' },
      { status: 500 }
    )
  }
}
