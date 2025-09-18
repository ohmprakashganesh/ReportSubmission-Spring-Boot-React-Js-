import React from "react";

const Domain = ({groups}) => {
  return (
    <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Application Domain Projects</h1>
<table className="w-full border-collapse border border-gray-300 shadow-md rounded-lg overflow-hidden">
  <thead className="bg-gray-200">
    <tr>
      <th className="border border-gray-300 px-4 py-2">SN</th>
      <th className="border border-gray-300 px-4 py-2">Group Name</th>
      <th className="border border-gray-300 px-4 py-2">No of Assignments</th>
      <th className="border border-gray-300 px-4 py-2">Domain</th>
    </tr>
  </thead>
  <tbody>
    {groups.map((project, index) => (
      <tr key={project.id} className="hover:bg-gray-100">
        <td className="border border-gray-300 px-4 py-2 text-center">
          {index + 1} {/* Serial number */}
        </td>
        <td className="border border-gray-300 px-4 py-2">
          {project.name} {/* Assuming your object has groupName */}
        </td>
        <td className="border border-gray-300 px-4 py-2 text-center">
          {project.assignments.length} {/* Assuming your object has noOfAssignments */}
        </td>
        <td className="border border-gray-300 px-4 py-2">
          {project.domain}
        </td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
};
export default Domain;
