import React from 'react'

const Action = () => {
  return (
     <section className="py-16 px-6 md:px-10 bg-[#E0ECF4] text-center">
            <h3 className="text-4xl font-bold text-[#1A4B6B] mb-6">Ready to optimize your website?</h3>
            <p className="text-xl text-[#4B5563] mb-8">Join thousands of web developers who trust BugCheck for a flawless online presence.</p>
            <button onclick="showDashboard()" className="px-10 py-4 bg-[#06C755] text-white font-bold text-lg rounded-xl shadow-lg hover:bg-[#04A747] transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#06C755] focus:ring-opacity-50">
                Sign Up Now
            </button>
        </section>
  )
}

export default Action
