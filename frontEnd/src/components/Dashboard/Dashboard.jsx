import React from 'react'
import Navbar from './Navbar'
import HealthScoreCard from './maincontent/HealthScoreCard'
import MainContent from './maincontent/MainContent'
import QuickScancard from './maincontent/QuickScancard'
import RecentScans from './maincontent/RecentScans'
import Summery from './maincontent/Summery'

const Dashboard = () => {
  return (
       <div id="dashboard-page" className=" min-h-screen flex flex-col bg-[#F0F2F5]">
       <Navbar/>
       <MainContent/>

      
      
    </div>
  )
}

export default Dashboard
