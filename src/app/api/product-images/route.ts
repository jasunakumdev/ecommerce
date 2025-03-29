import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/** GET: Fetch all product images */
export async function GET() {
  try {
    const images = await prisma.productImage.findMany({
      include: { product: true },
    })
    return NextResponse.json(images)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch product images' },
      { status: 500 }
    )
  }
}
