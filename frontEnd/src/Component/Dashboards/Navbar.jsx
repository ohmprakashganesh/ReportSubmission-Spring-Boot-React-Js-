import React from 'react'
import { Link } from 'react-router-dom'
import Registar from '../LoginRegister/Registar'

const Navbar = ({title}) => {

  return (
    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-[#2563eb] ">SmartReport</span>
            </div>
            <div className=' text-3xl font-bold sticky'>
              {title}
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6 space-x-2">
                <button className="px-4 py-2 border border-[#2563eb] rounded-md text-sm font-medium text-[#2563eb] hover:bg-gray-50"> <Link to="/login"> Logout </Link></button>
              </div>
            </div>
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none">
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
