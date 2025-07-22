import React from 'react';

const sampleGroup = {
  id: 1,
  groupName: "AI Research Team",
  projectName: "Advanced Neural Networks for Image Recognition",
  submissionDate: "2025-12-15",
  feedback: "Excellent progress on model accuracy. Consider exploring real-time inference.",
  status: "In Progress",

  users: [
    { id: 101, name: "John Doe", email: "john@example.com", role: "STUDENT" },
    { id: 102, name: "Jane Smith", email: "jane@example.com", role: "STUDENT" },
    { id: 103, name: "Peter Jones", email: "peter@example.com", role: "STUDENT" },
    { id: 201, name: "Dr. Emily Clark", email: "emily@example.com", role: "SUPERVISOR" }
  ],

  assignments: [
    {
      id: 301,
      title: "CNN Model Prototype",
      description: "Initial prototype using convolutional layers",
      deadline: "2025-10-01"
    },
    {
      id: 302,
      title: "Training on Custom Dataset",
      description: "Train model on proprietary image dataset",
      deadline: "2025-11-01"
    }
  ]
};

const ViewGroup = ({group0,onClose}) => {
  const group = sampleGroup; // Simulated prop or fetched data

  const supervisor = group.users.find(u => u.role === "SUPERVISOR");
  const students = group.users.filter(u => u.role === "STUDENT");

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
            <span className="text-lg font-medium">
              {supervisor?.name} ({supervisor?.email})
            </span>
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
            <span className="text-sm font-semibold text-gray-600">Members (Students):</span>
            <ul className="list-disc pl-5 mt-1">
              {students.map(student => (
                <li key={student.id}>
                  {student.name} ({student.email})
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col md:col-span-2">
            <span className="text-sm font-semibold text-gray-600">Assignments:</span>
            <ul className="list-disc pl-5 mt-1">
              {group.assignments.map(assign => (
                <li key={assign.id}>
                  <strong>{assign.title}</strong>: {assign.description} (Due: {assign.deadline})
                </li>
              ))}
            </ul>
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

export default ViewGroup;
