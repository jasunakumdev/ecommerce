import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { authenticate } from '@/lib/auth'

const prisma = new PrismaClient()

/** GET: Fetch all orders */
export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: { user: true, orderItems: true, payment: true },
    })
    return NextResponse.json(orders)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}

/** POST: Add a new order */
export async function POST(req: NextRequest) {
  const user = await authenticate(req, 'admin')
  if (!user)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const { userId, status, totalAmount, orderItems } = body

    if (
      !userId ||
      !status ||
      !totalAmount ||
      !orderItems ||
      !Array.isArray(orderItems)
    ) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 })
    }

    const newOrder = await prisma.order.create({
      data: {
        userId,
        status,
        totalAmount,
        orderItems: {
          create: orderItems.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: { orderItems: true },
    })

    return NextResponse.json(newOrder, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}
