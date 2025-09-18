import axios from 'axios';
import React from 'react'

const SubmissionHistory = ({ assignment, onClose }) => {
  const onDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/itr/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        alert("Item deleted successfully");
        // Optionally refresh list here
      } else {
        const error = await response.text();
        alert("Error: " + error);
      }
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  // Use assignment.iterations as the submissions
  const assignmentSubmissions = assignment.iterations || [];
  console.log("this is checking all iteration ", assignmentSubmissions);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg p-8 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
        <div className=' flex '>
          <h3 className="text-2xl w-[90%] font-bold mb-6 text-gray-800">
            Submission History for:{assignment.title}
          </h3>
          <div className='w-[10%] flex    justify-center'>
            <button
              onClick={onClose}
              className=" justify-center max-h-8 text-center font-stretch-condensed   px-8 font-extrabold py-1 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition ease-in-out duration-150"
            >
              X
            </button>
          </div>
        </div>

        {assignmentSubmissions.length === 0 ? (
          <p className="text-gray-600">
            No submissions found for this assignment yet.
          </p>
        ) : (
          <ul className="space-y-4">
            {assignmentSubmissions.map((sub) => (
              <li
                key={sub.id}
                className="bg-gray-50 border border-gray-200 rounded-md p-4 shadow-sm"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold mb-2 text-gray-700">
                      Iteration {sub.iterationType}
                    </h4>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Submitted On:</strong> {sub.createdAt}
                    </p>
                    <p className="text-sm mb-2">
                      <strong>Status:</strong>{" "}
                      <span
                        className={`font-bold ${sub.status === "Accepted"
                            ? "text-green-600"
                            : sub.status === "Rejected"
                              ? "text-red-600"
                              : "text-yellow-600"
                          }`}
                      >
                        {sub.status}
                      </span>
                    </p>
                    {sub.documentName && (
                      <p>
                        <a
                          href={`http://localhost:8080/api/iteration/${sub.documentName}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className=" bg-gray-400 w-56 text-black font-bold py-2 px-4  hover:underline text-sm flex items-center"
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
                    {sub.feedback ? (
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>Feedback:</strong>{" "}
                        <span className="text-green-700 font-bold">
                          {sub.feedback.comments}
                        </span>
                        <a
                          href={`http://localhost:8080/api/feedback/${sub.feedback.documentName}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className=" bg-gray-400 w-56 text-black font-bold py-2 px-4  hover:underline text-sm flex items-center"
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
                          </svg>Download reviewed file</a>
                      </p>

                    ) : (
                      <p>
                        <strong>Feedback:</strong>{" "}
                        <span>No comment yet</span>
                      </p>
                    )}

                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col gap-2 ml-4">

                    <button
                      onClick={() => onDelete(sub.id)}
                      className="px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        {/* 
        <button
          onClick={onClose}
          className="absolute top-4 right-4 px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition ease-in-out duration-150"
        >
          Close
        </button> */}
      </div>
    </div>
  );
};

export default SubmissionHistory;
