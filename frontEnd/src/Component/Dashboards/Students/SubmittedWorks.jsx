import React, { useEffect, useState } from "react";
import { getAssignments } from "../../services/Assugnment";
import { ConstructionIcon } from "lucide-react";

//   // Data states

//   // Mock student data (as provided by the user)

//  const SubmittedWorks = ({ allAssignments, allSubmissions,mockAssignments, mockSubmissions }) => {

//       const [assignments, setAssignments] = useState([]);
//       const [submissions, setSubmissions] = useState([]); // All submissions for all assignments

//  useEffect(() => {
//     setAssignments(mockAssignments);
//     setSubmissions(mockSubmissions);
//   }, [mockAssignments, mockSubmissions]);

//      const submissionsByAssignment = allSubmissions.reduce((acc, sub) => {
//       if (!acc[sub.assignmentId]) {
//         acc[sub.assignmentId] = [];
//       }
//       acc[sub.assignmentId].push(sub);
//       return acc;
//     }, {});
//    return (
//       <div className="p-4 bg-white rounded-lg shadow-md">
//         <h2 className="text-2xl font-bold mb-4 text-gray-800">Submitted Works</h2>
//         {Object.keys(submissionsByAssignment).length === 0 ? (
//           <p className="text-gray-600">You haven't submitted any work yet.</p>
//         ) : (
//           <div className="space-y-6">
//             {Object.entries(submissionsByAssignment).map(([assignmentId, subs]) => {
//               const assignment = allAssignments.find(a => a.id === assignmentId);
//               if (!assignment) return null; // Should not happen with consistent data

//               return (
//                 <div key={assignmentId} className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm">
//                   <h3 className="text-xl font-semibold mb-3 text-gray-800">{assignment.name}</h3>
//                   <ul className="space-y-3">
//                     {subs.sort((a, b) => a.iteration - b.iteration).map(sub => (
//                       <li key={sub.id} className="border-b border-gray-100 pb-3 last:border-b-0">
//                         <h4 className="text-lg font-medium text-gray-700">Iteration {sub.iteration}</h4>
//                         <p className="text-sm text-gray-600">
//                           <strong>Submitted On:</strong> {new Date(sub.dateSubmitted).toLocaleString()}
//                         </p>
//                         <p className="text-sm">
//                           <strong>Status:</strong>{' '}
//                           <span
//                             className={`font-bold ${
//                               sub.status === 'Accepted'
//                                 ? 'text-green-600'
//                                 : sub.status === 'Rejected'
//                                 ? 'text-red-600'
//                                 : 'text-yellow-600'
//                             }`}
//                           >
//                             {sub.status}
//                           </span>
//                         </p>
//                         {sub.feedback && (
//                           <p className="text-sm text-gray-700">
//                             <strong>Feedback:</strong> {sub.feedback}
//                           </p>
//                         )}
//                         {sub.fileUrl && (
//                           <p className="mt-1">
//                             <a
//                               href={sub.fileUrl}
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               className="text-blue-600 hover:underline text-sm flex items-center"
//                             >
//                               <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 className="h-4 w-4 mr-1"
//                                 viewBox="0 0 20 20"
//                                 fill="currentColor"
//                               >
//                                 <path
//                                   fillRule="evenodd"
//                                   d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
//                                   clipRule="evenodd"
//                                 />
//                               </svg>
//                               Download File
//                             </a>
//                           </p>
//                         )}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//    )
//  }

//  export default SubmittedWorks

const SubmittedWorks = () => {
  const [assignments, setAssignments] = useState([]);

//   useEffect(() => {
//     if (mockAssignments) setAssignments(mockAssignments);
//   }, [mockAssignments]);

  useEffect(() => {
    const result = async () => {
      try {
        const res = await getAssignments();
        console.log(res)
        setAssignments(res);
      } catch (error) {
        console.log(error);
      }
    };
    result();
  }, []);


  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Submitted Works</h2>

      {!assignments || assignments.length === 0 ? (
        <p className="text-gray-600">You haven't submitted any work yet.</p>
      ) : (
        <div className="space-y-6">
          {assignments.map((assignment) => (
            <div
              key={assignment.id}
              className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm"
            >
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                {assignment.title}
              </h3>
              <p className="text-gray-600 mb-2">{assignment.description}</p>

              {assignment.iterations.length === 0 ? (
                <p className="text-gray-500">No submissions yet.</p>
              ) : (
                <ul className="space-y-3">
                  {assignment.iterations.map((sub) => (
                    <li
                      key={sub.id}
                      className="border-b border-gray-100 pb-3 last:border-b-0"
                    >
                      <h4 className="text-lg font-medium text-gray-700">
                        Iteration: {sub.iterationType}
                      </h4>
                      <p className="text-sm text-gray-600">
                        <strong>Status:</strong>{" "}
                        <span
                          className={`font-bold ${
                            sub.status === "ACCEPTED"
                              ? "text-green-600"
                              : sub.status === "REJECTED"
                              ? "text-red-600"
                              : "text-yellow-600"
                          }`}
                        >
                          {sub.status}
                        </span>
                      </p>
                      <p className="text-sm text-gray-700">
                        <strong>Submitted By:</strong> {sub.submittedBy.name} (
                        {sub.submittedBy.email})
                      </p>
                      {sub.documentUrl && (
                        <p className="mt-1">
                          <a
                            href={`http://localhost:8080/api/files/${sub.documentName}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline text-sm flex items-center"
                          >
                            {sub.documentName || "Download File"}
                          </a>
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubmittedWorks;
