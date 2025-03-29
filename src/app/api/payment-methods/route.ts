import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/** GET: Fetch all payment methods */
export async function GET() {
  try {
    const methods = await prisma.paymentMethod.findMany()
    return NextResponse.json(methods)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch payment methods' },
      { status: 500 }
    )
  }
}
