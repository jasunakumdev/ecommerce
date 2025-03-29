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

/** PATCH: Update an order (status, totalAmount) */
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json()
    const { status, totalAmount } = body

    if (!status && !totalAmount) {
      return NextResponse.json(
        { error: 'Provide at least one field to update' },
        { status: 400 }
      )
    }

    const updatedOrder = await prisma.order.update({
      where: { id: Number(params.id) },
      data: { status, totalAmount },
    })

    return NextResponse.json(updatedOrder)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    )
  }
}

/** DELETE: Remove an order by ID */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.order.delete({ where: { id: Number(params.id) } })
    return NextResponse.json({ message: 'Order removed' }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to remove order' },
      { status: 500 }
    )
  }
}
