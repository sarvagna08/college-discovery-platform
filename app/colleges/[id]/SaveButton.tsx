'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function SaveButton({ 
  collegeId, 
  initialIsSaved 
}: { 
  collegeId: string, 
  initialIsSaved: boolean 
}) {
  const { status } = useSession()
  const router = useRouter()
  const [isSaved, setIsSaved] = useState(initialIsSaved)
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = async () => {
    if (status === 'unauthenticated') {
      router.push('/login')
      return
    }

    setIsLoading(true)
    try {
      const res = await fetch(`/api/colleges/${collegeId}/save`, {
        method: 'POST'
      })
      
      if (res.ok) {
        const data = await res.json()
        setIsSaved(data.saved)
        router.refresh()
      }
    } catch (error) {
      console.error('Failed to save college', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleSave}
      disabled={isLoading}
      className={`inline-flex items-center px-4 py-2 border rounded-xl text-sm font-medium shadow-sm transition-all duration-300 ${
        isSaved 
          ? 'border-blue-200 text-blue-700 bg-blue-50 hover:bg-blue-100' 
          : 'border-gray-200 text-gray-700 bg-white hover:bg-gray-50'
      } disabled:opacity-50`}
    >
      <svg 
        className={`mr-2 h-5 w-5 ${isSaved ? 'text-blue-600 fill-current' : 'text-gray-400'}`} 
        fill={isSaved ? "currentColor" : "none"}
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
      </svg>
      {isSaved ? 'Saved' : 'Save College'}
    </button>
  )
}
