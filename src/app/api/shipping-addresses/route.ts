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

/** POST: Create a new shipping address */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      userId,
      addressLine1,
      addressLine2,
      city,
      state,
      country,
      postalCode,
    } = body

    if (!userId || !addressLine1) {
      return NextResponse.json(
        { error: 'User ID and Address Line 1 are required' },
        { status: 400 }
      )
    }

    const newAddress = await prisma.shippingAddress.create({
      data: {
        userId,
        addressLine1,
        addressLine2,
        city,
        state,
        country,
        postalCode,
      },
    })

    return NextResponse.json(newAddress, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create shipping address' },
      { status: 500 }
    )
  }
}
