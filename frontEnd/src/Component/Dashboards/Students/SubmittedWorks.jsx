import React, { useEffect, useState } from "react";
import { getAssignments, getIterationByUser } from "../../services/Assugnment";
import { ConstructionIcon } from "lucide-react";
import { httpClient } from "../../services/Config/Config";
import { getUser } from "../../services/StudetServ";



const SubmittedWorks = () => {

  const[user,setUser]= useState([]);


useEffect(()=>{
const  fetchUser=async ()=>{
    try{
 const data= await getUser(12);
    setUser(data);
    console.log("fetched user",data);
    }catch(error){
      console.log(error);
    }
  };
  fetchUser();
},[]);


const onDelete = async (id) => {
  try {
    const response = await fetch(`http://localhost:8080/api/itr/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
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


 
return (
  <div className="p-4 bg-white rounded-lg shadow-md">
    <h2 className="text-2xl font-bold mb-4 text-gray-800">Submitted Works</h2>

    {!user?.group?.assignments || user.group.assignments.length === 0 ? (
      <p className="text-gray-600">You haven't submitted any work yet.</p>
    ) : (
      <div className="space-y-6">

        {user.group.assignments.map((assignment) => ( 
           assignment?.iterations && assignment.iterations.length >0 &&(
              <div
            key={assignment.id}
            className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm"
          >
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              {assignment.title}
            </h3>
            <p className="text-gray-600 mb-2">{assignment.description}</p>

            {assignment.iterations?.length === 0 ? (
              <p className="text-gray-500">No submissions yet.</p>
            ) : (
              <ul className="space-y-3">
                {assignment.iterations?.map((sub) => (
                  <li
                    key={sub.id}
                    className="border-b flex  mb-2 border-gray-500 pb-3 last:border-b-0"
                  >
                    <div className="w-[80%]">

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
                      <strong>Submitted By:</strong> {sub.submittedBy?.name} (
                      {sub.submittedBy?.email || "Not found"})
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
                    <p>{sub?.feedback?.comment}</p>
                    <p>no feed back yet</p>
                    </div>
                    <div>
                     <div className=" gap-2 w-full  ml-4">
                 
                    <button
                      onClick={() => onDelete(sub.id)}
                      className="px-3 w-full py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
           )
          
          
        
        ))}
                 
      </div>
    )}
  </div>
);
}


export default SubmittedWorks;
