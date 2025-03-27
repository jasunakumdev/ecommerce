import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/** GET: Fetch all product images */
export async function GET() {
  try {
    const images = await prisma.productImage.findMany({
      include: { product: true },
    })
    return NextResponse.json(images)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch product images' },
      { status: 500 }
    )
  }
}

/** POST: Create a new product image */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { productId, imageUrl, isMain } = body

    if (!productId || !imageUrl) {
      return NextResponse.json(
        { error: 'Product ID and Image URL are required' },
        { status: 400 }
      )
    }

    const newImage = await prisma.productImage.create({
      data: { productId, imageUrl, isMain },
    })

    return NextResponse.json(newImage, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create product image' },
      { status: 500 }
    )
  }
}
