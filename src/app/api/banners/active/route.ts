import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/** GET: Fetch only active banners */
export async function GET() {
  try {
    const activeBanners = await prisma.banner.findMany({
      where: { isActive: true },
    })

    return NextResponse.json(activeBanners)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch active banners' },
      { status: 500 }
    )
  }
}
