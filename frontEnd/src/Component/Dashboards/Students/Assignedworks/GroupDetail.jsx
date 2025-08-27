import React, { useState } from 'react'
import AssignedWorks from './AssignedWorks';
import SubmissionHistory from './SubmissionHistory';


    const GroupDetail = ({ group, assignments, onBack, onSubmitAssignment, allSubmissions }) => {
      const [showSubmissionHistory, setShowSubmissionHistory] = useState(false);
      const [selectedAssignmentForHistory, setSelectedAssignmentForHistory] = useState(null);
  
      // Function to open submission history modal
      const handleViewSubmissions = (assignment) => {
        setSelectedAssignmentForHistory(assignment);
        setShowSubmissionHistory(true);
      };
  
      // Function to close submission history modal
      const handleCloseSubmissionHistory = () => {
        setShowSubmissionHistory(false);
        setSelectedAssignmentForHistory(null);
      };
  
      return (
        <div className="p-4 bg-white rounded-lg shadow-md">
          <button
            onClick={onBack}
            className="mb-6 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition ease-in-out duration-150 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Back to Groups
          </button>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">{group.name} - Assignments</h2>
          {assignments.length == 0 ? (
            <p className="text-gray-600">No assignments found for this group yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {assignments.map((assignment) => (
               console.log(assignment.id),
                <AssignedWorks
                  key={assignment.id}
                  assignment={assignment}
                  onSubmit={onSubmitAssignment}
                  onViewSubmissions={handleViewSubmissions}
                  
                />
              ))}
         
            </div>
          )}
  
          {showSubmissionHistory && selectedAssignmentForHistory && (
            <SubmissionHistory
              assignment={selectedAssignmentForHistory}
              submissions={allSubmissions.filter(
                (sub) => sub.assignmentId === selectedAssignmentForHistory.id
              )}
              onClose={handleCloseSubmissionHistory}
            />
          )}
        </div>
      );
    };
export default GroupDetail
