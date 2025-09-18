// Navbar.jsx
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({ title, currentSection, name ,setCurrentSection }) => {
  const [show, setShow] = useState(false);

  const toggle = () => setShow(!show);

  return (
<nav className="fixed top-0 left-0 w-full z-50 bg-gray-300 px-4 sm:px-6 lg:px-8 shadow-md">
      <div className="flex justify-between h-16 items-center">
        <div className="flex-shrink-0 flex items-center">
          <span className="text-xl font-bold text-[#2563eb]">SmartReport</span>
        </div>
        <div className="text-3xl font-bold">
          {title}
        </div>
        <div className="hidden md:block">
          <div className="ml-4 flex items-center md:ml-6 space-x-2">
            <button className="px-4 h-14 w-20 py-4 border text-xl font-bold  border-[#2563eb] rounded-full  font-stretch-200% text-[#2563eb] hover:bg-gray-50">
              <Link to="/login"> {name} </Link>
            </button>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden lg:hidden flex items-center">
          <button
            onClick={toggle}
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
          >
            <span className="sr-only">Open main menu</span>
            {/* Menu icon */}
            <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg"
              fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {show && (
        <Items
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
        />
      )}
    </nav>
  )
}
export default Navbar;

// Mobile menu items
export const Items = ({ currentSection, setCurrentSection }) => {
  return (
    <div className=" fixed md:hidden  top-16 right-2 z-40 w-[37%] bg-white shadow-lg">
      <ul className="bg-gray-100 flex-col w-full">
        <li
          onClick={() => setCurrentSection("dashboard")}
          className={`border-b-2 cursor-pointer text-center p-2 
            ${currentSection === 'dashboard' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-white'}`}
        >
          Dashboard
        </li>
        <li
          onClick={() => setCurrentSection("groups")}
          className={`border-b-2 cursor-pointer text-center p-2 
            ${currentSection === 'groups' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-white'}`}
        >
          Groups
        </li>
        <li
          onClick={() => setCurrentSection("students")}
          className={`border-b-2 cursor-pointer text-center p-2 
            ${currentSection === 'students' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-white'}`}
        >
          Students
        </li>
        <li
          onClick={() => setCurrentSection("courses")}
          className={`border-b-2 cursor-pointer text-center p-2 
            ${currentSection === 'courses' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-white'}`}
        >
          Courses
        </li>
      </ul>
    </div>
  );
};
