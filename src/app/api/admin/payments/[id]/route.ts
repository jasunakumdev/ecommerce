import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/** GET: Fetch a payment by ID */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const payment = await prisma.payment.findUnique({
      where: { id: Number(params.id) },
      include: { order: true, method: true },
    })

    if (!payment) {
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 })
    }

    return NextResponse.json(payment)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch payment' },
      { status: 500 }
    )
  }
}

/** PATCH: Update a payment (status, amount) */
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json()
    const { amount, status, transactionId } = body

    if (!amount && !status && !transactionId) {
      return NextResponse.json(
        { error: 'Provide at least one field to update' },
        { status: 400 }
      )
    }

    const updatedPayment = await prisma.payment.update({
      where: { id: Number(params.id) },
      data: { amount, status, transactionId },
    })

    return NextResponse.json(updatedPayment)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update payment' },
      { status: 500 }
    )
  }
}

/** DELETE: Remove a payment by ID */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.payment.delete({ where: { id: Number(params.id) } })
    return NextResponse.json({ message: 'Payment removed' }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to remove payment' },
      { status: 500 }
    )
  }
}
