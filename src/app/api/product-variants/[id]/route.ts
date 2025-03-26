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

/** PUT: Update product variant by ID */
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json()
    const variant = await prisma.productVariant.update({
      where: { id: Number(params.id) },
      data: {
        size: body.size,
        color: body.color,
        stock: body.stock,
        price: body.price,
      },
    })

    return NextResponse.json(variant)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update product variant' },
      { status: 500 }
    )
  }
}

/** DELETE: Remove product variant by ID */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.productVariant.delete({
      where: { id: Number(params.id) },
    })

    return NextResponse.json({
      message: 'Product variant deleted successfully',
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete product variant' },
      { status: 500 }
    )
  }
}
