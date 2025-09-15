import React from 'react'

const SummeryBoxs = ({ assignments,user, submissions}) => {
  console.log("summery",user)
       const totalAssignments = assignments.length;
    const totalSubmissions = submissions.length;
    const totalPending = submissions.filter(s => s.status === 'Pending').length;
    const totalAccepted = submissions.filter(s => s.status === 'Accepted').length;
    const totalRejected = submissions.filter(s => s.status === 'Rejected').length;


    console.log(totalAccepted, totalPending, totalAccepted, totalRejected);
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold text-gray-700">Total Assignments</h3>
          <p className="text-3xl font-bold text-blue-600">{}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold text-gray-700">Total Submissions</h3>
          <p className="text-3xl font-bold text-blue-600">{totalSubmissions}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold text-gray-700">Pending</h3>
          <p className="text-3xl font-bold text-yellow-600">{totalPending}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold text-gray-700">Accepted</h3>
          <p className="text-3xl font-bold text-green-600">{totalAccepted}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold text-gray-700">Rejected</h3>
          <p className="text-3xl font-bold text-red-600">{totalRejected}</p>
        </div>
      </div>
    );
  };
export default SummeryBoxs;
