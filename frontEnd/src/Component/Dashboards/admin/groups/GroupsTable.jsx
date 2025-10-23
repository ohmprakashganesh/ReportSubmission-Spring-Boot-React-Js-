import React, { useEffect, useState } from 'react';
import { deleteGroup, getGroups } from '../../../services/AdminSer';
import ReAssignGroup from './ReAssignGroup';
import ViewGroup from './ViewGroup';
import { User } from 'lucide-react';

const GroupsTable = () => {
  const [groups, setGroups] = useState([]);
  const [group, setGroup]=useState('')
  const [showReassignModal, setShowReassignModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  // const [selectedGroup, setSelectedGroup] = useState(null);
  const [tempId, setTempId] = useState(null);
        const [nameFilter, setNameFilter] = useState("");
    const [domainFilter, setDomainFilter] = useState("");
    const[supervisorFilter,setSupervisorFilter]=useState("");

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

  console.log(groups);

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

  const handleDeleteGroup =async (ind) => {
    if (window.confirm(`Are you sure you want to delete group "${groupName}"?`)) {
      // Add your delete logic here
      const deleteItem= await deleteGroup(ind);
      console.log('Deleting group:', ind);
    }
  };



  //sorting  logic here 
 const filteredGroups = groups.filter(group => {
  const matchesName = (group.name || '').toLowerCase().includes(nameFilter.toLowerCase());
  const matchesDomain = (group.domain || '').toLowerCase().includes(domainFilter.toLowerCase());
  const matchSupervisor=(group.supervisor.name|| '').toLowerCase().includes(supervisorFilter.toLowerCase());
  return matchesName && matchesDomain && matchSupervisor;
});


 
  const sortedGroups = () => {
    if (!sortConfig.key) return [...filteredGroups];
    return [...filteredGroups].sort((a, b) => {
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
    {sortedGroups &&(
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
  <input
    type="text"
    placeholder="Search by name..."
    value={nameFilter}
    onChange={(e) => setNameFilter(e.target.value)}
    className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-1/3"
  />
  <input
    type="text"
    placeholder="Search by email..."
    value={domainFilter}
    onChange={(e) => setDomainFilter(e.target.value)}
    className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-1/3"
  />
   <input
    type="text"
    placeholder="Search by supervisor..."
    value={supervisorFilter}
    onChange={(e) => setSupervisorFilter(e.target.value)}
    className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-1/3"
  />
</div>
    )}
    <div className="bg-white sticky top-24 w-full   p-6 rounded-xl shadow-md border border-gray-200 mb-8 ">
     <h2 className="text-2xl font-semibold text-gray-700 mb-4">All Groups</h2>


  {/* ✅ Scrollable wrapper to keep table inside parent */}
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
      <thead className="bg-gray-50 ">
        <tr>
          <th className="px-2 w-[25%] py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider border-b"  onClick={() => handleSort('name')}>
            Group Name
          
          </th>
          <th className="px-2 w-[25%] py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider border-b"  onClick={() => handleSort('domain')}>
            Project Domain
           
          </th>
           <th className="px-2 w-[25%] py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider border-b"  onClick={() => handleSort('domain')}>
            Supervisor Name
           
          </th>
          <th className="  w-[25%] py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider border-b">
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
               <td className="px-1 py-4 text-sm text-gray-500">
              {group.supervisor.name}
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
  <div className="relative  inset-0 z-50 bg to-white bg-opacity-50 flex items-center justify-center">
    <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl h-[90vh] overflow-y-auto relative">
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