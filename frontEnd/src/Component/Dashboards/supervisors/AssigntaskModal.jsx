export const AssignTaskModal = ({ onClose }) => {
    // Basic state for form inputs (can be expanded)
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [dueTime, setDueTime] = useState('');
    const [points, setPoints] = useState('');
    const [assignTo, setAssignTo] = useState('all-groups');

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real application, you'd send this data to a backend or state management
        console.log('New Assignment:', { title, description, dueDate, dueTime, points, assignTo });
        onClose(); // Close modal after submission
    };

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-8 transform transition-all duration-300 scale-100 opacity-100">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-800">Assign New Task</h3>
                    <button className="text-gray-500 hover:text-gray-700 text-2xl" onClick={onClose}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="taskTitle" className="block text-gray-700 text-sm font-bold mb-2">Assignment Title</label>
                        <input type="text" id="taskTitle" className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., Project Alpha" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="taskDescription" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                        <textarea id="taskDescription" rows="6" className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Detailed instructions and requirements..." value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="dueDate" className="block text-gray-700 text-sm font-bold mb-2">Due Date</label>
                            <input type="date" id="dueDate" className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
                        </div>
                        <div>
                            <label htmlFor="dueTime" className="block text-gray-700 text-sm font-bold mb-2">Due Time</label>
                            <input type="time" id="dueTime" className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" value={dueTime} onChange={(e) => setDueTime(e.target.value)} required />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="points" className="block text-gray-700 text-sm font-bold mb-2">Points/Weight</label>
                        <input type="number" id="points" className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., 100" value={points} onChange={(e) => setPoints(e.target.value)} />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Assign To</label>
                        <div className="flex items-center space-x-4">
                            <label className="inline-flex items-center">
                                <input type="radio" name="assignTo" value="all-groups" className="form-radio text-blue-600 h-5 w-5" checked={assignTo === 'all-groups'} onChange={(e) => setAssignTo(e.target.value)} />
                                <span className="ml-2 text-gray-700">All Groups</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input type="radio" name="assignTo" value="specific-groups" className="form-radio text-blue-600 h-5 w-5" checked={assignTo === 'specific-groups'} onChange={(e) => setAssignTo(e.target.value)} />
                                <span className="ml-2 text-gray-700">Specific Groups</span>
                            </label>
                        </div>
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button type="button" className="py-3 px-6 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors duration-200 font-medium" onClick={onClose}>Cancel</button>
                        <button type="submit" className="py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">Create Assignment</button>
                    </div>
                </form>
            </div>
        </div>
    );
};