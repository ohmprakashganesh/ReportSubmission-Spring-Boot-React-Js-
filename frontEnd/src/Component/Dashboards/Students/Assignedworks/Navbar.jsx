import React from 'react'

const Navbar = ({studentName}) => {
  return (
 
    <nav className="bg-blue-700 p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-white">Student Dashboard</h1>
        <p className="text-lg text-white">Welcome, <span className="font-semibold">{studentName}</span>!</p>
      </div>
    </nav>
  );
  
}

export default Navbar
