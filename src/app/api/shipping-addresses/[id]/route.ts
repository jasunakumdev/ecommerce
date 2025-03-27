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

/** PUT: Update a shipping address by ID */
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json()
    const { addressLine1, addressLine2, city, state, country, postalCode } =
      body

    const updatedAddress = await prisma.shippingAddress.update({
      where: { id: Number(params.id) },
      data: { addressLine1, addressLine2, city, state, country, postalCode },
    })

    return NextResponse.json(updatedAddress)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update shipping address' },
      { status: 500 }
    )
  }
}

/** DELETE: Remove a shipping address by ID */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.shippingAddress.delete({ where: { id: Number(params.id) } })
    return NextResponse.json(
      { message: 'Shipping address deleted' },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete shipping address' },
      { status: 500 }
    )
  }
}
