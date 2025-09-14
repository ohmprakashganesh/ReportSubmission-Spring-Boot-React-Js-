import React from 'react'

const Submissions = ({ assignment, setShowSubmissions }) => {
  console.log("this submissions ", assignment.iterations);

  return (
    <div className="fixed inset-0 h-screen bg-gray-300 bg-opacity-50 flex justify-center items-center z-30 p-4">
      <div className="bg-red-100 rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] relative flex flex-col">
        
        {/* Header (fixed at top inside modal) */}
        <div className="sticky top-0 bg-red-200 z-10 px-6 py-4 border-b border-gray-400 flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-800">
            Submission History for:{" "}
            <span className="text-blue-600">{assignment.title}</span>
          </h3>
          <button
            onClick={() => setShowSubmissions(false)}
            className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition ease-in-out duration-150"
          >
            Close
          </button>
        </div>

        {/* Iterations (scrollable) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {assignment.iterations?.length === 0 ? (
            <p className="text-gray-600">
              No submissions found for this assignment yet.
            </p>
          ) : (
            <ul className="space-y-4">
              {assignment.iterations.map((itr) => (
                <li
                  key={itr.id}
                  className="bg-gray-50 border border-gray-500 rounded-md p-4 shadow-sm"
                >
                  <h4 className="text-lg font-semibold mb-2 text-gray-700">
                    Iteration {itr.iterationType}
                  </h4>
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>Submitted On:</strong>{itr.createdAt}
                    
                  </p>
                  <p className="text-sm mb-2">
                    <strong>Status:</strong>{" "}
                    <span
                      className={`font-bold ${
                        itr.status === "Accepted"
                          ? "text-green-600"
                          : itr.status === "Rejected"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {itr.status}
                    </span>
                  </p>

                  {itr.feedback ? (
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Feedback:</strong> {itr.feedback.comments}
                    </p>
                  ):("NO Feedback Available")}

                  {itr.documentName && (
                    <p>
                      <a
                        href={`http://localhost:8080/api/files/${itr.documentName}`}
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
        </div>
      </div>
    </div>
  );
};

export default Submissions;
