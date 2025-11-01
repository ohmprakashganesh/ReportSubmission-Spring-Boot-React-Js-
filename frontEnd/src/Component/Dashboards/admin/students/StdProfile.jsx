import React, { useState, useEffect } from "react";

const StdProfile = ({ setShowProfile, user }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (user) {
      setProfile(user);
    }
  }, [user]); // run when user changes

  const closeFun = () => {
    setShowProfile(false);
    console.log("Close clicked!");
  };

  // Safely calculate total iterations
  const totalIterations = profile?.group?.assignments?.reduce(
    (count, a) => count + (a.iterations?.length || 0),
    0
  );

  return (
    <div className="bg-white p-4 rounded-xl mb-8">
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

      {profile ? (
        <div className="w-[90%] h-[60%] p-4 rounded-xl mb-8">
          <div className="gap-2 md:grid w-full h-full pt-14 sm:grid flex flex-col grid-cols-2">
            {/* Profile Card */}
            <div className="max-w-sm mx-auto w-full rounded-md shadow-lg p-6 flex flex-col items-center">
<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <title>Default Avatar</title>
  <circle cx="12" cy="12" r="12" fill="#E5E7EB"/> 
  <path d="M12 12.5a3.25 3.25 0 1 0 0-6.5 3.25 3.25 0 0 0 0 6.5z" fill="#374151"/>
  <path d="M4 19.5c1.2-3.4 4.3-5.5 8-5.5s6.8 2.1 8 5.5" fill="#374151"/>
</svg>

              <h3 className="mt-3 text-lg font-semibold capitalize">{profile.name}</h3>
              <p className="text-sm text-gray-500">{profile.role}</p>
              <span className="font-semibold">{profile.username}</span>
            </div>

            {/* Activities Table */}
            <div className="shadow-lg p-6 mx-6 rounded-md flex flex-col">
              <h1 className="pb-2 text-xl font-semibold">Activities Details</h1>
              <div className="grid grid-cols-3">
                <div className="gap-2">
                  <table>
                    <tbody>
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
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default StdProfile;
