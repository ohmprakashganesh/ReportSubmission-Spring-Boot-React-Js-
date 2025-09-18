import { use, useState } from "react";
import { RxAvatar } from "react-icons/rx";
import { UserProfile } from "./UserProfile";

export const StudentsSection = ({ studentsData }) => {
    const[showProfile, setShowProfile]=useState(false)
    const[user,setUser]=useState("")
    
    const viewProfile=(data)=>{
        setShowProfile(true);
        setUser(data);
    }
    return (
        <section id="students-section" className="content-section">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">All Students</h3>
            <div className="bg-white rounded-xl shadow-md overflow-x-scroll">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grouped In</th>
                            <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {studentsData.map(student => (
                            <tr key={student.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.group.name}</td>

                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={()=>viewProfile(student)} className="flex items-center text-blue-600 hover:text-blue-900 mr-2 space-x-2">

                                        <img
                                            src="https://i.pravatar.cc/40"
                                            alt="avatar"
                                            className="w-8 h-8 rounded-full border border-gray-300 shadow-sm"
                                        />


                                        <span className="flex items-center space-x-1">
                                            <i className="fas fa-eye"></i>
                                            <span>View Profile</span>
                                        </span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
             { showProfile && (
                           <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
                               <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl p-6">
                                   <UserProfile
                                       user={user}
                                       setShowProfile={setShowProfile}
                                      />
                               </div>
                               
                           </div>
                           )};
        </section>
    );
};
