
import React, { useState } from "react";
import { httpClient } from "../../services/Config/Config";

const SubmittedWorks = ({ allAssignments }) => {
  
  const [filterStatus, setFilterStatus] = useState(""); // "" means no filter

  const onDelete = async (id) => {
    try {
      const response = await httpClient.delete(`/api/itr/${id}`);
      if (response.status === 200 || response.status === 204) {
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

  // Filter assignments based on selected status
  const filteredAssignments = allAssignments.map((assignment) => ({
    ...assignment,
    iterations: assignment.iterations.filter(
      (iter) => !filterStatus || iter.status === filterStatus
    ),
  })).filter((assignment) => assignment.iterations.length > 0);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Submitted Works</h2>

      {/* Filter Buttons */}
      <div className="mb-4 flex gap-4">
        <button
          onClick={() => setFilterStatus("")}
          className={`px-4 py-2 rounded-lg ${
            filterStatus === "" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilterStatus("SUBMITTED")}
          className={`px-4 py-2 rounded-lg ${
            filterStatus === "SUBMITTED" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
          }`}
        >
          Submitted
        </button>
        <button
          onClick={() => setFilterStatus("CHECKED")}
          className={`px-4 py-2 rounded-lg ${
            filterStatus === "CHECKED" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
          }`}
        >
          Checked
        </button>
      </div>

      {/* Display Assignments */}
      {!filteredAssignments || filteredAssignments.length === 0 ? (
        <p className="text-gray-600">No submissions found for this filter.</p>
      ) : (
        <div className="space-y-6">
          {filteredAssignments.map((assignment) => (
            <div
              key={assignment.id}
              className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm"
            >
              <h3 className="text-xl font-semibold mb-3 text-gray-800">{assignment.title}</h3>
              <p className="text-gray-600 mb-2">{assignment.description}</p>

              <ul className="space-y-3">
                {assignment.iterations.map((sub) => (
                  <li
                    key={sub.id}
                    className="border-b flex mb-2 border-gray-500 pb-3 last:border-b-0"
                  >
                    <div className="w-[80%]">
                      <h4 className="text-lg font-medium text-gray-700">
                        Iteration: {sub.iterationType}
                      </h4>
                      <p className="text-sm text-gray-600">
                        <strong>Status:</strong>{" "}
                        <span
                          className={`font-bold ${
                            sub.status === "CHECKED"
                              ? "text-green-600"
                              : sub.status === "SUBMITTED"
                              ? "text-yellow-600"
                              : "text-gray-600"
                          }`}
                        >
                          {sub.status}
                        </span>
                      </p>
                      <p className="text-sm text-gray-700">
                        <strong>Submitted By:</strong> {sub.submittedBy?.name} (
                        {sub.submittedBy?.email || "Not found"})
                      </p>

                      {sub.documentUrl && (
                        <a
                          href={`http://localhost:8080/api/iteration/${sub.documentName}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block mt-2 px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700"
                        >
                          Download Submitted File
                        </a>
                      )}
                      {!sub.feedback?.comments && (
                        <p className="mt-2 p-2 rounded-xl bg-gray-100">Yet to get checked</p>
                      )}

                      {sub.feedback?.comments && (
                        <p className="mt-2 p-2 rounded-xl bg-gray-100">{sub.feedback.comments}</p>
                      )}

                      {sub.feedback?.documentUrl && (
                        <a
                          href={`http://localhost:8080/api/feedback/${sub.feedback.documentName}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block mt-2 px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
                        >
                          Download Feedback File
                        </a>
                      )}
                    </div>

                    <div className="ml-4 flex flex-col justify-start">
                      <button
                        onClick={() => onDelete(sub.id)}
                        className="px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubmittedWorks;


// import React, { useEffect, useState } from "react";
// import { getAssignments, getIterationByUser } from "../../services/Assugnment";
// import { ConstructionIcon } from "lucide-react";
// import { httpClient } from "../../services/Config/Config";
// import { getUser } from "../../services/StudetServ";
// import { all } from "axios";



// const SubmittedWorks = ({allAssignments}) => {
//     console.log(allAssignments)


// const onDelete = async (id) => {
//   try {
//     const response= await httpClient.delete(`/api/itr/${id}`);
//     if (response.ok) {
//       alert("Item deleted successfully");
//       // Optionally refresh list here
//     } else {
//       const error = await response.text();
//       alert("Error: " + error);
//     }
//   } catch (err) {
//     console.error("Error deleting item:", err);
//   }
// };
// //  const response = await fetch(`http://localhost:8080/api/itr/${id}`, {
// //       method: "DELETE",
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //     });

// return (
//   <div className="p-4 bg-white rounded-lg shadow-md">
//     <h2 className="text-2xl font-bold mb-4 text-gray-800">Submitted Works</h2>

//     {!allAssignments || allAssignments.length === 0 ? (
//       <p className="text-gray-600">You haven't submitted any work yet.</p>
//     ) : (
//       <div className="space-y-6">

//         {allAssignments.map((assignment) => ( 
//            assignment?.iterations && assignment.iterations.length >0 &&(
//               <div
//             key={assignment.id}
//             className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm"
//           >
//             <h3 className="text-xl font-semibold mb-3 text-gray-800">
//               {assignment.title}
//             </h3>
//             <p className="text-gray-600 mb-2">{assignment.description}</p>

//             {assignment.iterations?.length === 0 ? (
//               <p className="text-gray-500">No submissions yet.</p>
//             ) : (
//               <ul className="space-y-3">
//                 {assignment.iterations?.map((sub) => (
//                   <li
//                     key={sub.id}
//                     className="border-b flex  mb-2 border-gray-500 pb-3 last:border-b-0"
//                   >
//                     <div className="w-[80%]">

//                     <h4 className="text-lg font-medium text-gray-700">
//                       Iteration: {sub.iterationType}
//                     </h4>
//                     <p className="text-sm text-gray-600">
//                       <strong>Status:</strong>{" "}
//                       <span
//                         className={`font-bold ${
//                           sub.status === "ACCEPTED"
//                             ? "text-green-600"
//                             : sub.status === "REJECTED"
//                             ? "text-red-600"
//                             : "text-yellow-600"
//                         }`}
//                       >
//                         {sub.status}
//                       </span>
//                     </p>
//                     <p className="text-sm text-gray-700">
//                       <strong>Submitted By:</strong> {sub.submittedBy?.name} (
//                       {sub.submittedBy?.email || "Not found"})
//                     </p>
//                     {sub.documentUrl && (
//                       <button className="px-3 w-[40%] py-1 bg-green-600 text-white text-sm rounded-md hover:bg-red-700">
//                         <a
//                           href={`http://localhost:8080/api/iteration/${sub.documentName}`}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className=" text-white hover:underline text-sm flex items-center"
//                         >
//                           { "Download Submitted file"}
//                         </a>
//                       </button>
//                     )}

//                     <div className=" mt-4 mb-2 bg-conic-150">
//                     <p>{sub?. feedback?.comments ?(
//                     <p className=" p-2 rounded-xl bg-white ">{sub.feedback.comments}</p>
//                     ):("No feedback available")}</p>

//                       {sub?.feedback?.documentUrl ? (
//                       <button className="px-3 w-[40%] py-1 bg-green-600 text-white text-sm rounded-md hover:bg-red-700">
//                         <a
//                           href={`http://localhost:8080/api/feedback/${sub.feedback.documentName}`}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-white hover:underline text-sm flex items-center"
//                         >
//                           {"Download Reviewed file"}
//                         </a>
//                       </button>
//                     ):("not correction file")}
//                     </div>
//                     </div>
//                     <div>
//                      <div className=" gap-2 w-full  ml-4">
                 
//                     <button
//                       onClick={() => onDelete(sub.id)}
//                       className="px-3 w-full py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//            )
          
          
        
//         ))}
                 
//       </div>
//     )}
//   </div>
// );
// }


// export default SubmittedWorks;
