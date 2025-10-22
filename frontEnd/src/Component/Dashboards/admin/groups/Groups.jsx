


import React, { useState, useEffect } from 'react';
import CreateGroup from './CreateGroup';
import GroupsTable from './GroupsTable';
import ReAssignGroup from './ReAssignGroup';


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

    {showReassignModal ? (
      <ReAssignGroup
        group={groupToReassign}
        onClose={closeReassignModal}
        onSave={handleSaveReassignedGroup}
        mockStudents={mockStudents}
        mockSupervisors={mockSupervisors}
      />
    ) : (
     <>
      
        {showDetailsModal ? (
          <GroupDetailsModal group={selectedGroup} onClose={closeDetailsModal} />
        ): <>
          <CreateGroup />
          <GroupsTable />
        </>}
      </>
    )}
  </section>
);
}
export default  Groups;

