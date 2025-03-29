import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/** GET: Fetch an order by ID */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: Number(params.id) },
      include: { user: true, orderItems: true, payment: true },
    })

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    return NextResponse.json(order)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch order' },
      { status: 500 }
    )
  }
}
