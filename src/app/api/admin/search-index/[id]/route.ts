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

// PATCH: Update a search index entry
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { searchText } = await req.json()

    const updatedEntry = await prisma.searchIndex.update({
      where: { id: Number(params.id) },
      data: { searchText },
    })

    return NextResponse.json(updatedEntry)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update search index' },
      { status: 500 }
    )
  }
}

// DELETE: Remove a search index entry
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.searchIndex.delete({
      where: { id: Number(params.id) },
    })

    return NextResponse.json({ message: 'Search index deleted successfully' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete search index' },
      { status: 500 }
    )
  }
}
