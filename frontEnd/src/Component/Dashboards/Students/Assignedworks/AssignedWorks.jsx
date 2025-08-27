import React, { useRef, useState } from 'react'

const AssignedWorks = ({ assignment, onSubmit, onViewSubmissions }) => {
       const [showSubmitForm, setShowSubmitForm] = useState(false);
       const fileInputRef = useRef(null);
   
       // Handles file selection and triggers submission
       const handleFileSubmit = () => {
         if (fileInputRef.current && fileInputRef.current.files[0]) {
           onSubmit(assignment.id, fileInputRef.current.files[0]);
           console.log(fileInputRef.name);
           setShowSubmitForm(false); // Hide form after submission attempt
           // In a real app, you might show a success message here
         } else {
           <P>please fill the data</P>
           // You could display a small message box here instead of console.warn
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
               <strong className="font-medium">Deadline:</strong>{' '}
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
               {showSubmitForm ? 'Cancel Submission' : 'Submit Task'}
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
             <select value="select" 
             className='type outline-1 hover:outline-blue-200 bg-gray-300' 
             id='typw' >
               <option value="PRE">PRE</option>
                  <option value="PRE">MID</option>
                  <option value="PRE">Final</option>
             </select>
               <h4 className="text-md font-semibold text-gray-700">Upload your task file:</h4>
               <input
                 type="file"
                 ref={fileInputRef}
                 className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
               />
               <button
                 onClick={handleFileSubmit}
                 className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition ease-in-out duration-150"
               >
                 Upload & Submit
               </button>
             </div>
           )}
         </div>
  
  )
};
export default AssignedWorks;
