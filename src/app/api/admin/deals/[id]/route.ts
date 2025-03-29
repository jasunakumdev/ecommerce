import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/**  GET: Fetch a deal by ID */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const deal = await prisma.deal.findUnique({
      where: { id: Number(params.id) },
      include: { product: true },
    })

    if (!deal) {
      return NextResponse.json({ error: 'Deal not found' }, { status: 404 })
    }

    return NextResponse.json(deal)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch deal' }, { status: 500 })
  }
}

/**  PUT: Update a deal by ID */
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json()
    const { productId, dealType, discount, startDate, endDate } = body

    const updatedDeal = await prisma.deal.update({
      where: { id: Number(params.id) },
      data: { productId, dealType, discount, startDate, endDate },
    })

    return NextResponse.json(updatedDeal)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update deal' },
      { status: 500 }
    )
  }
}

/**  DELETE: Remove a deal by ID */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.deal.delete({ where: { id: Number(params.id) } })
    return NextResponse.json({ message: 'Deal deleted' }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete deal' },
      { status: 500 }
    )
  }
}
