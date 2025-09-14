import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import Sidebar1 from './Sidebar1';
import Header from './Header';
import { CoursesSection } from './AssignmentSection';
import { GroupsSection } from './GroupSection';
import { StudentsSection } from './StudentSection';
import { SettingsSection } from './SettingSection';
import { GroupDetails } from './GroupDetails';
import { getUser } from '../../services/AdminSer';
import { SupervisedStudents, supervisorKoGroups } from '../../services/SuperviserSer';

// Main App Component
const DashboardU = () => {


    const [user,setUser]=useState("");
    const[students,setStudents]=useState([]);
    const[groups,setGroups]= useState([]);
    
//fetching the supervisor
     useEffect(()=>{
        const fetchUser=async ()=>{
            try{
                const res= await getUser(4);
                 setUser(res);
            }catch(error){
                console.log(error);
            }
        };
          fetchUser();
     },[]);
//fetching supervised students
       useEffect(()=>{
        const fetchUser=async ()=>{
            try{
                const res= await SupervisedStudents (5);
                 setStudents(res);
                 console.log("students",students);
            }catch(error){
                console.log(error);
            }
        };
          fetchUser();
     },[]);
//fetching all  groups of particular supervisor
    useEffect(()=>{
        const fetchUser=async ()=>{
            try{
                const res= await supervisorKoGroups(5);
                 setGroups(res);
            }catch(error){
                console.log(error);
            }
        };
          fetchUser();
     },[]);
    // State for managing current section/page
    const [currentSection, setCurrentSection] = useState('dashboard');
    const [currentCourse, setCurrentCourse] = useState(null); // Stores selected course data
    const [currentAssignment, setCurrentAssignment] = useState(null); // Stores selected assignment data
    const [currentGroup, setCurrentGroup] = useState(null); // Stores selected group data

    // State for modal visibility
    const [showAssignTaskModal, setShowAssignTaskModal] = useState(false);
    const [showReviewSubmissionModal, setShowReviewSubmissionModal] = useState(false);
    const [reviewModalData, setReviewModalData] = useState({ groupName: '', assignmentName: '' });

    // Dummy Data (replace with actual data fetching in a real application)
    const coursesData = [
        { id: 'cs101', name: 'CS101 - Introduction to Programming', semester: 'Fall 2025', students: 25, assignments: 3, pendingReviews: 5 },
        { id: 'mgt201', name: 'MGT201 - Business Management Principles', semester: 'Fall 2025', students: 30, assignments: 2, pendingReviews: 7 },
        { id: 'hist101', name: 'HIST101 - World History I', semester: 'Fall 2025', students: 40, assignments: 1, pendingReviews: 0 },
    ];

    const assignmentsData = {
        'cs101': [
            { id: 'project-alpha', name: 'Project Alpha - Group Project', dueDate: 'October 15, 2025, 11:59 PM', submissionsReceived: 10, totalSubmissions: 12, reviewsCompleted: 5, totalReviews: 10, description: "This project requires groups to develop a Python application that simulates a simple library management system. The application should allow users to add books, borrow books, return books, and view available books. Focus on clean code, proper data structures, and user-friendly command-line interface.", points: 100, submissionType: "File Upload (ZIP)", assignedTo: "All Groups", rubric: "Project Alpha Rubric" },
            { id: 'homework-1', name: 'Homework 1 - Individual', dueDate: 'September 30, 2025, 11:59 PM', submissionsReceived: 25, totalSubmissions: 25, reviewsCompleted: 25, totalReviews: 25, description: "Complete exercises from Chapter 3.", points: 50, submissionType: "Text Entry", assignedTo: "All Students", rubric: null },
        ],
        'mgt201': [
            { id: 'midterm-report', name: 'Midterm Report', dueDate: 'October 20, 2025, 11:59 PM', submissionsReceived: 15, totalSubmissions: 30, reviewsCompleted: 0, totalReviews: 15, description: "Prepare a report on current business trends.", points: 75, submissionType: "File Upload (PDF)", assignedTo: "All Students", rubric: null },
        ],
        'hist101': [
            { id: 'research-proposal', name: 'Research Proposal', dueDate: 'November 1, 2025, 11:59 PM', submissionsReceived: 30, totalSubmissions: 40, reviewsCompleted: 20, totalReviews: 30, description: "Submit a proposal for your research topic.", points: 25, submissionType: "File Upload (DOCX)", assignedTo: "All Students", rubric: null },
        ]
    };

    const groupsData = {
        'cs101': [
            { name: 'Team A', members: ['John Doe', 'Jane Smith', 'Robert Brown'], projects: [{ name: 'Project Alpha', status: 'Submitted', assignmentId: 'project-alpha', courseId: 'cs101' }, { name: 'Quiz 1', status: 'Graded', assignmentId: 'quiz-1', courseId: 'cs101' }] },
            { name: 'Team C', members: ['Charlie Day', 'Dee Reynolds'], projects: [{ name: 'Project Alpha', status: 'Submitted Late', assignmentId: 'project-alpha', courseId: 'cs101' }] },
        ],
        'mgt201': [
            { name: 'Team B', members: ['Alice Green', 'Bob White'], projects: [{ name: 'Midterm Report', status: 'Submitted', assignmentId: 'midterm-report', courseId: 'mgt201' }] },
        ],
    };

    const studentsData = [
        { id: 'S001', name: 'John Doe', email: 'john.doe@example.com', group: 'Team A', courses: ['CS101', 'MGT201'] },
        { id: 'S002', name: 'Jane Smith', email: 'jane.smith@example.com', group: 'Team A', courses: ['CS101'] },
        { id: 'S003', name: 'Alice Green', email: 'alice.green@example.com', group: 'Team B', courses: ['MGT201'] },
        { id: 'S004', name: 'Bob White', email: 'bob.white@example.com', group: 'Team B', courses: ['MGT201'] },
        { id: 'S005', name: 'Robert Brown', email: 'robert.brown@example.com', group: 'Team A', courses: ['CS101'] },
    ];

    const dashboardProposals = [
        { groupName: 'Team A', assignment: 'Project Alpha (CS101)', submittedOn: 'Oct 14, 2025, 10:30 PM', status: 'Submitted' },
        { groupName: 'Team B', assignment: 'Midterm Report (MGT201)', submittedOn: 'Oct 15, 2025, 09:00 AM', status: 'Submitted' },
        { groupName: 'Team D', assignment: 'Research Proposal (HIST101)', submittedOn: 'Oct 13, 2025, 03:00 PM', status: 'Reviewed' },
    ];

    // Handlers for navigation
    const setComponent = (section, data = null) => {
        setCurrentSection(section);
        if (section === 'course-details') {
            setCurrentCourse(data);
            setCurrentAssignment(null); // Reset assignment when changing course
            setCurrentGroup(null); // Reset group when changing course
        } else if (section === 'assignment-details') {
            setCurrentAssignment(data);
            setCurrentGroup(null); // Reset group when changing assignment
        } else if (section === 'group-details') {
            setCurrentGroup(data);
            setCurrentAssignment(null); // Reset assignment when changing group
        } else {
            setCurrentCourse(null);
            setCurrentAssignment(null);
            setCurrentGroup(null);
        }
    };

    // Handlers for modals
    const openAssignTaskModal = () => setShowAssignTaskModal(true);
    const closeAssignTaskModal = () => setShowAssignTaskModal(false);

    const openReviewSubmissionModal = (groupName, assignmentName) => {
        setReviewModalData({ groupName, assignmentName });
        setShowReviewSubmissionModal(true);
    };
    const closeReviewSubmissionModal = () => setShowReviewSubmissionModal(false);

    // Determine current section title for header
    const getSectionTitle = () => {
        switch (currentSection) {
            case 'dashboard': return 'Dashboard Overview';
            case 'courses': return 'All Courses';
            case 'groups': return 'All Groups';
            case 'students': return 'All Students';
            case 'settings': return 'Settings';
            case 'course-details': return currentCourse ? currentCourse.name : 'Course Details';
            case 'assignment-details': return currentAssignment ? currentAssignment.name : 'Assignment Details';
            case 'group-details': return currentGroup ? currentGroup.name : 'Group Details';
            default: return 'Dashboard Overview';
        }
    };
    console.log(groups);
    return (
        <>   <Navbar currentSection={currentSection}  title={getSectionTitle()} setCurrentSection={setCurrentSection}/>
        <div className="sm:flex-row flex h-screen border-t-2  mt-2 overflow-scroll">
            <Sidebar1 currentSection={currentSection} onNavigate={setComponent} />

            <main className="flex-1 flex flex-col bg-gray-100 overflow-y-auto">
                <Header />

                <div className="p-6 flex-1 overflow-y-auto">
                    {currentSection === 'dashboard' && (
                        <Dashboard
                            coursesData={coursesData}
                            dashboardProposals={dashboardProposals}
                            onViewCourse={course => setComponent('course-details', course)}
                            onReviewSubmission={openReviewSubmissionModal}
                        />
                    )}
                    {currentSection === 'courses' && (
                        <CoursesSection
                            coursesData={coursesData}
                            groups={groups}    
                            onViewCourse={course => setComponent('course-details', course)}
                        />
                    )}
                    {currentSection === 'groups' && (
                        <GroupsSection
                            groups={groups}
                            groupsData={Object.values(groupsData).flat()} // Flatten all groups from all courses
                            onViewGroup={group => setComponent('group-details', group)}
                        />
                    )}
                    {currentSection === 'students' && (
                        <StudentsSection studentsData={students} />
                    )}
                    {currentSection === 'settings' && (
                        <SettingsSection />
                    )}
                    {/* {currentSection === 'course-details' && currentCourse && (
                        <CourseDetails
                            course={currentCourse}
                            assignments={assignmentsData[currentCourse.id] || []}
                            groups={groupsData[currentCourse.id] || []}
                            students={studentsData.filter(s => s.courses.includes(currentCourse.id))}
                            onNavigate={setComponent}
                            onAssignTask={openAssignTaskModal}
                            onViewAssignment={assignment => setComponent('assignment-details', assignment)}
                            onViewGroup={group => setComponent('group-details', group)}
                        />
                    )} */}
                    {currentSection === 'assignment-details' && currentAssignment && (
                        <AssignmentDetails
                            assignment={currentAssignment}
                            course={currentCourse} // Pass currentCourse for breadcrumbs
                            onNavigate={setComponent}
                            onReviewSubmission={openReviewSubmissionModal}
                        />
                    )}
                    {currentSection === 'group-details' && currentGroup && (
                        <GroupDetails
                            group={currentGroup}
                            onNavigate={setComponent}
                            onReviewSubmission={openReviewSubmissionModal}
                        />
                    )}
                </div>
            </main>

            {showAssignTaskModal && (
                <AssignTaskModal onClose={closeAssignTaskModal} />
            )}
            {showReviewSubmissionModal && (
                <ReviewSubmissionModal
                    groupName={reviewModalData.groupName}
                    assignmentName={reviewModalData.assignmentName}
                    onClose={closeReviewSubmissionModal}
                />
            )}
        </div>
        </>
    );
};

const Dashboard = ({ coursesData, dashboardProposals, onViewCourse, onReviewSubmission }) => {
    return (
        <section id="dashboard-section" className="content-section">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm">Total Assignments</p>
                        <p className="text-3xl font-bold text-gray-800">4</p>
                    </div>
                    <i className="fas fa-book text-5xl text-blue-200"></i>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm">total Groups</p>
                        <p className="text-3xl font-bold text-gray-800">12</p>
                    </div>
                    <i className="fas fa-clipboard-check text-5xl text-green-200"></i>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm">Total Students</p>
                        <p className="text-3xl font-bold text-gray-800">3</p>
                    </div>
                    <i className="fas fa-calendar-alt text-5xl text-yellow-200"></i>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm">Total Reviewed</p>
                        <p className="text-3xl font-bold text-gray-800">3</p>
                    </div>
                    <i className="fas fa-calendar-alt text-5xl text-yellow-200"></i>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm">Total Pending</p>
                        <p className="text-3xl font-bold text-gray-800">3</p>
                    </div>
                    <i className="fas fa-calendar-alt text-5xl text-yellow-200"></i>
                </div>
                
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-4">Recently Submitted Proposals</h3>
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Group Name</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignment</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted On</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {dashboardProposals.map((proposal, index) => (
                            <tr key={index} className="submission-row" data-status={proposal.status.toLowerCase().includes('submitted') && !proposal.status.toLowerCase().includes('late') ? 'pending' : 'reviewed'}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{proposal.groupName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{proposal.assignment}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{proposal.submittedOn}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${proposal.status.toLowerCase().includes('reviewed') ? 'bg-green-100 text-green-800' : (proposal.status.toLowerCase().includes('late') ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800')}`}>
                                        {proposal.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        className="text-blue-600 hover:text-blue-900 mr-2"
                                        onClick={() => onReviewSubmission(proposal.groupName, proposal.assignment.split('(')[0].trim())}
                                    >
                                        <i className="fas fa-eye"></i> {proposal.status.toLowerCase().includes('reviewed') ? 'View Feedback' : 'View Submission'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

// Courses Section Component


// Groups Section Component
// const GroupsSection = ({ groupsData, onViewGroup }) => {
//     return (
//         <section id="groups-section" className="content-section">
//             <nav className="text-sm text-gray-500 mb-4">
//                 <span className="cursor-pointer hover:underline" data-section="dashboard">Dashboard</span> &gt; All Groups
//             </nav>
//             <h3 className="text-2xl font-semibold text-gray-800 mb-6">All Groups</h3>
//             <div className="bg-white rounded-xl shadow-md overflow-hidden">
//                 <table className="min-w-full divide-y divide-gray-200">
//                     <thead className="bg-gray-50">
//                         <tr>
//                             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Group Name</th>
//                             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
//                             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Members</th>
//                             <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
//                         </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                         {groupsData.map((group, index) => (
//                             <tr key={index}>
//                                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{group.name}</td>
//                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{group.projects[0]?.courseId?.toUpperCase() || 'N/A'}</td> {/* Assuming first project determines course */}
//                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{group.members.join(', ')}</td>
//                                 <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                                     <button
//                                         className="text-blue-600 hover:text-blue-900 mr-2"
//                                         onClick={() => onViewGroup(group)}
//                                     >
//                                         <i className="fas fa-eye"></i> View Group
//                                     </button>
//                                     <button className="text-gray-600 hover:text-gray-900 mr-2"><i className="fas fa-edit"></i> Edit</button>
//                                     <button className="text-red-600 hover:text-red-900"><i className="fas fa-trash-alt"></i> Delete</button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </section>
//     );
// };

// Students Section Component
// const StudentsSection = ({ studentsData }) => {
//     return (
//         <section id="students-section" className="content-section">
//             <h3 className="text-2xl font-semibold text-gray-800 mb-6">All Students</h3>
//             <div className="bg-white rounded-xl shadow-md overflow-hidden">
//                 <table className="min-w-full divide-y divide-gray-200">
//                     <thead className="bg-gray-50">
//                         <tr>
//                             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
//                             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student ID</th>
//                             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
//                             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Associated Courses</th>
//                             <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
//                         </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                         {studentsData.map(student => (
//                             <tr key={student.id}>
//                                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.name}</td>
//                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.id}</td>
//                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.email}</td>
//                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.courses.join(', ')}</td>
//                                 <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                                     <button className="text-blue-600 hover:text-blue-900 mr-2"><i className="fas fa-eye"></i> View Profile</button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </section>
//     );
// };

// Settings Section Component
// const SettingsSection = () => {
//     return (
//         <section id="settings-section" className="content-section">
//             <h3 className="text-2xl font-semibold text-gray-800 mb-6">Settings</h3>
//             <div className="bg-white p-6 rounded-xl shadow-md">
//                 <p className="text-gray-700">This section would contain various settings for the professor's account and preferences.</p>
//                 <div className="mt-4 space-y-4">
//                     <div>
//                         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="notificationSettings">Notification Preferences</label>
//                         <select id="notificationSettings" className="shadow-sm border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500">
//                             <option>Email Notifications</option>
//                             <option>In-App Notifications</option>
//                             <option>Both</option>
//                         </select>
//                     </div>
//                     <div>
//                         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profileUpdate">Update Profile</label>
//                         <button id="profileUpdate" className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">Edit Profile</button>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// Course Details Component
// const CourseDetails = ({ course, assignments, groups, students, onNavigate, onAssignTask, onViewAssignment, onViewGroup }) => {
//     const [activeTab, setActiveTab] = useState('assignments');

//     return (
//         <section id="course-details-section" className="content-section">
//             <nav className="text-sm text-gray-500 mb-4">
//                 <span className="cursor-pointer hover:underline" onClick={() => onNavigate('dashboard')}>Dashboard</span> &gt; <span id="course-breadcrumb-name">{course.name}</span>
//             </nav>
//             <div className="flex items-center justify-between mb-6">
//                 <h3 className="text-2xl font-semibold text-gray-800" id="course-title">{course.name}</h3>
//                 <div className="space-x-3">
//                     <button className="py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200" onClick={onAssignTask}>
//                         <i className="fas fa-plus mr-2"></i>Assign Task
//                     </button>
//                     <button className="py-2 px-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200">
//                         <i className="fas fa-users-cog mr-2"></i>Manage Students
//                     </button>
//                 </div>
//             </div>

//             <div className="border-b border-gray-200 mb-6">
//                 <nav className="-mb-px flex space-x-8" aria-label="Tabs">
//                     <a href="#" className={`tab-link whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'assignments' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`} onClick={() => setActiveTab('assignments')} data-tab="assignments">Assignments</a>
//                     <a href="#" className={`tab-link whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'groups' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`} onClick={() => setActiveTab('groups')} data-tab="groups">Groups</a>
//                     <a href="#" className={`tab-link whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'students' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`} onClick={() => setActiveTab('students')} data-tab="students">Students</a>
//                     <a href="#" className={`tab-link whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'grades' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`} onClick={() => setActiveTab('grades')} data-tab="grades">Grades</a>
//                 </nav>
//             </div>

//             {activeTab === 'assignments' && (
//                 <div id="assignments-tab" className="tab-content">
//                     <h4 className="text-xl font-semibold text-gray-800 mb-4">Assignments</h4>
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                         {assignments.map(assignment => (
//                             <div key={assignment.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
//                                 <h5 className="text-lg font-bold text-gray-800 mb-2">{assignment.name}</h5>
//                                 <p className="text-gray-600 text-sm mb-3">Due: {assignment.dueDate}</p>
//                                 <div className="flex items-center text-gray-700 mb-2">
//                                     <i className="fas fa-upload mr-2 text-blue-500"></i>
//                                     <span>{assignment.submissionsReceived}/{assignment.totalSubmissions} Submissions Received</span>
//                                 </div>
//                                 <div className="flex items-center text-gray-700 mb-4">
//                                     <i className="fas fa-clipboard-check mr-2 text-green-500"></i>
//                                     <span>{assignment.reviewsCompleted}/{assignment.totalReviews} Submissions Reviewed</span>
//                                 </div>
//                                 <div className="flex justify-between items-center">
//                                     <button className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200" onClick={() => onViewAssignment(assignment)}>View Details</button>
//                                     <div className="flex space-x-2">
//                                         <button className="p-2 rounded-full hover:bg-gray-200 text-gray-600"><i className="fas fa-edit"></i></button>
//                                         <button className="p-2 rounded-full hover:bg-gray-200 text-red-600"><i className="fas fa-trash-alt"></i></button>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             )}

//             {activeTab === 'groups' && (
//                 <div id="groups-tab" className="tab-content">
//                     <h4 className="text-xl font-semibold text-gray-800 mb-4">Groups</h4>
//                     <div className="bg-white rounded-xl shadow-md overflow-hidden">
//                         <table className="min-w-full divide-y divide-gray-200">
//                             <thead className="bg-gray-50">
//                                 <tr>
//                                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Group Name</th>
//                                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Members</th>
//                                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned Tasks</th>
//                                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
//                                     <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
//                                 </tr>
//                             </thead>
//                             <tbody className="bg-white divide-y divide-gray-200">
//                                 {groups.map((group, index) => (
//                                     <tr key={index}>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{group.name}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{group.members.join(', ')}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                             {group.projects.map(p => p.name).join(', ')}
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                             <div className="w-24 bg-gray-200 rounded-full h-2.5">
//                                                 <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${group.progress || 0}%` }}></div>
//                                             </div>
//                                             <span className="text-xs text-gray-600">{group.progress || 0}%</span>
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                                             <button className="text-blue-600 hover:text-blue-900 mr-2" onClick={() => onViewGroup(group)}>
//                                                 <i className="fas fa-eye"></i> View
//                                             </button>
//                                             <button className="text-gray-600 hover:text-gray-900 mr-2"><i className="fas fa-edit"></i> Edit</button>
//                                             <button className="text-red-600 hover:text-red-900"><i className="fas fa-trash-alt"></i> Delete</button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             )}

//             {activeTab === 'students' && (
//                 <div id="students-tab" className="tab-content">
//                     <h4 className="text-xl font-semibold text-gray-800 mb-4">Students</h4>
//                     <div className="bg-white rounded-xl shadow-md overflow-hidden">
//                         <table className="min-w-full divide-y divide-gray-200">
//                             <thead className="bg-gray-50">
//                                 <tr>
//                                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
//                                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student ID</th>
//                                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
//                                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Group</th>
//                                     <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
//                                 </tr>
//                             </thead>
//                             <tbody className="bg-white divide-y divide-gray-200">
//                                 {students.map(student => (
//                                     <tr key={student.id}>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.name}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.id}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.email}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.group || 'N/A'}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                                             <button className="text-blue-600 hover:text-blue-900 mr-2"><i className="fas fa-eye"></i> View Profile</button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             )}

//             {activeTab === 'grades' && (
//                 <div id="grades-tab" className="tab-content">
//                     <h4 className="text-xl font-semibold text-gray-800 mb-4">Grades Overview</h4>
//                     <p className="text-gray-600">This section would display a comprehensive gradebook for the course.</p>
//                     <div className="bg-white p-6 rounded-xl shadow-md mt-4">
//                         <p className="text-gray-700">Gradebook content goes here (e.g., student names, assignment scores, total grades).</p>
//                     </div>
//                 </div>
//             )}
//         </section>
//     );
// };

// Assignment Details Component
// const AssignmentDetails = ({ assignment, course, onNavigate, onReviewSubmission }) => {
//     const [activeTab, setActiveTab] = useState('overview');

//     // Dummy submission data for a specific assignment
//     const submissions = [
//         { group: 'Team A', submittedOn: 'Oct 14, 2025, 10:30 PM', status: 'Submitted', grade: '-' },
//         { group: 'Team B', submittedOn: 'Oct 15, 2025, 11:00 PM', status: 'Reviewed', grade: '85/100' },
//         { group: 'Team C', submittedOn: 'Oct 16, 2025, 09:00 AM (Late)', status: 'Submitted Late', grade: '-' },
//     ];

//     const filteredSubmissions = (filter) => {
//         if (filter === 'all') return submissions;
//         if (filter === 'pending') return submissions.filter(s => s.status === 'Submitted' || s.status === 'Submitted Late');
//         if (filter === 'reviewed') return submissions.filter(s => s.status === 'Reviewed');
//         return submissions;
//     };

//     return (
//         <section id="assignment-details-section" className="content-section">
//             <nav className="text-sm text-gray-500 mb-4">
//                 <span className="cursor-pointer hover:underline" onClick={() => onNavigate('dashboard')}>Dashboard</span> &gt; <span className="cursor-pointer hover:underline" onClick={() => onNavigate('course-details', course)}>{course.name}</span> &gt; <span id="assignment-breadcrumb-name">{assignment.name}</span>
//             </nav>
//             <div className="flex items-center justify-between mb-6">
//                 <h3 className="text-2xl font-semibold text-gray-800" id="assignment-title">{assignment.name}</h3>
//                 <div className="space-x-3">
//                     <button className="py-2 px-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200">
//                         <i className="fas fa-edit mr-2"></i>Edit Assignment
//                     </button>
//                     <button className="py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200">
//                         <i className="fas fa-trash-alt mr-2"></i>Delete Assignment
//                     </button>
//                 </div>
//             </div>

//             <div className="border-b border-gray-200 mb-6">
//                 <nav className="-mb-px flex space-x-8" aria-label="Tabs">
//                     <a href="#" className={`assignment-tab-link whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'overview' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`} onClick={() => setActiveTab('overview')} data-assignment-tab="overview">Overview</a>
//                     <a href="#" className={`assignment-tab-link whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'submissions' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`} onClick={() => setActiveTab('submissions')} data-assignment-tab="submissions">Submissions</a>
//                     <a href="#" className={`assignment-tab-link whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'rubric' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`} onClick={() => setActiveTab('rubric')} data-assignment-tab="rubric">Rubric</a>
//                 </nav>
//             </div>

//             {activeTab === 'overview' && (
//                 <div id="assignment-overview-tab" className="assignment-tab-content">
//                     <h4 className="text-xl font-semibold text-gray-800 mb-4">Assignment Overview</h4>
//                     <div className="bg-white p-6 rounded-xl shadow-md mb-6">
//                         <p className="text-gray-700 mb-4">
//                             {assignment.description}
//                         </p>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
//                             <div><strong>Due Date:</strong> {assignment.dueDate}</div>
//                             <div><strong>Points:</strong> {assignment.points}</div>
//                             <div><strong>Submission Type:</strong> {assignment.submissionType}</div>
//                             <div><strong>Assigned To:</strong> {assignment.assignedTo}</div>
//                         </div>
//                         {assignment.rubric && (
//                             <div className="mt-4">
//                                 <strong>Associated Rubric:</strong> <a href="#" className="text-blue-600 hover:underline">{assignment.rubric}</a>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             )}

//             {activeTab === 'submissions' && (
//                 <div id="assignment-submissions-tab" className="assignment-tab-content">
//                     <h4 className="text-xl font-semibold text-gray-800 mb-4">Submissions</h4>
//                     <div className="mb-4 flex space-x-2">
//                         <button className="py-2 px-4 rounded-lg text-sm font-medium border border-gray-300 bg-white text-gray-700 hover:bg-gray-50" onClick={() => setActiveTab('submissions')} data-filter="all">All Submissions</button>
//                         <button className="py-2 px-4 rounded-lg text-sm font-medium border border-gray-300 bg-white text-gray-700 hover:bg-gray-50" onClick={() => setActiveTab('submissions')} data-filter="pending">Pending Review</button>
//                         <button className="py-2 px-4 rounded-lg text-sm font-medium border border-gray-300 bg-white text-gray-700 hover:bg-gray-50" onClick={() => setActiveTab('submissions')} data-filter="reviewed">Reviewed</button>
//                     </div>
//                     <div className="bg-white rounded-xl shadow-md overflow-hidden">
//                         <table className="min-w-full divide-y divide-gray-200">
//                             <thead className="bg-gray-50">
//                                 <tr>
//                                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Group Name</th>
//                                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted On</th>
//                                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
//                                     <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
//                                 </tr>
//                             </thead>
//                             <tbody className="bg-white divide-y divide-gray-200">
//                                 {filteredSubmissions(activeTab).map((submission, index) => (
//                                     <tr key={index} className="submission-row" data-status={submission.status.toLowerCase().includes('submitted') && !submission.status.toLowerCase().includes('late') ? 'pending' : 'reviewed'}>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{submission.group}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{submission.submittedOn}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm">
//                                             <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${submission.status.toLowerCase().includes('reviewed') ? 'bg-green-100 text-green-800' : (submission.status.toLowerCase().includes('late') ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800')}`}>
//                                                 {submission.status}
//                                             </span>
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{submission.grade}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                                             <button className="text-blue-600 hover:text-blue-900 mr-2" onClick={() => onReviewSubmission(submission.group, assignment.name)}>
//                                                 <i className="fas fa-eye"></i> {submission.status.toLowerCase().includes('reviewed') ? 'View Feedback' : 'View Submission'}
//                                             </button>
//                                             <button className="text-gray-600 hover:text-gray-900"><i className="fas fa-download"></i> Download</button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             )}

//             {activeTab === 'rubric' && (
//                 <div id="assignment-rubric-tab" className="assignment-tab-content">
//                     <h4 className="text-xl font-semibold text-gray-800 mb-4">Rubric for {assignment.name}</h4>
//                     <div className="bg-white p-6 rounded-xl shadow-md">
//                         <div className="mb-4 pb-4 border-b border-gray-200">
//                             <h5 className="font-bold text-lg text-gray-800">1. Code Quality (30 points)</h5>
//                             <ul className="list-disc list-inside text-gray-700 mt-2">
//                                 <li><strong>Excellent (26-30 pts):</strong> Clean, well-commented, efficient, and follows best practices.</li>
//                                 <li><strong>Good (20-25 pts):</strong> Generally clean, some comments, minor inefficiencies.</li>
//                                 <li><strong>Fair (15-19 pts):</strong> Readable but lacks comments, some structural issues.</li>
//                                 <li><strong>Poor (0-14 pts):</strong> Unreadable, no comments, significant structural flaws.</li>
//                             </ul>
//                         </div>
//                         <div className="mb-4 pb-4 border-b border-gray-200">
//                             <h5 className="font-bold text-lg text-gray-800">2. Functionality (40 points)</h5>
//                             <ul className="list-disc list-inside text-gray-700 mt-2">
//                                 <li><strong>Excellent (36-40 pts):</strong> All required features fully implemented and bug-free.</li>
//                                 <li><strong>Good (30-35 pts):</strong> Most features implemented, minor bugs.</li>
//                                 <li><strong>Fair (20-29 pts):</strong> Some features missing or significant bugs.</li>
//                                 <li><strong>Poor (0-19 pts):</strong> Core features not working or missing.</li>
//                             </ul>
//                         </div>
//                         <div className="mb-4 pb-4">
//                             <h5 className="font-bold text-lg text-gray-800">3. Documentation & Presentation (30 points)</h5>
//                             <ul className="list-disc list-inside text-gray-700 mt-2">
//                                 <li><strong>Excellent (26-30 pts):</strong> Clear, concise documentation; professional presentation.</li>
//                                 <li><strong>Good (20-25 pts):</strong> Adequate documentation; decent presentation.</li>
//                                 <li><strong>Fair (15-19 pts):</strong> Minimal documentation; disorganized presentation.</li>
//                                 <li><strong>Poor (0-14 pts):</strong> No documentation; unprofessional presentation.</li>
//                             </ul>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </section>
//     );
// };

// Group Details Component
// const GroupDetails = ({ group, onNavigate, onReviewSubmission }) => {
//       const assignmentData = {
//     "id": 2,
//     "description": "human birthdy", // Typo in original, keeping as is
//     "title": "Human Trafficking", // Corrected typo for display
//     "iterations": [
//       {
//         "id": 29,
//         "iterationType": "PRE",
//         "documentUrl": "C:\\Users\\GANESH\\OneDrive\\Desktop\\BootProjects\\report\\Uploads\\Documents\\1749721882499_hello.txt",
//         "documentName": "1749721882499_hello.txt",
//         "status": "SUBMITTED",
//         "submittedBy": {
//           "id": 1,
//           "name": "one",
//           "email": "SUP@example.com",
//           "password": null,
//           "role": "STUDENT",
//           "supervisedGroups": [],
//           "feedbacks": []
//         }
//       },
//       {
//         "id": 30,
//         "iterationType": "DRAFT",
//         "documentUrl": "C:\\Users\\GANESH\\OneDrive\\Desktop\\BootProjects\\report\\Uploads\\Documents\\1749721882500_draft_report.txt",
//         "documentName": "1749721882500_draft_report.txt",
//         "status": "IN_PROGRESS",
//         "submittedBy": {
//           "id": 1,
//           "name": "one",
//           "email": "SUP@example.com",
//           "password": null,
//           "role": "STUDENT",
//           "supervisedGroups": [],
//           "feedbacks": []
//         }
//       },
//       {
//         "id": 31,
//         "iterationType": "FINAL",
//         "documentUrl": "C:\\Users\\GANESH\\OneDrive\\Desktop\\BootProjects\\report\\Uploads\\Documents\\1749721882501_final_report.pdf",
//         "documentName": "1749721882501_final_report.pdf",
//         "status": "GRADED",
//         "submittedBy": {
//           "id": 2,
//           "name": "two",
//           "email": "STUDENT2@example.com",
//           "password": null,
//           "role": "STUDENT",
//           "supervisedGroups": [],
//           "feedbacks": ["are you fine"]
//         }
//       },
//       {
//         "id": 32,
//         "iterationType": "REVISION",
//         "documentUrl": "C:\\Users\\GANESH\\OneDrive\\Desktop\\BootProjects\\report\\Uploads\\Documents\\1749721882502_revision_notes.docx",
//         "documentName": "1749721882502_revision_notes.docx",
//         "status": "SUBMITTED",
//         "submittedBy": {
//           "id": 1,
//           "name": "one",
//           "email": "SUP@example.com",
//           "password": null,
//           "role": "STUDENT",
//           "supervisedGroups": [],
//           "feedbacks": [
//             "hello guys"
//           ]
//         }
//       }
//     ]
//   };

//    const [feedbackInputs, setFeedbackInputs] = useState({});

//   // Function to handle changes in the feedback textarea
//   const handleFeedbackInputChange = (iterationId, value) => {
//     setFeedbackInputs(prev => ({
//       ...prev,
//       [iterationId]: value
//     }));
//   };

//   // Function to simulate submitting feedback
//   const handleSubmitFeedback = (iterationId) => {
//     const newFeedback = feedbackInputs[iterationId];
//     if (newFeedback) {
//       setAssignmentData(prevData => ({
//         ...prevData,
//         iterations: prevData.iterations.map(iteration =>
//           iteration.id === iterationId ? { ...iteration, feedback: newFeedback } : iteration
//         )
//       }));
//       // Clear the input field after submission
//       setFeedbackInputs(prev => {
//         const newState = { ...prev };
//         delete newState[iterationId];
//         return newState;
//       });
//     }
//   };

//     return (
//         <section id="group-details-section" className="content-section">
//             <nav className="text-sm text-gray-500 mb-4">
//                 <span className="cursor-pointer hover:underline" onClick={() => onNavigate('dashboard')}>Dashboard</span> &gt; <span className="cursor-pointer hover:underline" onClick={() => onNavigate('groups')}>All Groups</span> &gt; <span id="group-breadcrumb-name">{group.name}</span>
//             </nav>
//             <div className="flex items-center justify-between mb-6">
//                 <h3 className="text-2xl font-semibold text-gray-800" id="group-details-title">{group.name}</h3>
//                 <div className="space-x-3">
//                     <button className="py-2 px-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200">
//                         <i className="fas fa-edit mr-2"></i>Manage Group
//                     </button>
//                 </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="bg-white p-6 rounded-xl shadow-md">
//                     <h4 className="text-xl font-semibold text-gray-800 mb-4">Group Members</h4>
//                     <ul id="group-members-list" className="list-disc list-inside text-gray-700 space-y-2">
//                         {group.members.map((member, index) => (
//                             <li key={index}>{member}</li>
//                         ))}
//                     </ul>
//                 </div>

     
//         {/* Assignment Header */}
//         <div className="mb-8 pb-4 border-b border-gray-200 bg-white p-6 rounded-xl shadow-md">
//           <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
//             {assignmentData.title}
//           </h1>
//           <p className="text-lg text-gray-600">
//             {assignmentData.description}
//           </p>
   

//         {/* Iterations Section */}
//         <div>
//           <h2 className="text-2xl font-bold text-gray-800 mb-6">Iterations</h2>

//           {assignmentData.iterations.length > 0 ? (
//             <div className="space-y-6">
//               {assignmentData.iterations.map((iteration, index) => (
//                 <div key={iteration.id || index} className="bg-blue-50 p-5 rounded-lg shadow-sm border border-blue-200">
//                   <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
//                     <h3 className="text-xl font-semibold text-blue-800">
//                       Iteration {index + 1}
//                     </h3>
//                     <span className={`px-3 py-1 rounded-full text-sm font-medium ${
//                       iteration.status === 'SUBMITTED' ? 'bg-green-200 text-green-800' :
//                       iteration.status === 'IN_PROGRESS' ? 'bg-yellow-200 text-yellow-800' :
//                       iteration.status === 'GRADED' ? 'bg-purple-200 text-purple-800' :
//                       'bg-gray-200 text-gray-700'
//                     }`}>
//                       {iteration.status}
//                     </span>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 mb-4">
//                     <p>
//                       <strong className="font-medium">Type:</strong> {iteration.iterationType}
//                     </p>
//                     <p>
//                       <strong className="font-medium">Submitted By:</strong> {iteration.submittedBy.name}
//                     </p>
//                     <p>
//                       <strong className="font-medium">Submitted Date:</strong> {iteration.submittedDate || 'N/A'}
//                     </p>
//                     <p className="col-span-1 md:col-span-2">
//                       <strong className="font-medium">Document Name:</strong> {iteration.documentName}
//                     </p>
//                     <p className="col-span-1 md:col-span-2">
//                       <strong className="font-medium">Document URL:</strong>{' '}
//                       {/* Note: Local file paths won't be clickable in a browser, but the structure is shown */}
//                       <a
//                         href={iteration.documentUrl}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-blue-600 hover:underline break-all"
//                       >
//                         {iteration.documentUrl}
//                       </a>
//                     </p>
//                   </div>
//                       {iteration.documentName.endsWith('.txt') && (
//                     <div className="mt-4">
//                       <a
//                         href={iteration.documentUrl}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors duration-200"
//                       >
//                         <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                           <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0113 3.414L16.586 7A2 2 0 0117 8.414V16a2 2 0 01-2 2H5a2 2 0 01-2-2V4zm5 2a1 1 0 00-1 1v3a1 1 0 102 0V7a1 1 0 00-1-1zm1 8a1 1 0 10-2 0v1a1 1 0 102 0v-1z" clipRule="evenodd"></path>
//                         </svg>
//                         View PDF
//                       </a>
//                     </div>
//                   )}
//                   {/* Feedback Section */}
//                   <div className="mt-4 pt-4 border-t border-blue-200">
//                     <strong className="font-medium text-gray-800">Feedback:</strong>
//                     {iteration.feedback ? (
//                       <p className="text-gray-700 mt-2 p-3 bg-white rounded-md border border-gray-200 italic">
//                         "{iteration.feedbacks}"
//                       </p>
//                     ) : (
//                       <form className="mt-2">
//                         <input type='text'
//                           className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                           rows="3"
//                           placeholder="Enter feedback here..."
//                           value={feedbackInputs[iteration.id] || ''}
//                         />
//                         <button
//                         type='submit'
//                           className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
//                         >
//                           Submit Feedback
//                         </button>
//                       </form>
//                     )}
//                   </div>

//                   {/* View PDF Button */}
                 
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-gray-500 italic">No iterations found for this assignment.</p>
//           )}
//         </div>
//         </div>
     
// {/* 
//                 <div className="bg-white p-6 rounded-xl shadow-md">
//                     <h4 className="text-xl font-semibold text-gray-800 mb-4">Assigned Projects</h4>
//                     <div id="group-projects-list" className="space-y-4">
//                         {group.projects.length === 0 ? (
//                             <p className="text-gray-600">No projects assigned to this group yet.</p>
//                         ) : (
//                             group.projects.map((project, index) => (
//                                 <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
//                                     <h5 className="font-bold text-lg text-gray-800 mb-2">{project.name}</h5>
//                                     <p className="text-gray-600 text-sm mb-3">Course: {project.courseId.toUpperCase()}</p>
//                                     <p className="text-gray-600 text-sm mb-3">Status: <span className="font-semibold">{project.status}</span></p>
//                                     <div className="flex space-x-2 mt-3">
//                                         <button className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 text-sm" onClick={() => alert(`Viewing project: ${project.name}`)}>
//                                             <i className="fas fa-file-alt mr-2"></i>View Project
//                                         </button>
//                                         <button className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 text-sm" onClick={() => onReviewSubmission(group.name, project.name)}>
//                                             <i className="fas fa-comment-dots mr-2"></i>Give Feedback
//                                         </button>
//                                     </div>
//                                 </div>
//                             ))
//                         )}
//                     </div>
//                 </div> */}
//             </div>
//         </section>
//     );
// };


// Assign Task Modal Component
// const AssignTaskModal = ({ onClose }) => {
//     // Basic state for form inputs (can be expanded)
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const [dueDate, setDueDate] = useState('');
//     const [dueTime, setDueTime] = useState('');
//     const [points, setPoints] = useState('');
//     const [assignTo, setAssignTo] = useState('all-groups');

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // In a real application, you'd send this data to a backend or state management
//         console.log('New Assignment:', { title, description, dueDate, dueTime, points, assignTo });
//         onClose(); // Close modal after submission
//     };

//     return (
//         <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4 z-50">
//             <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-8 transform transition-all duration-300 scale-100 opacity-100">
//                 <div className="flex justify-between items-center mb-6">
//                     <h3 className="text-2xl font-bold text-gray-800">Assign New Task</h3>
//                     <button className="text-gray-500 hover:text-gray-700 text-2xl" onClick={onClose}>
//                         <i className="fas fa-times"></i>
//                     </button>
//                 </div>
//                 <form onSubmit={handleSubmit}>
//                     <div className="mb-4">
//                         <label htmlFor="taskTitle" className="block text-gray-700 text-sm font-bold mb-2">Assignment Title</label>
//                         <input type="text" id="taskTitle" className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., Project Alpha" value={title} onChange={(e) => setTitle(e.target.value)} required />
//                     </div>
//                     <div className="mb-4">
//                         <label htmlFor="taskDescription" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
//                         <textarea id="taskDescription" rows="6" className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Detailed instructions and requirements..." value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                         <div>
//                             <label htmlFor="dueDate" className="block text-gray-700 text-sm font-bold mb-2">Due Date</label>
//                             <input type="date" id="dueDate" className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
//                         </div>
//                         <div>
//                             <label htmlFor="dueTime" className="block text-gray-700 text-sm font-bold mb-2">Due Time</label>
//                             <input type="time" id="dueTime" className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" value={dueTime} onChange={(e) => setDueTime(e.target.value)} required />
//                         </div>
//                     </div>
//                     <div className="mb-4">
//                         <label htmlFor="points" className="block text-gray-700 text-sm font-bold mb-2">Points/Weight</label>
//                         <input type="number" id="points" className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., 100" value={points} onChange={(e) => setPoints(e.target.value)} />
//                     </div>
//                     <div className="mb-6">
//                         <label className="block text-gray-700 text-sm font-bold mb-2">Assign To</label>
//                         <div className="flex items-center space-x-4">
//                             <label className="inline-flex items-center">
//                                 <input type="radio" name="assignTo" value="all-groups" className="form-radio text-blue-600 h-5 w-5" checked={assignTo === 'all-groups'} onChange={(e) => setAssignTo(e.target.value)} />
//                                 <span className="ml-2 text-gray-700">All Groups</span>
//                             </label>
//                             <label className="inline-flex items-center">
//                                 <input type="radio" name="assignTo" value="specific-groups" className="form-radio text-blue-600 h-5 w-5" checked={assignTo === 'specific-groups'} onChange={(e) => setAssignTo(e.target.value)} />
//                                 <span className="ml-2 text-gray-700">Specific Groups</span>
//                             </label>
//                         </div>
//                     </div>
//                     <div className="flex justify-end space-x-4">
//                         <button type="button" className="py-3 px-6 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors duration-200 font-medium" onClick={onClose}>Cancel</button>
//                         <button type="submit" className="py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">Create Assignment</button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// Review Submission Modal Component
// const ReviewSubmissionModal = ({ groupName, assignmentName, onClose }) => {
//     // State for review form inputs
//     const [overallGrade, setOverallGrade] = useState('');
//     const [codeQualityFeedback, setCodeQualityFeedback] = useState('');
//     const [functionalityFeedback, setFunctionalityFeedback] = useState('');
//     const [documentationFeedback, setDocumentationFeedback] = useState('');
//     const [overallFeedback, setOverallFeedback] = useState('');
//     const [privateNotes, setPrivateNotes] = useState('');

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // In a real application, send this feedback to a backend
//         console.log('Feedback Submitted:', {
//             groupName,
//             assignmentName,
//             overallGrade,
//             codeQualityFeedback,
//             functionalityFeedback,
//             documentationFeedback,
//             overallFeedback,
//             privateNotes
//         });
//         onClose();
//     };

//     return (
//         <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4 z-50">
//             <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl h-5/6 flex flex-col transform transition-all duration-300 scale-100 opacity-100">
//                 <div className="flex justify-between items-center p-6 border-b border-gray-200">
//                     <h3 className="text-2xl font-bold text-gray-800">Review Submission: {groupName} - {assignmentName}</h3>
//                     <button className="text-gray-500 hover:text-gray-700 text-2xl" onClick={onClose}>
//                         <i className="fas fa-times"></i>
//                     </button>
//                 </div>
//                 <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
//                     <div className="w-full md:w-1/2 p-6 border-r border-gray-200 overflow-y-auto no-scrollbar">
//                         <h4 className="text-xl font-semibold text-gray-800 mb-4">Submission Files</h4>
//                         <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
//                             <p className="text-gray-700 font-medium mb-2">Submitted by: <span>{groupName}</span></p>
//                             <p className="text-gray-600 text-sm mb-2">Submitted on: <span>Oct 14, 2025, 10:30 PM</span></p>
//                             <button className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 text-sm">
//                                 <i className="fas fa-download mr-2"></i>Download All Files
//                             </button>
//                         </div>
//                         <div className="bg-gray-100 p-6 rounded-lg text-gray-600 text-center flex items-center justify-center h-64 border border-dashed border-gray-300">
//                             <p><i className="fas fa-file-code text-4xl text-gray-400 mb-2"></i><br />File Viewer Placeholder (e.g., PDF, Code, Image)</p>
//                         </div>
//                         <p className="text-sm text-gray-500 mt-4">
//                             *In a real application, this area would display the submitted files (e.g., an embedded PDF viewer, a syntax-highlighted code editor, or an image viewer).
//                         </p>
//                     </div>

//                     <div className="w-full md:w-1/2 p-6 overflow-y-auto no-scrollbar">
//                         <h4 className="text-xl font-semibold text-gray-800 mb-4">Grading & Feedback</h4>
//                         <form onSubmit={handleSubmit}>
//                             <div className="mb-6">
//                                 <label htmlFor="overallGrade" className="block text-gray-700 text-sm font-bold mb-2">Overall Grade (out of 100)</label>
//                                 <input type="number" id="overallGrade" className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., 85" value={overallGrade} onChange={(e) => setOverallGrade(e.target.value)} />
//                             </div>

//                             <div className="mb-6">
//                                 <h5 className="text-lg font-semibold text-gray-800 mb-3">Rubric Evaluation</h5>
//                                 <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
//                                     <label className="block text-gray-700 text-base font-bold mb-2">1. Code Quality (30 pts)</label>
//                                     <select className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3">
//                                         <option value="">Select Score</option>
//                                         <option value="excellent">Excellent (26-30 pts)</option>
//                                         <option value="good">Good (20-25 pts)</option>
//                                         <option value="fair">Fair (15-19 pts)</option>
//                                         <option value="poor">Poor (0-14 pts)</option>
//                                     </select>
//                                     <textarea rows="3" className="shadow-sm appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Specific feedback for code quality..." value={codeQualityFeedback} onChange={(e) => setCodeQualityFeedback(e.target.value)}></textarea>
//                                 </div>
//                                 <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
//                                     <label className="block text-gray-700 text-base font-bold mb-2">2. Functionality (40 pts)</label>
//                                     <select className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3">
//                                         <option value="">Select Score</option>
//                                         <option value="excellent">Excellent (36-40 pts)</option>
//                                         <option value="good">Good (30-35 pts)</option>
//                                         <option value="fair">Fair (20-29 pts)</option>
//                                         <option value="poor">Poor (0-19 pts)</option>
//                                     </select>
//                                     <textarea rows="3" className="shadow-sm appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Specific feedback for functionality..." value={functionalityFeedback} onChange={(e) => setFunctionalityFeedback(e.target.value)}></textarea>
//                                 </div>
//                                 <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
//                                     <label className="block text-gray-700 text-base font-bold mb-2">3. Documentation & Presentation (30 pts)</label>
//                                     <select className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3">
//                                         <option value="">Select Score</option>
//                                         <option value="excellent">Excellent (26-30 pts)</option>
//                                         <option value="good">Good (20-25 pts)</option>
//                                         <option value="fair">Fair (15-19 pts)</option>
//                                         <option value="poor">Poor (0-14 pts)</option>
//                                     </select>
//                                     <textarea rows="3" className="shadow-sm appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Specific feedback for documentation..." value={documentationFeedback} onChange={(e) => setDocumentationFeedback(e.target.value)}></textarea>
//                                 </div>
//                             </div>

//                             <div className="mb-6">
//                                 <label htmlFor="overallFeedback" className="block text-gray-700 text-sm font-bold mb-2">Overall Feedback</label>
//                                 <textarea id="overallFeedback" rows="5" className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Provide general feedback for the submission..." value={overallFeedback} onChange={(e) => setOverallFeedback(e.target.value)}></textarea>
//                             </div>
//                             <div className="mb-6">
//                                 <label htmlFor="privateNotes" className="block text-gray-700 text-sm font-bold mb-2">Private Notes (Only visible to you)</label>
//                                 <textarea id="privateNotes" rows="3" className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Add private notes about this submission..." value={privateNotes} onChange={(e) => setPrivateNotes(e.target.value)}></textarea>
//                             </div>
//                             <div className="flex justify-end space-x-4">
//                                 <button type="button" className="py-3 px-6 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors duration-200 font-medium" onClick={onClose}>Cancel</button>
//                                 <button type="button" className="py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">Save Draft</button>
//                                 <button type="submit" className="py-3 px-6 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium">Publish Feedback</button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

export default DashboardU;
