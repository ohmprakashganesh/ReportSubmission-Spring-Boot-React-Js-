import React from 'react'

 const SubmissionHistory = ({ assignment, submissions, onClose }) => {
    // Filter submissions relevant to the specific assignment and sort by iteration
    const assignmentSubmissions = assignment.iterations;
    console.log("this is checking all iteration ",assignmentSubmissions);
      // .filter((sub) => sub.assignmentId === assignment.id)
      // .sort((a, b) => a.iteration - b.iteration);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
        <div className="bg-white rounded-lg p-8 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">
            Submission History for: <span className="text-blue-600">{assignment.name}</span>
          </h3>

          {assignmentSubmissions.length === 0 ? (
            <p className="text-gray-600">No submissions found for this assignment yet.</p>
          ) : (
            <ul className="space-y-4">
              {assignmentSubmissions.map((sub) => (
                <li key={sub.id} className="bg-gray-50 border border-gray-200 rounded-md p-4 shadow-sm">
                  <h4 className="text-lg font-semibold mb-2 text-gray-700">Iteration {sub.iterationType}</h4>
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>Submitted On:</strong>{' '}
                    {new Date(sub.dateSubmitted).toLocaleString()}
                  </p>
                  <p className="text-sm mb-2">
                    <strong>Status:</strong>{' '}
                    <span
                      className={`font-bold ${
                        sub.status === 'Accepted'
                          ? 'text-green-600'
                          : sub.status === 'Rejected'
                          ? 'text-red-600'
                          : 'text-yellow-600'
                      }`}
                    >
                      {sub.status}
                    </span>
                    <p>
                     
                    </p>
                  </p>
                  {sub.feedback && (
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Feedback:</strong> {sub.feedback}
                    </p>
                  )}
                  {sub.documentName && (
                    <p>
                      <a
                       href={`http://localhost:8080/api/files/${sub.documentName}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm flex items-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Download Submitted File
                      </a>
                    </p>
                  )}
                </li>
              ))}
            </ul>
          )}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition ease-in-out duration-150"
          >
            Close
          </button>
        </div>
      </div>
    );
  };
  export default SubmissionHistory;
