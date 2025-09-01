import React, { useState, useEffect, useRef } from 'react';
import MyDetails from './MyDetails';
import SubmittedWorks from './SubmittedWorks';
import { Boxes } from 'lucide-react';
import SummeryBoxs from './Assignedworks/SummeryBoxs';
import Groups from './Assignedworks/Groups';
import ChatPlaceholder from './Assignedworks/ChatPlaceholder';
import Navbar from './Assignedworks/Navbar';
import GroupDetail from './Assignedworks/GroupDetail';
import Sidebar from './Assignedworks/Sidebar';

// Main App component that contains the entire dashboard

const App = () => {
  // State for overall navigation (sidebar tabs)
  const [activeTab, setActiveTab] = useState('assignedWork'); // 'assignedWork', 'submittedWorks', 'myDetails', 'chats'

  // States for 'Assigned Work' section
  const [currentView, setCurrentView] = useState('groupList'); // 'groupList' or 'groupDetail'
  const [selectedGroup, setSelectedGroup] = useState(null);

  // Data states
  const [groups, setGroups] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]); // All submissions for all assignments

  // Mock student data (as provided by the user)
  const student = {
      id: 3,
      name: "THREE",
      email: "SUP@example.com",
      role: "STUDENT"
    };

  //  useEffect(()=>{
  //  const fetchGroups= async ()=>{
  //     try{
  //       const objs= await getAllGroups();
  //       setGroups(objs);
  //     }catch(error){
  //       console.log(error);
  //     }
  //   };
  //   fetchGroups();
  // },[]);

  console.log("data after api call", groups);
  useEffect(() => {
  }, []);

  // Function to switch view to group details (used within 'assignedWork' tab)
  const handleViewGroup = (group) => {
    console.log(group);
    setSelectedGroup(group);
    setCurrentView('groupDetail');
  };

  // Function to switch view back to group list (used within 'assignedWork' tab)
  const handleBackToGroups = () => {
    setSelectedGroup(null);
    setCurrentView('groupList');
  };


  // Function to handle assignment submission (mock implementation)
  const handleSubmitAssignment = (assignmentId, file) => {
    console.log(`Submitting file: ${file.name} for assignment: ${assignmentId}.`);
    // In a real application, you would send this file to a backend API.
    // For demonstration, we'll simulate adding a new pending submission.
    const newSubmission = {
      id: `s${submissions.length + 1}`, // Simple ID generation
      assignmentId: assignmentId,
      iteration:
        Math.max(
          0,
          ...submissions
            .filter((s) => s.assignmentId === assignmentId)
            .map((s) => s.iteration)
        ) + 1,
      dateSubmitted: new Date().toISOString(),
      status: 'Pending',
      feedback: null,
      fileUrl: `https://placehold.co/200x100/000000/FFFFFF?text=Submitted_${file.name}`, // Placeholder file
    };
    setSubmissions((prevSubmissions) => [...prevSubmissions, newSubmission]);
    console.log('Submission simulated successfully!');
  };


  // --- Dashboard Summary Component ---
  // const DashboardSummary = ({ assignments, submissions }) => {
  //   const totalAssignments = assignments.length;
  //   const totalSubmissions = submissions.length;
  //   const totalPending = submissions.filter(s => s.status === 'Pending').length;
  //   const totalAccepted = submissions.filter(s => s.status === 'Accepted').length;
  //   const totalRejected = submissions.filter(s => s.status === 'Rejected').length;

  //   return (
  //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
  //       <div className="bg-white p-4 rounded-lg shadow-md text-center">
  //         <h3 className="text-xl font-semibold text-gray-700">Total Assignments</h3>
  //         <p className="text-3xl font-bold text-blue-600">{totalAssignments}</p>
  //       </div>
  //       <div className="bg-white p-4 rounded-lg shadow-md text-center">
  //         <h3 className="text-xl font-semibold text-gray-700">Total Submissions</h3>
  //         <p className="text-3xl font-bold text-blue-600">{totalSubmissions}</p>
  //       </div>
  //       <div className="bg-white p-4 rounded-lg shadow-md text-center">
  //         <h3 className="text-xl font-semibold text-gray-700">Pending</h3>
  //         <p className="text-3xl font-bold text-yellow-600">{totalPending}</p>
  //       </div>
  //       <div className="bg-white p-4 rounded-lg shadow-md text-center">
  //         <h3 className="text-xl font-semibold text-gray-700">Accepted</h3>
  //         <p className="text-3xl font-bold text-green-600">{totalAccepted}</p>
  //       </div>
  //       <div className="bg-white p-4 rounded-lg shadow-md text-center">
  //         <h3 className="text-xl font-semibold text-gray-700">Rejected</h3>
  //         <p className="text-3xl font-bold text-red-600">{totalRejected}</p>
  //       </div>
  //     </div>
  //   );
  // };
  <>
    <Navbar/>
  <Boxes assignments={assignments} submissions={submissions} /> 
  // --- Sidebar Components ---
  // myDetails 
   <MyDetails />
  // SubmittedWorks Component: Displays all submitted assignments
  //assignment is passed for task name and their submissions
   <SubmittedWorks assignments={assignments} setAssignments={setAssignments} />
    //chat space 
    <ChatPlaceholder/>
   </>

  // const SubmittedWorks = ({ allAssignments, allSubmissions }) => {
  //   // Group submissions by assignment for easier display
  //   const submissionsByAssignment = allSubmissions.reduce((acc, sub) => {
  //     if (!acc[sub.assignmentId]) {
  //       acc[sub.assignmentId] = [];
  //     }
  //     acc[sub.assignmentId].push(sub);
  //     return acc;
  //   }, {});

  //   return (
  //     <div className="p-4 bg-white rounded-lg shadow-md">
  //       <h2 className="text-2xl font-bold mb-4 text-gray-800">Submitted Works</h2>
  //       {Object.keys(submissionsByAssignment).length === 0 ? (
  //         <p className="text-gray-600">You haven't submitted any work yet.</p>
  //       ) : (
  //         <div className="space-y-6">
  //           {Object.entries(submissionsByAssignment).map(([assignmentId, subs]) => {
  //             const assignment = allAssignments.find(a => a.id === assignmentId);
  //             if (!assignment) return null; // Should not happen with consistent data

  //             return (
  //               <div key={assignmentId} className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm">
  //                 <h3 className="text-xl font-semibold mb-3 text-gray-800">{assignment.name}</h3>
  //                 <ul className="space-y-3">
  //                   {subs.sort((a, b) => a.iteration - b.iteration).map(sub => (
  //                     <li key={sub.id} className="border-b border-gray-100 pb-3 last:border-b-0">
  //                       <h4 className="text-lg font-medium text-gray-700">Iteration {sub.iteration}</h4>
  //                       <p className="text-sm text-gray-600">
  //                         <strong>Submitted On:</strong> {new Date(sub.dateSubmitted).toLocaleString()}
  //                       </p>
  //                       <p className="text-sm">
  //                         <strong>Status:</strong>{' '}
  //                         <span
  //                           className={`font-bold ${
  //                             sub.status === 'Accepted'
  //                               ? 'text-green-600'
  //                               : sub.status === 'Rejected'
  //                               ? 'text-red-600'
  //                               : 'text-yellow-600'
  //                           }`}
  //                         >
  //                           {sub.status}
  //                         </span>
  //                       </p>
  //                       {sub.feedback && (
  //                         <p className="text-sm text-gray-700">
  //                           <strong>Feedback:</strong> {sub.feedback}
  //                         </p>
  //                       )}
  //                       {sub.fileUrl && (
  //                         <p className="mt-1">
  //                           <a
  //                             href={sub.fileUrl}
  //                             target="_blank"
  //                             rel="noopener noreferrer"
  //                             className="text-blue-600 hover:underline text-sm flex items-center"
  //                           >
  //                             <svg
  //                               xmlns="http://www.w3.org/2000/svg"
  //                               className="h-4 w-4 mr-1"
  //                               viewBox="0 0 20 20"
  //                               fill="currentColor"
  //                             >
  //                               <path
  //                                 fillRule="evenodd"
  //                                 d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
  //                                 clipRule="evenodd"
  //                               />
  //                             </svg>
  //                             Download File
  //                           </a>
  //                         </p>
  //                       )}
  //                     </li>
  //                   ))}
  //                 </ul>
  //               </div>
  //             );
  //           })}
  //         </div>
  //       )}
  //     </div>
  //   );
  // };

  // ChatPlaceholder Component: Non-functional chat section
 
 
  // const ChatPlaceholder = () => (
  //   <div className="p-4 bg-white rounded-lg shadow-md flex flex-col items-center justify-center h-full min-h-[300px]">
  //     <h2 className="text-2xl font-bold mb-4 text-gray-800">Chats</h2>
  //     <p className="text-gray-600 text-center">Chat functionality is not yet implemented.</p>
  //     <p className="text-gray-500 text-sm mt-2">Check back later for updates!</p>
  //   </div>
  // );

  // --- Existing Main Content Components ---

  // GroupList Component: Displays a list of groups
  // const GroupList = ({ groups, onViewGroup }) => {
  //   return (
  //     <div className="p-4 bg-white rounded-lg shadow-md">
  //       <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Groups</h2>
  //       {groups.length == 0 ? (
  //         <p className="text-gray-600">You are not part of any groups yet.</p>
  //       ) : (
  //         <ul className="space-y-3">
  //           {groups.map((group) => (
  //             <li
  //               key={group.id}
  //               className="flex items-center justify-between p-4 bg-gray-50 rounded-md shadow-sm border border-gray-200"
  //             >
  //               <span className="text-lg font-medium text-gray-700">{group.name}</span>
  //               <button
  //                 onClick={() => onViewGroup(group)}
  //                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition ease-in-out duration-150"
  //               >
  //                 View Group
  //               </button>
  //             </li>
  //           ))}
  //         </ul>
  //       )}
  //     </div>
  //   );
  // };


  // GroupDetail Component: Displays assignments within a selected group

  // const GroupDetail = ({ group, assignments, onBack, onSubmitAssignment, allSubmissions }) => {
  //   const [showSubmissionHistory, setShowSubmissionHistory] = useState(false);
  //   const [selectedAssignmentForHistory, setSelectedAssignmentForHistory] = useState(null);

  //   // Function to open submission history modal
  //   const handleViewSubmissions = (assignment) => {
  //     setSelectedAssignmentForHistory(assignment);
  //     setShowSubmissionHistory(true);
  //   };

  //   // Function to close submission history modal
  //   const handleCloseSubmissionHistory = () => {
  //     setShowSubmissionHistory(false);
  //     setSelectedAssignmentForHistory(null);
  //   };

  //   return (
  //     <div className="p-4 bg-white rounded-lg shadow-md">
  //       <button
  //         onClick={onBack}
  //         className="mb-6 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition ease-in-out duration-150 flex items-center"
  //       >
  //         <svg
  //           xmlns="http://www.w3.org/2000/svg"
  //           className="h-5 w-5 mr-2"
  //           viewBox="0 0 20 20"
  //           fill="currentColor"
  //         >
  //           <path
  //             fillRule="evenodd"
  //             d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
  //             clipRule="evenodd"
  //           />
  //         </svg>
  //         Back to Groups
  //       </button>
  //       <h2 className="text-2xl font-bold mb-6 text-gray-800">{group.name} - Assignments</h2>
  //       {assignments.length == 0 ? (
  //         <p className="text-gray-600">No assignments found for this group yet.</p>
  //       ) : (
  //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  //           {assignments.map((assignment) => (
  //             <AssignedWorks
  //               key={assignment.id}
  //               assignment={assignment}
  //               onSubmit={onSubmitAssignment}
  //               onViewSubmissions={handleViewSubmissions}
  //             />
  //           ))}
  //         </div>
  //       )}

  //       {showSubmissionHistory && selectedAssignmentForHistory && (
  //         <SubmissionHistory
  //           assignment={selectedAssignmentForHistory}
  //           submissions={allSubmissions.filter(
  //             (sub) => sub.assignmentId === selectedAssignmentForHistory.id
  //           )}
  //           onClose={handleCloseSubmissionHistory}
  //         />
  //       )}
  //     </div>
  //   );
  // };

  // AssignmentItem Component: Displays details of a single assignment
  // const AssignmentItem = ({ assignment, onSubmit, onViewSubmissions }) => {
  //   const [showSubmitForm, setShowSubmitForm] = useState(false);
  //   const fileInputRef = useRef(null);

  //   // Handles file selection and triggers submission
  //   const handleFileSubmit = () => {
  //     if (fileInputRef.current && fileInputRef.current.files[0]) {
  //       onSubmit(assignment.id, fileInputRef.current.files[0]);
  //       console.log(fileInputRef.name);
  //       setShowSubmitForm(false); // Hide form after submission attempt
  //       // In a real app, you might show a success message here
  //     } else {
  //       <P>please fill the data</P>
  //       // You could display a small message box here instead of console.warn
  //     }
     
  //   };
  //   return (
  //     <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 shadow-sm flex flex-col justify-between">
  //       <div>
  //         <h3 className="text-xl font-semibold mb-2 text-gray-800">{assignment.title}</h3>
  //         <p className="text-gray-600 text-sm mb-1">
  //           <strong className="font-medium">Description:</strong> {assignment.description}
  //         </p>
  //         <p className="text-gray-600 text-sm mb-3">
  //           <strong className="font-medium">Deadline:</strong>{' '}
  //           {new Date(assignment.deadline).toLocaleDateString()}
  //         </p>
  //         <p className="mb-4">
  //           <a
  //             href={assignment.pdfUrl}
  //             target="_blank"
  //             rel="noopener noreferrer"
  //             className="text-blue-600 hover:underline text-sm flex items-center"
  //           >
  //             <svg
  //               xmlns="http://www.w3.org/2000/svg"
  //               className="h-4 w-4 mr-1"
  //               viewBox="0 0 20 20"
  //               fill="currentColor"
  //             >
  //               <path
  //                 fillRule="evenodd"
  //                 d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V7.414L10.586 4H6z"
  //                 clipRule="evenodd"
  //               />
  //             </svg>
  //             View Assignment PDF
  //           </a>
  //         </p>
  //       </div>

  //       <div className="flex flex-col space-y-2 mt-4">
  //         <button
  //           onClick={() => setShowSubmitForm(!showSubmitForm)}
  //           className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition ease-in-out duration-150"
  //         >
  //           {showSubmitForm ? 'Cancel Submission' : 'Submit Task'}
  //         </button>
  //         <button
  //           onClick={() => onViewSubmissions(assignment)}
  //           className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition ease-in-out duration-150"
  //         >
  //           View Submissions
  //         </button>
  //       </div>

  //       {showSubmitForm && (
  //         <div className="mt-4 pt-4 border-t border-gray-200 flex flex-col space-y-3">
  //           <p>Iteration Type</p>
  //         <select value="select" 
  //         className='type outline-1 hover:outline-blue-200 bg-gray-300' 
  //         id='typw' >
  //           <option value="PRE">PRE</option>
  //              <option value="PRE">MID</option>
  //              <option value="PRE">Final</option>
  //         </select>
  //           <h4 className="text-md font-semibold text-gray-700">Upload your task file:</h4>
  //           <input
  //             type="file"
  //             ref={fileInputRef}
  //             className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
  //           />
  //           <button
  //             onClick={handleFileSubmit}
  //             className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition ease-in-out duration-150"
  //           >
  //             Upload & Submit
  //           </button>
  //         </div>
  //       )}
  //     </div>
  //   );
  // };


//  <AssignedWorks />

  // SubmissionHistory Component: Displays a modal with submission iterations
 
  // const SubmissionHistory = ({ assignment, submissions, onClose }) => {
  //   // Filter submissions relevant to the specific assignment and sort by iteration
  //   const assignmentSubmissions = assignment.iterations;
  //   console.log("this is checking all iteration ",assignmentSubmissions);
  //     // .filter((sub) => sub.assignmentId === assignment.id)
  //     // .sort((a, b) => a.iteration - b.iteration);

  //   return (
  //     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
  //       <div className="bg-white rounded-lg p-8 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
  //         <h3 className="text-2xl font-bold mb-6 text-gray-800">
  //           Submission History for: <span className="text-blue-600">{assignment.name}</span>
  //         </h3>

  //         {assignmentSubmissions.length === 0 ? (
  //           <p className="text-gray-600">No submissions found for this assignment yet.</p>
  //         ) : (
  //           <ul className="space-y-4">
  //             {assignmentSubmissions.map((sub) => (
  //               <li key={sub.id} className="bg-gray-50 border border-gray-200 rounded-md p-4 shadow-sm">
  //                 <h4 className="text-lg font-semibold mb-2 text-gray-700">Iteration {sub.iterationType}</h4>
  //                 <p className="text-sm text-gray-600 mb-1">
  //                   <strong>Submitted On:</strong>{' '}
  //                   {new Date(sub.dateSubmitted).toLocaleString()}
  //                 </p>
  //                 <p className="text-sm mb-2">
  //                   <strong>Status:</strong>{' '}
  //                   <span
  //                     className={`font-bold ${
  //                       sub.status === 'Accepted'
  //                         ? 'text-green-600'
  //                         : sub.status === 'Rejected'
  //                         ? 'text-red-600'
  //                         : 'text-yellow-600'
  //                     }`}
  //                   >
  //                     {sub.status}
  //                   </span>
  //                   <p>
                     
  //                   </p>
  //                 </p>
  //                 {sub.feedback && (
  //                   <p className="text-sm text-gray-700 mb-2">
  //                     <strong>Feedback:</strong> {sub.feedback}
  //                   </p>
  //                 )}
  //                 {sub.documentName && (
  //                   <p>
  //                     <a
  //                      href={`http://localhost:8080/api/files/${sub.documentName}`}
  //                       target="_blank"
  //                       rel="noopener noreferrer"
  //                       className="text-blue-600 hover:underline text-sm flex items-center"
  //                     >
  //                       <svg
  //                         xmlns="http://www.w3.org/2000/svg"
  //                         className="h-4 w-4 mr-1"
  //                         viewBox="0 0 20 20"
  //                         fill="currentColor"
  //                       >
  //                         <path
  //                           fillRule="evenodd"
  //                           d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
  //                           clipRule="evenodd"
  //                         />
  //                       </svg>
  //                       Download Submitted File
  //                     </a>
  //                   </p>
  //                 )}
  //               </li>
  //             ))}
  //           </ul>
  //         )}
  //         <button
  //           onClick={onClose}
  //           className="absolute top-4 right-4 px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition ease-in-out duration-150"
  //         >
  //           Close
  //         </button>
  //       </div>
  //     </div>
  //   );
  // };
  


  return (
    // Tailwind CSS for basic styling and responsiveness
    <div className="min-h-screen bg-gray-100 font-sans antialiased">
      {/* Tailwind CSS CDN for quick setup */}
      <script src="https://cdn.tailwindcss.com"></script>
      {/* Google Fonts - Inter */}
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>
        {`
          body {
            font-family: 'Inter', sans-serif;
          }
        `}
      </style>
      <Navbar studentName={student.name} />
      <div className="max-w-6xl mx-auto p-4 flex flex-col lg:flex-row min-h-[80vh] mt-4">
        {/* Sidebar */}

        {/* <div className="w-full lg:w-64 bg-gray-800 text-white p-6 rounded-t-xl lg:rounded-l-xl lg:rounded-tr-none flex flex-col shadow-lg mb-4 lg:mb-0">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold">Student Portal</h2>
            <p className="text-sm text-gray-400">Navigation</p>
          </div>
          <nav className="flex-grow">
            <ul className="space-y-3">
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
        </div> */}
        <Sidebar setActiveTab={setActiveTab} activeTab={activeTab}  setCurrentView={setCurrentView} setSelectedGroup={setSelectedGroup}/>

        {/* Main Content Area */}
        <div className="flex-grow p-6 lg:p-8 bg-white rounded-b-xl lg:rounded-r-xl lg:rounded-bl-none shadow-lg">
          {/* Dashboard Summary */}
          <SummeryBoxs  submissions={submissions} assignments={assignments} />
         

          {/* Dynamic Content based on activeTab */}
          {activeTab === 'myDetails' && <MyDetails student={student} />}
          {activeTab === 'assignedWork' && (
            currentView === 'groupList' ? (
              <Groups groups={groups} onViewGroup={handleViewGroup} />
            ) : (
             <GroupDetail
           group={selectedGroup}
           assignments={selectedGroup.assignments}   // ✅ directly from group
            onBack={handleBackToGroups}
            onSubmitAssignment={handleSubmitAssignment}
            allSubmissions={submissions}
/>
            )
          )}
          {activeTab === 'submittedWorks' && (
            <SubmittedWorks allAssignments={assignments} allSubmissions={submissions} />
          )}
          {activeTab === 'chats' && <ChatPlaceholder />}
        </div>
      </div>
    </div>
  );
};

export default App;
