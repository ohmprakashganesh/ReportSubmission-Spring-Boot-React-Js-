// import React, { useRef, useState } from 'react';
// import axios from 'axios';

// const AssignedWorks = ({ assignment, onViewSubmissions }) => {
//   const [showSubmitForm, setShowSubmitForm] = useState(false);
//   const [iterationType, setIterationType] = useState("PRE");
//   const fileInputRef = useRef(null);

//   // Handles file selection and triggers API call
//   const handleFileSubmit = async () => {
//     if (fileInputRef.current && fileInputRef.current.files[0]) {
//       const formData = new FormData();
//       formData.append("assignmentId", assignment.id);
//       formData.append("iterationType", iterationType);
//       formData.append("file", fileInputRef.current.files[0]);

//       try {
//         const response = await axios.post("http://localhost:8080/api/submissions", formData, {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         });

//         console.log("Upload success:", response.data);
//         alert("Submission uploaded successfully!");
//         setShowSubmitForm(false); // Hide form after success
//       } catch (error) {
//         console.error("Error uploading file:", error);
//         alert("Failed to upload. Please try again.");
//       }
//     } else {
//       alert("Please select a file before submitting.");
//     }
//   };

//   return (
//     <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 shadow-sm flex flex-col justify-between">
//       <div>
//         <h3 className="text-xl font-semibold mb-2 text-gray-800">{assignment.title}</h3>
//         <p className="text-gray-600 text-sm mb-1">
//           <strong className="font-medium">Description:</strong> {assignment.description}
//         </p>
//         <p className="text-gray-600 text-sm mb-3">
//           <strong className="font-medium">Deadline:</strong>{" "}
//           {new Date(assignment.deadline).toLocaleDateString()}
//         </p>
//         <p className="mb-4">
//           <a
//             href={assignment.pdfUrl}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-blue-600 hover:underline text-sm flex items-center"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-4 w-4 mr-1"
//               viewBox="0 0 20 20"
//               fill="currentColor"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V7.414L10.586 4H6z"
//                 clipRule="evenodd"
//               />
//             </svg>
//             View Assignment PDF
//           </a>
//         </p>
//       </div>

//       <div className="flex flex-col space-y-2 mt-4">
//         <button
//           onClick={() => setShowSubmitForm(!showSubmitForm)}
//           className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition ease-in-out duration-150"
//         >
//           {showSubmitForm ? "Cancel Submission" : "Submit Task"}
//         </button>
//         <button
//           onClick={() => onViewSubmissions(assignment)}
//           className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition ease-in-out duration-150"
//         >
//           View Submissions
//         </button>
//       </div>

//       {showSubmitForm && (
//         <div className="mt-4 pt-4 border-t border-gray-200 flex flex-col space-y-3">
//           <p>Iteration Type</p>
//           <select
//             value={iterationType}
//             onChange={(e) => setIterationType(e.target.value)}
//             className="outline-1 hover:outline-blue-200 bg-gray-300 p-1 rounded"
//             id="type"
//           >
//             <option value="PRE">PRE</option>
//             <option value="MID">MID</option>
//             <option value="FINAL">FINAL</option>
//           </select>

//           <h4 className="text-md font-semibold text-gray-700">Upload your task file:</h4>
//           <input
//             type="file"
//             ref={fileInputRef}
//             className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full 
//                      file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 
//                      hover:file:bg-blue-100"
//           />
//           <button
//             onClick={handleFileSubmit}
//             className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 
//                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 
//                      transition ease-in-out duration-150"
//           >
//             Upload & Submit
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AssignedWorks;

import React, { useRef, useState } from 'react';
import axios from 'axios';

const AssignedWorks = ({ assignment, onViewSubmissions, submittedBy }) => {
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [iterationType, setIterationType] = useState("PRE");
  const fileInputRef = useRef(null);

  // Handles file selection and triggers API call
  const handleFileSubmit = async () => {
    if (fileInputRef.current && fileInputRef.current.files[0]) {
      const formData = new FormData();
      formData.append("file", fileInputRef.current.files[0]);
      formData.append("submittedBy", 1); // pass logged-in user ID
      formData.append("assignmentId", assignment.id);
      formData.append("status", "SUBMITTED");
      formData.append("iterationType", iterationType);

      try {
        const response = await axios.post("http://localhost:8080/api/itr", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("Upload success:", response.data);
        alert("Submission uploaded successfully!");
        setShowSubmitForm(false);
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("Failed to upload. Please try again.");
      }
    } else {
      alert("Please select a file before submitting.");
    }
  };

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 shadow-sm flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{assignment.title}</h3>
        <p className="text-gray-600 text-sm mb-1">
          <strong className="font-medium">Description:</strong> {assignment.description}
        </p>
        <p className="text-gray-600 text-sm mb-3">
          <strong className="font-medium">Deadline:</strong>{" "}
          {new Date(assignment.deadline).toLocaleDateString()}
        </p>
        <p className="mb-4">
          <a
            href={assignment.pdfUrl}
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
                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V7.414L10.586 4H6z"
                clipRule="evenodd"
              />
            </svg>
            View Assignment PDF
          </a>
        </p>
      </div>

      <div className="flex flex-col space-y-2 mt-4">
        <button
          onClick={() => setShowSubmitForm(!showSubmitForm)}
          className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition ease-in-out duration-150"
        >
          {showSubmitForm ? "Cancel Submission" : "Submit Task"}
        </button>
        <button
          onClick={() => onViewSubmissions(assignment)}
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition ease-in-out duration-150"
        >
          View Submissions
        </button>
      </div>

      {showSubmitForm && (
        <div className="mt-4 pt-4 border-t border-gray-200 flex flex-col space-y-3">
          <p>Iteration Type</p>
          <select
            value={iterationType}
            onChange={(e) => setIterationType(e.target.value)}
            className="outline-1 hover:outline-blue-200 bg-gray-300 p-1 rounded"
            id="type"
          >
            <option value="PRE">PRE</option>
            <option value="MID">MIDDLE</option>
            <option value="FINAL">FINAL</option>
          </select>

          <h4 className="text-md font-semibold text-gray-700">Upload your task file:</h4>
          <input
            type="file"
            ref={fileInputRef}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 
                     file:rounded-full file:border-0 file:text-sm file:font-semibold 
                     file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <button
            onClick={handleFileSubmit}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 
                     transition ease-in-out duration-150"
          >
            Upload & Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AssignedWorks;
