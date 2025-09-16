import React, { useState, useEffect, useRef } from 'react';
import MyDetails from './MyDetails';
import SubmittedWorks from './SubmittedWorks';
import { Boxes } from 'lucide-react';
import SummeryBoxs from './Assignedworks/SummeryBoxs';
import Groups from './Assignedworks/Groups';
import ChatPlaceholder from './Assignedworks/ChatPlaceholder';
import Navbar from './Assignedworks/Navbar';
import GroupDetail from './Assignedworks/GroupDetail';
import Sidebar from './Assignedworks/Sidebar';
import { getUser } from '../../services/StudetServ';
import Landing from './Assignedworks/Landing';
import { getAssignmentsOfGroup, IterationsByStudent } from '../../services/Assugnment';

// Main App component that contains the entire dashboard

const App = () => {
  // State for overall navigation (sidebar tabs)
  const [activeTab, setActiveTab] = useState('assignedWork'); // 'assignedWork', 'submittedWorks', 'myDetails', 'chats'

  // States for 'Assigned Work' section
  const [currentView, setCurrentView] = useState('groupList'); // 'groupList' or 'groupDetail'
  const [selectedGroup, setSelectedGroup] = useState(null);

  // Data states
  const [groups, setGroups] = useState([]);
  const [user, setUser]=useState("");
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]); // All submissions for all assignments

  // Mock student data (as provided by the user)
 

  // console.log("data after api call", groups);
  // useEffect(() => {
  //   const callUser= async ()=>{
  //     const data= getUser();
  //     setStudent(data);

  //   };
  //   callUser();
  // }, []);

  //   const[user,setUser]= useState([]);

const [assignmentsB,setAssignmentsB]=useState([]);
 const [submissionsB,setSubmissionsB]=useState([]);
const [checked,setChecked]=useState([]);
const [unChecked,setUnchecked]=useState([]);


         useEffect(()=>{
           const assignmentsOfGroup= async()=>{
             try{
               const res= await getAssignmentsOfGroup();
               setAssignmentsB(res);
             }catch(error){
               console.log("not found");
             }
       
           };
           assignmentsOfGroup();
       
         },[]);


 useEffect(()=>{
           const iterationsByUser=async ()=>{
             try{
               const res=await IterationsByStudent();
               setSubmissionsB(res);
               const temp= res.filter((i)=> i.status==="SUBMITTED");
               const temp2=res.filter((i)=> i.status==="APPROVED")
               setChecked(temp2);
               setUnchecked(temp);


             }catch(error){
               console.log("not found");
             }
       
           };
           iterationsByUser(); },[]);

useEffect(()=>{
const  fetchUser=async ()=>{
    try{
 const data= await getUser(12);
    setUser(data);
    console.log("fetched user",data);
    }catch(error){
      console.log(error);
    }
  };
  fetchUser();
},[]);


 useEffect(()=>{
const  fetchUser=async ()=>{
    try{
 const data= await getIterationByUser(12);
    setSubmissions(data);
    console.log("fetched iterations",data);
    }catch(error){
      console.log(error);
    }
  };
  fetchUser();
},[]);


  // Function to switch view to group details (used within 'assignedWork' tab)
  const handleViewGroup = (group) => {
    console.log(group);
    setSelectedGroup(group);
    setCurrentView('groupDetail');
  };

  // Function to switch view back to group list (used within 'assignedWork' tab)
  const handleBackToGroups = () => {
    setSelectedGroup(null);
    setCurrentView('groupList');
  };


  // Function to handle assignment submission (mock implementation)
  const handleSubmitAssignment = (assignmentId, file) => {
    console.log(`Submitting file: ${file.name} for assignment: ${assignmentId}.`);
    // In a real application, you would send this file to a backend API.
    // For demonstration, we'll simulate adding a new pending submission.
    const newSubmission = {
      id: `s${submissions.length + 1}`, // Simple ID generation
      assignmentId: assignmentId,
      iteration:
        Math.max(
          0,
          ...submissions
            .filter((s) => s.assignmentId === assignmentId)
            .map((s) => s.iteration)
        ) + 1,
      dateSubmitted: new Date().toISOString(),
      status: 'Pending',
      feedback: null,
      fileUrl: `https://placehold.co/200x100/000000/FFFFFF?text=Submitted_${file.name}`, // Placeholder file
    };
    setSubmissions((prevSubmissions) => [...prevSubmissions, newSubmission]);
    console.log('Submission simulated successfully!');
  };



  <>
    <Navbar/>
  <Boxes assignments={assignments} submissions={submissions} /> 
  // --- Sidebar Components ---
  // myDetails 
   <MyDetails />
  // SubmittedWorks Component: Displays all submitted assignments
  //assignment is passed for task name and their submissions
   <SubmittedWorks user={user} assignments={assignments} setAssignments={setAssignments} />
    //chat space 
    <ChatPlaceholder/>
   </>


  return (
    // Tailwind CSS for basic styling and responsiveness
    <div className="min-h-screen bg-gray-100 m-0 font-sans antialiased">
      {/* Tailwind CSS CDN for quick setup */}
      <script src="https://cdn.tailwindcss.com"></script>
      {/* Google Fonts - Inter */}
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>
        {`
          body {
            font-family: 'Inter', sans-serif;
          }
        `}
      </style>
      <Navbar studentName={user.name} setActiveTab={setActiveTab} activeTab={activeTab}  setCurrentView={setCurrentView} setSelectedGroup={setSelectedGroup} />
      <div className="w-full  p-4 flex  flex-col lg:flex-row min-h-[80vh]">
        <Sidebar setActiveTab={setActiveTab} activeTab={activeTab}  setCurrentView={setCurrentView} setSelectedGroup={setSelectedGroup}/>

        {/* Main Content Area */}
        <div className="flex-grow mt-12 min-h-screen p-6 lg:p-8 bg-white rounded-b-xl lg:rounded-r-xl lg:rounded-bl-none shadow-lg">
          {/* Dashboard Summary */}
          <SummeryBoxs  assignments={assignmentsB}
          submissions={submissionsB}
           unChecked={unChecked}
           checked={checked} />
         

          {/* Dynamic Content based on activeTab */}
           {activeTab === 'dashboard' && (
        <Landing 
      assignments={assignmentsB}
      submissions={submissionsB}
      unChecked={unChecked}
      checked={checked}  />
          )}
          {activeTab === 'myDetails' &&
           <MyDetails user={user} />}
          {activeTab === 'assignedWork' && (
            currentView === 'groupList' ? (
              <Groups groups={groups} onViewGroup={handleViewGroup} />
            ) : (
             <GroupDetail
           group={selectedGroup}
           assignments={selectedGroup.assignments}   // ✅ directly from group
            onBack={handleBackToGroups}
            onSubmitAssignment={handleSubmitAssignment}
            allSubmissions={submissions}
/>
            )
          )}
          {activeTab === 'submittedWorks' && (
            <SubmittedWorks allAssignments={assignments} allSubmissions={submissions} />
          )}
          {activeTab === 'chats' && <ChatPlaceholder />}
        </div>
      </div>
    </div>
  );
};

export default App;
