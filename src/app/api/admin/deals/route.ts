import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/** GET: Fetch all deals */
export async function GET() {
  try {
    const deals = await prisma.deal.findMany({
      include: { product: true },
    })
    return NextResponse.json(deals)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch deals' },
      { status: 500 }
    )
  }
}

/** POST: Create a new deal */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { productId, dealType, discount, startDate, endDate } = body

    if (!productId || !dealType) {
      return NextResponse.json(
        { error: 'Product ID and Deal Type are required' },
        { status: 400 }
      )
    }

    const newDeal = await prisma.deal.create({
      data: { productId, dealType, discount, startDate, endDate },
    })

    return NextResponse.json(newDeal, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create deal' },
      { status: 500 }
    )
  }
}
