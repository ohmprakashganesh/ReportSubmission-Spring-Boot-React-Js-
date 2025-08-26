import React from 'react'

const MyDetails = (student) => {
  return (

    
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">My Details</h2>
      <div className="space-y-2 text-gray-700">
        <p><strong>Name:</strong> {student.name}</p>
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>Role:</strong> {student.role}</p>
      </div>
    </div>
 
  )
}

export default MyDetails
