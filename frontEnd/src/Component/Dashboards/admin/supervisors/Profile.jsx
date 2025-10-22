import React, { useEffect, useState } from "react";
import { getUser } from "../../../services/AdminSer";

 const SupervisorProfile = ({setShowProfile,user}) => {

  const [owner, setOwner]=useState([]);
    
 useEffect(() => {
    if (user && user.id) {
      const fetchUser = async () => {
        try {
          const data = await getUser(user.id);
          setOwner(data);
          console.log ( "data form profile "+ JSON.stringify(data));
        } catch (error) {
          console.log("User not found with id", );
        }
      };

      fetchUser();
    }
  }, [user]);
    

  const closeFun = () => {
    setShowProfile(false);
   
    console.log("Close clicked!");
  };

  return (
    <div className="bg-white p-4 rounded-xl   mb-8">
      {/* Header with close button */}
      <div className="relative flex justify-between items-center p-4">
        <button
          onClick={closeFun}
          className="absolute bg-gray-600 px-2 rounded-md top-2 right-4 text-white hover:bg-gray-800 text-2xl font-bold"
          aria-label="Close"
        >
          &times;
        </button>
      </div>

           <div>

         
      {/* Card */}
      <div className=" gap-3 md:grid sm:grid flex flex-col grid-cols-2">
      <div className=" max-w-sm mx-auto  w-full rounded-md shadow-lg p-6 flex flex-col items-center">
        <img
          src={user.image}
          alt={user.name}
          className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-md"
        />
        <h3 className="mt-3 text-lg font-semibold capitalize">{user.name}</h3>
        <p className="text-sm text-gray-500">{user.role}</p>
         <span className="font-semibold"></span> {user.email}
      </div>

        <div className="  shadow-lg p-6 mx-6 rounded-md flex flex-col  ">
            <h1 className="pb-2 text-xl font-semibold">Activities Details</h1>
             <div className="grid grid-cols-3 ">
       <table>
  <tr>
    <td className="border border-gray-300 px-4 py-2">Total Groups</td>
    <td className="border border-gray-300 px-4 py-2">{user.group ? user.group.size() : 0}</td>
  </tr>
  <tr>
    <td className="border border-gray-300 px-4 py-2">Group Name</td>
    <td className="border border-gray-300 px-4 py-2">{user.group?.name || "-"}</td>
  </tr>
  <tr>
    <td className="border border-gray-300 px-4 py-2">Total Assignments</td>
    <td className="border border-gray-300 px-4 py-2">{user.group?.assignments?.length || 0}</td>
  </tr>
  <tr>
    <td className="border border-gray-300 px-4 py-2">Domain</td>
    <td className="border border-gray-300 px-4 py-2">{user.domain || "No"}</td>
  </tr>
</table>


                
                
                

             </div>
        </div>
        </div>
        </div>
    </div>
  );
};

export default  SupervisorProfile;