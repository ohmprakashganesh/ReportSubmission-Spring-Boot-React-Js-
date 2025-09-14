import React, { useState } from 'react';
import axios from 'axios'; // Make sure axios is installed
import { createFeedback } from '../../services/SuperviserSer';

// const Submissions = ({ setSubmissionShow, assignment }) => {
//   const [feedback, setFeedback] = useState('');

//   const handleFeedbackSubmit = async (e, iterationId) => {
//     e.preventDefault(); // Prevent page reload

//     if (!feedback.trim()) return; // Don't submit empty feedback

//     try {
//       // Example API call, adjust URL and payload according to your backend
//       await axios.post(`http://localhost:8080/api/feedback/${iterationId}`, {
//         feedback,
//       });

//       alert('Feedback submitted successfully!');
//       setFeedback(''); // Clear the input
//       // Optionally, refresh the assignment data to show the new feedback
//     } catch (error) {
//       console.error(error);
//       alert('Failed to submit feedback.');
//     }
//   };

//   return (
//     <div className="fixed inset-0 h-screen bg-gray-300 bg-opacity-50 flex justify-center items-center z-30 p-4 mt-10">
//       <div className="bg-red-100 rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] relative flex flex-col">
//         {/* Header */}
//         <div className="sticky top-0 bg-red-200 z-10 px-6 py-4 border-b border-gray-400 flex justify-between items-center">
//           <h3 className="text-xl font-bold text-gray-800">
//             Submission History for: <span className="text-blue-600">{assignment.title}</span>
//           </h3>
//           <button
//             onClick={() => setSubmissionShow(false)}
//             className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition ease-in-out duration-150"
//           >
//             Close
//           </button>
//         </div>

//         {/* Iterations */}
//         <div className="flex-1 overflow-y-auto p-6 space-y-4">
//           {assignment.iterations?.length === 0 ? (
//             <p className="text-gray-600">No submissions found for this assignment yet.</p>
//           ) : (
//             <ul className="space-y-4">
//               {assignment.iterations.map((itr) => (
//                 <li
//                   key={itr.id}
//                   className="bg-gray-50 border border-gray-500 rounded-md p-4 shadow-sm"
//                 >
//                   <h4 className="text-lg font-semibold mb-2 text-gray-700">
//                     Iteration {itr.iterationType}
//                   </h4>
//                   <p className="text-sm text-gray-600 mb-1">
//                     <strong>Submitted On:</strong> {new Date(itr.dateSubmitted).toLocaleString()}
//                   </p>
//                   <p className="text-sm mb-2">
//                     <strong>Status:</strong>{' '}
//                     <span
//                       className={`font-bold ${
//                         itr.status === 'Accepted'
//                           ? 'text-green-600'
//                           : itr.status === 'Rejected'
//                           ? 'text-red-600'
//                           : 'text-yellow-600'
//                       }`}
//                     >
//                       {itr.status}
//                     </span>
//                   </p>

//                   {itr.documentName && (
//                     <p>
//                       <a
//                         href={`http://localhost:8080/api/files/${itr.documentName}`}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-blue-600 hover:underline text-sm flex items-center"
//                       >
//                         Download Submitted File
//                       </a>
//                     </p>
//                   )}

//                   {itr.feedback ? (
//                     <p className="text-sm bg-gray-400 text-gray-700 mb-2">
//                       <strong>Feedback:</strong> {itr.feedback.comments}
//                     </p>
//                   ) : (
//                     <form onSubmit={(e) => handleFeedbackSubmit(e, itr.feedback.id)}>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700">Feedback</label>
//                         <input
//                           type="text"
//                           value={feedback}
//                           onChange={(e) => setFeedback(e.target.value)}
//                           className="mt-1 hover:h-8 hover:bg-gray-400 hover:text-xl block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
//                           required
//                         />
//                         <button
//                           type="submit"
//                           className="mt-2 rounded-xl w-44 h-8 bg-blue-400 text-black text-xl"
//                         >
//                           Submit
//                         </button>
//                       </div>
//                     </form>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
const Submissions = ({ setSubmissionShow, assignment }) => {
  const [feedback, setFeedback] = useState({}); // <-- now it's an object

  //this is for creating feedback
  const handleFeedbackChange = (e, itrId) => {
    setFeedback(prev => ({
      ...prev,
      [itrId]: e.target.value
    }));
  };

  //this is for delete feedback
const handleFeedbackDelete = async (id) => {
  try {
    const response = await fetch(`http://localhost:8080/api/feedbacks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      alert("Item deleted successfully");
    } else {
      const error = await response.text();
      alert("Error: " + error);
    }
  } catch (err) {
    console.error("Error deleting item:", err);
  }
};

  

  const handleFeedbackSubmit = async (e, itrId) => {
    e.preventDefault();

    const msg = feedback[itrId]; // get the feedback of this iteration
    if (!msg?.trim()) return;

    const payload = {
      comment: msg,
      submittedBy: 4,
      assignmentId: itrId,  // use real assignment id
    
    };

    try {
      console.log(payload);
      await createFeedback(payload);
      alert("Feedback submitted successfully!");
      // clear only this iteration's feedback
      setFeedback(prev => {
        const copy = { ...prev };
        delete copy[itrId];
        return copy;
      });
    } catch (error) {
      console.error(error);
      alert("Failed to submit feedback.");
    }
  };

// return (
//   <div className="fixed inset-0 h-screen bg-gray-900 bg-opacity-40 flex justify-center items-center z-30 p-4">
//     <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] relative flex flex-col">
      
//       {/* Header */}
//       <div className="sticky top-0 bg-gray-100 z-10 px-6 py-4 border-b border-gray-300 flex justify-between items-center">
//         <h3 className="text-xl font-bold text-gray-800">
//           Submission History: <span className="text-blue-600">{assignment.title}</span>
//         </h3>
//         <button
//           onClick={() => setSubmissionShow(false)}
//           className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
//         >
//           Close
//         </button>
//       </div>

//       {/* Body */}
//       <div className="flex-1 overflow-y-auto p-6 space-y-4">
//         {assignment.iterations?.length === 0 ? (
//           <p className="text-gray-600">No submissions found.</p>
//         ) : (
//           <ul className="space-y-4">
//             {assignment.iterations.map((itr) => (
//               <li
//                 key={itr.id}
//                 className="bg-gray-50 border border-gray-200 rounded-md p-4 shadow-sm hover:shadow-md transition-shadow"
//               >
//                 <h4 className="text-lg font-semibold mb-2 text-gray-700">
//                   Iteration {itr.iterationType}
//                 </h4>
//                 <p className="text-sm text-gray-600 mb-1">
//                   <strong>Submitted On:</strong> {itr.createdAt}
//                 </p>
//                 <p className="text-sm mb-2">
//                   <strong>Status:</strong>{" "}
//                   <span
//                     className={`font-semibold ${
//                       itr.status === "Accepted"
//                         ? "text-green-600"
//                         : itr.status === "Rejected"
//                         ? "text-red-600"
//                         : "text-yellow-600"
//                     }`}
//                   >
//                     {itr.status}
//                   </span>
//                 </p>

//                 {/* Download link */}
//                 {itr.documentName && (
//                   <p className="text-sm mb-2">
//                     <a
//                       href={`http://localhost:8080/api/files/${itr.documentName}`}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-blue-600 hover:underline"
//                     >
//                       Download Submitted File
//                     </a>
//                   </p>
//                 )}

//                 {/* Feedback Form */}
//                 {!itr.feedback && (
//                   <form onSubmit={(e) => handleFeedbackSubmit(e, itr.id)} className="mt-2">
//                     <label className="block text-sm font-medium text-gray-700">Feedback</label>
//                     <input
//                       type="text"
//                       value={feedback[itr.id] || ""}
//                       onChange={(e) => handleFeedbackChange(e, itr.id)}
//                       className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 shadow-sm"
//                       required
//                     />
//                     <button
//                       type="submit"
//                       className="mt-2 rounded-lg px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors"
//                     >
//                       Submit
//                     </button>
//                   </form>
//                 )}

//                 {/* Existing Feedback */}
//                 {itr.feedback && (
//                   <div className="mt-2 flex justify-between items-center">
//                     <div className="bg-gray-100 text-gray-800 text-sm rounded-md p-2 flex-1">
//                       <strong>Feedback:</strong> {itr.feedback.comments}
//                     </div>
//                     <button
//                       onClick={() => handleFeedbackDelete(itr.feedback.id)}
//                       className="ml-3 text-red-500 hover:underline text-sm font-medium"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 )}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   </div>
// );
return (
  <div className="fixed inset-0 h-screen bg-gray-900 bg-opacity-40 flex justify-center items-center z-30 p-4">
    <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] relative flex flex-col">

      {/* Header */}
      <div className="sticky top-0 bg-gray-50 z-10 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-800">
          Submission History: <span className="text-indigo-600">{assignment.title}</span>
        </h3>
        <button
          onClick={() => setSubmissionShow(false)}
          className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
        >
          Close
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {assignment.iterations?.length === 0 ? (
          <p className="text-gray-500">No submissions found.</p>
        ) : (
          <ul className="space-y-4">
            {assignment.iterations.map((itr) => (
              <li
                key={itr.id}
                className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <h4 className="text-lg font-semibold mb-2 text-gray-700">
                  Iteration {itr.iterationType}
                </h4>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Submitted On:</strong> {itr.createdAt}
                </p>
                <p className="text-sm mb-2">
                  <strong>Status:</strong>{" "}
                  <span
                    className={`font-semibold ${
                      itr.status === "Accepted"
                        ? "text-green-600"
                        : itr.status === "Rejected"
                        ? "text-red-600"
                        : "text-yellow-500"
                    }`}
                  >
                    {itr.status}
                  </span>
                </p>

                {/* Download Link */}
                {itr.documentName && (
                  <p className="text-sm mb-2">
                    <a
                      href={`http://localhost:8080/api/files/${itr.documentName}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:underline"
                    >
                      Download Submitted File
                    </a>
                  </p>
                )}

                {/* Feedback Form */}
                {!itr.feedback && (
                  <form onSubmit={(e) => handleFeedbackSubmit(e, itr.id)} className="mt-2">
                    <label className="block text-sm font-medium text-gray-700">Feedback</label>
                    <input
                      type="text"
                      value={feedback[itr.id] || ""}
                      onChange={(e) => handleFeedbackChange(e, itr.id)}
                      className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 shadow-sm"
                      required
                    />
                    <button
                      type="submit"
                      className="mt-2 rounded-lg px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                    >
                      Submit
                    </button>
                  </form>
                )}

                {/* Existing Feedback */}
                {itr.feedback && (
                  <div className="mt-2 flex justify-between items-center">
                    <div className="bg-gray-100 text-gray-800 text-sm rounded-md p-2 flex-1">
                      <strong>Feedback:</strong> {itr.feedback.comments}
                    </div>
                    <button
                      onClick={() => handleFeedbackDelete(itr.feedback.id)}
                      className="ml-3 text-red-500 hover:underline text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
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
