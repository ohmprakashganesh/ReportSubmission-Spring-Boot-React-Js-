import React from 'react'
import HealthScoreCard from './HealthScoreCard'
import QuickScancard from './QuickScancard'
import RecentScans from './RecentScans'
import Summery from './Summery'

const MainContent = () => {
  return (
  <main className="flex-1 p-6 md:p-8 overflow-y-auto">
                <h2 className="text-3xl font-bold text-[#1A4B6B] mb-8">Dashboard Overview</h2>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">


       <HealthScoreCard/>
       <QuickScancard/>
       <RecentScans/>
       <Summery/>
                    </div>
                    </main>
  )
}

export default MainContent
