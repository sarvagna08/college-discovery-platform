'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { data: session, status } = useSession()

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Colleges', href: '/colleges' },
    { name: 'Compare', href: '/compare' },
  ]

  const links = session 
    ? [...navLinks, { name: 'Saved', href: '/saved' }]
    : navLinks

  const isActive = (path: string) => pathname === path

  return (
    <nav className="sticky top-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-[#1e1e2e] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#6c63ff] to-[#9d97ff]">
                CollegeDiscover
              </span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors h-16 ${
                  isActive(link.href)
                    ? 'border-[#6c63ff] text-[#6c63ff]'
                    : 'border-transparent text-[#94a3b8] hover:text-white hover:border-[#1e1e2e]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex md:items-center md:space-x-4">
            {status === 'loading' ? (
              <div className="h-8 w-16 bg-[#1e1e2e] rounded animate-pulse"></div>
            ) : session ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-[#94a3b8]">
                  Hi, <span className="text-white">{session.user?.name || 'User'}</span>
                </span>
                <button
                  onClick={() => signOut()}
                  className="text-[#94a3b8] hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-[#1e1e2e]/50"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-[#94a3b8] hover:text-white border border-[#6c63ff] px-4 py-2 rounded-full text-sm font-medium transition-colors hover:bg-[#6c63ff]/10"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center px-5 py-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-[#6c63ff] hover:bg-[#4f46e5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6c63ff] focus:ring-offset-[#0a0a0f] transition-all shadow-[0_0_15px_rgba(108,99,255,0.3)] hover:shadow-[0_0_20px_rgba(108,99,255,0.5)]"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#94a3b8] hover:text-white hover:bg-[#1e1e2e] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#6c63ff]"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!isMobileMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0a0a0f] shadow-xl absolute w-full border-b border-[#1e1e2e]" id="mobile-menu">
          <div className="pt-2 pb-3 space-y-1">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`block pl-3 pr-4 py-3 border-l-4 text-base font-medium transition-colors ${
                  isActive(link.href)
                    ? 'bg-[#6c63ff]/10 border-[#6c63ff] text-[#6c63ff]'
                    : 'border-transparent text-[#94a3b8] hover:bg-[#1e1e2e] hover:border-[#1e1e2e] hover:text-white'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-6 border-t border-[#1e1e2e]">
            <div className="flex flex-col space-y-3 px-4">
              {session ? (
                <>
                  <div className="px-4 py-2 text-base font-medium text-[#94a3b8]">
                    Logged in as <span className="text-white">{session.user?.name}</span>
                  </div>
                  <button
                    onClick={() => {
                      signOut()
                      setIsMobileMenuOpen(false)
                    }}
                    className="block w-full text-center px-4 py-2.5 border border-[#1e1e2e] shadow-sm text-base font-medium text-white bg-[#12121a] hover:bg-[#1e1e2e] rounded-full transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="block w-full text-center px-4 py-2.5 border border-[#6c63ff] text-base font-medium text-white bg-transparent hover:bg-[#6c63ff]/10 rounded-full transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="block w-full text-center px-4 py-2.5 border border-transparent shadow-sm text-base font-medium text-white bg-[#6c63ff] hover:bg-[#4f46e5] rounded-full transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
