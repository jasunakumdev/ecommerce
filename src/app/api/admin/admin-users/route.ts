import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET: List all admin users
export async function GET() {
  try {
    const adminUsers = await prisma.adminUser.findMany({
      select: { id: true, username: true, role: true, createdAt: true }, // Exclude passwordHash
    })
    return NextResponse.json(adminUsers)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch admin users' },
      { status: 500 }
    )
  }
}

// POST: Add a new admin user
export async function POST(req: Request) {
  try {
    const { username, password, role = 'admin' } = await req.json()

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      )
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)

    const newAdmin = await prisma.adminUser.create({
      data: { username, passwordHash, role },
    })

    return NextResponse.json(
      { id: newAdmin.id, username: newAdmin.username, role: newAdmin.role },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create admin user' },
      { status: 500 }
    )
  }
}
