import React, { useState } from 'react';
import axios from 'axios'; // Make sure axios is installed

const Submissions = ({ setSubmissionShow, assignment }) => {
  const [feedback, setFeedback] = useState('');

  const handleFeedbackSubmit = async (e, iterationId) => {
    e.preventDefault(); // Prevent page reload

    if (!feedback.trim()) return; // Don't submit empty feedback

    try {
      // Example API call, adjust URL and payload according to your backend
      await axios.post(`http://localhost:8080/api/feedback/${iterationId}`, {
        feedback,
      });

      alert('Feedback submitted successfully!');
      setFeedback(''); // Clear the input
      // Optionally, refresh the assignment data to show the new feedback
    } catch (error) {
      console.error(error);
      alert('Failed to submit feedback.');
    }
  };

  return (
    <div className="fixed inset-0 h-screen bg-gray-300 bg-opacity-50 flex justify-center items-center z-30 p-4 mt-10">
      <div className="bg-red-100 rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] relative flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-red-200 z-10 px-6 py-4 border-b border-gray-400 flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-800">
            Submission History for: <span className="text-blue-600">{assignment.title}</span>
          </h3>
          <button
            onClick={() => setSubmissionShow(false)}
            className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition ease-in-out duration-150"
          >
            Close
          </button>
        </div>

        {/* Iterations */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {assignment.iterations?.length === 0 ? (
            <p className="text-gray-600">No submissions found for this assignment yet.</p>
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
                    <strong>Submitted On:</strong> {new Date(itr.dateSubmitted).toLocaleString()}
                  </p>
                  <p className="text-sm mb-2">
                    <strong>Status:</strong>{' '}
                    <span
                      className={`font-bold ${
                        itr.status === 'Accepted'
                          ? 'text-green-600'
                          : itr.status === 'Rejected'
                          ? 'text-red-600'
                          : 'text-yellow-600'
                      }`}
                    >
                      {itr.status}
                    </span>
                  </p>

                  {itr.documentName && (
                    <p>
                      <a
                        href={`http://localhost:8080/api/files/${itr.documentName}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm flex items-center"
                      >
                        Download Submitted File
                      </a>
                    </p>
                  )}

                  {itr.feedback ? (
                    <p className="text-sm bg-gray-400 text-gray-700 mb-2">
                      <strong>Feedback:</strong> {itr.feedback}
                    </p>
                  ) : (
                    <form onSubmit={(e) => handleFeedbackSubmit(e, itr.id)}>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Feedback</label>
                        <input
                          type="text"
                          value={feedback}
                          onChange={(e) => setFeedback(e.target.value)}
                          className="mt-1 hover:h-8 hover:bg-gray-400 hover:text-xl block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                          required
                        />
                        <button
                          type="submit"
                          className="mt-2 rounded-xl w-44 h-8 bg-blue-400 text-black text-xl"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
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
