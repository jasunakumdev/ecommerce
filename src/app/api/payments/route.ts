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
