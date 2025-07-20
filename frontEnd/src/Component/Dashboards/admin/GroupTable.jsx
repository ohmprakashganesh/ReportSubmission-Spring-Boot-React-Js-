import React from 'react'

const GroupTable = ({ group, onClose }) => {
 const mockGroupData = [
  {
    id: 1,
    groupName: "AI Research Team",
    stdIds: [101, 102, 103],
    supervisorId: 201,
    supervisorName: "Dr. Emily Clark", // Added for display
    projectName: "Advanced Neural Networks for Image Recognition", // Renamed from 'project' to 'projectName'
    submissionDate: "2025-12-15",
    feedback: "Excellent progress on model accuracy. Consider exploring real-time inference.",
    status: "In Progress",
    members: "John Doe, Jane Smith, Peter Jones" // Simplified for display in the table
  },
  {
    id: 2,
    groupName: "Robotics Club Innovators",
    stdIds: [104, 105],
    supervisorId: 202,
    supervisorName: "Prof. David Lee", // Added for display
    projectName: "Autonomous Navigation System for Drones",
    submissionDate: "2026-01-20",
    feedback: "Solid foundational work. Next, integrate obstacle avoidance sensors.",
    status: "Planning Phase",
    members: "Alice Brown, Bob White"
  },
  {
    id: 3,
    groupName: "Data Science Enthusiasts",
    stdIds: [106],
    supervisorId: 203,
    supervisorName: "Dr. Sarah Kim", // Added for display
    projectName: "Predictive Analytics for Customer Churn",
    submissionDate: "2025-11-01",
    feedback: "Comprehensive data analysis. Ensure model interpretability is clear.",
    status: "Completed",
    members: "Charlie Green"
  }
];

  if (!group) {
    return null;
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
export default GroupTable

