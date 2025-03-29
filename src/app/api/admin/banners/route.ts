import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { writeFile } from 'fs/promises'
import path from 'path'

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
    const formData = await req.formData()

    const title = formData.get('title') as string | null
    const discount = formData.get('discount') as string | null
    const startDate = formData.get('startDate') as string | null | string
    const endDate = formData.get('endDate') as string | null
    const isActive = formData.get('isActive') as string | null
    const file = formData.get('image') as File | null // Ensure it's a File object

    const userId = formData.get('userId') as number | null
    const productId = formData.get('productId') as number | null

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json(
        { error: 'Image file is required' },
        { status: 400 }
      )
    }

    const buffer = Buffer.from(await file.arrayBuffer())

    // Generate a unique filename using crypto
    const fileExtension = file.name.split('.').pop()
    const uuid = crypto.randomUUID() // Get file extension
    const uniqueFilename = `${uuid}.${fileExtension}`

    const imagePath = path.join(
      process.cwd(),
      'public/images/product-banner/' + uniqueFilename
    )
    const imageUrl = `/images/product-banner/${uniqueFilename}`
    if (!imagePath) {
      return NextResponse.json(
        { error: 'Image URL is required' },
        { status: 400 }
      )
    }

    await writeFile(imagePath, buffer)

    if (!userId || !productId) {
      return NextResponse.json(
        { error: 'userId and productId are required' },
        { status: 400 }
      )
    }

    const discountValue = discount ? parseFloat(discount) : 0.0
    const isActiveValue = isActive === 'true'

    const newBanner = await prisma.banner.create({
      data: {
        title,
        imageUrl,
        discount: discountValue,
        startDate,
        endDate,
        isActive: isActiveValue,
        userId: parseInt(userId),
        productId: parseInt(productId),
      },
    })

    return NextResponse.json(newBanner, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create banner' },
      { status: 500 }
    )
  }
}
