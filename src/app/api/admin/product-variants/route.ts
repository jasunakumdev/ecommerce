import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/** GET: Fetch all product variants */
export async function GET() {
  try {
    const variants = await prisma.productVariant.findMany({
      include: { product: true },
    })
    return NextResponse.json(variants)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch product variants' },
      { status: 500 }
    )
  }
}

/** POST: Add a new product variant */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const variant = await prisma.productVariant.create({
      data: {
        productId: body.productId,
        size: body.size,
        color: body.color,
        stock: body.stock,
        price: body.price,
      },
    })

    return NextResponse.json(variant, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create product variant' },
      { status: 500 }
    )
  }
}
