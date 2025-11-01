import React, { useState } from 'react'
import { Link } from 'react-router-dom'
 import logo from "../../../public/logo.png"; // ✅ Import image

const Navbar = () => {
  const [show,setShow]=useState(false);
  return (
    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex overflow-hidden items-center">
              <span className="text-xl h-full w-full font-bold text-[#2563eb] ">
                <img className='w-[120px] h-[140px]' src={logo} alt="Banner" />
              </span>
            </div>
            {show &&(
             <div className='md:hidden mt-50  w-1/2 absolute ml-[48%] lg:hidden xl:hidden flex flex-col'>
                   <ul className='gap-2 flex flex-col h-full  w-[90%] '>
                    <li className='bg-gray-400 py-2 w-full text-center h-full'> <a href="#features" className='w-full  h-full'>features</a> </li>
                   <li className='bg-gray-400 py-2 text-center w-full h-full'><a href="#how-it-works">features</a> </li>
                    <li className='bg-gray-400 py-2 text-center w-full h-full'><a href="#testimonials">features</a> </li>

                   </ul>
             </div>
            )}
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                <a href="#features" className="px-3  py-2 rounded-md text-sm font-medium text-gray-700 hover:text-[#2563eb] hover:bg-gray-50">Features</a>
                <a href="#how-it-works" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-[#2563eb] hover:bg-gray-50">How It Works</a>
                <a href="#testimonials" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-[#2563eb] hover:bg-gray-50">Testimonials</a>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6 space-x-2">
                <button className="px-4 py-2 border border-[#2563eb] rounded-md text-sm font-medium text-[#2563eb] hover:bg-gray-50"> <Link to="/login"> Login </Link></button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button onClick={()=>setShow(!show)} type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none">
                <span className="sr-only">Open main menu</span>
                {/* Menu icon */}
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </nav>
  )
}

export default Navbar
