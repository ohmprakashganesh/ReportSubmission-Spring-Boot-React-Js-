
// export default Submissions;
import React from 'react';
import { httpClient } from '../../services/Config/Config';

const Submissions = ({ assignment, setShowSubmissions }) => {
  console.log("this submissions ", assignment.iterations);

   const handleFeedbackDelete = async (id) => {
  
      try {
    const response = await httpClient.delete(`/api/feedbacks/${id}`);
  
    console.log("Feedback deleted:", response.data);
    alert("deleted successfully");
    // Do whatever you want after delete — e.g. refresh list
  } catch (error) {
    console.error("Delete failed:", error);
  }
    };

  return (
    <div className="fixed inset-0  z-50 flex items-center  justify-center bg-black bg-opacity-40 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[100vh] flex flex-col overflow-hidden">

        {/* Header */}
        <div className="sticky top-0 bg-blue-600 px-6 py-4 flex justify-between items-center">
          <h3 className="text-xl md:text-2xl font-semibold text-white">
            Submission History for{" "}
            <span className="font-bold">{assignment.title}</span>
          </h3>
          <button
            onClick={() => setShowSubmissions(false)}
            className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          >
            Close
          </button>
        </div>

        {/* Iterations (Scrollable Area) */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50 space-y-4">
          {assignment.iterations?.length === 0 ? (
            <p className="text-gray-600 text-center">
              No submissions found for this assignment yet.
            </p>
          ) : (
            <ul className="space-y-4">
              {assignment.iterations.map((itr) => (
                <>
                <li
                  key={itr.id}
                  className="bg-white border h-fit border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
                >
                  <h4 className="text-lg font-semibold mb-2 text-gray-800">
                    Iteration: {itr.iterationType}
                  </h4>

                  <p className="text-sm text-gray-600 mb-1">
                    <strong>Submitted On:</strong> {itr.createdAt}
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

                 

                  {itr.documentName && (
                    <a
                      href={`http://localhost:8080/api/iteration/${itr.documentName}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:underline text-sm mt-2"
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
                  )}

                    {/* Existing Feedback */}
                     {itr.feedback && (
                  <div>
                  <div className="mt-2 flex justify-between items-center">
                    <div className=" text-gray-800 text-sm rounded-md p-2 flex-1">
                      <strong>Feedback:</strong> {itr.feedback.comments}
                    </div>
                    <button
                      onClick={() => handleFeedbackDelete(itr.feedback.id)}
                      className="ml-3 text-red-500 hover:underline text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                    <div className=" flex justify-between text-gray-800 text-sm rounded-md p-2 flex-1">
                  
                    <button
                      className="mt-2 rounded-lg px-4 py-2 bg-green-600 text-white hover:bg-indigo-700 transition-colors"
                    >
                        <a
                      href={`http://localhost:8080/api/feedback/${itr.feedback.documentName}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white  hover:underline"
                    >
                     Download reviewed File
                    </a>
                    
                    </button>
                   
                  </div>
                  </div>
                )}
                </li>
                </>

              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Submissions;
