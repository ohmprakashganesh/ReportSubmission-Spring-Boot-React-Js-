// import { useState } from "react";

// export const CourseDetails = ({ course, assignments, onNavigate, onAssignTask, onViewAssignment, onViewGroup }) => {
//     const [activeTab, setActiveTab] = useState('assignments');

//     return (
//         <section id="course-details-section" className="content-section">
//             <nav className="text-sm text-gray-500 mb-4">
//                 <span className="cursor-pointer hover:underline" onClick={() => onNavigate('dashboard')}>Dashboard</span> &gt; <span id="course-breadcrumb-name">{course.name}</span>
//             </nav>
//             <div className="flex items-center justify-between mb-6">
//                 <h3 className="text-2xl font-semibold text-gray-800" id="course-title">{course.name}</h3>
//                 <div className="space-x-3">
//                     <button className="py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200" onClick={onAssignTask}>
//                         <i className="fas fa-plus mr-2"></i>Assign Task
//                     </button>
//                     <button className="py-2 px-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200">
//                         <i className="fas fa-users-cog mr-2"></i>Manage Students
//                     </button>
//                 </div>
//             </div>

//             <div className="border-b border-gray-200 mb-6">
//                 <nav className="-mb-px flex space-x-8" aria-label="Tabs">
//                     <h2> name of Assignment </h2>
//                 </nav>
//             </div>

//             {activeTab === 'assignments' && (
//                 <div id="assignments-tab" className="tab-content">
//                     <h4 className="text-xl font-semibold text-gray-800 mb-4">Assignments</h4>
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                         {assignments.map(assignment => (
//                             <div key={assignment.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
//                                 <h5 className="text-lg font-bold text-gray-800 mb-2">{assignment.name}</h5>
//                                 <p className="text-gray-600 text-sm mb-3">Due: {assignment.dueDate}</p>
//                                 <div className="flex items-center text-gray-700 mb-2">
//                                     <i className="fas fa-upload mr-2 text-blue-500"></i>
//                                     <span>{assignment.submissionsReceived}/{assignment.totalSubmissions} Submissions Received</span>
//                                 </div>
//                                 <div className="flex items-center text-gray-700 mb-4">
//                                     <i className="fas fa-clipboard-check mr-2 text-green-500"></i>
//                                     <span>{assignment.reviewsCompleted}/{assignment.totalReviews} Submissions Reviewed</span>
//                                 </div>
//                                 <div className="flex justify-between items-center">
//                                     <button className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200" onClick={() => onViewAssignment(assignment)}>View Details</button>
//                                     <div className="flex space-x-2">
//                                         <button className="p-2 rounded-full hover:bg-gray-200 text-gray-600"><i className="fas fa-edit"></i></button>
//                                         <button className="p-2 rounded-full hover:bg-gray-200 text-red-600"><i className="fas fa-trash-alt"></i></button>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             )}
//         </section>
//     );
// };