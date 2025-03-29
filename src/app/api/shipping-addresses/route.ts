import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/** GET: Fetch all shipping addresses */
export async function GET() {
  try {
    const addresses = await prisma.shippingAddress.findMany({
      include: { user: true }, // Include user details
    })
    return NextResponse.json(addresses)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch addresses' },
      { status: 500 }
    )
  }
}
