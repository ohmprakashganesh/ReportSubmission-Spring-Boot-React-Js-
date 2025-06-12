import React, { useState } from 'react'
import { FiSearch } from "react-icons/fi";
import { IoIosContact } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi"; // Icon for toggle button

const Navbar = () => {



  return (    
      <header className="bg-white shadow-sm py-4 px-6 md:px-10 flex w-full justify-between items-center">
          <div className="flex items-center space-x-2">
                <i className="fas fa-bug text-xl text-[#1A4B6B]"></i>
                <h1 className="text-2xl font-bold text-[#1A4B6B]">BugCheck</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
                <a href="#" className="text-[#6B7280] hover:text-[#1A4B6B] font-medium transition-colors">Home</a>
                <a href="#" className="text-[#6B7280] hover:text-[#1A4B6B] font-medium transition-colors">Features</a>
                <a href="#" className="text-[#6B7280] hover:text-[#1A4B6B] font-medium transition-colors">Pricing</a>
                <a href="#" className="text-[#6B7280] hover:text-[#1A4B6B] font-medium transition-colors">Contact</a>
            </nav>
            <div className="space-x-4">
                <button onclick="showDashboard()" className="px-6 py-2 border border-[#1A4B6B] text-[#1A4B6B] font-semibold rounded-lg hover:bg-[#E0ECF4] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1A4B6B] focus:ring-opacity-50">Login</button>
                <button onclick="showDashboard()" className="px-6 py-2 bg-[#1A4B6B] text-white font-semibold rounded-lg hover:bg-[#256D9C] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1A4B6B] focus:ring-opacity-50">Sign Up</button>
            </div>
        </header>
//     <div>
//        <nav className="flex items-center justify-between px-6 py-4 shadow-md">
   
//     <div className="flex items-center space-x-8">
    
//       <img src="https://www.bugherd.com/wp-content/uploads/2022/06/Bugherd_logo_white.svg" alt="BugHerd" className="bg-black p-2 rounded-full w-10 h-10"/>

    
//       <ul className="flex space-x-6 text-sm font-medium text-gray-800">
//         <li className="hover:text-blue-600 cursor-pointer">Features</li>
//         <li className="hover:text-blue-600 cursor-pointer">Integrations</li>
//         <li className="hover:text-blue-600 cursor-pointer">Pricing</li>
//         <li className="hover:text-blue-600 cursor-pointer">Who BugHerd is for</li>
//         <li className="hover:text-blue-600 cursor-pointer">Blog</li>
//         <li className="hover:text-blue-600 cursor-pointer">Resources</li>
//       </ul>
//     </div>

//     <div className="flex items-center space-x-4">
//       <button className="text-sm font-medium text-gray-800 hover:text-blue-600">Log in</button>
//       <button className="border border-blue-500 text-blue-600 px-4 py-1 rounded-full text-sm font-medium hover:bg-blue-50">
//         Demo
//       </button>
//       <button className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium hover:bg-blue-700">
//         Start Free Trial
//       </button>
//     </div>
//   </nav>
//     </div>
  )
}

export default Navbar
