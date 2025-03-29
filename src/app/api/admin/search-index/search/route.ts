import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
// GET: Perform a search query
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const query = searchParams.get('q')

    if (!query) {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      )
    }

    // Perform full-text search
    const results = await prisma.searchIndex.findMany({
      where: {
        searchText: {
          contains: query, // Case-insensitive search
          mode: 'insensitive',
        },
      },
      include: { product: true },
    })

    return NextResponse.json(results)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to search' }, { status: 500 })
  }
}
