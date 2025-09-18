import { useState } from "react";

const Sidebar1 = ({ currentSection, onNavigate }) => {
     const handleLogout=()=>{
        localStorage.removeItem("accessToken");
        onNavigate('login');
     }
    return (
        <aside className="w-64 mt-14  md:block lg:block hidden bg-gray-800 text-white  flex-col p-4 shadow-lg transition-all duration-300 ease-in-out lg:translate-x-0" id="sidebar">
            <div className="flex items-center mb-6">
                <i className="fas fa-graduation-cap text-3xl text-blue-400 mr-3"></i>
                <h1 className="text-2xl font-bold">EduPro</h1>
            </div>
            <nav className="flex-1">
                <ul>
                    <li className="mb-2">
                        <a href="#" className={`flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors duration-200 ${currentSection === 'dashboard' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-white'}`}
                         onClick={() => onNavigate('dashboard')} data-section="dashboard">
                            <i className="fas fa-tachometer-alt mr-3"></i>
                            Dashboard
                        </a>
                    </li>
                    <li className="mb-2">
                        <a href="#" className={`flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors duration-200 ${currentSection === 'courses' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-white'}`} 
                        onClick={() => onNavigate('courses')} data-section="courses">
                            <i className="fas fa-book mr-3"></i>
                            Assignments
                        </a>
                    </li>
                    <li className="mb-2">
                        <a href="#" className={`flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors duration-200 ${currentSection === 'groups' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-white'}`} 
                        onClick={() => onNavigate('groups')} data-section="groups">
                            <i className="fas fa-users mr-3"></i>
                            Groups
                        </a>
                    </li>
                    <li className="mb-2">
                        <a href="#" className={`flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors duration-200 ${currentSection === 'students' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-white'}`}
                         onClick={() => onNavigate('students')} data-section="students">
                            <i className="fas fa-user-graduate mr-3"></i>
                            Students
                        </a>
                    </li>
                    <li className="mb-2">
                        <a href="#" className={`flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors duration-200 ${currentSection === 'settings' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-white'}`} 
                        onClick={() => onNavigate('settings')} data-section="settings">
                            <i className="fas fa-cog mr-3"></i>
                            Profile
                        </a>
                    </li>
                </ul>
            </nav>
            <div className="mt-auto pt-4 border-t border-gray-700">
               
                <button 
                onClick={()=>handleLogout()} 
                className="w-full mt-4 py-2 px-4 bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200 text-white font-medium">
                    <i className="fas fa-sign-out-alt mr-2"></i>Logout
                </button>
            </div>
        </aside>
    );
};
export default Sidebar1;