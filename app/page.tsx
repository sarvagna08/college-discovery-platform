import Link from 'next/link'
import HomeSearch from '@/components/HomeSearch'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0f]">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-[#1e1e2e]">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a1040]/80 to-[#0a0a0f] opacity-90" />
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[1000px] h-[500px] bg-[#6c63ff]/20 blur-[120px] rounded-full pointer-events-none"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
          <div className="text-center z-10 relative">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6c63ff] to-[#9d97ff]">Perfect</span> College
            </h1>
            <p className="mt-4 max-w-2xl text-xl text-[#94a3b8] mx-auto mb-10 leading-relaxed">
              Your future starts here. Explore top institutions, compare fees, and discover the best placements all in one platform.
            </p>
            
            <HomeSearch />

            <div className="mt-12 flex flex-col sm:flex-row justify-center gap-5">
              <Link href="/colleges" className="inline-flex justify-center items-center px-8 py-3.5 border border-transparent text-base font-semibold rounded-full text-white bg-[#6c63ff] hover:bg-[#4f46e5] shadow-[0_0_20px_rgba(108,99,255,0.4)] hover:shadow-[0_0_30px_rgba(108,99,255,0.6)] transition-all duration-300">
                Explore Colleges
              </Link>
              <Link href="/compare" className="inline-flex justify-center items-center px-8 py-3.5 border border-[#6c63ff] text-base font-semibold rounded-full text-[#9d97ff] bg-transparent hover:bg-[#6c63ff]/10 transition-all duration-300">
                Compare Colleges
              </Link>
            </div>
          </div>
        </div>
        
        {/* Animated Stats Row */}
        <div className="relative border-t border-[#1e1e2e] bg-[#12121a]/50 backdrop-blur-sm py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-[#1e1e2e]/50">
              <div className="flex flex-col transform hover:scale-105 transition-transform duration-300">
                <span className="text-3xl font-bold text-white mb-1">500+</span>
                <span className="text-sm font-medium text-[#94a3b8] uppercase tracking-wider">Colleges</span>
              </div>
              <div className="flex flex-col transform hover:scale-105 transition-transform duration-300">
                <span className="text-3xl font-bold text-white mb-1">50K+</span>
                <span className="text-sm font-medium text-[#94a3b8] uppercase tracking-wider">Students</span>
              </div>
              <div className="flex flex-col transform hover:scale-105 transition-transform duration-300">
                <span className="text-3xl font-bold text-white mb-1">95%</span>
                <span className="text-sm font-medium text-[#94a3b8] uppercase tracking-wider">Placement Rate</span>
              </div>
              <div className="flex flex-col transform hover:scale-105 transition-transform duration-300">
                <span className="text-3xl font-bold text-white mb-1">200+</span>
                <span className="text-sm font-medium text-[#94a3b8] uppercase tracking-wider">Courses</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-[#0a0a0f] relative overflow-hidden">
        <div className="absolute right-0 top-1/2 w-[500px] h-[500px] bg-[#6c63ff]/5 blur-[150px] rounded-full pointer-events-none transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Everything you need</h2>
            <p className="text-[#94a3b8] text-lg max-w-2xl mx-auto">Make the most important decision of your career with confidence.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group bg-[#12121a] rounded-3xl p-8 border border-[#1e1e2e] hover:border-[#6c63ff]/50 hover:shadow-[0_0_30px_rgba(108,99,255,0.15)] transition-all duration-300 transform hover:-translate-y-1">
              <div className="h-14 w-14 bg-[#1e1e2e] group-hover:bg-[#6c63ff]/20 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 border border-[#2a2a3a] group-hover:border-[#6c63ff]/30">
                <svg className="h-7 w-7 text-[#6c63ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#9d97ff] transition-colors">Search</h3>
              <p className="text-[#94a3b8] leading-relaxed">
                Browse through an extensive database of premier Indian colleges. Filter by name and find the right fit for your academic goals.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group bg-[#12121a] rounded-3xl p-8 border border-[#1e1e2e] hover:border-[#6c63ff]/50 hover:shadow-[0_0_30px_rgba(108,99,255,0.15)] transition-all duration-300 transform hover:-translate-y-1">
              <div className="h-14 w-14 bg-[#1e1e2e] group-hover:bg-[#6c63ff]/20 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 border border-[#2a2a3a] group-hover:border-[#6c63ff]/30">
                <svg className="h-7 w-7 text-[#6c63ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#9d97ff] transition-colors">Compare</h3>
              <p className="text-[#94a3b8] leading-relaxed">
                Put your top choices side-by-side. Compare annual fees, ratings, and placements easily to see which institution offers the best value.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group bg-[#12121a] rounded-3xl p-8 border border-[#1e1e2e] hover:border-[#6c63ff]/50 hover:shadow-[0_0_30px_rgba(108,99,255,0.15)] transition-all duration-300 transform hover:-translate-y-1">
              <div className="h-14 w-14 bg-[#1e1e2e] group-hover:bg-[#6c63ff]/20 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 border border-[#2a2a3a] group-hover:border-[#6c63ff]/30">
                <svg className="h-7 w-7 text-[#6c63ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#9d97ff] transition-colors">Decide</h3>
              <p className="text-[#94a3b8] leading-relaxed">
                Make an informed decision about your future. Use our comprehensive insights and detailed overviews to finalize your dream college.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
