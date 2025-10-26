import React, { useState, useEffect, useRef } from 'react';
import MyDetails from './MyDetails';
import SubmittedWorks from '../Students/submittedWorks/SubmittedWorks';
import { Boxes } from 'lucide-react';
import SummeryBoxs from './SummeryBoxs';
import Groups from './Assignedworks/Groups';
import ChatPlaceholder from './Assignedworks/ChatPlaceholder';
import Navbar from './Navbar';
import GroupDetail from './Assignedworks/GroupDetail';
import Sidebar from './Sidebar';
import Landing from './Landing';
import { getAssignmentsOfGroup, getIterationByUser, IterationsByStudent } from '../../services/Assugnment';
import { constUserId } from './Assignedworks/const';
import { getProfile } from '../../services/SuperviserSer';

// Main App component that contains the entire dashboard

const App = () => {

  // State for overall navigation (sidebar tabs)
  const [activeTab, setActiveTab] = useState('dashboard'); // 'assignedWork', 'submittedWorks', 'myDetails', 'chats'

  // States for 'Assigned Work' section
  const [currentView, setCurrentView] = useState('groupList'); // 'groupList' or 'groupDetail'
  const [selectedGroup, setSelectedGroup] = useState(null);


  // Data states
  const [groups, setGroups] = useState([]);
  const [user, setUser]=useState("");
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]); // All submissions for all assignments
const [assignmentsB,setAssignmentsB]=useState([]);
 const [submissionsB,setSubmissionsB]=useState([]);
const [checked,setChecked]=useState([]);
const [unChecked,setUnchecked]=useState([]);
const [profile,setProfile]=useState("");

           useEffect (()=>{
            const fetchProfile = async ()=>{
              try{
              const res= await getProfile();
              setProfile(res);
              console.log("profile",profile)
                  }catch(error){
                 console.log("not logged user");
                  }
            };
            fetchProfile();
           },[])
        console.log(profile)

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
         },[localStorage.getItem("token")]);

          console.log(assignmentsB);

        useEffect(()=>{
           const iterationsByUser=async ()=>{
             try{
               const res=await IterationsByStudent();
               setSubmissionsB(res);
               const temp= res.filter((i)=> i.status==="SUBMITTED");
               const temp2=res.filter((i)=> i.status==="CHECKED")
               setChecked(temp2);
               setUnchecked(temp);


             }catch(error){
               console.log("not found");
             }
            };
           iterationsByUser();
           },[localStorage.getItem("token")]);

           //fetch all the submitted tasks of students
 useEffect(()=>{
const  fetchUser=async ()=>{
    try{
      if(localStorage.getItem("token"))return ;
 const data= await getIterationByUser(constUserId);
    setSubmissions(data);
    console.log("fetched iterations",data);
    }catch(error){
      console.log(error);
    }
  };
  fetchUser();
},[localStorage.getItem("token")]);


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
   <MyDetails profile={profile} />
  // SubmittedWorks Component: Displays all submitted assignments
  //assignment is passed for task name and their submissions
   <SubmittedWorks assignments={assignments} setAssignments={setAssignments} />
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
      <Navbar studentName={profile.name} setActiveTab={setActiveTab} activeTab={activeTab}  setCurrentView={setCurrentView} setSelectedGroup={setSelectedGroup} />
      <div className="w-full  flex flex-row min-h-[80vh]">
          <div className="w-1/5  text-white fixed top-0 left-0 h-screen shadow-lg z-40">
        <Sidebar  setActiveTab={setActiveTab} activeTab={activeTab}  setCurrentView={setCurrentView} setSelectedGroup={setSelectedGroup}/>
          </div>
        {/* Main Content Area */}
           <div className="flex-1 md:ml-[20%]  lg:ml-[20%] xl:ml-[20%] mt-16 p-6 overflow-y-auto h-screen bg-white">
     

          {/* Dynamic Content based on activeTab */}
           {activeTab === 'dashboard' && (
            <>
             <SummeryBoxs  assignments={assignmentsB}
          submissions={submissionsB}
           unChecked={unChecked}
           checked={checked} />

        <Landing 
      assignments={assignmentsB}
      submissions={submissionsB}
      unChecked={unChecked}
      checked={checked}  />
      </>
          )}
          
          {activeTab === 'myDetails' &&
           <MyDetails />}
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
            <SubmittedWorks allAssignments={assignmentsB} allSubmissions={submissionsB} />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
