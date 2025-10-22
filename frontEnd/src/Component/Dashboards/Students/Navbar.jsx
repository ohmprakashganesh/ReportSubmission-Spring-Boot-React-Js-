import { Menu } from 'lucide-react';
import React, { useState } from 'react'

const Navbar = ({ studentName, setActiveTab, setCurrentView, setSelectedGroup, activeTab }) => {
  const [toggle, setToggle] = useState(false)
  return (
    <nav className="bg-blue-700 mt-0 max-h-16  fixed p-4 w-full shadow-md">
      <div className="max-w-6xl mx-auto flex  justify-between items-center">
        <h1 className="text-3xl   font-extrabold text-white">Student Dashboard</h1>
        <div>
          <p className="text-lg md:block lg:block hidden text-white"><span className="font-semibold">{studentName?.split(" "[0])}</span></p>
          <button
            onMouseEnter={() => setToggle(true)}
            className="p-2 rounded-md   text-gray-600 transition"
          >
             <Menu className="w-6 h-6 text-green-300 block md:hidden" />
               </button>  
                  <div className='md:hidden lg:hidden top-14 left-0 right-0  absolute  w-full'>

            {toggle && (
              <div onMouseLeave={() => setToggle(false)}>
                <ListComp setActiveTab={setActiveTab} activeTab={activeTab} setCurrentView={setCurrentView} setSelectedGroup={setSelectedGroup} />
              </div>
            )}

          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar


const ListComp = ({ setActiveTab, setCurrentView, setSelectedGroup, activeTab }) => {
  return (
    <div className="w-full absolute  bg-gray-800 text-white p-x-2 rounded-t-xl lg:rounded-l-xl lg:rounded-tr-none flex flex-col shadow-lg mb-4 lg:mb-0">
      <nav className="flex-grow">
        <ul className="space-y-3">
          <li>
            <button
              onClick={() => { setActiveTab('dashboard'); setCurrentView('groupList'); setSelectedGroup(null); }}
              className={`w-full text-left px-4 py-2 rounded-md transition duration-150 ease-in-out ${activeTab === 'dashboard' ? 'bg-blue-600' : 'hover:bg-gray-700'
                }`}
            >
              Dashboard
            </button>
          </li>
          <li>
            <button
              onClick={() => { setActiveTab('myDetails'); setCurrentView('groupList'); setSelectedGroup(null); }}
              className={`w-full text-left px-4 py-2 rounded-md transition duration-150 ease-in-out ${activeTab === 'myDetails' ? 'bg-blue-600' : 'hover:bg-gray-700'
                }`}
            >
              My Details
            </button>
          </li>
          <li>
            <button
              onClick={() => { setActiveTab('assignedWork'); setCurrentView('groupList'); setSelectedGroup(null); }}
              className={`w-full text-left px-4 py-2 rounded-md transition duration-150 ease-in-out ${activeTab === 'assignedWork' ? 'bg-blue-600' : 'hover:bg-gray-700'
                }`}
            >
              Assigned Work
            </button>
          </li>
          <li>
            <button
              onClick={() => { setActiveTab('submittedWorks'); setCurrentView('groupList'); setSelectedGroup(null); }}
              className={`w-full text-left px-4 py-2 rounded-md transition duration-150 ease-in-out ${activeTab === 'submittedWorks' ? 'bg-blue-600' : 'hover:bg-gray-700'
                }`}
            >
              Submitted Works
            </button>
          </li>
          <li>
            <button
              onClick={() => { setActiveTab('chats'); setCurrentView('groupList'); setSelectedGroup(null); }}
              className={`w-full text-left px-4 py-2 rounded-md transition duration-150 ease-in-out ${activeTab === 'chats' ? 'bg-blue-600' : 'hover:bg-gray-700'
                }`}
            >
              Chats (Non-Functional)
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}