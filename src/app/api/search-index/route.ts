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
