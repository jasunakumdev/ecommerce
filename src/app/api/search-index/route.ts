import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET: List all search index entries
export async function GET() {
  try {
    const searchIndexes = await prisma.searchIndex.findMany({
      include: { product: true },
    })
    return NextResponse.json(searchIndexes)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch search indexes' },
      { status: 500 }
    )
  }
}

// POST: Add a new search index entry
export async function POST(req: Request) {
  try {
    const { productId, searchText } = await req.json()

    if (!productId || !searchText) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const newEntry = await prisma.searchIndex.create({
      data: { productId, searchText },
    })

    return NextResponse.json(newEntry, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create search index' },
      { status: 500 }
    )
  }
}
