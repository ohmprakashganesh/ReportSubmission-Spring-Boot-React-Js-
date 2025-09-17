import { useEffect, useState } from "react";
import Submissions from "./Submissions";
import FormAssignment from "./FormAssignment";
import AssignmentEdit from "./AssignmentEdit";
import { getGroupStudents } from "../../services/Assugnment";

export const GroupDetails = ({ group,onNavigate }) => {
  const [selectedAssignment,setSelectedAssignment] = useState(null);
  const [feedbackInputs, setFeedbackInputs] = useState({});
  const[submissionShow,setSubmissionShow]=useState(false);
  const[assignment,setAssignment]=useState("");
    const[users,setUsers]=useState("");

  console.log("group from group details",group);


  // Handle feedback input change
  const handleFeedbackInputChange = (iterationId, value) => {
    setFeedbackInputs((prev) => ({
      ...prev,
      [iterationId]: value,
    }));
  };

   useEffect(()=>{
    const fetchStds= async ()=>{
      try{
     const data= await getGroupStudents(group.id);
     setUsers(data);
     console.log("this if logged",users);

      }catch(error){
        console.log(error);
      }
    }
    fetchStds();

  },[]);

  // Handle feedback submit
  const handleSubmitFeedback = (iterationId) => {
    const newFeedback = feedbackInputs[iterationId];
    if (newFeedback) {
      // Normally, you'd POST to backend here
      console.log("Submitted feedback:", iterationId, newFeedback);

      // Clear input
      setFeedbackInputs((prev) => {
        const newState = { ...prev };
        delete newState[iterationId];
        return newState;
      });
    }
  };
  const handleEdit=(data)=>{
    setShowEditForm(true);
    setAssignment(data);

  }
    const seeSubmission=(assignment)=>{
    setSubmissionShow(true);
    setSelectedAssignment(assignment);
    console.log("this is from view submission",assignment)
   }
    const [showForm,setShowForm]=useState(false)
    const[showEditForm,setShowEditForm]=useState(false);

  return (
    <section id="group-details-section" className="content-section">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <span
          className="cursor-pointer hover:underline"
          onClick={() => onNavigate("dashboard")}
        >
          Dashboard
        </span>{" "}
        &gt;{" "}
        <span
          className="cursor-pointer hover:underline"
          onClick={() => onNavigate("groups")}
        >
          All Groups
        </span>{" "}
        &gt; <span id="group-breadcrumb-name">{group.name}</span>
      </nav>

      {/* Title */}
      <div className="flex items-center justify-between mb-6">
        <h3
          className="text-2xl font-semibold text-gray-800"
          id="group-details-title"
        >
          {group.name}
        </h3>
        <div className="space-x-3">
          <button onClick={()=>setShowForm(true)} className="py-2 px-4 bg-blue-500  text-white text-xl font-serif rounded-lg hover:bg-green-500 transition-colors duration-200">
            <i className="fas  fa-edit mr-2"></i>Create Assignment
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Group Members */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h4 className="text-xl font-semibold text-gray-800 mb-4">
            Group Members
          </h4>
    <table className="min-w-full border border-gray-300 rounded-lg shadow-sm text-center">
  <thead className="bg-green-100">
    <tr>
      <th className="px-4 py-2 border-b border-gray-300 font-semibold uppercase text-gray-700">SN</th>
      <th className="px-4 py-2 border-b border-gray-300 font-semibold uppercase text-gray-700">Name</th>
      <th className="px-4 py-2 border-b border-gray-300 font-semibold uppercase text-gray-700">Email</th>
    </tr>
  </thead>
  <tbody>
    {users?.length > 0 ? (
      users.map((user, index) => (
        <tr
          key={user.id || index}
          className="bg-white hover:bg-gray-50 transition-colors border-b border-gray-300"
        >
          <td className="px-4 py-2">{index + 1}</td>
          <td className="px-4 py-2">{user.name}</td>
          <td className="px-4 py-2">{user.email}</td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="3" className="px-4 py-2 text-gray-500">
          No users found.
        </td>
      </tr>
    )}
  </tbody>
</table>




          <ul
            id="group-members-list"
            className="list-disc list-inside text-gray-700 space-y-2"
          >
          </ul> 
        </div>

        {/* {group.assignments?.length > 0 ? (
          <div className="grid   md:grid-cols-2 lg:grid-cols-2 gap-4">
              {group.assignments.map(assign => (
                <div key={assign.id} className="bg-white p-3 min-w-96 rounded-md border border-amber-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-amber-900">{assign.title}</h4>
                    <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1  rounded-full">
                      Due: {assign.deadline}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{assign.description}</p>
                   <div className='flex justify-between '>
                    <p className='md:gap-8   gap-2 flex flex-row'>
                     <button className='bg-blue-200 p-0 rounded-2xl md:p-1'>total  Submission</button>
                      <span className='bg-cyan-100 mr-2 text-center pb-0 max-h-8  px-4 md:px-4 md:py-1'>{assign.iterations.length} </span>
                     </p>
                     <div className="flex  gap-2">
                     <button onClick={()=>seeSubmission(assign)} className='bg-amber-500 max-h-8 rounded-xl p-1 px-2'>View </button>
                     <button onClick={()=>handleEdit(assign)} className='bg-amber-500 max-h-8  rounded-xl p-1 px-2'>Edit </button>
                      <button onClick={()=>setDelete()} className='bg-amber-500 max-h-8  rounded-xl p-1 px-2'>Delete </button>
                       </div>

                   </div>
                </div>
               
              ))}
            </div>

            ):<div> not assignment found</div> }
             */}
{group.assignments?.length > 0 ? (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {group.assignments.map((assign) => (
      <div
        key={assign.id}
        className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 p-5 flex flex-col justify-between"
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <h4 className="text-lg font-semibold text-gray-800">{assign.title}</h4>
          <span className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full font-medium">
            Due: {assign.deadline}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{assign.description}</p>

        {/* Submissions & Actions */}
        <div className="flex justify-between items-center mt-auto">
          {/* Iterations */}
          <div className="flex items-center gap-2">
            <span className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">
              Submissions: {assign.iterations.length}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex-wrap mx-1 ">
            <button
              onClick={() => seeSubmission(assign)}
              className="bg-gray-100 my-1 hover:bg-gray-200 text-gray-800 text-xs font-medium px-3 py-1 rounded-lg transition-colors"
            >
              View
            </button>
            <button
              onClick={() => handleEdit(assign)}
              className="bg-gray-100 mr-1 hover:bg-gray-200 text-gray-800 text-xs font-medium px-3 py-1 rounded-lg transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => setDelete(assign)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-medium px-3 py-1 rounded-lg transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
) : (
  <div className="text-center text-gray-500 py-10">
    No assignments found.
  </div>
)}
      </div>
       {submissionShow &&(
      <Submissions  assignment={selectedAssignment}   setSubmissionShow={setSubmissionShow} />
      )}
      {showForm &&(
         <FormAssignment id={group.id}  setShowForm={setShowForm}/>
      )}
      {showEditForm &&(
         <AssignmentEdit assignment={assignment} id={group.id} setShowEditForm={setShowEditForm}/>
      )}
    </section>
  );
};
