import React from 'react'
import Navbar from './Navbar'
import MainContent from './maincontent/MainContent'

const ContentArea = () => {
  return (
    <div className="flex flex-1">
      <Navbar/>
      <MainContent/>

    </div>
  )
}

export default ContentArea
