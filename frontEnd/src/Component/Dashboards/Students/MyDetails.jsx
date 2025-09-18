import React, { useEffect, useState } from 'react'
import { getProfile } from '../../services/SuperviserSer';

const MyDetails = () => {
  const [profile,setProfile]=useState("");

           useEffect (()=>{
            const fetchProfile = async ()=>{
              try{
              const res= await getProfile();
              setProfile(res);
              console.log("profile",profile)
                  }catch(error){
                 console.log("not logged user");
                  }
  
            };
            fetchProfile();
           },[])
  console.log(profile)
 
  return (
   <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mb-8">

      {/* Card */}
      <div className="w-full max-w-sm mx-auto bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
        <img
          src="https://i.pravatar.cc/40"
          alt={profile.name}
          className="w-55 h-55 rounded-full border-4 border-blue-500 shadow-md"
        />
        <h3 className="mt-3 text-lg font-semibold capitalize">{profile.name}</h3>
        <p className="text-sm text-gray-500">{profile.role}</p>

        <div className="mt-4 space-y-2 w-full">

          <div className="text-sm">
            <span className="font-semibold">Email:</span> {profile.email}
          </div>
          <div className="text-sm">
            <span className="font-semibold">Group:</span> {profile?.group?.name || "Not assigned"}
          </div>
           <div className="text-sm">
            <span className="font-semibold">Symbool No:</span>{profile?.serialNo} 4948498
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyDetails
