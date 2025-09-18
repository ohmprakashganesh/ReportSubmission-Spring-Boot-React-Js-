

import React, { useRef, useState } from 'react';
import axios from 'axios';
import { httpClient } from '../../../services/Config/Config';

const AssignedWorks = ({assignment, onViewSubmissions }) => {
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [iterationType, setIterationType] = useState("PRE");
  const fileInputRef = useRef(null);

  const handleFileSubmit = async () => {
    if (fileInputRef.current && fileInputRef.current.files[0]) {
      const formData = new FormData();
      formData.append("file", fileInputRef.current.files[0]);
      formData.append("submittedBy", 1); 
      formData.append("assignmentId", assignment.id);
      formData.append("status", "SUBMITTED");
      formData.append("iterationType", iterationType);

      try {
        // const response = await axios.post("http://localhost:8080/api/itr", formData, {
        //   headers: { "Content-Type": "multipart/form-data" },
        // });


          const response = await httpClient.post('/api/itr',formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              }
            );
            
          if (response.status !== 201 && response.status !== 200) {
            throw new Error("Failed to create assignment");
          }

         

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
          <strong className="font-medium">Deadline:</strong> {assignment.dueDate || "No limit"}
        </p>
        <p className="mb-4">
          <a
            href={`http://localhost:8080/api/assignment/${assignment.documentName}`}
            target="_blank"
            rel="noopener noreferrer"
            className=" bg-gray-400 w-46 text-black font-bold py-2 px-4  hover:underline text-sm flex items-center"
          >
            View Assignment PDF
          </a>
        </p>
      </div>

      <div className="flex flex-col space-y-2 mt-4">
        <button
          onClick={() => setShowSubmitForm((prev) => !prev)}
          className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          {showSubmitForm ? "Cancel Submission" : "Submit Task"}
        </button>
        {assignment?.iterations.length >0 ?(
           <button
          onClick={() => onViewSubmissions(assignment)}
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          View Submissions
        </button>
        ):(
           <button 
           disabled
          className="w-full px-4 py-2  bg-gray-400 text-white rounded-md hover:bg-red-700"
        >
          No Submissions
        </button>
        )
        }
       
      </div>

      {showSubmitForm && (
        <div className="mt-4 pt-4 border-t border-gray-200 flex flex-col space-y-3">
          <div>
            <p>Iteration Type</p>
            <select
              value={iterationType}
              onChange={(e) => setIterationType(e.target.value)}
              className="outline-1 hover:outline-blue-200 bg-gray-300 p-1 rounded"
            >
              <option value="PRE">PRE</option>
              <option value="MID">MIDDLE</option>
              <option value="FINAL">FINAL</option>
            </select>
          </div>

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
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Upload & Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AssignedWorks;
