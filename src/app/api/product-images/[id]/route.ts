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

/** PUT: Update a product image by ID */
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json()
    const { imageUrl, isMain } = body

    const updatedImage = await prisma.productImage.update({
      where: { id: Number(params.id) },
      data: { imageUrl, isMain },
    })

    return NextResponse.json(updatedImage)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update product image' },
      { status: 500 }
    )
  }
}

/** DELETE: Remove a product image by ID */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.productImage.delete({ where: { id: Number(params.id) } })
    return NextResponse.json(
      { message: 'Product image deleted' },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete product image' },
      { status: 500 }
    )
  }
}
