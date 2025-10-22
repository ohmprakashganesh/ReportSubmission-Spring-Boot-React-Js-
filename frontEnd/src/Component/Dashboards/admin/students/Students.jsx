import React, { useEffect, useState } from 'react';
import { createUser, deleteUser, getAllStudents, getAllUsers } from '../../../services/AdminSer';
import EditUser from '../EditUser';
import RegisterUser from '../RegisterUser';
import StdProfile from './StdProfile';

const Students = () => {
    const [user,setUser]=useState("");
    const [showProfile,setShowProfile]=useState("")
    const [uid, setUid]=useState("");
    const [fetchedUsers, setFetchedUsers] = useState([]);
    const [updateId, setUpdateId] = useState('');
      const [nameFilter, setNameFilter] = useState("");
  const [emailFilter, setEmailFilter] = useState("");
  const [updateState,setUpdateState]=useState(false)


      useEffect(() => {
        const fetchUsers = async () => {
            try {
                const temp = await getAllStudents();
                setFetchedUsers(temp);
                console.log(temp);

            } catch (error) {
                console.log(error);
            }
        };

        fetchUsers();
    }, [updateState]);

    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  

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

    const viewProfile =(tid,usr)=> {
        setUid(tid);
        setUser(usr);
        setShowProfile(true);
        console.log(user);
    }
 
     const handleDelete= async(id)=>{
       const data=await deleteUser(id);
        setUpdateState(!updateState);
       alert("successfully deleted user with id"+ id)
     }
    return (
        <section id="users" className="w-full section-content p-4 sm:p-6 lg:p-8 bg-gray-100 min-h-screen font-sans">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Manage Users</h1>
          {updateId ? <EditUser setUpdateId={setUpdateId} updateState={updateState} setUpdateState={setUpdateState} uid={updateId} /> : <RegisterUser setUpdateState={setUpdateState}  updateState={updateState}/>}
              {/* Search Section */}
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
    value={emailFilter}
    onChange={(e) => setEmailFilter(e.target.value)}
    className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-1/3"
  />
</div>

            {/* User List Table */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h2 className="text-4xl  font-bold text-green-700 mb-4">All Users</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
            <tr>
              <th
                onClick={() => handleSort('name')}
                className="cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg"
              >
                Name 
                {sortConfig.key === 'name' ? (
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">Actions</th>
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
                  <button onClick={() => viewProfile(data.id, data)} className="text-indigo-600 hover:text-indigo-900 mr-3">View Profile</button>
                  <button onClick={()=>handleDelete(data.id)} className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
            {sortedUsers().length === 0 && (
              <tr>
                <td colSpan="4" className="text-center text-gray-500 py-4">No users found</td>
              </tr>
            )}
          </tbody>
                    </table>
                </div>
            </div>
            { showProfile&& uid && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl p-6">
                        <StdProfile
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

export default Students;
