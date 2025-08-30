import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../../services/AdminSer';

const Default = () => {
      const [tUsers, setUsers]=useState([]);
         
        useEffect(()=>{
         const  totalUsers= async ()=>{
                try{
                    const totalUsers= await getAllUsers();
                   setUsers(totalUsers);
                }catch(error){
                    console.log(error);
                }
            };
            totalUsers();
        },[]);
    return (
        <section id="dashboard" className="section-content">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-8">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-700 mb-3">Total Users</h2>
                    <p className="text-5xl font-bold text-blue-600">{tUsers.length}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-700 mb-3">Total Professors</h2>
                    <p className="text-5xl font-bold text-green-600">{tUsers.filter(user=>user.role=="SUPERVISER").length}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-700 mb-3">Active Groups</h2>
                    <p className="text-5xl font-bold text-purple-600"></p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-700 mb-3">Pending Proposals</h2>
                    <p className="text-5xl font-bold text-yellow-600">{}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-700 mb-3">Approved Proposals</h2>
                    <p className="text-5xl font-bold text-teal-600">42</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-700 mb-3">Rejected Proposals</h2>
                    <p className="text-5xl font-bold text-red-600">5</p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mb-8">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Recent User Activity</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Student John Doe submitted "Research Proposal on AI" (2 hours ago)</li>
                    <li>Professor Jane Smith approved "Quantum Computing Project" (1 day ago)</li>
                    <li>Admin created new group "Group Alpha" (3 days ago)</li>
                    <li>Student Alice Wonderland updated profile (4 days ago)</li>
                </ul>
            </div>
        </section>
        
    );
};

export default Default;
