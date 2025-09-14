import axios from "axios";
import { fetchData } from "pdfjs-dist";
import { useState } from "react";
import { createFeedback } from "../../services/SuperviserSer";
import { httpClient } from "../../services/Config/Config";

export const CoursesSection = ({ groups }) => {
  const allAssignments = groups.flatMap((group) => group.assignments);
  console.log(allAssignments);
  const [submissionShow, setSubmissionShow] = useState(false);
  const [assignment, setAssignment] = useState([]);

  const seeSubmission = (assignment) => {
    setSubmissionShow(true);
    setAssignment(assignment);
    console.log("this is from view submission", assignment);
  };


  //load all the courses
  return (
    <section id="courses-section" className="content-section">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">All Courses</h3>
      {allAssignments && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allAssignments.map((assignment) => (
            <div
              key={assignment.id}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer"
              onClick={() => seeSubmission(assignment)}
            >
              <h4 className="text-lg font-bold text-gray-800 mb-2">
                {assignment.title}
              </h4>
              <p className="text-gray-600 text-sm mb-4">
                {assignment.description}
              </p>
              <div className="flex items-center text-gray-700 mb-2">
                <i className="fas fa-user-graduate mr-2 text-blue-500"></i>
                <span> created At: {assignment.createdAt}</span>
              </div>
              <div className="flex items-center text-gray-700 mb-2">
                <i className="fas fa-tasks mr-2 text-purple-500"></i>
                <span> total Iterations : {assignment.iterations.length}</span>
              </div>

              <button
                className="mt-4 w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                onClick={() => seeSubmission(assignment)}
              >
                View Assignment Details
              </button>
            </div>
          ))}
        </div>
      )}
      {submissionShow && (
        <Iterations
          assignment={assignment}
          setSubmissionShow={setSubmissionShow}
        />
      )}
    </section>
  );
};
export default CoursesSection;









const Iterations = ({ setSubmissionShow, assignment }) => {
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


  // return (
  //   <div className="fixed inset-0 h-screen bg-gray-300 bg-opacity-50 flex justify-center items-center z-30 p-4 mt-10">
  //     <div className="bg-red-100 rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] relative flex flex-col">
  //       <div className="sticky top-0 bg-red-200 z-10 px-6 py-4 border-b border-gray-400 flex justify-between items-center">
  //         <h3 className="text-xl font-bold text-gray-800">
  //           Submission History for:{" "}
  //           <span className="text-blue-600">{assignment.title}</span>
  //         </h3>
  //         <button
  //           onClick={() => setSubmissionShow(false)}
  //           className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
  //         >
  //           Close
  //         </button>
  //       </div>

  //       <div className="flex-1 overflow-y-auto p-6 space-y-4">
  //         {assignment.iterations?.length === 0 ? (
  //           <p className="text-gray-600">No submissions found.</p>
  //         ) : (
  //           <ul className="space-y-4">
  //             {assignment.iterations.map((itr) => (
  //               <li
  //                 key={itr.id}
  //                 className="bg-gray-50 border border-gray-500 rounded-md p-4 shadow-sm"
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
  //                     className={`font-bold ${
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
                  
  //                 {itr.documentName && (
  //                   <p>
  //                     <a
  //                       href={`http://localhost:8080/api/files/${itr.documentName}`}
  //                       target="_blank"
  //                       rel="noopener noreferrer"
  //                       className="text-blue-600 hover:underline text-sm"
  //                     >
  //                       Download Submitted File
  //                     </a>
  //                   </p>
  //                 )}

  //                 {!itr.feedback && (
  //                  <form onSubmit={(e) => handleFeedbackSubmit(e, itr.id)}>
  //                     <label className="block text-sm font-medium text-gray-700">
  //                       Feedback
  //                     </label>
  //                     <input
  //                       type="text"
  //                       value={feedback[itr.id]|| ""}
  //                       onChange={(e) => handleFeedbackChange(e,itr.id)}
  //                       className="mt-1 block border-green-600 outline-none  shadow-emerald-400 w-full rounded-lg hover:shadow-emerald-700 shadow-sm"
  //                       required
  //                     />
  //                     <button
  //                       type="submit"
  //                       className="mt-2 rounded-xl w-44 h-8 bg-blue-400 text-black text-xl"
  //                     >
  //                       Submit
  //                     </button>
  //                   </form>
  //              )}

  //                 {/* The fix is here: access the comments property of the feedback object */}
  //                 {itr.feedback && (
  //                   <p className="text-sm  flex justify-between   text-gray-700 mt-2">
  //                     <p className="w-[90%] bg-red-400 justify-center my-0 py-0"> <strong>Feedback:</strong> {itr.feedback.comments} </p>
  //                      <div className=" w-[10%] ml-5 md:flex-row  flex-col gap-3 text-wrap overflow-auto ">
  //                       <p className="underline font-bold text-red-500 cursor-pointer  " onClick={()=>handleFeedbackDelete(itr.feedback.id)}>Delete</p>
  //                      </div>
  //                   </p>
  //                 )}
  //               </li>
  //             ))}
  //           </ul>
  //         )}
  //       </div>
  //     </div>
  //   </div>
  // );
};

;