import React from 'react'

const Hero = () => {
  return (
   <main className="flex-grow flex flex-col items-center justify-center text-center py-16 px-6 bg-[#F9FAFB]">
            <h2 className="text-5xl md:text-6xl font-extrabold text-[#1A4B6B] leading-tight mb-4 animate-fade-in-up">
                Find & Fix Website Bugs Faster.
            </h2>
            <p className="text-xl md:text-2xl text-[#4B5563] mb-8 max-w-3xl animate-fade-in-up delay-200">
                Automated scans for broken links, performance issues, SEO errors, and more.
            </p>
            <button onclick="showDashboard()" className="px-10 py-4 bg-[#06C755] text-white font-bold text-lg rounded-xl shadow-lg hover:bg-[#04A747] transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#06C755] focus:ring-opacity-50 animate-bounce-in">
                Get Started Free
            </button>
            <div className="mt-16 w-full max-w-4xl rounded-xl overflow-hidden shadow-2xl animate-fade-in delay-500">
                <img src="https://placehold.co/1200x600/CCDDEE/1A4B6B?text=Website+Scan+Preview" alt="Website Scan Preview" className="w-full h-auto object-cover"/>
            </div>
        </main>
  )
}

export default Hero
