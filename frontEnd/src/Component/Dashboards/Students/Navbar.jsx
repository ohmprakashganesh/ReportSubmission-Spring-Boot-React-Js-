import { Menu } from 'lucide-react';
import  { useState } from 'react'

const Navbar = ({ studentName, setActiveTab, setCurrentView, setSelectedGroup, activeTab }) => {
  const [toggle, setToggle] = useState(false)
  return (
    <nav className="bg-blue-700 mt-0 max-h-16 z-50  fixed p-4 w-full shadow-md">
      <div className="max-w-6xl mx-auto flex  justify-between items-center">
        <h1 className="text-3xl   font-extrabold text-white">Student Dashboard</h1>
        <div>
          <p className="text-lg md:block lg:block hidden text-white"><span className="font-semibold">{studentName?studentName:"loggedIn"}</span></p>
          <button
            onClick={() => {
              console.log("clicked")
              setToggle(!toggle);
            }}
            className="p-2 z-50 bg-white rounded-md md:hidden lg:hidden    text-red-600 transition"
          > 
             <Menu className="w-6 h-6 text-green-300 block md:hidden lg:hidden " />
           </button>  
             <div className='top-14 left-0 right-0 lg:hidden md:hidden xl:hidden flex   absolute  w-full'>
            {toggle && (
              <div>
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


export   const ListComp = ({ setActiveTab, setCurrentView, setSelectedGroup, activeTab }) => {
  return (
    <div className="w-[50%]  ml-[48%] absolute z-30  bg-gray-800 text-white p-x-2 rounded-t-xl lg:rounded-l-xl lg:rounded-tr-none flex flex-row shadow-lg mb-4 lg:mb-0">
      <nav className="flex-grow">
        <ul className="space-y-3">
          <li>
            <button
              onClick={() => { setActiveTab('dashboard'); setCurrentView('groupList'); setSelectedGroup(null); }}
              className={`w-full text-left px-4 py-2 rounded-md transition duration-150 ease-in-out ${activeTab === 'dashboard' ? 'bg-blue-600' : 'hover:bg-gray-700'
                }`}
            >
              Dashboardddd
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
         
        </ul>
      </nav>
    </div>
  )
}
