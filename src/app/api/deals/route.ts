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
