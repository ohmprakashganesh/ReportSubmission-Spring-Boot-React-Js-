import React from 'react'

const Features = () => {
  return (
    <section className="py-20 px-6 md:px-10 bg-white">
            <h3 className="text-4xl font-bold text-center text-[#1A4B6B] mb-12">Key Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
                <div className="flex flex-col items-center text-center p-8 bg-gray-50 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="bg-[#E0ECF4] p-4 rounded-full mb-6">
                        <i className="fas fa-link text-3xl text-[#1A4B6B]"></i>
                    </div>
                    <h4 className="text-xl font-semibold text-[#1A4B6B] mb-3">Broken Link Detection</h4>
                    <p className="text-[#4B5563]">Automatically find and report all broken internal and external links on your website.</p>
                </div>
                <div className="flex flex-col items-center text-center p-8 bg-gray-50 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="bg-[#E0ECF4] p-4 rounded-full mb-6">
                        <i className="fas fa-tachometer-alt text-3xl text-[#1A4B6B]"></i>
                    </div>
                    <h4 className="text-xl font-semibold text-[#1A4B6B] mb-3">Performance Audits</h4>
                    <p className="text-[#4B5563]">Identify bottlenecks and get actionable insights to boost your site's speed and responsiveness.</p>
                </div>
                <div className="flex flex-col items-center text-center p-8 bg-gray-50 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="bg-[#E0ECF4] p-4 rounded-full mb-6">
                        <i className="fas fa-magnifying-glass-dollar text-3xl text-[#1A4B6B]"></i>
                    </div>
                    <h4 className="text-xl font-semibold text-[#1A4B6B] mb-3">SEO Analysis</h4>
                    <p className="text-[#4B5563]">Scan for common SEO errors like missing meta tags, broken images, and unoptimized content.</p>
                </div>
            </div>
        </section>
  )
}

export default Features
