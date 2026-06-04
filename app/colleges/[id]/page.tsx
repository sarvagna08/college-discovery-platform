import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import SaveButton from './SaveButton'

type PageProps = {
  params: Promise<{ id: string }>
}

export default async function CollegeDetailPage(props: PageProps) {
  const params = await props.params
  const college = await prisma.college.findUnique({
    where: {
      id: params.id,
    },
  })

  let isSaved = false
  const session = await getServerSession(authOptions)
  if (session?.user?.email && college) {
    const user = await prisma.user.findUnique({ where: { email: session.user.email } })
    if (user) {
      const savedCollege = await prisma.savedCollege.findFirst({
        where: { userId: user.id, collegeId: college.id }
      })
      isSaved = !!savedCollege
    }
  }

  if (!college) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Link 
          href="/colleges" 
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors mb-8 group"
        >
          <svg 
            className="mr-2 h-5 w-5 transform group-hover:-translate-x-1 transition-transform" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Colleges
        </Link>

        {/* Header Section */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700"></div>
          <div className="px-8 pb-8">
            <div className="relative flex justify-between items-end -mt-12 mb-6">
              <div className="bg-white p-2 rounded-2xl shadow-lg border border-gray-100">
                <div className="h-24 w-24 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl flex items-center justify-center text-3xl font-bold text-blue-600">
                  {college.name.charAt(0)}
                </div>
              </div>
              <div className="mb-2 flex items-center gap-3">
                <span className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-bold bg-amber-100 text-amber-800 border border-amber-200 shadow-sm">
                  ★ {college.rating} Rating
                </span>
                <SaveButton collegeId={college.id} initialIsSaved={isSaved} />
              </div>
            </div>
            
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{college.name}</h1>
            <div className="flex items-center text-gray-600">
              <svg className="flex-shrink-0 mr-2 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span className="text-lg">{college.location}</span>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column (Main Info) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <section className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <svg className="w-6 h-6 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Overview
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {college.overview}
              </p>
            </section>

            {/* Courses */}
            <section className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <svg className="w-6 h-6 mr-3 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Available Courses
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {college.courses.map((course, idx) => (
                  <div key={idx} className="bg-indigo-50/50 rounded-xl p-4 border border-indigo-100 text-center hover:bg-indigo-50 transition-colors">
                    <span className="font-semibold text-indigo-900">{course}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column (Highlights) */}
          <div className="space-y-8">
            {/* Fees Card */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <svg className="w-24 h-24 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Annual Fees</h3>
              <div className="flex items-baseline text-gray-900">
                <span className="text-4xl font-extrabold tracking-tight">₹{college.fees.toLocaleString('en-IN')}</span>
                <span className="ml-1 text-xl font-medium text-gray-500">/year</span>
              </div>
              <p className="mt-4 text-sm text-gray-500">Estimated cost including tuition and basic amenities.</p>
            </div>

            {/* Placements Card */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl shadow-xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-8 -translate-y-8">
                <div className="absolute inset-0 bg-blue-500 opacity-20 rounded-full blur-2xl"></div>
              </div>
              <h3 className="text-sm font-semibold text-blue-300 uppercase tracking-wider mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Placements Info
              </h3>
              <p className="text-2xl font-bold leading-tight mb-2">
                {college.placements}
              </p>
              <p className="text-gray-400 text-sm mt-4">
                Based on recent graduating batch statistics.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
