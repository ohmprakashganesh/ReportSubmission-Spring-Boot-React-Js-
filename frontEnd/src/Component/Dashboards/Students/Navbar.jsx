import { Menu, UserIcon } from 'lucide-react';
import  { useState } from 'react'
 import logo from "../../../../public/logo.png"; // ✅ Import image


const Navbar = ({ studentName, setActiveTab, setCurrentView, setSelectedGroup, activeTab }) => {
  const [toggle, setToggle] = useState(false)
  return (

    // <nav className="fixed top-0 left-0 w-full z-30  bg-gray-700 px-4 sm:px-6 lg:px-8 shadow-md">
    //   <div className="flex justify-between h-16 items-center">
    //     <div className="flex-shrink-0 flex items-center">
    //     < span className="text-xl h-full w-full font-bold text-[#2563eb] ">
    //             <img className='w-[120px] h-[140px]' src={logo} alt="Banner" />
    //           </span>        </div>
    //          <div className="hidden md:flex  text-white justify-center items-center">
    //            <UserIcon />
    //            <p></p>
    //     </div>

    //     {/* Mobile menu button */}
    //     <div className="md:hidden lg:hidden flex items-center">
    //       <button
    //         onClick={toggle}
    //         type="button"
    //         className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
    //       >
    //         <span className="sr-only">Open main menu</span>
    //         {/* Menu icon */}
    //         <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg"
    //           fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
    //             d="M4 6h16M4 12h16M4 18h16" />
    //         </svg>
    //       </button>
    //     </div>
    //   </div> 
    // </nav>

    //    <nav className="fixed top-0 left-0 w-full h-[55px] z-30  bg-gray-700 px-4 sm:px-6 lg:px-8  shadow-md">
    //   <div className="max-w-6xl overflow-x-hidden overflow-y-hidden mx-auto flex  justify-between items-center">
    //     <span>image</span>
    //     <h1 className="text-3xl flex   font-extrabold text-white">
    //      <p> Student Portal</p>
    //     </h1>
    //     <div>
    //       <p className="text-lg md:block lg:block hidden text-white"><span className="font-semibold">{studentName?studentName:"loggedIn"}</span></p>
    //       <button
    //         onClick={() => {
    //           console.log("clicked")
    //           setToggle(!toggle);
    //         }}
    //         className="p-2 z-50 bg-white rounded-md md:hidden lg:hidden    text-red-600 transition"
    //       > 
    //          <Menu className="w-6 h-6 text-green-300 block md:hidden lg:hidden " />
    //        </button>  
    //          <div className='top-14 left-0 right-0 lg:hidden md:hidden xl:hidden flex   absolute  w-full'>
    //         {toggle && (
    //           <div>
    //             <ListComp setActiveTab={setActiveTab} activeTab={activeTab} setCurrentView={setCurrentView} setSelectedGroup={setSelectedGroup} />
    //           </div>
    //         )}

    //       </div>
    //     </div>
    //   </div>
    // </nav>

    
 <nav className="fixed top-0 left-0 w-full z-30  bg-gray-700 px-4 sm:px-6 lg:px-8 shadow-md">
    <div className="flex justify-between h-16 items-center">
        <div className="flex-shrink-0 flex items-center">
       < span className="text-xl h-full w-full font-bold text-[#2563eb] ">
                <img className='w-[120px] h-[140px]' src={logo} alt="Banner" />
            </span>        </div>
        <h1 className="text-3xl flex   font-extrabold text-white">
         <p> Student Portal</p>
        </h1>
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
