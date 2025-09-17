import React from "react";

const ApplicationDomainProjects = () => {
  // Example projects grouped under application domain
  const projects = [
    { id: 1, name: "Hospital Management System", domain: "WEB" },
    { id: 2, name: "Online Banking System", domain: "Android" },
    { id: 3, name: "Educational Learning Platform", domain: "Cloud Based" },
    { id: 4, name: "Mobile Gaming App", domain: "IOS" },
    { id: 5, name: "Weather Forecasting System", domain: "Desktop" },
    { id: 6, name: "E-commerce Platform", domain: "IOT" },
    { id: 7, name: "AI Chatbot", domain: "Game Dev" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Application Domain Projects</h1>
      <table className="w-full border-collapse border border-gray-300 shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Project Name</th>
            <th className="border border-gray-300 px-4 py-2">Domain</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2 text-center">
                {project.id}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {project.name}
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
export default ApplicationDomainProjects;
