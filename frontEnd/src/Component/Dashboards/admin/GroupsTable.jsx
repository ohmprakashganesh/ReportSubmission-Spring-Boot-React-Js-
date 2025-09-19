import React, { useEffect, useState } from 'react';
import { getGroups } from '../../services/AdminSer';
import ReAssignGroup from './ReAssignGroup';
import ViewGroup from './ViewGroup';

const GroupsTable = () => {
  const [groups, setGroups] = useState([]);
  const [group, setGroup]=useState('')
  const [showReassignModal, setShowReassignModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  // const [selectedGroup, setSelectedGroup] = useState(null);
  const [tempId, setTempId] = useState(null);

   const [sortConfig, setSortConfig] = useState({ key: null, direction: null });




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
    setTempId(group.id);
    setGroup(group)
    setShowReassignModal(true);
  };

  const handleViewClick = (group) => {
    setTempId(group.id);
    setGroup(group);
    setShowViewModal(true);
  };

  const handleDeleteGroup = (ind) => {
    // if (window.confirm(`Are you sure you want to delete group "${groupName}"?`)) {
    //   // Add your delete logic here
    //   console.log('Deleting group:', ind);
    // }
  };



  //sorting  logic here 

 
  const sortedGroups = () => {
    if (!sortConfig.key) return [...groups];
    return [...groups].sort((a, b) => {
      const valA = (a[sortConfig.key] || '').toString().toLowerCase();
      const valB = (b[sortConfig.key] || '').toString().toLowerCase();
      if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
      if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  return (
    <>
        
    
    <div className="bg-white sticky top-24 w-full   p-6 rounded-xl shadow-md border border-gray-200 mb-8 ">
     <h2 className="text-2xl font-semibold text-gray-700 mb-4">All Groups</h2>


  {/* ✅ Scrollable wrapper to keep table inside parent */}
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
      <thead className="bg-gray-50 ">
        <tr>
          <th className="px-2 w-[15%] py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider border-b"  onClick={() => handleSort('name')}>
            Group Name
            <span> {sortConfig.key === 'name' ? (
              sortConfig.direction === 'asc' ? ' 🔼' : ' 🔽'
            ) : (
              ' ↕️'
            )}</span>
          </th>
          <th className="px-2 w-[65%] py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider border-b"  onClick={() => handleSort('domain')}>
            Project Domain
            <span> {sortConfig.key === 'domain' ? (
              sortConfig.direction === 'asc' ? ' 🔼' : ' 🔽'
            ) : (
              ' ↕️'
            )}</span>
          </th>
          <th className="  w-[20%] py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider border-b">
            Actions
          </th>
        </tr>
      </thead>

      <tbody className="bg-white divide-y divide-gray-200">
        {sortedGroups().length > 0 ? (
          sortedGroups().map((group, ind) => (
            <tr
              key={group.id /* better use id not ind */}
              className="hover:bg-gray-50 transition-colors text-center"
            >
              <td className="px-1 py-4 text-sm font-medium text-gray-900">
                {group.name}
              </td>
              <td className="px-1 py-4 text-sm text-gray-500">
                {group.domain}
              </td>
              <td className=" py-4 text-sm font-medium ">
                <button
                  onClick={() => handleReassignClick(group)}
                  className="text-indigo-600 hover:text-indigo-900 px-1 py-1 rounded-md hover:bg-indigo-50 transition-colors"
                >
                  Re-Assign
                </button>
                <button
                  onClick={() => handleViewClick(group)}
                  className="text-indigo-600 hover:text-indigo-900 px-1 py-1 rounded-md hover:bg-indigo-50 transition-colors"
                >
                  View
                </button>
                <button
                  onClick={() => handleDeleteGroup(ind)}
                  className="text-red-600 hover:text-red-900 px-1 py-1 rounded-md hover:bg-red-50 transition-colors"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan="3"
              className="px-6 py-4 text-center text-sm text-gray-500"
            >
              No groups found
            </td>
          </tr>
        )}
      </tbody>
    </table>

    </div>
</div>

      {showReassignModal && tempId && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
  <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl p-6">
        <ReAssignGroup
          gid={tempId}
          group={group}
          onClose={() => {
           setShowReassignModal(false);
            setTempId(null);
          }}
          onSave={(updatedGroup) => {
            // Update the groups list with the updated group
            setGroups(groups.map(g => g.id === updatedGroup.id ? updatedGroup : g));
            setShowReassignModal(false);
            setTempId(null);
          }}

        />
        </div>
        </div>

      )}

      {/* View Modal */}
      {showViewModal && tempId && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl w-full  max-h-[90vh] flex flex-col">
            <ViewGroup
              git={tempId}
              grp={group}
              onClose={() => {
                setShowViewModal(false);
                setTempId(null);
              }}
            />
          </div>
        </div>
      )}
     </>
  );
};

export default GroupsTable;