import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
// GET: Retrieve a specific admin user by ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const adminUser = await prisma.adminUser.findUnique({
      where: { id: Number(params.id) },
      select: { id: true, username: true, role: true, createdAt: true }, // Exclude passwordHash
    })

    if (!adminUser) {
      return NextResponse.json(
        { error: 'Admin user not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(adminUser)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch admin user' },
      { status: 500 }
    )
  }
}

// PATCH: Update an admin user (username, password, or role)
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { username, password, role } = await req.json()
    let updateData: any = {}

    if (username) updateData.username = username
    if (role) updateData.role = role
    if (password) {
      const salt = await bcrypt.genSalt(10)
      updateData.passwordHash = await bcrypt.hash(password, salt)
    }

    const updatedAdmin = await prisma.adminUser.update({
      where: { id: Number(params.id) },
      data: updateData,
    })

    return NextResponse.json({
      id: updatedAdmin.id,
      username: updatedAdmin.username,
      role: updatedAdmin.role,
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update admin user' },
      { status: 500 }
    )
  }
}

// DELETE: Remove an admin user
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.adminUser.delete({
      where: { id: Number(params.id) },
    })

    return NextResponse.json({ message: 'Admin user deleted successfully' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete admin user' },
      { status: 500 }
    )
  }
}
