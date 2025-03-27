import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/** GET: Fetch all banners */
export async function GET() {
  try {
    const banners = await prisma.banner.findMany()
    return NextResponse.json(banners)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch banners' },
      { status: 500 }
    )
  }
}

/** POST: Create a new banner */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { title, imageUrl, discount, startDate, endDate, isActive } = body

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'Image URL is required' },
        { status: 400 }
      )
    }

    const newBanner = await prisma.banner.create({
      data: { title, imageUrl, discount, startDate, endDate, isActive },
    })

    return NextResponse.json(newBanner, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create banner' },
      { status: 500 }
    )
  }
}
