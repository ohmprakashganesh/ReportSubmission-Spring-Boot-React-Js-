import React, { useEffect, useState } from "react";
import { getProfile } from "../../../services/SuperviserSer";

const Groups = ({ onViewGroup }) => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getProfile();
        setUser(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="p-6 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg border border-blue-100 transition-transform duration-300 hover:scale-[1.01]">
      <h2 className="text-3xl font-bold mb-6 text-blue-700 tracking-wide flex items-center gap-2">
        <span className="inline-block w-2 h-8 bg-blue-600 rounded-full"></span>
        Your Groups
      </h2>

      {!user?.group || user.group === 0 ? (
        <div className="text-center py-10 text-gray-600 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-lg font-medium">You are not part of any groups yet.</p>
        </div>
      ) : (
        <ul className="space-y-4">
          <li
            key={user.group.id}
            className="group flex items-center justify-between p-5 bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-xl hover:bg-blue-50 transition-all duration-300"
          >
            <div>
              <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">
                {user.group.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Group ID: <span className="font-medium">{user.group.id}</span>
              </p>
            </div>
            <button
              onClick={() => onViewGroup(user.group)}
              className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300"
            >
              View Group
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Groups;
