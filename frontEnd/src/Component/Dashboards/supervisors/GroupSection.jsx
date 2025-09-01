export const GroupsSection = ({ groupsData, onViewGroup }) => {
    return (
        <section id="groups-section" className="content-section">
            <nav className="text-sm text-gray-500 mb-4">
                <span className="cursor-pointer hover:underline" data-section="dashboard">Dashboard</span> &gt; All Groups
            </nav>
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">All Groups</h3>
            <div className="bg-white rounded-xl shadow-md overflows">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Group Name</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Members</th>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {groupsData.map((group, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{group.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{group.members.join(', ')}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        className="text-blue-600 hover:text-blue-900 mr-2"
                                        onClick={() => onViewGroup(group)}
                                    >
                                        <i className="fas fa-eye"></i> View Group
                                    </button>
                                    <button className="text-gray-600 hover:text-gray-900 mr-2"><i className="fas fa-edit"></i> Edit</button>
                                    <button className="text-red-600 hover:text-red-900"><i className="fas fa-trash-alt"></i> Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};