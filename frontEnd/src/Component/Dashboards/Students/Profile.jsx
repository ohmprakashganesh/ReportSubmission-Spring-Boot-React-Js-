import React from 'react'
import { userDetails } from '../../Constants';

const Profile = () => {
 return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-indigo-600 p-6 text-white">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">User Profile</h1>
              <button className="px-4 py-2 bg-white text-indigo-600 rounded-md font-medium hover:bg-indigo-50 transition">
                Logout
              </button>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Avatar Section */}
              <div className="flex-shrink-0">
                <img
                  className="h-32 w-32 rounded-full object-cover border-4 border-indigo-100"
                  src={user.avatar}
                  alt={`${userDetail.name}'s avatar`}
                />
              </div>

              {/* User Details */}
              <div className="flex-grow">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <h2 className="text-xl font-semibold">{user.name}</h2>
                    <p className="text-gray-600">
                      <span className="font-medium">Age:</span> {user.age}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Email:</span> {user.email}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Roll No</h3>
                      <p className="mt-1 text-gray-900">{user.rollNo}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Symbol Number</h3>
                      <p className="mt-1 text-gray-900">{user.symbolNumber}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Registration Number</h3>
                      <p className="mt-1 text-gray-900">{user.regNumber}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Actions (optional) */}
          <div className="bg-gray-50 px-6 py-4 flex justify-end">
            <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile
