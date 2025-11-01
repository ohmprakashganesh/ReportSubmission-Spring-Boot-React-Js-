// Navbar.jsx
import { UserIcon } from 'lucide-react';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
 import logo from "../../../../../public/logo.png"; // ✅ Import image


const Navbar = ({  currentSection ,showSection,handleLogout }) => {
  const [show, setShow] = useState(false);
   const role=   localStorage.getItem("role");

  const toggle = () => setShow(!show);

  return (
    <>
<nav className="fixed top-0 left-0 w-full z-30  bg-gray-700 px-4 sm:px-6 lg:px-8 shadow-md">
      <div className="flex justify-between h-16 items-center">
        <div className="flex-shrink-0 flex items-center">
        < span className="text-xl h-full w-full font-bold text-[#2563eb] ">
                <img className='w-[120px] h-[140px]' src={logo} alt="Banner" />
              </span>        </div>
             <div className="hidden md:flex  text-white justify-center items-center">
               <UserIcon />
               <p>{role}</p>
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
    </nav>
       {show && (
        <>
         <ul className="bg-gray-500 h-fit fixed  inset-0 mt-16 z-40 flex-col w-1/2 ml-[48%]">
        <li
          onClick={() => showSection("dashboard")}
          className={`border-b-2 cursor-pointer text-center p-2 
            ${currentSection === 'dashboard' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-white'}`}
        >
          Dashboard
        </li>

        <li
          onClick={() => showSection("students")}
          className={`border-b-2 cursor-pointer text-center p-2 
            ${currentSection === 'students' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-white'}`}
        >
          students
        </li>

        <li
          onClick={() => showSection("supervisors")}
          className={`border-b-2 cursor-pointer text-center p-2 
            ${currentSection === 'students' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-white'}`}
        >
          Supervisors
        </li>

        <li
          onClick={() => showSection("groups")}
          className={`border-b-2 cursor-pointer text-center p-2 
            ${currentSection === 'courses' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-white'}`}
        >
          Groups
        </li>

         <li
          onClick={() => showSection("assignments")}
          className={`border-b-2 cursor-pointer text-center p-2 
            ${currentSection === 'assignments' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-white'}`}
        >
          Assignments
        </li>
        <li
          onClick={() => showSection("domain")}
          className={`border-b-2 cursor-pointer text-center p-2 
            ${currentSection === 'domain' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-white'}`}
        >
          Domain
        </li>
        <li
          onClick={() => showSection("report")}
          className={`border-b-2 cursor-pointer text-center p-2 
            ${currentSection === 'courses' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-white'}`}
        >
          Reports
        </li>
        <li
          onClick={() => handleLogout()}
          className={`border-b-2 cursor-pointer text-center p-2 
            ${currentSection === 'courses' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-white'}`}
        >
          Logout
        </li>
      </ul>
        </>
      )}
      </>
  )
}
export default Navbar;

// // Mobile menu items
// export const Items = ({ currentSection,handleLogout, setCurrentSection }) => {
//   return (
//     <div className=" fixed md:hidden  top-16 right-2 z-40 w-[37%] bg-white shadow-lg">
//       <ul className="bg-gray-100 flex-col w-full">
//         <li
//           onClick={() => showSection("dashboard")}
//           className={`border-b-2 cursor-pointer text-center p-2 
//             ${currentSection === 'dashboard' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-white'}`}
//         >
//           Dashboard
//         </li>
//         <li
//           onClick={() => showSection("groups")}
//           className={`border-b-2 cursor-pointer text-center p-2 
//             ${currentSection === 'groups' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-white'}`}
//         >
//           Groups
//         </li>
//         <li
//           onClick={() => showSection("students")}
//           className={`border-b-2 cursor-pointer text-center p-2 
//             ${currentSection === 'students' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-white'}`}
//         >
//           Students
//         </li>
//         <li
//           onClick={() => showSection("courses")}
//           className={`border-b-2 cursor-pointer text-center p-2 
//             ${currentSection === 'courses' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-white'}`}
//         >
//           Courses
//         </li>
//       </ul>
//     </div>
//   );
// };
