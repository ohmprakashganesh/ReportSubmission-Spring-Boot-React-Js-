import React from 'react'

const RecentScans = () => {
  return (
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold text-[#1A4B6B]">Recent Scans</h3>
                        <a href="#" className="text-[#1A4B6B] hover:underline text-sm font-medium">View All Scans</a>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">Website URL</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date/Time</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issues</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">Action</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-[#4B5563]">https://example.com</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-[#4B5563]">2025-06-05 10:00 AM</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#D9534F] font-medium">12 Critical</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-[#06C755]/10 text-[#06C755]">Completed</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button className="text-[#1A4B6B] hover:text-[#256D9C] hover:underline focus:outline-none">View Report</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-[#4B5563]">https://anothersite.org</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-[#4B5563]">2025-06-04 03:30 PM</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#FFB200] font-medium">3 Warnings</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-[#FFB200]/10 text-[#FFB200]">Completed</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button className="text-[#1A4B6B] hover:text-[#256D9C] hover:underline focus:outline-none">View Report</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-[#4B5563]">https://test-site.net</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-[#4B5563]">2025-06-03 09:15 AM</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#06C755] font-medium">0 Issues</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-300/10 text-gray-500">In Progress</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button className="text-[#1A4B6B] hover:text-[#256D9C] hover:underline focus:outline-none">View Progress</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
  )
}

export default RecentScans
