import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const products = await prisma.product.findMany({
      where: { categoryId: Number(params.id) },
      include: { category: true },
    })

    if (!products.length) {
      return NextResponse.json(
        { error: 'No products found for this category' },
        { status: 404 }
      )
    }

    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}
