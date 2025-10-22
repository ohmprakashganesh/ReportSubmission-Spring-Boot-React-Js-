import React, { useEffect, useState } from 'react'
import { getProfile } from '../../services/SuperviserSer';

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
    <div className="h-screen w-full flex justify-center items-center p-6 rounded-xl  mb-8">
      <div className=" w-[90%] h-[60%] p-4 rounded-xl mb-8">


        <div>


          {/* Card */}
          <div className=" gap-2 md:grid w-full h-full pt-14 sm:grid flex flex-col grid-cols-2">
            <div className=" max-w-sm mx-auto  w-full rounded-md shadow-lg p-6 flex flex-col items-center">
              <img

                className="w-30 h-30 rounded-full border-4 border-blue-500 shadow-md"
              />
              <h3 className="mt-3 text-lg font-semibold capitalize">{profile.name} </h3>
              <p className="text-sm text-gray-500">{profile.role}</p>
              <span className="font-semibold"></span> {profile.username}
            </div>

            <div className="  shadow-lg p-6 mx-6 rounded-md flex flex-col  ">
              <h1 className="pb-2 text-xl font-semibold">Activities Details</h1>
              <div className="grid grid-cols-3 ">
                <div className=" gap-2">

                  <table>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Group Name</td>
                      <td className="border border-gray-300 px-4 py-2">{profile?.group?.name || "-"}</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Total Assignments</td>
                      <td className="border border-gray-300 px-4 py-2">{profile?.group?.assignments?.length || 0}</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Total Submissions</td>
                      <td className="border border-gray-300 px-4 py-2">{totalIterations || 0}</td>
                    </tr>
                  </table>


                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      )
}
 export default MyDetails;