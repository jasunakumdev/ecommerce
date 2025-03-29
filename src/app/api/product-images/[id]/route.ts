import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/** GET: Fetch a product image by ID */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const image = await prisma.productImage.findUnique({
      where: { id: Number(params.id) },
      include: { product: true },
    })

    if (!image) {
      return NextResponse.json(
        { error: 'Product image not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(image)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch product image' },
      { status: 500 }
    )
  }
}
