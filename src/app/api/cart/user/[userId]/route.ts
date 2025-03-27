import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/** DELETE: Remove all items from a user's cart */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    await prisma.cart.deleteMany({
      where: { userId: Number(params.userId) },
    })
    return NextResponse.json(
      { message: 'All cart items removed for user' },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json({ error: 'Failed to clear cart' }, { status: 500 })
  }
}
