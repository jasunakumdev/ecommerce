import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/** GET: Fetch all order items */
export async function GET() {
  try {
    const orderItems = await prisma.orderItem.findMany({
      include: { product: true, order: true },
    })
    return NextResponse.json(orderItems)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch order items' },
      { status: 500 }
    )
  }
}

/** POST: Add a new order item */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { orderId, productId, quantity, price } = body

    if (!orderId || !productId || !quantity || !price) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    const newOrderItem = await prisma.orderItem.create({
      data: { orderId, productId, quantity, price },
    })

    return NextResponse.json(newOrderItem, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to add order item' },
      { status: 500 }
    )
  }
}
