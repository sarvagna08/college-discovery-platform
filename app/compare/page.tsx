import { prisma } from '@/lib/prisma'
import CompareClient from './CompareClient'

export default async function ComparePage() {
  const allColleges = await prisma.college.findMany({
    orderBy: {
      name: 'asc'
    }
  })

  return <CompareClient allColleges={allColleges} />
}
