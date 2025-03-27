import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/** GET: Fetch all payments for a specific order */
export async function GET(
  req: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    const payments = await prisma.payment.findMany({
      where: { orderId: Number(params.orderId) },
      include: { method: true },
    })

    return NextResponse.json(payments)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch payments for the order' },
      { status: 500 }
    )
  }
}
