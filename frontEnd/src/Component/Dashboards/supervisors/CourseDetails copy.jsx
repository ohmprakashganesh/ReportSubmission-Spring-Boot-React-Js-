// export const CourseDetails = ({assignment}) => {
//    console.log("ehlloy")

//     return (
//         <div className="bg-white rounded-lg p-8 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
//              {assignment.iterations.length === 0 ? (
//             <h3 className="text-2xl font-bold mb-6 text-gray-800">
//                  Submission history for:  <span className="text-blue-600">{assignment.name}</span>
//                 <p className="text-gray-600">No submissions found for this assignment yet.</p>
//                  </h3>
//             ) : (
//                 <ul className="space-y-4">
//                     {assignment.iterations.map((sub) => (
//                         <li key={sub.id} className="bg-gray-50 border border-gray-200 rounded-md p-4 shadow-sm">
//                             <h4 className="text-lg font-semibold mb-2 text-gray-700">Iteration {sub.iterationType}</h4>
//                             <p className="text-sm text-gray-600 mb-1">
//                                 <strong>Submitted On:</strong>{' '}
//                                 {new Date(sub.dateSubmitted).toLocaleString()}
//                             </p>
//                             <p className="text-sm mb-2">
//                                 <strong>Status:</strong>{' '}
//                                 <span
//                                     className={`font-bold ${sub.status === 'Accepted'
//                                             ? 'text-green-600'
//                                             : sub.status === 'Rejected'
//                                                 ? 'text-red-600'
//                                                 : 'text-yellow-600'
//                                         }`}
//                                 >
//                                     {sub.status}
//                                 </span>
//                                 <p>

//                                 </p>
//                             </p>
//                             {sub.feedback && (
//                                 <p className="text-sm text-gray-700 mb-2">
//                                     <strong>Feedback:</strong> {sub.feedback}
//                                 </p>
//                             )}
//                             {sub.documentName && (
//                                 <p>
//                                     <a
//                                         href={`http://localhost:8080/api/files/${sub.documentName}`}
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                         className="text-blue-600 hover:underline text-sm flex items-center"
//                                     >
//                                         <svg
//                                             xmlns="http://www.w3.org/2000/svg"
//                                             className="h-4 w-4 mr-1"
//                                             viewBox="0 0 20 20"
//                                             fill="currentColor"
//                                         >
//                                             <path
//                                                 fillRule="evenodd"
//                                                 d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
//                                                 clipRule="evenodd"
//                                             />
//                                         </svg>
//                                         Download Submitted File
//                                     </a>
//                                 </p>
//                             )}
//                         </li>
//                     ))}
//                 </ul>
//             )}
//         </div>
     
//     );
//   };
// export default CourseDetails;
