import { Divide } from 'lucide-react';
import React from 'react'
const Sidebar = ({setActiveTab,setCurrentView,setSelectedGroup,activeTab}) => {
   const handleLogout=()=>{
    localStorage.removeItem("accessToken");
    window.location.href="/login"
   }
  return (
   <div className="w-full mt-12 pl-5 ml-0 md:flex hidden lg:flex   lg:w-64 bg-gray-800 text-white p-6 rounded-t-xl lg:rounded-l-xl lg:rounded-tr-none  flex-col shadow-lg mb-4 lg:mb-0">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold">Student Portal</h2>
          </div>
          <nav className="flex-grow">
            <ul className="space-y-3">
               <li>
                <button
                  onClick={() => { setActiveTab('dashboard'); setCurrentView('groupList'); setSelectedGroup(null); }}
                  className={`w-full text-left px-4 py-2 rounded-md transition duration-150 ease-in-out ${
                    activeTab === 'dashboard' ? 'bg-blue-600' : 'hover:bg-gray-700'
                  }`}
                >
                 Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('myDetails'); setCurrentView('groupList'); setSelectedGroup(null); }}
                  className={`w-full text-left px-4 py-2 rounded-md transition duration-150 ease-in-out ${
                    activeTab === 'myDetails' ? 'bg-blue-600' : 'hover:bg-gray-700'
                  }`}
                >
                 Personal Info
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('assignedWork'); setCurrentView('groupList'); setSelectedGroup(null); }}
                  className={`w-full text-left px-4 py-2 rounded-md transition duration-150 ease-in-out ${
                    activeTab === 'assignedWork' ? 'bg-blue-600' : 'hover:bg-gray-700'
                  }`}
                >
                  Assigned Groups
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('submittedWorks'); setCurrentView('groupList'); setSelectedGroup(null); }}
                  className={`w-full text-left px-4 py-2 rounded-md transition duration-150 ease-in-out ${
                    activeTab === 'submittedWorks' ? 'bg-blue-600' : 'hover:bg-gray-700'
                  }`}
                >
                  History
                </button>
              </li>

            </ul>
             <div className="mt-auto pt-4 border-t border-gray-700">
 
                <button 
                onClick={()=>handleLogout()} 
                className="w-full mt-4 py-2 px-4 bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200 text-white font-medium">
                    <i className="fas fa-sign-out-alt mr-2"></i>Logout
                </button>
            </div>
          </nav>
           
        </div>
  )
}

export default Sidebar
