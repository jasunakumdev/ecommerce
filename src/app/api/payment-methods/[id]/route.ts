import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/** GET: Fetch a payment method by ID */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const method = await prisma.paymentMethod.findUnique({
      where: { id: Number(params.id) },
    })

    if (!method) {
      return NextResponse.json(
        { error: 'Payment method not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(method)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch payment method' },
      { status: 500 }
    )
  }
}
