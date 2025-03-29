import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/** GET: Fetch all order items for a specific order */
export async function GET(
  req: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    const orderItems = await prisma.orderItem.findMany({
      where: { orderId: Number(params.orderId) },
      include: { product: true },
    })

    return NextResponse.json(orderItems)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch order items for the order' },
      { status: 500 }
    )
  }
}
