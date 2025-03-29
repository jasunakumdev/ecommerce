import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/** GET: Fetch product variant by ID */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const variant = await prisma.productVariant.findUnique({
      where: { id: Number(params.id) },
      include: { product: true },
    })

    if (!variant) {
      return NextResponse.json(
        { error: 'Product variant not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(variant)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch product variant' },
      { status: 500 }
    )
  }
}
