import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/** GET: Fetch a banner by ID */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const banner = await prisma.banner.findUnique({
      where: { id: Number(params.id) },
    })

    if (!banner) {
      return NextResponse.json({ error: 'Banner not found' }, { status: 404 })
    }

    return NextResponse.json(banner)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch banner' },
      { status: 500 }
    )
  }
}

/** PUT: Update a banner by ID */
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json()
    const { title, imageUrl, discount, startDate, endDate, isActive } = body

    const updatedBanner = await prisma.banner.update({
      where: { id: Number(params.id) },
      data: { title, imageUrl, discount, startDate, endDate, isActive },
    })

    return NextResponse.json(updatedBanner)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update banner' },
      { status: 500 }
    )
  }
}

/** DELETE: Remove a banner by ID */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.banner.delete({ where: { id: Number(params.id) } })
    return NextResponse.json({ message: 'Banner deleted' }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete banner' },
      { status: 500 }
    )
  }
}
