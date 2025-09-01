export const CoursesSection = ({ coursesData, onViewCourse }) => {
    return (
        <section id="courses-section" className="content-section">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">All Courses</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {coursesData.map(course => (
                    <div key={course.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer" onClick={() => onViewCourse(course)}>
                        <h4 className="text-lg font-bold text-gray-800 mb-2">{course.name}</h4>
                        <p className="text-gray-600 text-sm mb-4">{course.semester}</p>
                        <div className="flex items-center text-gray-700 mb-2">
                            <i className="fas fa-user-graduate mr-2 text-blue-500"></i>
                            <span>{course.students} Students</span>
                        </div>
                        <div className="flex items-center text-gray-700 mb-2">
                            <i className="fas fa-tasks mr-2 text-purple-500"></i>
                            <span>{course.assignments} Active Assignments</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                            <i className="fas fa-hourglass-half mr-2 text-red-500"></i>
                            <span>{course.pendingReviews} Submissions Pending Review</span>
                        </div>
                        <button className="mt-4 w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200" onClick={(e) => { e.stopPropagation(); onViewCourse(course); }}>View Course</button>
                    </div>
                ))}
            </div>
        </section>
    );
};