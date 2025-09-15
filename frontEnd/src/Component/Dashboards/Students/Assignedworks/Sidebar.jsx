import React from 'react'
const Sidebar = ({setActiveTab,setCurrentView,setSelectedGroup,activeTab}) => {
  return (
   <div className="w-full lg:w-64 bg-gray-800 text-white p-6 rounded-t-xl lg:rounded-l-xl lg:rounded-tr-none flex flex-col shadow-lg mb-4 lg:mb-0">
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
                  My Details
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('assignedWork'); setCurrentView('groupList'); setSelectedGroup(null); }}
                  className={`w-full text-left px-4 py-2 rounded-md transition duration-150 ease-in-out ${
                    activeTab === 'assignedWork' ? 'bg-blue-600' : 'hover:bg-gray-700'
                  }`}
                >
                  Assigned Work
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('submittedWorks'); setCurrentView('groupList'); setSelectedGroup(null); }}
                  className={`w-full text-left px-4 py-2 rounded-md transition duration-150 ease-in-out ${
                    activeTab === 'submittedWorks' ? 'bg-blue-600' : 'hover:bg-gray-700'
                  }`}
                >
                  Submitted Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('chats'); setCurrentView('groupList'); setSelectedGroup(null); }}
                  className={`w-full text-left px-4 py-2 rounded-md transition duration-150 ease-in-out ${
                    activeTab === 'chats' ? 'bg-blue-600' : 'hover:bg-gray-700'
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

export default Sidebar
