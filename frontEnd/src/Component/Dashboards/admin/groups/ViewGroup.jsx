import React, { useEffect, useState } from 'react';
import { getGroupStudents } from '../../../services/Assugnment';
import Submissions from './Submissions';
import { getSuperviosrByGroupId } from '../../../services/StudetServ';

const ViewGroup = ({ onClose ,grp}) => {

  const[showSubmissions,setShowSubmissions]=useState('');
 const[assignment, setAssignment]=useState("");
  const [students, setStudents]= useState([]);
  const[supGroup,setSupervisor]=useState("");
  console.log("this is group",grp)
  useEffect(()=>{
    //students of of particular group
    const studentFun= async()=>{
      try{
        const temp= await getGroupStudents(grp.id);
         setStudents(temp);
         console.log("students of group", temp);
      }catch(error){
        console.log(error);
      }
    };
    studentFun();
  },[])
  //super visor by group id 
   useEffect(()=>{
    const superfun= async()=>{
      try{
        const temp= await getSuperviosrByGroupId (grp.id);
         setSupervisor(temp);
         console.log("superviosr of group", temp);
      }catch(error){
        console.log(error);
      }
    };
    superfun();
  },[])

   const viewSubmission=(assignment)=>{
    setShowSubmissions(true)
    setAssignment(assignment);
    console.log("this is from view submission",assignment)
   }

  return (
  <div className="absolute bg-white  inset-0  bg-gradient-to-tr backdrop-blur-sm   overflow-y-auto animate-fadeIn">

  <div className=" h-fit bg-white rounded-xl  shadow-2xl  w-full  transform transition-all duration-300 scale-100 opacity-100 animate-slideUp">

    {/* Header */}
    <div className="flex flex-col md:flex-row  justify-between items-start md:items-center mb-2 pb-2 border-b border-gray-300 gap-2">
      <div>
        <h2 className="text-2xl pl-5 pt-5 font-bold text-gray-800">Detail of Group</h2>
      </div>
      <button
        onClick={onClose}
        className="px-5 py-2 text-center mt-2  text-gray-800 font-medium rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 flex items-center"
      >
        Close
        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    {/* Content Grid */}
    <div className="grid grid-cols-1 px-5 md:grid-cols-2 gap-6">

      {/* Group Info Card */}
      <div className="bg-gradient-to-br  max-h-48  p-5 rounded-lg  shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800  mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          Group Information 
        </h3>
        <div className="space-y-2">
          <div>
            <p className="text-xs font-medium text-blue-600 uppercase tracking-wider">Supervisor</p>
            <p className="text-sm font-medium">{supGroup?.supervisor?.name}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-blue-600 uppercase tracking-wider">Email</p>
            <p className="text-sm font-medium">{supGroup?.supervisor?.email}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-blue-600 uppercase tracking-wider">Domain</p>
            <p className="text-sm font-medium ">
              {grp.domain}
            </p>
          </div>
        </div>
      </div>

      {/* Students Card */}
      <div className=" p-5 rounded-lg border border-purple-100 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <svg className="w-5 h-5 text-gray-800 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          Team Members ({grp.students?.length || 0})
        </h3>
        <ul className="space-y-3">
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
      <div className="md:col-span-2 rounded-lg   shadow-sm">
        <h3 className="text-lg px-5 font-semibold text-amber-800 mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
          Assignments
        </h3>
        <div className="grid sm:grid-cols-1 grid-cols-1 md:grid-cols-3 gap-4">
          {grp.assignments.length <0 ?(
          <h1>No assignemnt found</h1>
          ):  grp.assignments.map(assign => (
            <div key={assign.id} className="bg-white p-4 rounded-md   shadow hover:shadow-md transition-shadow duration-200">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-gray-800">{assign.title}</h4>
                <span className=" text-amber-800 text-xs px-2 py-1 rounded-full">
                  Due: {assign.deadline}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{assign.description}</p>
              <div className="flex justify-between items-center mt-3">
                <div className="flex items-center gap-2">
                  <button className="bg-blue-200 px-2 py-1 rounded-2xl text-xs font-medium"> Submissions</button>
                  <span className="bg-cyan-100 rounded-full px-3 py-1 text-sm">{assign.iterations.length}</span>
                </div>
                <button onClick={() => viewSubmission(assign)} className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-1 rounded-2xl text-xs">
                  View Details
                </button>
              </div>
            </div>
          ))}
        
        </div>
      </div>

    </div>

    {/* Footer */}
    <div className="mt-6 pt-4 border-t border-gray-200 flex justify-end">
      {/* footer buttons if needed */}
    </div>

  </div>

  {/* Submissions Modal */}
  {showSubmissions && (
    <Submissions assignment={assignment} setShowSubmissions={setShowSubmissions} />
  )}
</div>

  );
};

export default ViewGroup;