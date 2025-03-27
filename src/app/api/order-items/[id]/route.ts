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

/** PATCH: Update an order item (quantity or price) */
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json()
    const { quantity, price } = body

    if (!quantity && !price) {
      return NextResponse.json(
        { error: 'Provide at least one field to update' },
        { status: 400 }
      )
    }

    const updatedOrderItem = await prisma.orderItem.update({
      where: { id: Number(params.id) },
      data: { quantity, price },
    })

    return NextResponse.json(updatedOrderItem)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update order item' },
      { status: 500 }
    )
  }
}

/** DELETE: Remove an order item by ID */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.orderItem.delete({ where: { id: Number(params.id) } })
    return NextResponse.json({ message: 'Order item removed' }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to remove order item' },
      { status: 500 }
    )
  }
}
