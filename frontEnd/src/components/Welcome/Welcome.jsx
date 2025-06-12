import React from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import Features from './Features'
import Action from './Action'
import Footer from './Footer'

const Welcome = () => {
  return (
       <div id="welcome-page" className="min-h-screen w-full flex flex-col">
        <Navbar />
        <Hero/>
        <Features/>
        <Action/>
        <Footer/>

      
    </div>
  )
}

export default Welcome
