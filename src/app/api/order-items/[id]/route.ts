import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/** GET: Fetch an order item by ID */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const orderItem = await prisma.orderItem.findUnique({
      where: { id: Number(params.id) },
      include: { product: true, order: true },
    })

    if (!orderItem) {
      return NextResponse.json(
        { error: 'Order item not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(orderItem)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch order item' },
      { status: 500 }
    )
  }
}
