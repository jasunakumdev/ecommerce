import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/** GET: Fetch images by Product ID */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const images = await prisma.productImage.findMany({
      where: { productId: Number(params.id) },
    })

    if (!images.length) {
      return NextResponse.json(
        { error: 'No images found for this product' },
        { status: 404 }
      )
    }

    return NextResponse.json(images)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch product images' },
      { status: 500 }
    )
  }
}
