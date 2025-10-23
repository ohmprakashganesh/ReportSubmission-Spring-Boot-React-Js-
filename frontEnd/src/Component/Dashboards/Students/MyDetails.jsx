import React, { useEffect, useState } from 'react'
import { getProfile } from '../../services/SuperviserSer';
import { UserIcon } from 'lucide-react';

const MyDetails = () => {
  const [profile, setProfile] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        setProfile(res);
        console.log("profile", profile)
      } catch (error) {
        console.log("not logged user");
      }
    };
    fetchProfile();
  }, [])
  console.log(profile)

  const totalIterations = profile.group?.assignments
    .reduce((count, a) => count + (a.iterations?.length || 0), 0);

  return (
   // Assuming 'profile', 'totalIterations', and 'UserIcon' are available in scope.

<div className="min-h-screen pt-20 pb-10 bg-gray-50 flex flex-col items-center">
    <div className="w-full max-w-5xl px-4">

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
            
            {/* 1. Profile Card (Takes 1/3 width on md screens and up) */}
            <div className="md:col-span-1">
                <div className="bg-white rounded-xl shadow-2xl p-8 flex flex-col items-center border-t-4 border-blue-500 transform hover:scale-[1.02] transition-transform duration-300">
                    
                    {/* User Icon & Role/Status */}
                    <div className="relative mb-4">
                        <UserIcon className='w-20 h-20 text-gray-700 p-1 bg-gray-100 rounded-full border-2 border-blue-500' />
                        <span className="absolute bottom-0 right-0 h-4 w-4 bg-green-500 rounded-full border-2 border-white"></span>
                    </div>

                    <h3 className="mt-3 text-2xl font-bold text-gray-900 capitalize text-center">{profile.name}</h3>
                    <p className="text-md text-blue-600 font-medium">{profile.role}</p>
                    <p className="mt-2 text-sm text-gray-500">
                        <span className="font-semibold text-gray-700">Username:</span> {profile.username}
                    </p>

                </div>
            </div>

            {/* 2. Activities Details (Takes 2/3 width on md screens and up) */}
            <div className="md:col-span-2">
                <div className="bg-white rounded-xl shadow-2xl p-8 h-full border-t-4 border-purple-500">
                    
                    <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
                        <span className="text-purple-600">📊</span> Activities Report
                    </h1>
                    
                    {/* Activity Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <tbody>
                                {/* Group Name Row */}
                                <tr className='bg-gray-50 hover:bg-gray-100 transition'>
                                    <td className="w-1/2 px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">
                                        Group Name
                                    </td>
                                    <td className="w-1/2 px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {profile?.group?.name || "N/A"}
                                    </td>
                                </tr>
                                
                                {/* Total Assignments Row */}
                                <tr className='bg-white hover:bg-gray-100 transition'>
                                    <td className="w-1/2 px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">
                                        Total Assignments
                                    </td>
                                    <td className="w-1/2 px-6 py-4 whitespace-nowrap text-lg font-bold text-purple-600">
                                        {profile?.group?.assignments?.length || 0}
                                    </td>
                                </tr>
                                
                                {/* Total Submissions Row */}
                                <tr className='bg-gray-50 hover:bg-gray-100 transition'>
                                    <td className="w-1/2 px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">
                                        Total Submissions
                                    </td>
                                    <td className="w-1/2 px-6 py-4 whitespace-nowrap text-lg font-bold text-purple-600">
                                        {totalIterations || 0}
                                    </td>
                                </tr>
                                
                                {/* Example: Supervisor Row (if available) */}
                                <tr className='bg-white hover:bg-gray-100 transition'>
                                    <td className="w-1/2 px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">
                                        Supervisor
                                    </td>
                                    <td className="w-1/2 px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {profile?.group?.supervisor?.name || "N/A"}
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>
  )
}
export default MyDetails;