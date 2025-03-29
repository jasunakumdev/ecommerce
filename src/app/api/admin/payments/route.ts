import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/** GET: Fetch all payments */
export async function GET() {
  try {
    const payments = await prisma.payment.findMany({
      include: { order: true, method: true },
    })
    return NextResponse.json(payments)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch payments' },
      { status: 500 }
    )
  }
}

/** POST: Add a new payment */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { orderId, methodId, amount, status, transactionId } = body

    if (!orderId || !methodId || !amount || !status) {
      return NextResponse.json(
        { error: 'All fields except transactionId are required' },
        { status: 400 }
      )
    }

    const newPayment = await prisma.payment.create({
      data: { orderId, methodId, amount, status, transactionId },
    })

    return NextResponse.json(newPayment, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to add payment' },
      { status: 500 }
    )
  }
}
