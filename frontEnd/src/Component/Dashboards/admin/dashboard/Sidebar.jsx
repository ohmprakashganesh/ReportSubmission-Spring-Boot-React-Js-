import { Workflow } from 'lucide-react';
import React from 'react'

const Sidebar = ({activeSection,showSection,handleLogout}) => {
  return (
    <div>
        <aside className=" w-[20%] fixed mt-16 h-screen bg-gray-800 text-white flex flex-col rounded-r-lg shadow-lg">
          <div className="p-6 text-2xl font-bold text-center border-b border-gray-700">
            Admin Panel 
          </div>
          <nav className="flex-1 px-4 py-2">
            <ul className="mb-2">
              <li className='mb-1'>
                <a
                  href="#"
                  className={`flex  items-center p-2 rounded-lg ${
                    activeSection === "dashboard"
                      ? "bg-gray-700 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  } transition-colors duration-200`}
                  onClick={() => showSection("dashboard")}
                >
                  <svg
                    className="w-5 h-5 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    ></path>
                  </svg>
                  Dashboard
                </a>
              </li>
                         <li className='mb-2'>

                <a
                  href="#"
                  className={`flex items-center p-2 rounded-lg ${
                    activeSection === "students"
                      ? "bg-gray-700 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  } transition-colors duration-200`}
                  onClick={() => showSection("students")}
                >
                  <svg
                    className="w-5 h-5 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.106-1.285-.306-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.106-1.285.306-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    ></path>
                  </svg>
                  Students
                </a>
              </li>
                           <li className='mb-2'>

                <a
                  href="#"
                  className={`flex items-center p-2 rounded-lg ${
                    activeSection === "supervisors"
                      ? "bg-gray-700 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  } transition-colors duration-200`}
                  onClick={() => showSection("supervisors")}
                >
                  <svg
                    className="w-5 h-5 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.106-1.285-.306-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.106-1.285.306-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    ></path>
                  </svg>
                  Supervisors
                </a>
              </li>
                        <li className='mb-2'>

                <a
                  href="#"
                  className={`flex items-center p-2 rounded-lg ${
                    activeSection === "groups"
                      ? "bg-gray-700 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  } transition-colors duration-200`}
                  onClick={() => showSection("groups")}
                >
                  <svg
                    className="w-5 h-5 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.106-1.285-.306-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.106-1.285.306-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    ></path>
                  </svg>
                  Groups
                </a>
              </li>
                          <li className='mb-2'>

                <a
                  href="#"
                  className={`flex items-center p-2 rounded-lg ${
                    activeSection === "assignments"
                      ? "bg-gray-700 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  } transition-colors duration-200`}
                  onClick={() => showSection("assignments")}
                >
                  <Workflow className=" w-5 h-5 p-0 mr-2" />
                  Assignments
                </a>
              </li>
              
              <li>
                <a
                  href="#"
                  className={`flex items-center p-2 mb-2 rounded-lg ${
                    activeSection === "domain"
                      ? "bg-gray-700 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  } transition-colors duration-200`}
                  onClick={() => showSection("domain")}
                >
                  <svg
                    className="w-5 h-5 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    ></path>
                  </svg>
                  Domain
                </a>
              </li>
                       <li className='mb-2'>

                <a
                  href="#"
                  className={`flex items-center p-2 rounded-lg ${
                    activeSection === "domain"
                      ? "bg-gray-700 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  } transition-colors duration-200`}
                  onClick={() => showSection("report")}
                >
                  <svg
                    className="w-5 h-5 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    ></path>
                  </svg>
                  Report
                </a>
              </li>
            </ul>
            <div className="mt-8 pt-4 border-t border-white-700">
              <button
                onClick={() => handleLogout()}
                className="w-full mt-1 py-2 px-4 bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200 text-white font-medium"
              >
                <i className="fas fa-sign-out-alt mr-2"></i>Logout
              </button>
            </div>
          </nav>
        </aside>
    </div>
  )
}

export default Sidebar;
