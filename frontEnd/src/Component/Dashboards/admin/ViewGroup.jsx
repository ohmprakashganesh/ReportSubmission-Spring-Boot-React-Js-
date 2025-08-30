import React, { useEffect, useState } from 'react';
import { getGroupStudents } from '../../services/Assugnment';
import { getSuperviosrByGroupId } from '../../services/SuperviserSer';

const ViewGroup = ({ onClose ,grp}) => {
 
  const [students, setStudents]= useState([]);
  const[supGroup,setSupervisor]=useState("");

  useEffect(()=>{
    const studentFun= async()=>{
      try{
        const temp= await getGroupStudents(1);
         setStudents(temp);
         console.log("students of group", temp);

      }catch(error){
        console.log(error);
      }
    };
    studentFun();

  },[])

   useEffect(()=>{
    const superfun= async()=>{
      try{
        const temp= await getSuperviosrByGroupId (2);
         setSupervisor(temp);
         console.log("superviosr of group", temp);

      }catch(error){
        console.log(error);
      }
    };
    superfun();

  },[])




  console.log("this is grp",grp);


  // const supervisor = group.users.find(u => u.role === "SUPERVISOR");
  // const students = group.users.filter(u => u.role === "STUDENT");

  return (
    <div className="bg-gray-300 h-screen bg-gradient-to-tr  backdrop-blur-sm flex w-full items-center justify-center p-4 z-50 overflow-y-auto animate-fadeIn">
     <div className="bg-white rounded-xl h-screen shadow-2xl p-6 w-full max-w-6xl transform transition-all duration-300 scale-100 opacity-100 animate-slideUp">
        <div className="flex mt-10 justify-between items-center mb-6 pb-4 border-b border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{grp.name}</h2>
            <p className="text-sm text-gray-500 mt-1">{grp.description}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-semibold leading-none transition-colors duration-200"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Group Info Card */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
            <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Group Information
            </h3>
            <div className="space-y-3">
              
              <div>
                <p className="text-xs font-medium text-blue-600 uppercase tracking-wider">Supervisor</p>
                <p className="text-sm font-medium">{supGroup?.supervisor?.name} </p>
              </div>
              <div>
                <p className="text-xs font-medium text-blue-600 uppercase tracking-wider">Email of Supervisor</p>
                <p className="text-sm font-medium"><span className="text-black-600"></span></p>
              </div>
              <div>
                <p className="text-xs font-medium text-blue-600 uppercase tracking-wider">Status</p>
                <p className={`text-sm font-medium ${
                  grp.status === 'Completed' ? 'text-green-600' :
                  grp.status === 'In Progress' ? 'text-blue-600' :
                  'text-yellow-600'
                }`}>
                  {grp.status}
                </p>
              </div>
            </div>
          </div>

          {/* Students Card */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-100">
            <h3 className="text-lg font-semibold text-purple-800 mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Team Members  ({grp.students?.length || 0})
            </h3>
            <ul className="space-y-2">
              {students?.map(student => (
                <li key={student.id} className="flex items-center">
                  <div className="bg-purple-100 text-purple-800 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-medium">
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{student.name}</p>
                    <p className="text-xs text-purple-600">{student.email}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Assignments Card */}
          <div className="md:col-span-2 bg-gradient-to-br from-amber-50 to-orange-50 p-4 rounded-lg border border-amber-100">
            <h3 className="text-lg font-semibold text-amber-800 mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              Assignments
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {grp.assignments.map(assign => (
                <div key={assign.id} className="bg-white p-3 rounded-md border border-amber-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-amber-900">{assign.title}</h4>
                    <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1  rounded-full">
                      Due: {assign.deadline}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{assign.description}</p>
                   <div className='flex justify-between '>
                    <p className='gap-8 flex flex-row'>
                     <button className='bg-blue-200 rounded-2xl p-1'>total  Submission</button>
                      <span className='bg-cyan-100 px-5 py-1'>{assign.iterations.length} </span>
                     </p>
                     <button className='bg-amber-500 rounded-2xl p-1'>View submission</button>
                   </div>
                </div>
               
              ))}
            </div>
          </div>

          {/* Feedback Card */}
          {/* <div className="md:col-span-2 bg-gradient-to-br from-green-50 to-teal-50 p-4 rounded-lg border border-green-100">
            <h3 className="text-lg font-semibold text-green-800 mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              Supervisor Feedback
            </h3>
            <div className="bg-white/80 p-4 rounded-md border border-green-200">
              <p className="text-gray-700 italic">
                {group.feedback || "No feedback available yet."}
              </p>
            </div>
          </div> */}
      

      
          </div>
            <div className="mt-6 pt-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 flex items-center"
          >
            Close
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewGroup;