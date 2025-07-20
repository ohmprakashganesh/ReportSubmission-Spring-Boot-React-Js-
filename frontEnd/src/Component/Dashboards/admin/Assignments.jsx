import React from 'react';

const Assignment = () => {
    return (
        <section id="proposals" className="section-content">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-8">Manage Proposals</h1>

            {/* Proposal List Table */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">All Proposals</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">Title</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted By</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Group</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Research Proposal on AI</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">John Doe</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Group Alpha</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                                    <button className="text-green-600 hover:text-green-900 mr-3">Approve</button>
                                    <button className="text-red-600 hover:text-red-900">Reject</button>
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Quantum Computing Project</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Alice Wonderland</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Group Beta</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Approved</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                                    <button className="text-green-600 hover:text-green-900 mr-3" disabled>Approve</button>
                                    <button className="text-red-600 hover:text-red-900">Reject</button>
                                </td>
                            </tr>
                            {/* More proposals can be added here */}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default Assignment;
