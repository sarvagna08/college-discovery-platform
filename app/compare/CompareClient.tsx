'use client'

import { useState } from 'react'

type College = {
  id: string
  name: string
  location: string
  fees: number
  rating: number
  courses: string[]
  placements: string
}

export default function CompareClient({ allColleges }: { allColleges: College[] }) {
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const selectedColleges = selectedIds.map(
    (id) => allColleges.find((c) => c.id === id)!
  )

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value
    if (!id) return
    if (!selectedIds.includes(id) && selectedIds.length < 3) {
      setSelectedIds([...selectedIds, id])
    }
    // Reset dropdown
    e.target.value = ''
  }

  const handleRemove = (id: string) => {
    setSelectedIds(selectedIds.filter((cId) => cId !== id))
  }

  const clearAll = () => setSelectedIds([])

  // Calculate best values for highlighting
  const minFees = selectedColleges.length > 0
    ? Math.min(...selectedColleges.map((c) => c.fees))
    : 0
  const maxRating = selectedColleges.length > 0
    ? Math.max(...selectedColleges.map((c) => c.rating))
    : 0

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl mb-4">
          Compare Colleges
        </h1>
        <p className="text-xl text-white-500 max-w-2xl mx-auto">
          Select up to 3 colleges to compare their fees, ratings, and placements side-by-side.
        </p>
      </div>

      {/* Selection Area */}
      <div className="bg-white rounded-3xl shadow-sm border border-white-100 p-8 mb-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="w-full md:w-1/2 relative">
            <select
              onChange={handleSelect}
              className="block w-full pl-4 pr-10 py-4 text-base border-gray-200 bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-xl appearance-none shadow-inner"
              disabled={selectedIds.length >= 3}
            >
              <option value="">
                {selectedIds.length >= 3
                  ? "Maximum of 3 colleges selected"
                  : "Select a college to compare..."}
              </option>
              {allColleges
                .filter((c) => !selectedIds.includes(c.id))
                .map((college) => (
                  <option key={college.id} value={college.id}>
                    {college.name} ({college.location})
                  </option>
                ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-500">
              {selectedIds.length} / 3 selected
            </span>
            {selectedIds.length > 0 && (
              <button
                onClick={clearAll}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
              >
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* Selected Badges */}
        {selectedIds.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-100">
            {selectedColleges.map((college) => (
              <div
                key={college.id}
                className="inline-flex items-center bg-blue-50 text-blue-700 rounded-full pl-4 pr-2 py-1.5 text-sm font-medium border border-blue-100 shadow-sm"
              >
                {college.name}
                <button
                  type="button"
                  onClick={() => handleRemove(college.id)}
                  className="flex-shrink-0 ml-2 h-5 w-5 rounded-full inline-flex items-center justify-center text-blue-400 hover:bg-blue-200 hover:text-blue-600 focus:outline-none focus:bg-blue-500 focus:text-white transition-colors"
                >
                  <span className="sr-only">Remove large option</span>
                  <svg className="h-3 w-3" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                    <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Comparison Table */}
      {selectedColleges.length > 0 ? (
        <div className="bg-white shadow-xl shadow-blue-900/5 rounded-3xl border border-gray-100 overflow-hidden relative">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-200 text-gray-500 text-sm uppercase tracking-wider">
                  <th className="py-6 px-6 w-1/4 font-semibold">Features</th>
                  {selectedColleges.map((college) => (
                    <th key={college.id} className="py-6 px-6 w-1/4 font-bold text-gray-900 text-lg relative">
                      {college.name}
                      {selectedColleges.length > 1 && college.rating === maxRating && college.fees === minFees && (
                        <span className="absolute -top-3 right-4 bg-gradient-to-r from-amber-400 to-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm transform rotate-3">
                          BEST OVERALL
                        </span>
                      )}
                    </th>
                  ))}
                  {[...Array(3 - selectedColleges.length)].map((_, i) => (
                    <th key={`empty-head-${i}`} className="py-6 px-6 w-1/4"></th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {/* Location */}
                <tr className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-5 px-6 font-medium text-gray-900 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Location
                  </td>
                  {selectedColleges.map((college) => (
                    <td key={college.id} className="py-5 px-6">{college.location}</td>
                  ))}
                  {[...Array(3 - selectedColleges.length)].map((_, i) => (
                    <td key={`empty-loc-${i}`} className="py-5 px-6 bg-gray-50/30"></td>
                  ))}
                </tr>

                {/* Rating */}
                <tr className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-5 px-6 font-medium text-gray-900 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Rating
                  </td>
                  {selectedColleges.map((college) => {
                    const isBest = selectedColleges.length > 1 && college.rating === maxRating;
                    return (
                      <td key={college.id} className="py-5 px-6 relative">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${isBest ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-gray-100 text-gray-800'
                          }`}>
                          {college.rating} / 5.0
                        </span>
                        {isBest && <span className="ml-2 text-xs font-semibold text-green-600">Best</span>}
                      </td>
                    );
                  })}
                  {[...Array(3 - selectedColleges.length)].map((_, i) => (
                    <td key={`empty-rating-${i}`} className="py-5 px-6 bg-gray-50/30"></td>
                  ))}
                </tr>

                {/* Fees */}
                <tr className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-5 px-6 font-medium text-gray-900 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Annual Fees
                  </td>
                  {selectedColleges.map((college) => {
                    const isBest = selectedColleges.length > 1 && college.fees === minFees;
                    return (
                      <td key={college.id} className="py-5 px-6">
                        <div className={`text-lg font-bold ${isBest ? 'text-green-600' : 'text-gray-900'}`}>
                          ₹{college.fees.toLocaleString('en-IN')}
                        </div>
                        {isBest && <span className="text-xs font-semibold text-green-600">Lowest Fees</span>}
                      </td>
                    );
                  })}
                  {[...Array(3 - selectedColleges.length)].map((_, i) => (
                    <td key={`empty-fees-${i}`} className="py-5 px-6 bg-gray-50/30"></td>
                  ))}
                </tr>

                {/* Placements */}
                <tr className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-5 px-6 font-medium text-gray-900 flex items-start mt-1">
                    <svg className="w-5 h-5 mr-2 text-indigo-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Placements
                  </td>
                  {selectedColleges.map((college) => (
                    <td key={college.id} className="py-5 px-6 text-sm leading-relaxed">
                      {college.placements}
                    </td>
                  ))}
                  {[...Array(3 - selectedColleges.length)].map((_, i) => (
                    <td key={`empty-place-${i}`} className="py-5 px-6 bg-gray-50/30"></td>
                  ))}
                </tr>

                {/* Courses */}
                <tr className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-5 px-6 font-medium text-gray-900 flex items-start mt-1">
                    <svg className="w-5 h-5 mr-2 text-blue-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Top Courses
                  </td>
                  {selectedColleges.map((college) => (
                    <td key={college.id} className="py-5 px-6">
                      <div className="flex flex-wrap gap-2">
                        {college.courses.map((course, idx) => (
                          <span key={idx} className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-600">
                            {course}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                  {[...Array(3 - selectedColleges.length)].map((_, i) => (
                    <td key={`empty-courses-${i}`} className="py-5 px-6 bg-gray-50/30"></td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 border-dashed">
          <svg className="mx-auto h-12 w-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No colleges selected</h3>
          <p className="mt-1 text-sm text-gray-500">Select colleges from the dropdown above to start comparing.</p>
        </div>
      )}
    </div>
  )
}
