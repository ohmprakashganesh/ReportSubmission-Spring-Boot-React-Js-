import React, { useEffect, useState } from 'react'
import { getUser } from '../../../services/StudetServ';

const Groups = ({groups,onViewGroup}) => {
  const [user,setUser]=useState([]);

  useEffect(() => {
  const fetchUser = async () => {
    try {
      const data = await getUser(12);
      setUser(data);
    } catch (err) {
      console.error(err);
    }
  };
  fetchUser();
}, []);



     return (
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Groups</h2>
        {!user?.group || user.group === 0 ? (
          <p className="text-gray-600">You are not part of any groups yet.</p>
        ) : (
          <ul className="space-y-3">
              <li
                key={user.group.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-md shadow-sm border border-gray-200"
              >
                <span className="text-lg font-medium text-gray-700">{user.group.name}</span>
                <button
                  onClick={() => onViewGroup(user.group)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition ease-in-out duration-150"
                >
                  View Group
                </button>
              </li>
          </ul>
        )}
      </div>
  )
}

export default Groups
