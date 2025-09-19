import React, { useState } from "react";

const Domain = ({groups}) => {
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

    const handleSortClick = (key) => {
    // toggle logic
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  function sortedGroups() {
    if (!sortConfig.key) return groups;
    const sorted = [...groups].sort((a, b) => {
      const valA = (a[sortConfig.key] || '').toString().toLowerCase();
      const valB = (b[sortConfig.key] || '').toString().toLowerCase();
      if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
      if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }

  return (
    <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Application Domain Projects</h1>
<table className="w-full border-collapse border border-gray-300 shadow-md rounded-lg overflow-hidden">
  <thead className="bg-gray-200">
    <tr>
      <th className="border border-gray-300 px-4 py-2">SN</th>
      <th className="border border-gray-300 px-4 py-2" onClick={() => handleSortClick('name')}>Group Name
         <span>
           {sortConfig.key === 'name' ? (
              sortConfig.direction === 'asc' ? ' 🔼' : ' 🔽'
            ) : (
              ' ↕️'  /* or some neutral sort icon */
            )}
          </span></th>
      <th className="border border-gray-300 px-4 py-2">No of Assignments</th>
      <th className="border border-gray-300 px-4 py-2" onClick={() => handleSortClick('domain')}>Domain
        <span>
          Domain
            {sortConfig.key === 'domain' ? (
              sortConfig.direction === 'asc' ? ' 🔼' : ' 🔽'
            ) : (
              ' ↕️'
            )}
        </span>
      </th>
    </tr>
  </thead>
 
   <tbody>
        {sortedGroups().map((group, idx) => (
          <tr key={group.id}>
            <td className="border border-gray-300 px-4 py-2">{idx + 1}</td>
            <td className="border border-gray-300 px-4 py-2">{group.name}</td>
            <td className="border border-gray-300 px-4 py-2">{group.assignments?.length || 0}</td>
            <td className="border border-gray-300 px-4 py-2">{group.domain}</td>
          </tr>
        ))}
      </tbody>
</table>

    </div>
  );
};
export default Domain;
