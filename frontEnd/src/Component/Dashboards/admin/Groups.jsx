// // import React, { useState } from 'react';
// // import GroupTable from './GroupTable';

// // const Groups = ({ showAssignUsersToGroupModal }) => {
// //   const [data, setData] = useState([
// //     {
// //       groupName: "Group Alpha",
// //       project: "AI Research Projects",
// //       members: "5 Students, 1 Professor"
// //     },
// //     {
// //       groupName: "Group Beta",
// //       project: "Data Science Initiatives",
// //       members: "8 Students, 2 Professors"
// //     }
// //   ]);

// //   const [groupName, setGroupName] = useState('');
// //   const [selectedStudents, setSelectedStudents] = useState([]);
// //   const [selectedSupervisor, setSelectedSupervisor] = useState('');

// //   const handleStudentChange = (e) => {
// //     const selected = Array.from(e.target.selectedOptions, option => option.value);
// //     setSelectedStudents(selected);
// //     console.log(selectedStudents);
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();

// //     if (!groupName || selectedStudents.length === 0 || !selectedSupervisor) return;

// //     const newEntry = {
// //       groupName,
// //       project: "New Project",
// //       members: `${selectedStudents.length} Students, 1 Professor`
// //     };

// //     setData([...data, newEntry]);

// //     // Reset form
// //     setGroupName('');
// //     setSelectedStudents([]);
// //     setSelectedSupervisor('');
// //   };
  

// //   return (
// //     <section id="groups" className="section-content p-6">
// //       <h1 className="text-4xl font-extrabold text-gray-800 mb-8">Manage Groups</h1>

// //       {/* Create New Group Form */}
// //       <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mb-8">
// //         <h2 className="text-2xl font-semibold text-gray-700 mb-4">Create New Student Group</h2>
// //         <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //           <div>
// //             <label htmlFor="groupName" className="block text-sm font-medium text-gray-700 mb-1">Group Name</label>
// //             <input
// //               type="text"
// //               id="groupName"
// //               value={groupName}
// //               onChange={(e) => setGroupName(e.target.value)}
// //               className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
// //               placeholder="e.g., AI Research Team"
// //               required
// //             />
// //           </div>

// //           <div>
// //             <label htmlFor="studentSelect" className="block text-sm font-medium text-gray-700 mb-1">Select Students</label>
// //             <select
// //               id="studentSelect"
// //               multiple
// //               value={selectedStudents}
// //               onChange={handleStudentChange}
// //               className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-32"
// //               required
// //             >
// //               <option value="101">John Doe (ID: 101)</option>
// //               <option value="102">Jane Smith (ID: 102)</option>
// //               <option value="103">Peter Jones (ID: 103)</option>
// //               <option value="104">Alice Brown (ID: 104)</option>
// //               <option value="105">Bob White (ID: 105)</option>
// //               <option value="106">Charlie Green (ID: 106)</option>
// //             </select>
// //           </div>

// //           <div>
// //             <label htmlFor="supervisorSelect" className="block text-sm font-medium text-gray-700 mb-1">Select Supervisor</label>
// //             <select
// //               id="supervisorSelect"
// //               value={selectedSupervisor}
// //               onChange={(e) => setSelectedSupervisor(e.target.value)}
// //               className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
// //               required
// //             >
// //               <option value="" disabled>Select a supervisor</option>
// //               <option value="201">Dr. Emily Clark (ID: 201)</option>
// //               <option value="202">Prof. David Lee (ID: 202)</option>
// //               <option value="203">Dr. Sarah Kim (ID: 203)</option>
// //             </select>
// //           </div>

// //           <div className="md:col-span-2 flex justify-end">
// //             <button type="submit" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
// //               Create Group
// //             </button>
// //           </div>
// //         </form>
// //       </div>

// //       {/* Group List Table (dynamic) */}
// //       <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mb-8">
// //         <h2 className="text-2xl font-semibold text-gray-700 mb-4">All Groups</h2>
// //         <div className="overflow-x-auto">
// //           <table className="min-w-full divide-y divide-gray-200">
// //             <thead className="bg-gray-50">
// //               <tr>
// //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Group Name</th>
// //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
// //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Members</th>
// //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
// //               </tr>
// //             </thead>
// //             <tbody className="bg-white divide-y divide-gray-200">
// //               {data.map((group, index) => (
// //                 <tr key={index}>
// //                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{group.groupName}</td>
// //                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{group.project}</td>
// //                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{group.members}</td>
// //                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
// //                     <button className="text-indigo-600 hover:text-indigo-900 mr-3" onClick={() => showAssignUsersToGroupModal(group.groupName)}>Res</button>
// //                     <button className="text-indigo-600 hover:text-indigo-900 mr-3"><GroupTable /> om</button>
// //                     <button className="text-red-600 hover:text-red-900">Delete</button>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default Groups;

// import React, { useState } from 'react';

// // Mock data that the table will display.
// // In a real application, this data would be fetched from an API
// // and passed as a prop to this component.
// const mockGroupData = [
//   {
//     id: 1,
//     groupName: "AI Research Team",
//     projectName: "Advanced Neural Networks for Image Recognition",
//     members: "John Doe, Jane Smith, Peter Jones",
//     stdIds: [101, 102, 103],
//     supervisorId: 201,
//     supervisorName: "Dr. Emily Clark",
//     submissionDate: "2025-12-15",
//     feedback: "Excellent progress on model accuracy. Consider exploring real-time inference.",
//     status: "In Progress",
//   },
//   {
//     id: 2,
//     groupName: "Robotics Club Innovators",
//     projectName: "Autonomous Navigation System for Drones",
//     members: "Alice Brown, Bob White",
//     stdIds: [104, 105],
//     supervisorId: 202,
//     supervisorName: "Prof. David Lee",
//     submissionDate: "2026-01-20",
//     feedback: "Solid foundational work. Next, integrate obstacle avoidance sensors.",
//     status: "Planning Phase",
//   },
//   {
//     id: 3,
//     groupName: "Data Science Enthusiasts",
//     projectName: "Predictive Analytics for Customer Churn",
//     members: "Charlie Green",
//     stdIds: [106],
//     supervisorId: 203,
//     supervisorName: "Dr. Sarah Kim",
//     submissionDate: "2025-11-01",
//     feedback: "Comprehensive data analysis. Ensure model interpretability is clear.",
//     status: "Completed",
//   }
// ];

// // GroupDetailsModal Component (Included for completeness if "View" is clicked)
// // In a real application, this might be a separate component file.
// const GroupDetailsModal = ({ group, onClose }) => {
//   if (!group) {
//     return null; // Don't render if no group is selected
//   }

//   return (
//     <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50 overflow-auto">
//       <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl transform transition-all duration-300 scale-100 opacity-100">
//         <div className="flex justify-between items-center mb-6 border-b pb-4">
//           <h2 className="text-3xl font-bold text-gray-800">Group Details: {group.groupName}</h2>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700 text-3xl font-semibold leading-none"
//             aria-label="Close"
//           >
//             &times;
//           </button>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 text-gray-700">
//           <div className="flex flex-col">
//             <span className="text-sm font-semibold text-gray-600">Group Name:</span>
//             <span className="text-lg font-medium">{group.groupName}</span>
//           </div>
//           <div className="flex flex-col">
//             <span className="text-sm font-semibold text-gray-600">Supervisor:</span>
//             <span className="text-lg font-medium">{group.supervisorName} (ID: {group.supervisorId})</span>
//           </div>
//           <div className="flex flex-col md:col-span-2">
//             <span className="text-sm font-semibold text-gray-600">Project/Title:</span>
//             <span className="text-lg font-medium">{group.projectName}</span>
//           </div>
//           <div className="flex flex-col">
//             <span className="text-sm font-semibold text-gray-600">Submission Date:</span>
//             <span className="text-lg font-medium">{group.submissionDate}</span>
//           </div>
//           <div className="flex flex-col">
//             <span className="text-sm font-semibold text-gray-600">Status:</span>
//             <span className={`text-lg font-medium ${
//               group.status === 'Completed' ? 'text-green-600' :
//               group.status === 'In Progress' ? 'text-blue-600' :
//               'text-yellow-600'
//             }`}>{group.status}</span>
//           </div>
//           <div className="flex flex-col md:col-span-2">
//             <span className="text-sm font-semibold text-gray-600">Feedback:</span>
//             <p className="text-base leading-relaxed bg-gray-50 p-3 rounded-md border border-gray-200 mt-1">
//               {group.feedback || "No feedback available yet."}
//             </p>
//           </div>
//           <div className="flex flex-col md:col-span-2">
//             <span className="text-sm font-semibold text-gray-600">Members:</span>
//             <p className="text-base leading-relaxed bg-gray-50 p-3 rounded-md border border-gray-200 mt-1">
//               {group.members || "No members listed."}
//             </p>
//           </div>
//         </div>

//         <div className="mt-8 flex justify-end">
//           <button
//             onClick={onClose}
//             className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };


// // GroupTableDisplay Component: Renders only the table of groups.
// const Groups = () => {
//   const [data, setData] = useState(mockGroupData);
//   const [selectedGroup, setSelectedGroup] = useState(null);
//   const [showDetailsModal, setShowDetailsModal] = useState(false);

//   // Function to handle the "View" button click
//   const handleViewClick = (group) => {
//     setSelectedGroup(group);
//     setShowDetailsModal(true);
//   };

//   // Function to close the details modal
//   const closeDetailsModal = () => {
//     setShowDetailsModal(false);
//     setSelectedGroup(null); // Clear selected group when closing
//   };

//   // Placeholder for re-assign modal (not implemented in this code)
//   const showAssignUsersToGroupModal = (groupName) => {
//     alert(`Re-assign users for group: ${groupName} (Functionality not implemented yet)`);
//   };

//   // Placeholder for delete functionality (not implemented in this code)
//   const handleDeleteGroup = (groupName) => {
//     if (window.confirm(`Are you sure you want to delete group: ${groupName}?`)) {
//       setData(data.filter(group => group.groupName !== groupName));
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-8 font-sans">
//       <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Student Groups List</h1>

//       <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mb-8">
//         <h2 className="text-2xl font-semibold text-gray-700 mb-4">All Groups</h2>
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Group Name</th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project Title</th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Members</th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {data.map((group) => (
//                 <tr key={group.id}>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{group.groupName}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{group.projectName}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{group.members}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                     <button className="text-indigo-600 hover:text-indigo-900 mr-3 px-2 py-1 rounded-md hover:bg-indigo-50 transition-colors duration-200" onClick={() => showAssignUsersToGroupModal(group.groupName)}>Re-Assign</button>
//                     <button className="text-indigo-600 hover:text-indigo-900 mr-3 px-2 py-1 rounded-md hover:bg-indigo-50 transition-colors duration-200" onClick={() => handleViewClick(group)}>View</button>
//                     <button className="text-red-600 hover:text-red-900 px-2 py-1 rounded-md hover:bg-red-50 transition-colors duration-200" onClick={() => handleDeleteGroup(group.groupName)}>Delete</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Render the GroupDetailsModal if showDetailsModal is true */}
//       {showDetailsModal && (
//         <GroupDetailsModal group={selectedGroup} onClose={closeDetailsModal} />
//       )}
//     </div>
//   );
// };

// export default Groups;










import React, { useState, useEffect } from 'react';

// Mock data for students and supervisors for the select dropdowns
const mockStudents = [
  { id: 101, name: "John Doe" },
  { id: 102, name: "Jane Smith" },
  { id: 103, name: "Peter Jones" },
  { id: 104, name: "Alice Brown" },
  { id: 105, name: "Bob White" },
  { id: 106, name: "Charlie Green" },
  { id: 107, name: "David Lee" },
  { id: 108, name: "Eve White" },
];

const mockSupervisors = [
  { id: 201, name: "Dr. Emily Clark" },
  { id: 202, name: "Prof. David Lee" },
  { id: 203, name: "Dr. Sarah Kim" },
  { id: 204, name: "Dr. Alex Johnson" },
];

// Mock data for groups, including full details for modals
const initialGroupData = [
  {
    id: 1,
    groupName: "AI Research Team",
    projectName: "Advanced Neural Networks for Image Recognition",
    members: "John Doe, Jane Smith, Peter Jones", // Display string for table
    stdIds: [101, 102, 103], // Actual IDs for re-assign
    supervisorId: 201,
    supervisorName: "Dr. Emily Clark",
    submissionDate: "2025-12-15",
    feedback: "Excellent progress on model accuracy. Consider exploring real-time inference.",
    status: "In Progress",
  },
  {
    id: 2,
    groupName: "Robotics Club Innovators",
    projectName: "Autonomous Navigation System for Drones",
    members: "Alice Brown, Bob White",
    stdIds: [104, 105],
    supervisorId: 202,
    supervisorName: "Prof. David Lee",
    submissionDate: "2026-01-20",
    feedback: "Solid foundational work. Next, integrate obstacle avoidance sensors.",
    status: "Planning Phase",
  },
  {
    id: 3,
    groupName: "Data Science Enthusiasts",
    projectName: "Predictive Analytics for Customer Churn",
    members: "Charlie Green",
    stdIds: [106],
    supervisorId: 203,
    supervisorName: "Dr. Sarah Kim",
    submissionDate: "2025-11-01",
    feedback: "Comprehensive data analysis. Ensure model interpretability is clear.",
    status: "Completed",
  }
];

// GroupDetailsModal Component: Displays detailed information about a selected group.
const GroupDetailsModal = ({ group, onClose }) => {
  if (!group) {
    return null; // Don't render if no group is selected
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50 overflow-auto">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl transform transition-all duration-300 scale-100 opacity-100">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-3xl font-bold text-gray-800">Group Details: {group.groupName}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-3xl font-semibold leading-none"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 text-gray-700">
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-600">Group Name:</span>
            <span className="text-lg font-medium">{group.groupName}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-600">Supervisor:</span>
            <span className="text-lg font-medium">{group.supervisorName} (ID: {group.supervisorId})</span>
          </div>
          <div className="flex flex-col md:col-span-2">
            <span className="text-sm font-semibold text-gray-600">Project/Title:</span>
            <span className="text-lg font-medium">{group.projectName}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-600">Submission Date:</span>
            <span className="text-lg font-medium">{group.submissionDate}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-600">Status:</span>
            <span className={`text-lg font-medium ${
              group.status === 'Completed' ? 'text-green-600' :
              group.status === 'In Progress' ? 'text-blue-600' :
              'text-yellow-600'
            }`}>{group.status}</span>
          </div>
          <div className="flex flex-col md:col-span-2">
            <span className="text-sm font-semibold text-gray-600">Feedback:</span>
            <p className="text-base leading-relaxed bg-gray-50 p-3 rounded-md border border-gray-200 mt-1">
              {group.feedback || "No feedback available yet."}
            </p>
          </div>
          <div className="flex flex-col md:col-span-2">
            <span className="text-sm font-semibold text-gray-600">Members:</span>
            <p className="text-base leading-relaxed bg-gray-50 p-3 rounded-md border border-gray-200 mt-1">
              {group.members || "No members listed."}
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// ReassignGroupModal Component: Allows re-assigning students and supervisor for a group.
const ReassignGroupModal = ({ group, onClose, onSave }) => {
  // Convert IDs to strings for select value, as HTML select values are strings
  const [selectedStudents, setSelectedStudents] = useState(group.stdIds.map(String));
  const [selectedSupervisor, setSelectedSupervisor] = useState(String(group.supervisorId));

  // Effect to update internal state if the group prop changes (e.g., when opening for a different group)
  useEffect(() => {
    setSelectedStudents(group.stdIds.map(String));
    setSelectedSupervisor(String(group.supervisorId));
  }, [group]);

  const handleStudentChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions);
    const values = selectedOptions.map(option => option.value);
    setSelectedStudents(values);
  };

  const handleSupervisorChange = (e) => {
    setSelectedSupervisor(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedStudents.length === 0 || !selectedSupervisor) {
      alert("Please select at least one student and a supervisor.");
      return;
    }

    const updatedStdIds = selectedStudents.map(id => parseInt(id, 10));
    const updatedSupervisorId = parseInt(selectedSupervisor, 10);

    const supervisor = mockSupervisors.find(s => s.id === updatedSupervisorId);
    const updatedSupervisorName = supervisor ? supervisor.name : "Unknown Supervisor";

    const studentNames = updatedStdIds.map(id => {
      const student = mockStudents.find(s => s.id === id);
      return student ? student.name : `ID: ${id}`;
    }).join(', ');

    const updatedGroup = {
      ...group,
      stdIds: updatedStdIds,
      supervisorId: updatedSupervisorId,
      supervisorName: updatedSupervisorName,
      members: studentNames, // Update display string for members
    };

    onSave(updatedGroup); // Call the parent's save function
    onClose(); // Close the modal
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50 overflow-auto">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl transform transition-all duration-300 scale-100 opacity-100">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-3xl font-bold text-gray-800">Re-assign Group: {group.groupName}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-3xl font-semibold leading-none"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label htmlFor="reassignStudentSelect" className="block text-sm font-medium text-gray-700 mb-1">Select Students</label>
            <select
              id="reassignStudentSelect"
              multiple
              value={selectedStudents}
              onChange={handleStudentChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-32"
              required
            >
              {mockStudents.map(student => (
                <option key={student.id} value={student.id}>
                  {student.name} (ID: {student.id})
                </option>
              ))}
            </select>
            <p className="mt-1 text-sm text-gray-500">Hold Ctrl (Windows) / Cmd (Mac) to select multiple students.</p>
          </div>

          <div className="md:col-span-2">
            <label htmlFor="reassignSupervisorSelect" className="block text-sm font-medium text-gray-700 mb-1">Select Supervisor</label>
            <select
              id="reassignSupervisorSelect"
              value={selectedSupervisor}
              onChange={handleSupervisorChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            >
              <option value="" disabled>Select a supervisor</option>
              {mockSupervisors.map(supervisor => (
                <option key={supervisor.id} value={supervisor.id}>
                  {supervisor.name} (ID: {supervisor.id})
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2 flex justify-end mt-6">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


// Groups Component: Manages group creation, list display, and modal visibility.
// This component now includes all table and modal logic internally.
const Groups = () => {
  const [data, setData] = useState(initialGroupData);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showReassignModal, setShowReassignModal] = useState(false);
  const [groupToReassign, setGroupToReassign] = useState(null);

  // Form states for creating new groups
  const [groupName, setGroupName] = useState('');
  const [newSelectedStudents, setNewSelectedStudents] = useState([]); // Use different name to avoid conflict
  const [newSelectedSupervisor, setNewSelectedSupervisor] = useState(''); // Use different name

  // Function to handle the "View" button click
  const handleViewClick = (group) => {
    setSelectedGroup(group);
    setShowDetailsModal(true);
  };

  // Function to close the details modal
  const closeDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedGroup(null);
  };

  // Function to handle the "Re-Assign" button click
  const handleReassignClick = (group) => {
    setGroupToReassign(group);
    setShowReassignModal(true);
  };

  // Function to close the re-assign modal
  const closeReassignModal = () => {
    setShowReassignModal(false);
    setGroupToReassign(null);
  };

  // Function to save re-assigned group data
  const handleSaveReassignedGroup = (updatedGroup) => {
    setData(prevData =>
      prevData.map(group => (group.id === updatedGroup.id ? updatedGroup : group))
    );
  };

  // Handle student multi-select change for new group form
  const handleNewStudentChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions);
    const values = selectedOptions.map(option => option.value);
    setNewSelectedStudents(values);
  };

  // Handle form submission for new group creation
  const handleSubmitNewGroup = (e) => {
    e.preventDefault();

    if (!groupName || newSelectedStudents.length === 0 || !newSelectedSupervisor) {
      alert("Please fill in all required fields: Group Name, Students, and Supervisor.");
      return;
    }

    // Convert selected student IDs from string to number
    const stdIdsAsNumbers = newSelectedStudents.map(id => parseInt(id, 10));
    const supervisorIdAsNumber = parseInt(newSelectedSupervisor, 10);

    // Get supervisor name for display
    const supervisor = mockSupervisors.find(s => s.id === supervisorIdAsNumber);
    const supervisorName = supervisor ? supervisor.name : "Unknown Supervisor";

    // Get student names for display
    const studentNames = stdIdsAsNumbers.map(id => {
      const student = mockStudents.find(s => s.id === id);
      return student ? student.name : `ID: ${id}`;
    }).join(', ');

    const newEntry = {
      id: data.length > 0 ? Math.max(...data.map(g => g.id)) + 1 : 1, // Simple ID generation
      groupName,
      stdIds: stdIdsAsNumbers,
      supervisorId: supervisorIdAsNumber,
      supervisorName: supervisorName,
      projectName: "New Project (To be defined)", // Placeholder
      submissionDate: "N/A", // Placeholder
      feedback: "No feedback yet.", // Placeholder
      status: "Planning Phase", // Placeholder
      members: studentNames // Display string for members
    };

    setData([...data, newEntry]);

    // Reset form
    setGroupName('');
    setNewSelectedStudents([]);
    setNewSelectedSupervisor('');
  };

  // Handle group deletion
  const handleDeleteGroup = (groupId, groupName) => {
    if (window.confirm(`Are you sure you want to delete group: ${groupName}?`)) {
      setData(data.filter(group => group.id !== groupId));
    }
  };

  return (
    <section id="groups" className="section-content p-6">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Manage Student Groups</h1>

      {/* Create New Group Form */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Create New Student Group</h2>
        <form onSubmit={handleSubmitNewGroup} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="groupName" className="block text-sm font-medium text-gray-700 mb-1">Group Name</label>
            <input
              type="text"
              id="groupName"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="e.g., AI Research Team"
              required
            />
          </div>

          <div>
            <label htmlFor="studentSelect" className="block text-sm font-medium text-gray-700 mb-1">Select Students</label>
            <select
              id="studentSelect"
              multiple
              value={newSelectedStudents}
              onChange={handleNewStudentChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-32"
              required
            >
              {mockStudents.map(student => (
                <option key={student.id} value={student.id}>
                  {student.name} (ID: {student.id})
                </option>
              ))}
            </select>
            <p className="mt-1 text-sm text-gray-500">Hold Ctrl (Windows) / Cmd (Mac) to select multiple students.</p>
          </div>

          <div>
            <label htmlFor="supervisorSelect" className="block text-sm font-medium text-gray-700 mb-1">Select Supervisor</label>
            <select
              id="supervisorSelect"
              value={newSelectedSupervisor}
              onChange={(e) => setNewSelectedSupervisor(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            >
              <option value="" disabled>Select a supervisor</option>
              {mockSupervisors.map(supervisor => (
                <option key={supervisor.id} value={supervisor.id}>
                  {supervisor.name} (ID: {supervisor.id})
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2 flex justify-end">
            <button type="submit" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
              Create Group
            </button>
          </div>
        </form>
      </div>

      {/* Group List Table */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">All Groups</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Group Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project Title</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Members</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((group) => (
                <tr key={group.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{group.groupName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{group.projectName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{group.members}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-3 px-2 py-1 rounded-md hover:bg-indigo-50 transition-colors duration-200" onClick={() => handleReassignClick(group)}>Re-Assign</button>
                    <button className="text-indigo-600 hover:text-indigo-900 mr-3 px-2 py-1 rounded-md hover:bg-indigo-50 transition-colors duration-200" onClick={() => handleViewClick(group)}>View</button>
                    <button className="text-red-600 hover:text-red-900 px-2 py-1 rounded-md hover:bg-red-50 transition-colors duration-200" onClick={() => handleDeleteGroup(group.id, group.groupName)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Render the GroupDetailsModal if showDetailsModal is true */}
      {showDetailsModal && (
        <GroupDetailsModal group={selectedGroup} onClose={closeDetailsModal} />
      )}

      {/* Render the ReassignGroupModal if showReassignModal is true */}
      {showReassignModal && (
        <ReassignGroupModal
          group={groupToReassign}
          onClose={closeReassignModal}
          onSave={handleSaveReassignedGroup}
        />
      )}
    </section>
  );
};

export default  Groups;

