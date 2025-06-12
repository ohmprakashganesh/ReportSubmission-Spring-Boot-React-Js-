import React from 'react'

const HealthScoreCard = () => {
  return (
    <div className="lg:col-span-1 bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center">
                        <h3 className="text-xl font-semibold text-[#1A4B6B] mb-4">Overall Website Health</h3>
                        <div className="relative w-32 h-32 flex items-center justify-center rounded-full bg-gray-100 border-4 border-[#06C755] mb-4">
                            <span className="text-5xl font-bold text-[#06C755]">85</span>
                            <span className="text-xl text-[#06C755] absolute bottom-6 right-6">%</span>
                        </div>
                        <p className="text-[#4B5563] text-sm">Based on your latest scan of 'example.com'.</p>
                    </div>
  )
}

export default HealthScoreCard
