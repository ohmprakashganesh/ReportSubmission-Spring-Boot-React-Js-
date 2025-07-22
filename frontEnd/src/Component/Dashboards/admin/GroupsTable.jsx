import React, { useEffect, useState } from 'react';
import { getGroups } from '../../services/AdminSer';
import ReAssignGroup from './ReAssignGroup';
import ViewGroup from './ViewGroup';

const GroupsTable = () => {
  const [groups, setGroups] = useState([]);
  const [showReassignModal, setShowReassignModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await getGroups();
        setGroups(response);
      } catch (error) {
        console.error('Error fetching groups:', error);
        // Consider adding error state handling here
      }
    };
    fetchGroups();
  }, []);

  const handleReassignClick = (group) => {
    setSelectedGroup(group);
    setShowReassignModal(true);
  };

  const handleViewClick = (group) => {
    setSelectedGroup(group);
    setShowViewModal(true);
  };

  const handleDeleteGroup = (groupId, groupName) => {
    if (window.confirm(`Are you sure you want to delete group "${groupName}"?`)) {
      // Add your delete logic here
      console.log('Deleting group:', groupId);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mb-8 relative">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">All Groups</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Group Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Project Title
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {groups.length > 0 ? (
              groups.map((group) => (
                <tr key={group.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {group.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {group.assignments?.map((assignment) => (
                      <div key={assignment.id}>{assignment.title}</div>
                    ))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleReassignClick(group)}
                      className="text-indigo-600 hover:text-indigo-900 px-3 py-1 rounded-md hover:bg-indigo-50 transition-colors duration-200"
                    >
                      Re-Assign
                    </button>
                    <button
                      onClick={() => handleViewClick(group)}
                      className="text-indigo-600 hover:text-indigo-900 px-3 py-1 rounded-md hover:bg-indigo-50 transition-colors duration-200"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDeleteGroup(group.id, group.name)}
                      className="text-red-600 hover:text-red-900 px-3 py-1 rounded-md hover:bg-red-50 transition-colors duration-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">
                  No groups found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Reassign Modal */}
      {showReassignModal && selectedGroup && (
        <ReAssignGroup
          group={selectedGroup}
          onClose={() => {
            setShowReassignModal(false);
            setSelectedGroup(null);
          }}
          onSave={(updatedGroup) => {
            // Update the groups list with the updated group
            setGroups(groups.map(g => g.id === updatedGroup.id ? updatedGroup : g));
            setShowReassignModal(false);
            setSelectedGroup(null);
          }}
        />
      )}

      {/* View Modal */}
     {showViewModal && selectedGroup && (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto">
    <div className="bg-white rounded-xl shadow-2xl w-full  max-h-[90vh] flex flex-col">
      <ViewGroup
        group={selectedGroup}
        onClose={() => {
          setShowViewModal(false);
          setSelectedGroup(null);
        }}
      />
    </div>
  </div>
)}
    </div>
  );
};

export default GroupsTable;