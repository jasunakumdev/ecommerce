import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/** GET: Fetch all cart items */
export async function GET() {
  try {
    const cart = await prisma.cart.findMany({
      include: { product: true, user: true },
    })
    return NextResponse.json(cart)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch cart items' },
      { status: 500 }
    )
  }
}

/** POST: Add an item to the cart */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { userId, productId, quantity } = body

    if (!userId || !productId || !quantity) {
      return NextResponse.json(
        { error: 'User ID, Product ID, and Quantity are required' },
        { status: 400 }
      )
    }

    const existingCartItem = await prisma.cart.findFirst({
      where: { userId, productId },
    })

    if (existingCartItem) {
      return NextResponse.json(
        { error: 'Product already in cart, update quantity instead' },
        { status: 409 }
      )
    }

    const newCartItem = await prisma.cart.create({
      data: { userId, productId, quantity },
    })

    return NextResponse.json(newCartItem, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to add item to cart' },
      { status: 500 }
    )
  }
}
