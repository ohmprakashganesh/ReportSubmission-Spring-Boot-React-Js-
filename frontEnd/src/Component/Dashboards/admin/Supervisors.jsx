import React, { useEffect, useState } from 'react';
import { createUser, getAllSupervisors, getAllUsers } from '../../services/AdminSer';
import EditUser from './EditUser';
import RegisterUser from './RegisterUser';
import { UserProfile } from './Profile';

const Supervisors = () => {
          const [user,setUser]=useState("");
          const[uid,setUid]= useState("");
       const [showProfile,setShowProfile]=useState("")
    const [fetchedUsers, setFetchedUsers]= useState([]);
   const [updateId, setUpdateId]=useState('');
         const [nameFilter, setNameFilter] = useState("");
     const [emailFilter, setEmailFilter] = useState("");

     const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

   


   if(updateId){
    console.log(updateId)
   }

       const viewProfile =(tid,usr)=> {
           setUid(tid);
           setUser(usr);
           setShowProfile(true);
           console.log(user);
       }

    useEffect(()=>{
   const fetchUsers = async ()=>{
    try{
        const temp= await getAllSupervisors();
        setFetchedUsers(temp);
        console.log(temp);

    }catch(error){
        console.log(error);
    }
};     
fetchUsers();
    },[]);
    

  const filteredUsers = fetchedUsers.filter(user => {
    const matchesName = user.name.toLowerCase().includes(nameFilter.toLowerCase());
    const matchesEmail = user.email.toLowerCase().includes(emailFilter.toLowerCase());
    return matchesName && matchesEmail;
  });

     const sortedUsers = () => {
    if (!sortConfig.key) return [...filteredUsers];
    return [...filteredUsers].sort((a, b) => {
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
    <section id="users" className="section-content p-4 sm:p-6 lg:p-8 bg-gray-100 min-h-screen font-sans">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Manage Users</h1>
         
        { updateId? <EditUser setUpdateId={setUpdateId} uid={updateId} />: <RegisterUser />  }

            {/* User List Table */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                           <h2 className="text-2xl font-semibold text-gray-700 mb-4">All Users</h2>
                           <div className="overflow-x-auto">
                               <table className="min-w-full divide-y divide-gray-200">
                                   <thead className="bg-gray-50">
                                       <tr>
                                           <th
                onClick={() => handleSort('name')}
                className="cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg"
              >
                Name    {sortConfig.key === 'name' ? (
              sortConfig.direction === 'asc' ? ' 🔼' : ' 🔽'
            ) : (
              ' ↕️')}
              </th>
              <th
                onClick={() => handleSort('email')}
                className="cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Email    {sortConfig.key === 'email' ? (
              sortConfig.direction === 'asc' ? ' 🔼' : ' 🔽'
            ) : (
              ' ↕️')}
              </th>
                                           <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                           <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">Actions</th>
                                       </tr>
                                   </thead>
                                   <tbody className="bg-white divide-y divide-gray-200">
                                       {sortedUsers().map((data, ind) => (
                                           <tr key={ind}>
                                               <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{data.name}</td>
                                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.email}</td>
                                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.role}</td>
                                               <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                   <button onClick={() => setUpdateId(data.id)} className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                                                   <button onClick={() => viewProfile(data.id,data)} className="text-indigo-600 hover:text-indigo-900 mr-3">view Profile</button>
           
                                                   <button className="text-red-600 hover:text-red-900">Delete</button>
                                               </td>
                                           </tr>
                                       ))}
                                   </tbody>
                               </table>
                           </div>
                       </div>
                       { showProfile&& uid && (
                           <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
                               <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl p-6">
                                   <UserProfile
                                       uid={uid}
                                       user={user}
                                       setShowProfile={setShowProfile}
                                      />
                               </div>
                               
                           </div>
                           )};
                       </section>
    );
};

export default Supervisors;
