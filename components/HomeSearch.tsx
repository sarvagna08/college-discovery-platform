'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function HomeSearch() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/colleges?q=${encodeURIComponent(query)}`)
    } else {
      router.push('/colleges')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 max-w-xl mx-auto w-full relative group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <svg className="h-5 w-5 text-[#94a3b8] group-focus-within:text-[#6c63ff] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for colleges..."
        className="block w-full pl-11 pr-32 py-4 border border-[#1e1e2e] rounded-full leading-5 bg-[#12121a]/80 backdrop-blur-xl text-white placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#6c63ff] focus:border-[#6c63ff] sm:text-lg transition-all shadow-lg hover:border-[#6c63ff]/50"
      />
      <button
        type="submit"
        className="absolute inset-y-1.5 right-1.5 px-6 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-[#6c63ff] hover:bg-[#4f46e5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6c63ff] focus:ring-offset-[#0a0a0f] transition-all"
      >
        Search
      </button>
    </form>
  )
}
