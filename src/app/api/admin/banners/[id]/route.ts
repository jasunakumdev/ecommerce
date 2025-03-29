import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import path from 'path'
import fs from 'fs/promises'

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

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const formData = await req.formData()

    const bannerId = params.id
    const title = formData.get('title') as string | null
    const discount = formData.get('discount') as string | null
    const startDate = formData.get('startDate') as string | null
    const endDate = formData.get('endDate') as string | null
    const isActive = formData.get('isActive') as string | null
    const file = formData.get('image') as File | null

    if (!bannerId) {
      return NextResponse.json(
        { error: 'Banner ID is required' },
        { status: 400 }
      )
    }

    // Fetch existing banner
    const existingBanner = await prisma.banner.findUnique({
      where: { id: parseInt(bannerId) },
    })

    if (!existingBanner) {
      return NextResponse.json({ error: 'Banner not found' }, { status: 404 })
    }

    let imageUrl = existingBanner.imageUrl // Keep old image if no new image is uploaded
    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer())

      const fileExtension = file.name.split('.').pop()
      const uuid = crypto.randomUUID()
      const uniqueFilename = `${uuid}.${fileExtension}`

      if (uniqueFilename) {
        const imagePath = path.join(
          process.cwd(),
          'public/images/product-banner/',
          uniqueFilename
        )
        imageUrl = `/images/product-banner/${uniqueFilename}`

        await fs.writeFile(imagePath, buffer)

        if (existingBanner.imageUrl) {
          const oldImagePath = path.join(
            process.cwd(),
            'public',
            existingBanner.imageUrl
          )

          try {
            await fs.unlink(oldImagePath)
          } catch (err) {
            console.error('Error deleting old image:', err)
          }
        }
      }
    }

    const discountValue = discount ? parseFloat(discount) : 0.0
    const isActiveValue = isActive === 'true'

    // Update banner in DB
    const updatedBanner = await prisma.banner.update({
      where: { id: parseInt(bannerId) },
      data: {
        title,
        imageUrl,
        discount: discountValue,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        isActive: isActiveValue,
      },
    })

    return NextResponse.json(updatedBanner, { status: 200 })
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
    const existingBanner = await prisma.banner.findUnique({
      where: { id: Number(params.id) },
    })

    if (!existingBanner) {
      return NextResponse.json({ error: 'Banner not found' }, { status: 404 })
    }

    await prisma.banner.delete({ where: { id: Number(params.id) } })

    // Check if the image exists before deleting
    if (existingBanner.imageUrl) {
      const imagePath = path.join(
        process.cwd(),
        'public',
        existingBanner.imageUrl
      )

      try {
        await fs.access(imagePath) // Check if file exists
        await fs.unlink(imagePath) // Delete the image file
        console.log(`Deleted image: ${imagePath}`)
      } catch (err) {
        console.error('Error deleting image:', err)
      }
    }

    return NextResponse.json(
      { message: 'Banner and image deleted' },
      { status: 200 }
    )
  } catch (error) {
    console.error('ERROR---->', error)
    return NextResponse.json(
      { error: 'Failed to delete banner' },
      { status: 500 }
    )
  }
}
