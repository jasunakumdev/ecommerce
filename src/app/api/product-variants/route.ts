import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/** GET: Fetch all product variants */
export async function GET() {
  try {
    const variants = await prisma.productVariant.findMany({
      include: { product: true },
    })
    return NextResponse.json(variants)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch product variants' },
      { status: 500 }
    )
  }
}
