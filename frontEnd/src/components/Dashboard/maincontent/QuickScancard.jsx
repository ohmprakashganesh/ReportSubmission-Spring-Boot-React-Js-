import React from 'react'

const QuickScancard = () => {
  return (
    <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
                        <h3 className="text-xl font-semibold text-[#1A4B6B] mb-4">Quick Scan</h3>
                        <p className="text-[#4B5563] mb-4">Enter a URL to quickly scan it for common issues.</p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <input type="url" placeholder="https://www.yourwebsite.com" className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A4B6B] focus:border-transparent transition-all" required />
                            <button className="px-6 py-3 bg-[#1A4B6B] text-white font-semibold rounded-lg hover:bg-[#256D9C] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1A4B6B] focus:ring-opacity-50">
                                <i className="fas fa-play mr-2"></i> Scan Now
                            </button>
                        </div>
                    </div>
               
  )
}

export default QuickScancard
