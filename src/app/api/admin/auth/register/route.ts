import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const { username, email, password, firstName, lastName, role } =
      await req.json()

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already in use' },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        passwordHash: hashedPassword,
        firstName,
        lastName,
        role,
      },
    })

    return NextResponse.json(
      { message: 'User registered successfully', id: newUser.id },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to register user' },
      { status: 500 }
    )
  }
}
