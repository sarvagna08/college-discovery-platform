import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function POST(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user?.email) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const params = await props.params
    const collegeId = params.id

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    const existingSave = await prisma.savedCollege.findFirst({
      where: {
        userId: user.id,
        collegeId: collegeId,
      }
    })

    if (existingSave) {
      // Unsave
      await prisma.savedCollege.delete({
        where: { id: existingSave.id }
      })
      return NextResponse.json({ saved: false })
    } else {
      // Save
      await prisma.savedCollege.create({
        data: {
          userId: user.id,
          collegeId: collegeId,
        }
      })
      return NextResponse.json({ saved: true })
    }
  } catch (error) {
    console.error('Save error:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
