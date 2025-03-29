import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/** GET: Fetch all payment methods */
export async function GET() {
  try {
    const methods = await prisma.paymentMethod.findMany()
    return NextResponse.json(methods)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch payment methods' },
      { status: 500 }
    )
  }
}

/** POST: Add a new payment method */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name } = body

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }

    const newMethod = await prisma.paymentMethod.create({
      data: { name },
    })

    return NextResponse.json(newMethod, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create payment method' },
      { status: 500 }
    )
  }
}
