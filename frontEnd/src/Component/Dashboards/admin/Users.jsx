import React from 'react';

const Users = () => {
    return (
        <section id="users" className="section-content">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-8">Manage Users</h1>

            {/* Create New User Form */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mb-8">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Create New User</h2>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input type="text" id="userName" name="userName" className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="John Doe"/>
                    </div>
                    <div>
                        <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input type="email" id="userEmail" name="userEmail" className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="john.doe@example.com"/>
                    </div>
                    <div>
                        <label htmlFor="userRole" className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                        <select id="userRole" name="userRole" className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                            <option value="">Select Role</option>
                            <option value="student">Student</option>
                            <option value="professor">Professor</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="userPassword" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input type="password" id="userPassword" name="userPassword" className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="********"/>
                    </div>
                    <div className="md:col-span-2 flex justify-end">
                        <button type="submit" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
                            Create User
                        </button>
                    </div>
                </form>
            </div>

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
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">John Doe</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">john.doe@example.com</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Student</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                                    <button className="text-red-600 hover:text-red-900">Delete</button>
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Jane Smith</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">jane.smith@example.com</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Professor</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                                    <button className="text-red-600 hover:text-red-900">Delete</button>
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Alice Wonderland</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Alice.w@example.com</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                                    <button className="text-red-600 hover:text-red-900">Delete</button>
                                </td>
                            </tr>
                            {/* More users can be added here */}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default Users;
