import React, { useEffect, useState } from 'react'
import { getAllAssignments } from '../../../services/AdminSer';

const Assignemnts = () => {
    const [assignments,setAssignments]=useState([]);

  useEffect(()=>{
    const fetchAssignments= async()=>{

        const data= await  getAllAssignments();
        if(data){
            console.log("assignemnts are fetched");
            setAssignments(data);
            console.log(data)
        }
    }

    fetchAssignments();
  },[]);

  return (
   <div class="min-h-screen bg-gray-100 p-6">
  <h1 class="text-2xl font-bold mb-6 text-gray-800">Assignments</h1>

  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
   {assignments.map((obj,ind)=>(
<div key={ind} class="h-30 shadow-md  rounded-2xl p-5 flex flex-row justify-between hover:shadow-xl transition-shadow duration-300">
      <div className=' w-2/3'>

        <h2 class="text-lg font-semibold text-gray-800 mb-2">{obj.title}</h2>
        <p class="text-gray-600 text-sm mb-3">
       {obj.description}
        </p>
      </div>
      <div class="flex flex-col items-center justify-between ">
        <span class="text-sm text-gray-500">Iterations: <span class="font-semibold text-gray-800">{obj.iterations.length}</span></span>
        <button onClick={()=> viewAssignment(obj)} class="bg-blue-600 min-w-14 max-w-1/2 text-white text-sm px-1 py-1 rounded-lg hover:bg-blue-700 transition">
          View 
        </button>
      </div>
    </div>
   ))}
  </div>

  <div className='fixed z-30 bg-red-500 h-screen w-full'>
   hello 
  </div>

</div>
  )
}

export default Assignemnts
