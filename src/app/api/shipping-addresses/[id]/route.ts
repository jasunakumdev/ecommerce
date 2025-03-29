import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/** GET: Fetch a shipping address by ID */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const address = await prisma.shippingAddress.findUnique({
      where: { id: Number(params.id) },
      include: { user: true },
    })

    if (!address) {
      return NextResponse.json(
        { error: 'Shipping address not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(address)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch shipping address' },
      { status: 500 }
    )
  }
}
