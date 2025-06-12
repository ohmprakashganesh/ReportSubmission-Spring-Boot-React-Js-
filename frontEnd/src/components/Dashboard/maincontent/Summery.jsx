import React from 'react'

const Summery = () => {
  return (
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                    <div className="bg-white rounded-xl shadow-md p-6 text-center">
                        <div className="p-3 bg-[#FEE2E2] rounded-full inline-flex mb-4">
                            <i className="fas fa-unlink text-xl text-[#D9534F]"></i>
                        </div>
                        <h4 className="text-2xl font-bold text-[#D9534F] mb-2">25</h4>
                        <p className="text-lg font-semibold text-[#1A4B6B] mb-3">Broken Links</p>
                        <a href="#" className="text-[#1A4B6B] hover:underline text-sm font-medium">View Details</a>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6 text-center">
                        <div className="p-3 bg-[#FFFBEB] rounded-full inline-flex mb-4">
                            <i className="fas fa-exclamation-triangle text-xl text-[#FFB200]"></i>
                        </div>
                        <h4 className="text-2xl font-bold text-[#FFB200] mb-2">10</h4>
                        <p className="text-lg font-semibold text-[#1A4B6B] mb-3">Performance Warnings</p>
                        <a href="#" className="text-[#1A4B6B] hover:underline text-sm font-medium">View Details</a>
                    </div>

    
                 <div className="bg-white rounded-xl shadow-md p-6 text-center">
                        <div className="p-3 bg-[#E0ECF4] rounded-full inline-flex mb-4">
                            <i className="fas fa-magnifying-glass text-xl text-[#1A4B6B]"></i>
                        </div>
                        <h4 className="text-2xl font-bold text-[#1A4B6B] mb-2">5</h4>
                        <p className="text-lg font-semibold text-[#1A4B6B] mb-3">SEO Errors</p>
                        <a href="#" className="text-[#1A4B6B] hover:underline text-sm font-medium">View Details</a>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center text-center">
                        <i className="fas fa-plus-circle text-5xl text-gray-300 mb-4"></i>
                        <h4 className="text-xl font-semibold text-[#1A4B6B] mb-3">Add New Website</h4>
                        <p className="text-[#4B5563] text-sm mb-4">Start monitoring a new site today!</p>
                        <button className="px-6 py-2 bg-[#06C755] text-white font-semibold rounded-lg hover:bg-[#04A747] transition-colors focus:outline-none focus:ring-2 focus:ring-[#06C755] focus:ring-opacity-50">
                            Add Website
                        </button>
                    </div>
                </div>
  )
}

export default Summery
