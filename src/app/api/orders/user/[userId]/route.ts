import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/** GET: Fetch all orders for a specific user */
export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: Number(params.userId) },
      include: { orderItems: true, payment: true },
    })

    return NextResponse.json(orders)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch orders for the user' },
      { status: 500 }
    )
  }
}
