 export const ReviewSubmissionModal = ({ groupName, assignmentName, onClose }) => {
    // State for review form inputs
    const [overallGrade, setOverallGrade] = useState('');
    const [codeQualityFeedback, setCodeQualityFeedback] = useState('');
    const [functionalityFeedback, setFunctionalityFeedback] = useState('');
    const [documentationFeedback, setDocumentationFeedback] = useState('');
    const [overallFeedback, setOverallFeedback] = useState('');
    const [privateNotes, setPrivateNotes] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real application, send this feedback to a backend
        console.log('Feedback Submitted:', {
            groupName,
            assignmentName,
            overallGrade,
            codeQualityFeedback,
            functionalityFeedback,
            documentationFeedback,
            overallFeedback,
            privateNotes
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl h-5/6 flex flex-col transform transition-all duration-300 scale-100 opacity-100">
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <h3 className="text-2xl font-bold text-gray-800">Review Submission: {groupName} - {assignmentName}</h3>
                    <button className="text-gray-500 hover:text-gray-700 text-2xl" onClick={onClose}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                    <div className="w-full md:w-1/2 p-6 border-r border-gray-200 overflow-y-auto no-scrollbar">
                        <h4 className="text-xl font-semibold text-gray-800 mb-4">Submission Files</h4>
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                            <p className="text-gray-700 font-medium mb-2">Submitted by: <span>{groupName}</span></p>
                            <p className="text-gray-600 text-sm mb-2">Submitted on: <span>Oct 14, 2025, 10:30 PM</span></p>
                            <button className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 text-sm">
                                <i className="fas fa-download mr-2"></i>Download All Files
                            </button>
                        </div>
                        <div className="bg-gray-100 p-6 rounded-lg text-gray-600 text-center flex items-center justify-center h-64 border border-dashed border-gray-300">
                            <p><i className="fas fa-file-code text-4xl text-gray-400 mb-2"></i><br />File Viewer Placeholder (e.g., PDF, Code, Image)</p>
                        </div>
                        <p className="text-sm text-gray-500 mt-4">
                            *In a real application, this area would display the submitted files (e.g., an embedded PDF viewer, a syntax-highlighted code editor, or an image viewer).
                        </p>
                    </div>

                    <div className="w-full md:w-1/2 p-6 overflow-y-auto no-scrollbar">
                        <h4 className="text-xl font-semibold text-gray-800 mb-4">Grading & Feedback</h4>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <label htmlFor="overallGrade" className="block text-gray-700 text-sm font-bold mb-2">Overall Grade (out of 100)</label>
                                <input type="number" id="overallGrade" className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., 85" value={overallGrade} onChange={(e) => setOverallGrade(e.target.value)} />
                            </div>

                            <div className="mb-6">
                                <h5 className="text-lg font-semibold text-gray-800 mb-3">Rubric Evaluation</h5>
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                                    <label className="block text-gray-700 text-base font-bold mb-2">1. Code Quality (30 pts)</label>
                                    <select className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3">
                                        <option value="">Select Score</option>
                                        <option value="excellent">Excellent (26-30 pts)</option>
                                        <option value="good">Good (20-25 pts)</option>
                                        <option value="fair">Fair (15-19 pts)</option>
                                        <option value="poor">Poor (0-14 pts)</option>
                                    </select>
                                    <textarea rows="3" className="shadow-sm appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Specific feedback for code quality..." value={codeQualityFeedback} onChange={(e) => setCodeQualityFeedback(e.target.value)}></textarea>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                                    <label className="block text-gray-700 text-base font-bold mb-2">2. Functionality (40 pts)</label>
                                    <select className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3">
                                        <option value="">Select Score</option>
                                        <option value="excellent">Excellent (36-40 pts)</option>
                                        <option value="good">Good (30-35 pts)</option>
                                        <option value="fair">Fair (20-29 pts)</option>
                                        <option value="poor">Poor (0-19 pts)</option>
                                    </select>
                                    <textarea rows="3" className="shadow-sm appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Specific feedback for functionality..." value={functionalityFeedback} onChange={(e) => setFunctionalityFeedback(e.target.value)}></textarea>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                                    <label className="block text-gray-700 text-base font-bold mb-2">3. Documentation & Presentation (30 pts)</label>
                                    <select className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3">
                                        <option value="">Select Score</option>
                                        <option value="excellent">Excellent (26-30 pts)</option>
                                        <option value="good">Good (20-25 pts)</option>
                                        <option value="fair">Fair (15-19 pts)</option>
                                        <option value="poor">Poor (0-14 pts)</option>
                                    </select>
                                    <textarea rows="3" className="shadow-sm appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Specific feedback for documentation..." value={documentationFeedback} onChange={(e) => setDocumentationFeedback(e.target.value)}></textarea>
                                </div>
                            </div>

                            <div className="mb-6">
                                <label htmlFor="overallFeedback" className="block text-gray-700 text-sm font-bold mb-2">Overall Feedback</label>
                                <textarea id="overallFeedback" rows="5" className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Provide general feedback for the submission..." value={overallFeedback} onChange={(e) => setOverallFeedback(e.target.value)}></textarea>
                            </div>
                            <div className="mb-6">
                                <label htmlFor="privateNotes" className="block text-gray-700 text-sm font-bold mb-2">Private Notes (Only visible to you)</label>
                                <textarea id="privateNotes" rows="3" className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Add private notes about this submission..." value={privateNotes} onChange={(e) => setPrivateNotes(e.target.value)}></textarea>
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button type="button" className="py-3 px-6 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors duration-200 font-medium" onClick={onClose}>Cancel</button>
                                <button type="button" className="py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">Save Draft</button>
                                <button type="submit" className="py-3 px-6 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium">Publish Feedback</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};