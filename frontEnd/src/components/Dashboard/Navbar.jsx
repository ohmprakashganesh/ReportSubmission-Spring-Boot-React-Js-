import React from 'react'

const Navbar = () => {
  return (
   <header className="bg-white shadow-md py-3 px-6 flex justify-between items-center z-10">
            <div className="flex items-center space-x-2">
                <i className="fas fa-bug text-xl text-[#1A4B6B]"></i>
                <h1 className="text-2xl font-bold text-[#1A4B6B]">BugCheck</h1>
            </div>
            <div className="flex items-center space-x-4">
                <div className="relative hidden sm:block">
                    <input type="text" placeholder="Search reports..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A4B6B] focus:border-transparent transition-all"/>
                    <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                </div>
                <div className="relative">
                    <button className="flex items-center space-x-2 text-[#6B7280] hover:text-[#1A4B6B] font-medium" onclick="toggleDropdown()">
                        <img src="https://placehold.co/40x40/999999/FFFFFF?text=JP" alt="User Avatar" className="w-10 h-10 rounded-full border-2 border-gray-20"/>
                        <span className="hidden md:block">John P.</span>
                        <i className="fas fa-chevron-down text-sm"></i>
                    </button>
                    <div id="user-dropdown" className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 hidden">
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                        <hr className="my-1 border-gray-100"/>
                        <button  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
                    </div>
                </div>
                <button className="px-5 py-2 bg-[#06C755] text-white font-semibold rounded-lg hover:bg-[#04A747] transition-colors flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-[#06C755] focus:ring-opacity-50">
                    <i className="fas fa-plus text-sm"></i>
                    <span className="hidden sm:inline">New Scan</span>
                </button>
            </div>
        </header>
  )
}

export default Navbar
