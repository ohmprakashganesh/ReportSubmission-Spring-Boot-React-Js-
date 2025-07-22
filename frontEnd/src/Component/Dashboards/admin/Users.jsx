import React, { useEffect, useState } from 'react';
import { createUser, getAllUsers } from '../../services/AdminSer';
import EditUser from './EditUser';
import RegisterUser from './RegisterUser';

const Users = () => {
    const [fetchedUsers, setFetchedUsers]= useState([]);
   const [id, setId]=useState('');
   if(id){
    console.log(id)
   }

    useEffect(()=>{
   const fetchUsers = async ()=>{
    try{
        const temp= await getAllUsers();
        setFetchedUsers(temp);
        console.log(temp);

    }catch(error){
        console.log(error);
    }
};     

fetchUsers();
    },[]);
  return (
    <section id="users" className="section-content p-4 sm:p-6 lg:p-8 bg-gray-100 min-h-screen font-sans">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Manage Users</h1>
         
        { id? <EditUser uid={id} />: <RegisterUser />  }
      <div className=' font-bold text-3xl text-green-700'>hello mother fucker , are you fine and well doing </div>
     
  

            {/* User List Table */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">All Users</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {fetchedUsers.map((data, ind)=>(
                                 <tr key={ind}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{data.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.role}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button onClick={()=>setId(data.id)} className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                                    <button className="text-red-600 hover:text-red-900">Delete</button>
                                </td>
                            </tr>
                          ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default Users;
