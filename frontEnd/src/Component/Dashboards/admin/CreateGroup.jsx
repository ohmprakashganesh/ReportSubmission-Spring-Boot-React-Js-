import React, { useEffect, useState } from 'react'
import { getAllUsers, getGroups, getStudents, getSupervisors } from '../../services/AdminSer';

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

const CreateGroup = () => {
    
    const [supervisors, setSupervisors]=useState([]);
       const [group, setGroup] = useState([]);

  const [students, setStudents]=useState([]);

  // Form states for creating new groups
  const [groupName, setGroupName] = useState('');
  const [newSelectedStudents, setNewSelectedStudents] = useState([]); // Use different name to avoid conflict
  const [newSelectedSupervisor, setNewSelectedSupervisor] = useState(''); // Use different name


  useEffect(() => {
  const fetchStudents = async () => {
    try {
      const response = await getStudents();
      setStudents(response);
    } catch (error) {
      console.log('Error fetching students:', error);
    }
  };

  const fetchSupervisors = async () => {
    try {
      const response = await getSupervisors();
      setSupervisors(response);
    } catch (error) {
      console.log('Error fetching supervisors:', error);
    }
  };



  fetchStudents();

  fetchSupervisors();
}, []);
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

                  {students.map((val, ind)=>(
                    <option key={ind} value={ind} >
                        {val.name}
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

              {supervisors.map((val, ind)=>(
                   <option key={ind} value={ind}>
                  {val.name}
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
     
  )
}

export default CreateGroup
  