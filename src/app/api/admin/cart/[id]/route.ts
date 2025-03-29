import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/**  GET: Fetch a cart item by ID */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cartItem = await prisma.cart.findUnique({
      where: { id: Number(params.id) },
      include: { product: true, user: true },
    })

    if (!cartItem) {
      return NextResponse.json(
        { error: 'Cart item not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(cartItem)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch cart item' },
      { status: 500 }
    )
  }
}

/**  PATCH: Update cart item quantity */
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json()
    const { quantity } = body

    if (!quantity || quantity <= 0) {
      return NextResponse.json(
        { error: 'Quantity must be greater than zero' },
        { status: 400 }
      )
    }

    const updatedCartItem = await prisma.cart.update({
      where: { id: Number(params.id) },
      data: { quantity },
    })

    return NextResponse.json(updatedCartItem)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update cart item' },
      { status: 500 }
    )
  }
}

/**  DELETE: Remove a cart item by ID */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.cart.delete({ where: { id: Number(params.id) } })
    return NextResponse.json({ message: 'Cart item removed' }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to remove cart item' },
      { status: 500 }
    )
  }
}
