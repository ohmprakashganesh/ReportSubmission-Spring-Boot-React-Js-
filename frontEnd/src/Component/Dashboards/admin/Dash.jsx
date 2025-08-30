import { useEffect, useState } from "react";
import Assignment from "./Assignments";
import Default from "./Default";
import Dashboard from "./Default";
import Groups from "./Groups";
import Settings from "./Setting";
import Users from "./Users";
import { httpClient } from "../../services/Config/Config";
import { getAllUsers } from "../../services/AdminSer";

const Dash = () => {
 
  

    // State to manage the currently active section
    const [activeSection, setActiveSection] = useState('dashboard');
    // State to manage the visibility of the assign users modal
    const [isAssignUsersModalOpen, setIsAssignUsersModalOpen] = useState(false);
    // State to store the group name for the modal
    const [modalGroupName, setModalGroupName] = useState('');

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
            case 'users':
                return <Users />;
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
        <div className='flex min-h-screen'>
            {/* Sidebar Navigation */}
            <aside className="w-64 bg-gray-800 text-white flex flex-col rounded-r-lg shadow-lg">
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
                            <a href="#" className={`flex items-center p-3 rounded-lg ${activeSection === 'users' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'} transition-colors duration-200`} onClick={() => showSection('users')}>
                                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.106-1.285-.306-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.106-1.285.306-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                                Users
                            </a>
                        </li>
                        <li>
                            <a href="#" className={`flex items-center p-3 rounded-lg ${activeSection === 'groups' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'} transition-colors duration-200`} onClick={() => showSection('groups')}>
                                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.106-1.285-.306-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.106-1.285.306-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                                Groups
                            </a>
                        </li>
                        <li>
                            <a href="#" className={`flex items-center p-3 rounded-lg ${activeSection === 'proposals' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'} transition-colors duration-200`} onClick={() => showSection('proposals')}>
                                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
                                Proposals
                            </a>
                        </li>
                        <li>
                            <a href="#" className={`flex items-center p-3 rounded-lg ${activeSection === 'settings' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'} transition-colors duration-200`} onClick={() => showSection('settings')}>
                                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                Settings
                            </a>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-8 overflow-y-auto">
                {renderSection()}


                {/* Assign Users to Group Modal */}
                <div id="assignUsersModal" className={`fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 ${isAssignUsersModalOpen ? '' : 'hidden'}`}>
                    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Assign Users to <span id="modalGroupName" className="text-blue-600">{modalGroupName}</span></h2>
                        <form className="space-y-4">
                            <div>
                                <label htmlFor="selectStudents" className="block text-sm font-medium text-gray-700 mb-1">Select Students</label>
                                <select id="selectStudents" multiple className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-32 overflow-y-auto">
                                    <option value="student1">John Doe (Student)</option>
                                    <option value="student2">Alice Wonderland (Student)</option>
                                    <option value="student3">Bob Johnson (Student)</option>
                                    <option value="student4">Charlie Brown (Student)</option>
                                </select>
                                <p className="mt-1 text-xs text-gray-500">Hold Ctrl/Cmd to select multiple.</p>
                            </div>
                            <div>
                                <label htmlFor="selectProfessors" className="block text-sm font-medium text-gray-700 mb-1">Select Professors</label>
                                <select id="selectProfessors" multiple className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-24 overflow-y-auto">
                                    <option value="professor1">Jane Smith (Professor)</option>
                                    <option value="professor2">Dr. Emily White (Professor)</option>
                                </select>
                                <p className="mt-1 text-xs text-gray-500">Hold Ctrl/Cmd to select multiple.</p>
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button type="button" className="inline-flex items-center px-5 py-2 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200" onClick={hideAssignUsersToGroupModal}>
                                    Cancel
                                </button>
                                <button type="submit" className="inline-flex items-center px-5 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
                                    Assign
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dash;