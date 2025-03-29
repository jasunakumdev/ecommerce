import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET: Retrieve a specific search index entry by ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const searchIndex = await prisma.searchIndex.findUnique({
      where: { id: Number(params.id) },
      include: { product: true },
    })

    if (!searchIndex) {
      return NextResponse.json(
        { error: 'Search index not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(searchIndex)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch search index' },
      { status: 500 }
    )
  }
}
