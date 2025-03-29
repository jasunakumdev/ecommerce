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
