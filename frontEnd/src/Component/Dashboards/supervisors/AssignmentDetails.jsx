import { useState } from "react";

export const AssignmentDetails = ({ assignment, course, onNavigate, onReviewSubmission }) => {
    const [activeTab, setActiveTab] = useState('overview');

    // Dummy submission data for a specific assignment
    const submissions = [
        { group: 'Team A', submittedOn: 'Oct 14, 2025, 10:30 PM', status: 'Submitted', grade: '-' },
        { group: 'Team B', submittedOn: 'Oct 15, 2025, 11:00 PM', status: 'Reviewed', grade: '85/100' },
        { group: 'Team C', submittedOn: 'Oct 16, 2025, 09:00 AM (Late)', status: 'Submitted Late', grade: '-' },
    ];

    const filteredSubmissions = (filter) => {
        if (filter === 'all') return submissions;
        if (filter === 'pending') return submissions.filter(s => s.status === 'Submitted' || s.status === 'Submitted Late');
        if (filter === 'reviewed') return submissions.filter(s => s.status === 'Reviewed');
        return submissions;
    };

    return (
        <section id="assignment-details-section" className="content-section">
            <nav className="text-sm text-gray-500 mb-4">
                <span className="cursor-pointer hover:underline" onClick={() => onNavigate('dashboard')}>Dashboard</span> &gt; <span className="cursor-pointer hover:underline" onClick={() => onNavigate('course-details', course)}>{course.name}</span> &gt; <span id="assignment-breadcrumb-name">{assignment.name}</span>
            </nav>
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-semibold text-gray-800" id="assignment-title">{assignment.name}</h3>
                <div className="space-x-3">
                    <button className="py-2 px-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200">
                        <i className="fas fa-edit mr-2"></i>Edit Assignment
                    </button>
                    <button className="py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200">
                        <i className="fas fa-trash-alt mr-2"></i>Delete Assignment
                    </button>
                </div>
            </div>

            <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    <a href="#" className={`assignment-tab-link whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'overview' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`} onClick={() => setActiveTab('overview')} data-assignment-tab="overview">Overview</a>
                    <a href="#" className={`assignment-tab-link whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'submissions' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`} onClick={() => setActiveTab('submissions')} data-assignment-tab="submissions">Submissions</a>
                    <a href="#" className={`assignment-tab-link whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'rubric' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`} onClick={() => setActiveTab('rubric')} data-assignment-tab="rubric">Rubric</a>
                </nav>
            </div>

            {activeTab === 'overview' && (
                <div id="assignment-overview-tab" className="assignment-tab-content">
                    <h4 className="text-xl font-semibold text-gray-800 mb-4">Assignment Overview</h4>
                    <div className="bg-white p-6 rounded-xl shadow-md mb-6">
                        <p className="text-gray-700 mb-4">
                            {assignment.description}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                            <div><strong>Due Date:</strong> {assignment.dueDate}</div>
                            <div><strong>Points:</strong> {assignment.points}</div>
                            <div><strong>Submission Type:</strong> {assignment.submissionType}</div>
                            <div><strong>Assigned To:</strong> {assignment.assignedTo}</div>
                        </div>
                        {assignment.rubric && (
                            <div className="mt-4">
                                <strong>Associated Rubric:</strong> <a href="#" className="text-blue-600 hover:underline">{assignment.rubric}</a>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {activeTab === 'submissions' && (
                <div id="assignment-submissions-tab" className="assignment-tab-content">
                    <h4 className="text-xl font-semibold text-gray-800 mb-4">Submissions</h4>
                    <div className="mb-4 flex space-x-2">
                        <button className="py-2 px-4 rounded-lg text-sm font-medium border border-gray-300 bg-white text-gray-700 hover:bg-gray-50" onClick={() => setActiveTab('submissions')} data-filter="all">All Submissions</button>
                        <button className="py-2 px-4 rounded-lg text-sm font-medium border border-gray-300 bg-white text-gray-700 hover:bg-gray-50" onClick={() => setActiveTab('submissions')} data-filter="pending">Pending Review</button>
                        <button className="py-2 px-4 rounded-lg text-sm font-medium border border-gray-300 bg-white text-gray-700 hover:bg-gray-50" onClick={() => setActiveTab('submissions')} data-filter="reviewed">Reviewed</button>
                    </div>
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Group Name</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted On</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                                    <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredSubmissions(activeTab).map((submission, index) => (
                                    <tr key={index} className="submission-row" data-status={submission.status.toLowerCase().includes('submitted') && !submission.status.toLowerCase().includes('late') ? 'pending' : 'reviewed'}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{submission.group}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{submission.submittedOn}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${submission.status.toLowerCase().includes('reviewed') ? 'bg-green-100 text-green-800' : (submission.status.toLowerCase().includes('late') ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800')}`}>
                                                {submission.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{submission.grade}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button className="text-blue-600 hover:text-blue-900 mr-2" onClick={() => onReviewSubmission(submission.group, assignment.name)}>
                                                <i className="fas fa-eye"></i> {submission.status.toLowerCase().includes('reviewed') ? 'View Feedback' : 'View Submission'}
                                            </button>
                                            <button className="text-gray-600 hover:text-gray-900"><i className="fas fa-download"></i> Download</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'rubric' && (
                <div id="assignment-rubric-tab" className="assignment-tab-content">
                    <h4 className="text-xl font-semibold text-gray-800 mb-4">Rubric for {assignment.name}</h4>
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <div className="mb-4 pb-4 border-b border-gray-200">
                            <h5 className="font-bold text-lg text-gray-800">1. Code Quality (30 points)</h5>
                            <ul className="list-disc list-inside text-gray-700 mt-2">
                                <li><strong>Excellent (26-30 pts):</strong> Clean, well-commented, efficient, and follows best practices.</li>
                                <li><strong>Good (20-25 pts):</strong> Generally clean, some comments, minor inefficiencies.</li>
                                <li><strong>Fair (15-19 pts):</strong> Readable but lacks comments, some structural issues.</li>
                                <li><strong>Poor (0-14 pts):</strong> Unreadable, no comments, significant structural flaws.</li>
                            </ul>
                        </div>
                        <div className="mb-4 pb-4 border-b border-gray-200">
                            <h5 className="font-bold text-lg text-gray-800">2. Functionality (40 points)</h5>
                            <ul className="list-disc list-inside text-gray-700 mt-2">
                                <li><strong>Excellent (36-40 pts):</strong> All required features fully implemented and bug-free.</li>
                                <li><strong>Good (30-35 pts):</strong> Most features implemented, minor bugs.</li>
                                <li><strong>Fair (20-29 pts):</strong> Some features missing or significant bugs.</li>
                                <li><strong>Poor (0-19 pts):</strong> Core features not working or missing.</li>
                            </ul>
                        </div>
                        <div className="mb-4 pb-4">
                            <h5 className="font-bold text-lg text-gray-800">3. Documentation & Presentation (30 points)</h5>
                            <ul className="list-disc list-inside text-gray-700 mt-2">
                                <li><strong>Excellent (26-30 pts):</strong> Clear, concise documentation; professional presentation.</li>
                                <li><strong>Good (20-25 pts):</strong> Adequate documentation; decent presentation.</li>
                                <li><strong>Fair (15-19 pts):</strong> Minimal documentation; disorganized presentation.</li>
                                <li><strong>Poor (0-14 pts):</strong> No documentation; unprofessional presentation.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};