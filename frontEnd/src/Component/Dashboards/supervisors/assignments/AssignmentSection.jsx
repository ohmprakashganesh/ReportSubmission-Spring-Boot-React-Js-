// import axios from "axios";
// import { fetchData } from "pdfjs-dist";
// import { useRef, useState } from "react";
// import { createFeedback } from "../../services/SuperviserSer";
// import { httpClient } from "../../services/Config/Config";
// import { AlignRight } from "lucide-react";

// export const CoursesSection = ({ groups  }) => {
//   const allAssignments = groups.flatMap((group) => group.assignments);
//   console.log(allAssignments);
//   const [submissionShow, setSubmissionShow] = useState(false);
//   const [assignment, setAssignment] = useState([]);

//   const seeSubmission = (assignment) => {
//     setSubmissionShow(true);
//     setAssignment(assignment);
//     console.log("this is from view submission", assignment);
//   };


//   //load all the assignments

//   return (
//     <section id="courses-section" className="content-section">
//       <h3 className="text-2xl font-semibold text-gray-800 mb-6">All Courses</h3>
//       {allAssignments && (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {allAssignments.map((assignment) => (
//             <div
//               key={assignment.id}
//               className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer"
//               onClick={() => seeSubmission(assignment)}
//             >
//               <h4 className="text-lg font-bold text-gray-800 mb-2">
//                 {assignment.title}
//               </h4>
//               <p className="text-gray-600 text-sm mb-4">
//                 {assignment.description}
//               </p>
//               <div className="flex items-center text-gray-700 mb-2">
//                 <i className="fas fa-user-graduate mr-2 text-blue-500"></i>
//                 <span> created At: {assignment.createdAt}</span>
//               </div>
//               <div className="flex items-center text-gray-700 mb-2">
//                 <i className="fas fa-tasks mr-2 text-purple-500"></i>
//                 <span> total Iterations : {assignment.iterations.length}</span>
//               </div>

//               <button
//                 className="mt-4 w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
//                 onClick={() => seeSubmission(assignment)}
//               >
//                 View Assignment Details
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//       {submissionShow && (
//         <Iterations
//           assignment={assignment}
//           setSubmissionShow={setSubmissionShow}
//         />
//       )}
//     </section>
//   );
// };
// export default CoursesSection;

import axios from "axios";
import { useRef, useState, useEffect } from "react";
import { createFeedback } from "../../../services/SuperviserSer";
import { httpClient } from "../../../services/Config/Config";

export const CoursesSection = ({ groups }) => {
  const allAssignments = groups.flatMap((group) => group.assignments);
  const [submissionShow, setSubmissionShow] = useState(false);
  const [assignment, setAssignment] = useState([]);
  const [sortByDueDate, setSortByDueDate] = useState(""); // "asc" | "desc" | ""

  const seeSubmission = (assignment) => {
    setSubmissionShow(true);
    setAssignment(assignment);
  };

  // Sort assignments by due date
  const sortedAssignments = [...allAssignments].sort((a, b) => {
    if (!sortByDueDate) return 0;

    const parseDate = (dateStr) => {
      const [yy, mm, dd] = dateStr.split("/").map(Number);
      // Assuming "25" means 2025
      return new Date(2000 + yy, mm - 1, dd);
    };

    const dateA = parseDate(a.dueDate);
    const dateB = parseDate(b.dueDate);

    return sortByDueDate === "asc" ? dateA - dateB : dateB - dateA;
  });

  return (
    <section id="courses-section" className="content-section">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">All Courses</h3>

      {/* Sorting Buttons */}
      <div className="mb-4 flex gap-4">
        <button
          className={`px-4 py-2 rounded-lg ${
            sortByDueDate === "asc" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => setSortByDueDate("asc")}
        >
          Sort by Due Date ↑
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            sortByDueDate === "desc" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => setSortByDueDate("desc")}
        >
          Sort by Due Date ↓
        </button>
        <button
          className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800"
          onClick={() => setSortByDueDate("")}
        >
          Clear Sort
        </button>
      </div>

      {sortedAssignments && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedAssignments.map((assignment) => (
            <div
              key={assignment.id}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer"
              onClick={() => seeSubmission(assignment)}
            >
              <h4 className="text-lg font-bold text-gray-800 mb-2">{assignment.title}</h4>
              <p className="text-gray-600 text-sm mb-4">{assignment.description}</p>
              <div className="flex items-center text-gray-700 mb-2">
                <span className="mr-2 font-medium">Created At:</span> {assignment.createdAt}
              </div>
              <div className="flex items-center text-gray-700 mb-2">
                <span className="mr-2 font-medium">Total Iterations:</span> {assignment.iterations.length}
              </div>
              <div className="flex items-center text-gray-700 mb-2">
                <span className="mr-2 font-medium">Due Date:</span> {assignment.dueDate}
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

      {submissionShow && <Iterations assignment={assignment} setSubmissionShow={setSubmissionShow} />}
    </section>
  );
};

export default CoursesSection;







const Iterations = ({ setSubmissionShow, assignment }) => {
  const [feedback, setFeedback] = useState({});
  const fileInputRef= useRef(null) // <-- now it's an object

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
  const response = await httpClient.delete(`/api/feedbacks/${id}`);

  console.log("Feedback deleted:", response.data);
  alert("deleted successfully");
  // Do whatever you want after delete — e.g. refresh list
} catch (error) {
  console.error("Delete failed:", error);
}
  };


  

const handleFeedbackSubmit = async (e, itrId) => {
  e.preventDefault();

  const msg = feedback[itrId];
  if (!msg?.trim()) return;

  if (fileInputRef.current && fileInputRef.current.files[0]) {
    
    const formData = new FormData();
    formData.append("file", fileInputRef.current.files[0]);
    formData.append("comment", msg);
    formData.append("submittedBy", 4);       // hardcoded user id for now
    formData.append("assignmentId", itrId);  // ✅ correct field name

    try {
      await createFeedback(formData);
      alert("Feedback submitted successfully!");
      setFeedback(prev => {
        const copy = { ...prev };
        delete copy[itrId];
        return copy;
      });
    } catch (error) {
      console.error(error);
      alert("Failed to submit feedback.");
    }
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
                      href={`http://localhost:8080/api/iteration/${itr.documentName}`}
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
                        <input
                          type="file"
                          ref={fileInputRef}
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 
                     file:rounded-full file:border-0 file:text-sm file:font-semibold 
                     file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
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
                  <div>
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
                    <div className="bg-gray-100 flex justify-between text-gray-800 text-sm rounded-md p-2 flex-1">
                  
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
            ))}
          </ul>
        )}
      </div>
    </div>
  </div>
);

};