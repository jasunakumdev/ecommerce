import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/** GET: Fetch product variants by product ID */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productId = Number(params.id)

    const variants = await prisma.productVariant.findMany({
      where: { productId },
      include: { product: true },
    })

    if (!variants.length) {
      return NextResponse.json(
        { error: 'No product variants found for this product' },
        { status: 404 }
      )
    }

    return NextResponse.json(variants)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch product variants' },
      { status: 500 }
    )
  }
}
