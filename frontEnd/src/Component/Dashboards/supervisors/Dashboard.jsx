import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import Sidebar1 from './Sidebar1';
import { CoursesSection } from './AssignmentSection';
import { GroupsSection } from './GroupSection';
import { StudentsSection } from './StudentSection';
import { SettingsSection } from './SettingSection';
import { GroupDetails } from './GroupDetails';
import { getUser } from '../../services/AdminSer';
import { getProfile, SupervisedStudents, supervisorKoGroups, TotalChecked } from '../../services/SuperviserSer';


// Main App Component
const DashboardU = () => {

    const [user,setUser]=useState("");
    const[students,setStudents]=useState([]);
    const[groups,setGroups]= useState([]);
    const[totalFeedback,setTotalFeedback]=useState("");
    
    // State for managing current section/page
    const [currentSection, setCurrentSection] = useState('dashboard');
    const [currentCourse, setCurrentCourse] = useState(null); // Stores selected course data
    const [currentAssignment, setCurrentAssignment] = useState(null); // Stores selected assignment data
    const [currentGroup, setCurrentGroup] = useState(null); // Stores selected group data

    // State for modal visibility
    const [showAssignTaskModal, setShowAssignTaskModal] = useState(false);
    const [showReviewSubmissionModal, setShowReviewSubmissionModal] = useState(false);
    const [reviewModalData, setReviewModalData] = useState({ groupName: '', assignmentName: '' });
    const tempId=28;
    
    //total feedback  given by supervisor
    useEffect(()=>{
        const total = async ()=>{
            const data=await TotalChecked();
            setTotalFeedback(data);
        }
        total();
    },[])

//fetching the supervisor
     useEffect(()=>{
        const fetchUser=async ()=>{
            try{
                const res= await getProfile();
                 setUser(res);
            }catch(error){
                console.log(error);
            }
        };
          fetchUser();
     },[]);

//fetching supervised students
       useEffect(()=>{
        const fetchUser=async ()=>{
            try{
                const res= await SupervisedStudents (tempId);
                 setStudents(res);
                 console.log("students",students);
            }catch(error){
                console.log(error);
            }
        };
          fetchUser();
     },[]);
//fetching all  groups of particular supervisor
    useEffect(()=>{
        const fetchUser=async ()=>{
            try{
                const res= await supervisorKoGroups(tempId);
                 setGroups(res);
                 console.log(groups);
            }catch(error){
                console.log(error);
            }
        };
          fetchUser();
     },[]);
     
//collecting all assignments of all groups
   const allAssignments = groups.flatMap((group) => group.assignments);
     console.log( "all assignments",allAssignments);

    

    // Dummy Data (replace with actual data fetching in a real application)
   

   

  

   
    

    // Handlers for navigation
    const setComponent = (section, data = null) => {
        setCurrentSection(section);
        if (section === 'course-details') {
            setCurrentCourse(data);
            setCurrentAssignment(null); // Reset assignment when changing course
            setCurrentGroup(null); // Reset group when changing course
        } else if (section === 'assignment-details') {
            setCurrentAssignment(data);
            setCurrentGroup(null); // Reset group when changing assignment
        } else if (section === 'group-details') {
            setCurrentGroup(data);
            setCurrentAssignment(null); // Reset assignment when changing group
        } else {
            setCurrentCourse(null);
            setCurrentAssignment(null);
            setCurrentGroup(null);
        }
    };

    // Handlers for modals
    const openAssignTaskModal = () => setShowAssignTaskModal(true);
    const closeAssignTaskModal = () => setShowAssignTaskModal(false);

    const openReviewSubmissionModal = (groupName, assignmentName) => {
        setReviewModalData({ groupName, assignmentName });
        setShowReviewSubmissionModal(true);
    };
    const closeReviewSubmissionModal = () => setShowReviewSubmissionModal(false);

    // Determine current section title for header
    const getSectionTitle = () => {
        switch (currentSection) {
            case 'dashboard': return 'Dashboard Overview';
            case 'courses': return 'All Courses';
            case 'groups': return 'All Groups';
            case 'students': return 'All Students';
            case 'settings': return 'Settings';
            case 'course-details': return currentCourse ? currentCourse.name : 'Course Details';
            case 'assignment-details': return currentAssignment ? currentAssignment.name : 'Assignment Details';
            case 'group-details': return currentGroup ? currentGroup.name : 'Group Details';
            default: return 'Dashboard Overview';
        }
    };
    console.log("total groups are",groups);
    return (
        <>   <Navbar currentSection={currentSection}  name={user.name}  title={getSectionTitle()} setCurrentSection={setCurrentSection}/>
        <div className="sm:flex-row   flex h-screen border-t-2   overflow-scroll">
            <Sidebar1 currentSection={currentSection} onNavigate={setComponent} />

            <main className="flex-1 mt-14 flex flex-col bg-gray-100 overflow-y-auto">
                {/* <Header /> */}

                <div className="p-6 flex-1 overflow-y-auto">
                    {currentSection === 'dashboard' && (
                        <Dashboard
                            totalFeedback={totalFeedback}
                            groups={groups}
                            students={students}
                            onViewCourse={course => setComponent('course-details', course)}
                            onReviewSubmission={openReviewSubmissionModal}
                        />
                    )}
                    {currentSection === 'courses' && (
                        <CoursesSection
                            groups={groups}    
                            onViewCourse={course => setComponent('course-details', course)}
                        />
                    )}
                    {currentSection === 'groups' && (
                        <GroupsSection
                            groups={groups}
                            onViewGroup={group => setComponent('group-details', group)}
                        />
                    )}
                    {currentSection === 'students' && (
                        <StudentsSection studentsData={students} />
                    )}
                    {currentSection === 'settings' && (
                        <SettingsSection user={user} />
                    )}
                    {/* {currentSection === 'course-details' && currentCourse && (
                        <CourseDetails
                            course={currentCourse}
                            assignments={assignmentsData[currentCourse.id] || []}
                            groups={groupsData[currentCourse.id] || []}
                            students={studentsData.filter(s => s.courses.includes(currentCourse.id))}
                            onNavigate={setComponent}
                            onAssignTask={openAssignTaskModal}
                            onViewAssignment={assignment => setComponent('assignment-details', assignment)}
                            onViewGroup={group => setComponent('group-details', group)}
                        />
                    )} */}
                    {currentSection === 'assignment-details' && currentAssignment && (
                        <AssignmentDetails
                            assignment={currentAssignment}
                            course={currentCourse} // Pass currentCourse for breadcrumbs
                            onNavigate={setComponent}
                            onReviewSubmission={openReviewSubmissionModal}
                        />
                    )}
                    {currentSection === 'group-details' && currentGroup && (
                        <GroupDetails
                            group={currentGroup}
                            onNavigate={setComponent}
                            onReviewSubmission={openReviewSubmissionModal}
                        />
                    )}
                </div>
            </main>

            {showAssignTaskModal && (
                <AssignTaskModal onClose={closeAssignTaskModal} />
            )}
            {showReviewSubmissionModal && (
                <ReviewSubmissionModal
                    groupName={reviewModalData.groupName}
                    assignmentName={reviewModalData.assignmentName}
                    onClose={closeReviewSubmissionModal}
                />
            )}
        </div>
        </>
    );
};

const Dashboard = ({ students, totalFeedback, groups, dashboardProposals, onReviewSubmission }) => {

   const Assignments=groups.flatMap((group)=>group.assignments);
   const iterations=Assignments.flatMap((itr)=>itr.iterations);


      
    return (
        <section id="dashboard-section" className="content-section">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm">Total Assignments</p>
                        <p className="text-3xl font-bold text-gray-800">{Assignments.length}</p>
                    </div>
                    <i className="fas fa-book text-5xl text-blue-200"></i>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm">total Groups</p>
                        <p className="text-3xl font-bold text-gray-800">{groups.length}</p>
                    </div>
                    <i className="fas fa-clipboard-check text-5xl text-green-200"></i>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm">Total Students</p>
                        <p className="text-3xl font-bold text-gray-800">{students.length}</p>
                    </div>
                    <i className="fas fa-calendar-alt text-5xl text-yellow-200"></i>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm">Total Reviewed</p>
                        <p className="text-3xl font-bold text-gray-800">{totalFeedback}</p>
                    </div>
                    <i className="fas fa-calendar-alt text-5xl text-yellow-200"></i>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm">Total Submissions</p>
                        <p className="text-3xl font-bold text-gray-800">{iterations.length}</p>
                    </div>
                    <i className="fas fa-calendar-alt text-5xl text-yellow-200"></i>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm">Total Pending</p>
                        <p className="text-3xl font-bold text-gray-800">{iterations.length - totalFeedback}</p>
                    </div>
                    <i className="fas fa-calendar-alt text-5xl text-yellow-200"></i>
                </div>
                
            </div>
            <DashboardCharts iterations={iterations}  totalFeedback={totalFeedback} Assignments={Assignments} groups={groups} students={students} />

        </section>
    );
};
export default DashboardU;


import { 
    BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, 
    CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

const DashboardCharts = ({ iterations, totalFeedback, Assignments, groups, students }) => {

    const [chartData1, setChartData1] = useState([]);
    const [chartData2, setChartData2] = useState([]);

    useEffect(() => {
        // Data for the first chart: Assignments, Students, Groups
        const newData1 = [
            { name: 'Total Assignments', count: Assignments?.length || 0 },
            { name: 'Total Students', count: students?.length || 0 },
            { name: 'Total Groups', count: groups?.length || 0 },
        ];
        setChartData1(newData1);

        // Data for the second chart: Submissions, Reviewed, Pending
        // FIX: totalSubmissions is already a number from iterations?.length
        const totalSubmissions = iterations?.length || 0;
        // FIX: totalSubmissions is already a number, so remove .length
        const totalPending = totalSubmissions - (totalFeedback || 0);

        const newData2 = [
            // FIX: totalSubmissions is a number, not an array. Remove .length
            { name: 'Reviewed', count: totalFeedback || 0 },
            { name: 'Pending', count: totalPending },
        ];
        setChartData2(newData2);

    }, [iterations, totalFeedback, Assignments, groups, students]);
    
    // Define colors for the PieChart segments
    const COLORS = ['#0088FE', '#FFBB28'];

    return (
        <div className='flex-col md:p-2 md:gap-5 p-20 gap-40'>
            <div className='flex md:p-0 md:gap-5 md:flex-row lg:flex-row sm:flex-col' >
               
            
              <div style={{ width: '100%', maxWidth: '600px', margin: 'auto' }}>
                <h3 style={{ textAlign: 'center' }}>Total Assignments, Students, and Groups</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                        data={chartData1}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        barSize={40} // Increased bar size
                    >
                        <defs>
                            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.8} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar 
                            dataKey="count" 
                            fill="url(#barGradient)" // Use the gradient
                            isAnimationActive={true} // Add animation
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            {/* Chart 2: Total Submissions, Reviewed, and Pending (PieChart) */}
            <div style={{ width: '100%', maxWidth: '600px', margin: 'auto', textAlign: 'center' }}>
                <h3 style={{ textAlign: 'center' }}>Total Submissions: {iterations?.length || 0}</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={chartData2}
                            dataKey="count"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#8884d8"
                            label
                        >
                            {
                                chartData2.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))
                            }
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
             </div>
           <h3 className=" p-5 font-bold text-3xl text-center  underline-offset underline text-gray-800 mb-4">Summery  Representation </h3>

        </div>
    );
};

// const DashboardCharts = ({ iterations, totalFeedback, Assignments, groups, students }) => {

//     const [chartData1, setChartData1] = useState([]);
//     const [chartData2, setChartData2] = useState([]);

//     useEffect(() => {
//         // Data for the first chart: Assignments, Students, Groups
//         const newData1 = [
//             { name: 'Total Assignments', count: Assignments?.length || 0 },
//             { name: 'Total Students', count: students?.length || 0 },
//             { name: 'Total Groups', count: groups?.length || 0 },
//         ];
//         setChartData1(newData1);

//         // Data for the second chart: Submissions, Reviewed, Pending
//         // FIX: totalSubmissions is already a number from iterations?.length
//         const totalSubmissions = iterations?.length || 0;
//         // FIX: totalSubmissions is already a number, so remove .length
//         const totalPending = totalSubmissions - (totalFeedback || 0);

//         const newData2 = [
//             // FIX: totalSubmissions is a number, not an array. Remove .length
//             { name: 'Reviewed', count: totalFeedback || 0 },
//             { name: 'Pending', count: totalPending },
//         ];
//         setChartData2(newData2);

//     }, [iterations, totalFeedback, Assignments, groups, students]);
    
//     // Define colors for the PieChart segments
//     const COLORS = ['#0088FE', '#FFBB28'];

//     return (
//         <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', padding: '20px' }}>
            
//             {/* Chart 1: Total Assignments, Students, and Groups (BarChart) */}
//             <div style={{ width: '100%', maxWidth: '600px', margin: 'auto' }}>
//                 <h3 style={{ textAlign: 'center' }}>Total Assignments, Students, and Groups</h3>
//                 <ResponsiveContainer width="100%" height={300}>
//                     <BarChart
//                         data={chartData1}
//                         margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//                     >
//                         <CartesianGrid strokeDasharray="3 3" />
//                         <XAxis dataKey="name" />
//                         <YAxis />
//                         <Tooltip />
//                         <Legend />
//                         <Bar dataKey="count" fill="#8884d8" />
//                     </BarChart>
//                 </ResponsiveContainer>
//             </div>
            
//             {/* Chart 2: Total Submissions, Reviewed, and Pending (PieChart) */}
//             <div style={{ width: '100%', maxWidth: '600px', margin: 'auto', textAlign: 'center' }}>
//                 <h3 style={{ textAlign: 'center' }}>Total Submissions: {iterations?.length || 0}</h3>
//                 <ResponsiveContainer width="100%" height={300}>
//                     <PieChart>
//                         <Pie
//                             data={chartData2}
//                             dataKey="count"
//                             nameKey="name"
//                             cx="50%"
//                             cy="50%"
//                             outerRadius={100}
//                             fill="#8884d8"
//                             label
//                         >
//                             {
//                                 chartData2.map((entry, index) => (
//                                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                                 ))
//                             }
//                         </Pie>
//                         <Tooltip />
//                         <Legend />
//                     </PieChart>
//                 </ResponsiveContainer>
//             </div>
//         </div>
//     );
// };

// const DashboardCharts = ({iterations, totalFeedback,Assignments,groups, students}) => {

//   const [chartData1, setChartData1] = useState([]);
//     const [chartData2, setChartData2] = useState([]);

//     useEffect(() => {
//         // Data for the first chart: Assignments, Students, Groups
//         const newData1 = [
//             { name: 'Total Assignments', count: Assignments?.length || 0 },
//             { name: 'Total Students', count: students?.length || 0 },
//             { name: 'Total Groups', count: groups?.length || 0 },
//         ];
//         setChartData1(newData1);

//         // Data for the second chart: Submissions, Reviewed, Pending
//         const totalSubmissions = iterations?.length || 0;
//         const totalPending = totalSubmissions.length - (totalFeedback || 0);

//         const newData2 = [
//             { name: 'Total Submitted', count: totalSubmissions.length },
//             { name: 'Reviewed', count: totalFeedback || 0 },
//             { name: 'Pending', count: totalPending },
//         ];
//         setChartData2(newData2);

//     }, [iterations, totalFeedback, Assignments, groups, students]);
    
//     return (
//         <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', padding: '20px' }}>
            
//             {/* Chart 1: Total Assignments, Students, and Groups */}
//             <div style={{ width: '100%', maxWidth: '600px', margin: 'auto' }}>
//                 <h3 style={{ textAlign: 'center' }}>Total Assignments, Students, and Groups</h3>
//                 <ResponsiveContainer width="100%" height={300}>
//                     <BarChart
//                         data={chartData1}
//                         margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//                     >
//                         <CartesianGrid strokeDasharray="3 3" />
//                         <XAxis dataKey="name" />
//                         <YAxis />
//                         <Tooltip />
//                         <Legend />
//                         <Bar dataKey="count" fill="#8884d8" />
//                     </BarChart>
//                 </ResponsiveContainer>
//             </div>
            
//             {/* Chart 2: Total Submissions, Reviewed, and Pending */}
//             <div style={{ width: '100%', maxWidth: '600px', margin: 'auto' }}>
//                 <h3 style={{ textAlign: 'center' }}>Total Submissions, Reviewed, and Pending</h3>
//                 <ResponsiveContainer width="100%" height={300}>
//                     <BarChart
//                         data={chartData2}
//                         margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//                     >
//                         <CartesianGrid strokeDasharray="3 3" />
//                         <XAxis dataKey="name" />
//                         <YAxis />
//                         <Tooltip />
//                         <Legend />
//                         <Bar dataKey="count" fill="#82ca9d" />
//                     </BarChart>
//                 </ResponsiveContainer>
//             </div>
//         </div>
//     );
// };