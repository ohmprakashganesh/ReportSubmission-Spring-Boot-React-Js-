import { useState } from "react";

export const CourseDetails = ({ course, assignments, groups, students, onNavigate, onAssignTask, onViewAssignment, onViewGroup }) => {
    const [activeTab, setActiveTab] = useState('assignments');

    return (
        <section id="course-details-section" className="content-section">
            <nav className="text-sm text-gray-500 mb-4">
                <span className="cursor-pointer hover:underline" onClick={() => onNavigate('dashboard')}>Dashboard</span> &gt; <span id="course-breadcrumb-name">{course.name}</span>
            </nav>
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-semibold text-gray-800" id="course-title">{course.name}</h3>
                <div className="space-x-3">
                    <button className="py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200" onClick={onAssignTask}>
                        <i className="fas fa-plus mr-2"></i>Assign Task
                    </button>
                    <button className="py-2 px-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200">
                        <i className="fas fa-users-cog mr-2"></i>Manage Students
                    </button>
                </div>
            </div>

            <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    <a href="#" className={`tab-link whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'assignments' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`} onClick={() => setActiveTab('assignments')} data-tab="assignments">Assignments</a>
                    <a href="#" className={`tab-link whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'groups' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`} onClick={() => setActiveTab('groups')} data-tab="groups">Groups</a>
                    <a href="#" className={`tab-link whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'students' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`} onClick={() => setActiveTab('students')} data-tab="students">Students</a>
                    <a href="#" className={`tab-link whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'grades' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`} onClick={() => setActiveTab('grades')} data-tab="grades">Grades</a>
                </nav>
            </div>

            {activeTab === 'assignments' && (
                <div id="assignments-tab" className="tab-content">
                    <h4 className="text-xl font-semibold text-gray-800 mb-4">Assignments</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {assignments.map(assignment => (
                            <div key={assignment.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
                                <h5 className="text-lg font-bold text-gray-800 mb-2">{assignment.name}</h5>
                                <p className="text-gray-600 text-sm mb-3">Due: {assignment.dueDate}</p>
                                <div className="flex items-center text-gray-700 mb-2">
                                    <i className="fas fa-upload mr-2 text-blue-500"></i>
                                    <span>{assignment.submissionsReceived}/{assignment.totalSubmissions} Submissions Received</span>
                                </div>
                                <div className="flex items-center text-gray-700 mb-4">
                                    <i className="fas fa-clipboard-check mr-2 text-green-500"></i>
                                    <span>{assignment.reviewsCompleted}/{assignment.totalReviews} Submissions Reviewed</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <button className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200" onClick={() => onViewAssignment(assignment)}>View Details</button>
                                    <div className="flex space-x-2">
                                        <button className="p-2 rounded-full hover:bg-gray-200 text-gray-600"><i className="fas fa-edit"></i></button>
                                        <button className="p-2 rounded-full hover:bg-gray-200 text-red-600"><i className="fas fa-trash-alt"></i></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'groups' && (
                <div id="groups-tab" className="tab-content">
                    <h4 className="text-xl font-semibold text-gray-800 mb-4">Groups</h4>
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Group Name</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Members</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned Tasks</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                                    <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {groups.map((group, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{group.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{group.members.join(', ')}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {group.projects.map(p => p.name).join(', ')}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <div className="w-24 bg-gray-200 rounded-full h-2.5">
                                                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${group.progress || 0}%` }}></div>
                                            </div>
                                            <span className="text-xs text-gray-600">{group.progress || 0}%</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button className="text-blue-600 hover:text-blue-900 mr-2" onClick={() => onViewGroup(group)}>
                                                <i className="fas fa-eye"></i> View
                                            </button>
                                            <button className="text-gray-600 hover:text-gray-900 mr-2"><i className="fas fa-edit"></i> Edit</button>
                                            <button className="text-red-600 hover:text-red-900"><i className="fas fa-trash-alt"></i> Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'students' && (
                <div id="students-tab" className="tab-content">
                    <h4 className="text-xl font-semibold text-gray-800 mb-4">Students</h4>
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student ID</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Group</th>
                                    <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {students.map(student => (
                                    <tr key={student.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.group || 'N/A'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button className="text-blue-600 hover:text-blue-900 mr-2"><i className="fas fa-eye"></i> View Profile</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'grades' && (
                <div id="grades-tab" className="tab-content">
                    <h4 className="text-xl font-semibold text-gray-800 mb-4">Grades Overview</h4>
                    <p className="text-gray-600">This section would display a comprehensive gradebook for the course.</p>
                    <div className="bg-white p-6 rounded-xl shadow-md mt-4">
                        <p className="text-gray-700">Gradebook content goes here (e.g., student names, assignment scores, total grades).</p>
                    </div>
                </div>
            )}
        </section>
    );
};