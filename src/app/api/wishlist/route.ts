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
