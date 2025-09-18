import { useEffect, useState } from "react";
import Assignment from "./Assignments";
import Default from "./Default";
import Dashboard from "./Default";
import Groups from "./Groups";
import Settings from "./Setting";
import { httpClient } from "../../services/Config/Config";
import Students from "./Students";
import Supervisors from "./Supervisors";
import { getGroups } from "../../services/AdminSer";
import Domain from "./Domain";
import { getProfile } from "../../services/SuperviserSer";

const Dash = () => {
     // State to manage the currently active section
    const [activeSection, setActiveSection] = useState('dashboard');
    // State to manage the visibility of the assign users modal
    const [isAssignUsersModalOpen, setIsAssignUsersModalOpen] = useState(false);
    // State to store the group name for the modal
    const [modalGroupName, setModalGroupName] = useState('');
    const[groups,setGroups]=useState([]);

    const [user, setUser] = useState([]);
  
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const res = await getProfile();
          setUser(res);
        } catch (error) {
          console.log(error);
        }
      };
      fetchUser();
    }, []);
 
   useEffect(()=>{
    const allGroups= async ()=>{
        try{
            const resp= await getGroups();
            setGroups(resp);

        }catch(error){
            console.log("could not success to fetch all groups", error);
        }
    };
    allGroups();
   },[])

      const handleLogout=()=>{
        localStorage.removeItem("accessToken");
        window.location.href="/login"
    } 


    // Function to change the active section
    const showSection = (sectionId) => {
        setActiveSection(sectionId);
    };

    // Function to show the "Assign Users to Group" modal
    const showAssignUsersToGroupModal = (groupName) => {
        setModalGroupName(groupName);
        setIsAssignUsersModalOpen(true);
    };

    // Function to hide the "Assign Users to Group" modal
    const hideAssignUsersToGroupModal = () => {
        setIsAssignUsersModalOpen(false);
        setModalGroupName(''); // Clear group name when modal closes
    };

    // useEffect to set the initial active section on component mount
    useEffect(() => {
        // No direct DOM manipulation needed here, state handles initial display
    }, []);

    const renderSection = () => {
        switch (activeSection) {
            case 'dashboard':
                return <Dashboard />;
            case 'students':
                return <Students />;
                 case 'supervisors':
                return <Supervisors />;
                case 'domain':
                return <Domain groups={groups} />
            case 'groups':
                return <Groups showAssignUsersToGroupModal={showAssignUsersToGroupModal} />;
            case 'proposals':
                return <Assignment />;
            case 'settings':
                return <Settings />;
            default:
                return <Default  />;
        }
    };

    return (
         
       <div>
       <nav className="bg-purple-600 fixed w-full z-50 shadow-md">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
      
      {/* Left: Logo */}
      <div className="flex items-center space-x-2">
        <div className="text-2xl font-bold text-white">MyApp</div>
        <div className="text-sm text-purple-200">Admin Panel</div>
      </div>

      {/* Middle: optional (can leave empty or add something like nav links or search) */}
     <div className="flex-1 flex justify-center items-center">
  <span className="text-white text-2xl md:text-3xl font-extrabold tracking-wider 
                   animate-dashboard bg-clip-text 
                   bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-300 
                   drop-shadow-lg">
    Admin Dashboard
  </span>

  <style>
    {`
      @keyframes moveDashboard {
        0%, 100% { transform: translateX(0); }
        50% { transform: translateX(20px); }
      }
      .animate-dashboard {
        animation: moveDashboard 2s ease-in-out infinite;
      }
    `}
  </style>
</div>


      {/* Right: Logged-in user's first name */}
      <div className="flex items-center space-x-3">
        <span className="text-white font-medium">Hi</span>
        {/* Optional profile icon */}
        <div className="w-14 h-10 rounded-full bg-purple-300 flex items-center justify-center text-purple-700 font-bold">
          {user.name}
        </div>
      </div>
      
    </div>
  </div>
</nav>

      

        <div className='flex-row w-[100%]  min-h-screen'>
            {/* Sidebar Navigation */}
            <aside className=" w-[20%] fixed mt-16 h-screen bg-gray-800 text-white flex flex-col rounded-r-lg shadow-lg">
                <div className="p-6 text-2xl font-bold text-center border-b border-gray-700">
                    Admin Panel
                </div>
                <nav className="flex-1 px-4 py-6">
                    <ul className="space-y-2">
                        <li>
                            <a href="#" className={`flex items-center p-3 rounded-lg ${activeSection === 'dashboard' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'} transition-colors duration-200`} onClick={() => showSection('dashboard')}>
                                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                                Dashboard
                            </a>
                        </li>
                        <li>
                            <a href="#" className={`flex items-center p-3 rounded-lg ${activeSection === 'students' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'} transition-colors duration-200`} onClick={() => showSection('students')}>
                                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.106-1.285-.306-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.106-1.285.306-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                                Students
                            </a>
                        </li>
                        <li>
                            <a href="#" className={`flex items-center p-3 rounded-lg ${activeSection === 'supervisors' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'} transition-colors duration-200`} onClick={() => showSection('supervisors')}>
                                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.106-1.285-.306-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.106-1.285.306-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                                Supervisors
                            </a>
                        </li>
                        <li>
                            <a href="#" className={`flex items-center p-3 rounded-lg ${activeSection === 'groups' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'} transition-colors duration-200`} onClick={() => showSection('groups')}>
                                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.106-1.285-.306-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.106-1.285.306-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                                Groups
                            </a>
                        </li>
                        <li>
                            <a href="#" className={`flex items-center p-3 rounded-lg ${activeSection === 'domain' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'} transition-colors duration-200`} onClick={() => showSection('domain')}>
                                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
                                Domain
                            </a>
                        </li>
                       
                    </ul>
                    <div className="mt-8 pt-4 border-t border-white-700">
                <button 
                onClick={()=>handleLogout()} 
                className="w-full mt-1 py-2 px-4 bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200 text-white font-medium">
                    <i className="fas fa-sign-out-alt mr-2"></i>Logout
                </button>
            </div>
                </nav>
            </aside>
            <div className=" absolute ml-[20%] mt-16 min-h-screen w-[80%]">

            {/* Main Content Area */}
           <main className="flex-1 p-8 w-full overflow-y-auto">
                {renderSection()}


            </main> 
              </div>
        </div>
         </div>
    );
};

export default Dash;