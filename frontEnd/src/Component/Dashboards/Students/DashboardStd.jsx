import React from "react";
import { Bell, LogOut, Home, FileText, BookOpen, Send, MessageSquare } from "lucide-react";
import Navbar from "../Navbar";
import Main from "./Main";

const DashboardStd = () => {
  return (
    <>
 <div className="sticky top-0 z-50 bg-white shadow">
    <Navbar title="Welcome to Student Dashboard" />
  </div>  
    <div className="min-h-screen flex  bg-gray-100">
     
      {/* Sidebar */}
      <aside className="w-64 bg-white p-6 border-r">
        <div className="flex items-center gap-4 mb-8">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Profile"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h3 className="font-bold text-gray-800">John Doe</h3>
            <p className="text-sm text-gray-500">Ɑ Capises Enroll</p>
          </div>
        </div>

        <nav className="flex flex-col gap-4 text-gray-700">
          <SidebarItem icon={<Home size={18} />} text="Dashboard" active />
          <SidebarItem icon={<FileText size={18} />} text="My Details"  />
          <SidebarItem icon={<BookOpen size={18} />} text="Assignments" />
          <SidebarItem icon={<Send size={18} />} text="Submitted Work" />
          <SidebarItem icon={<MessageSquare size={18} />} text="Messages" />
        </nav>

        <div className="absolute bottom-6 left-6 text-sm text-gray-500">
          <p>Quick Links</p>
          <div className="flex gap-2 text-xs mt-1">
            <a href="#" className="underline">Academic Calendar</a>
            <a href="#" className="underline">Support</a>
            <a href="#" className="underline">Resources</a>
          </div>
        </div>
      </aside>
      <Main />

      {/* Main content */}
  {/* <main className="flex-1 p-8"> */}
  {/* Header */}
  {/* <div className="flex justify-between items-center mb-6">
    <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
    <div className="flex items-center gap-4">
      <Bell className="text-gray-500 cursor-pointer" />
      <LogOut className="text-gray-500 cursor-pointer" />
    </div>
  </div> */}

  {/* Summary Cards */}
  {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
    <div className="bg-white p-6 rounded-lg shadow border">
      <p className="text-sm text-gray-500">Total Assignments</p>
      <p className="text-xl font-bold text-gray-800">5</p>
    </div>
    <div className="bg-white p-6 rounded-lg shadow border">
      <p className="text-sm text-gray-500">Total Submissions</p>
      <p className="text-xl font-bold text-gray-800">3</p>
    </div>
    <div className="bg-white p-6 rounded-lg shadow border">
      <p className="text-sm text-gray-500">Recent Submission</p>
      <p className="text-base font-medium text-gray-800">Assignment A - Sep 18</p>
    </div>
  </div> */}

  {/* Upcoming Assignments */}
  {/* <div className="mb-10">
    <h2 className="text-lg font-semibold text-gray-800 mb-2">Upcoming Assignments</h2>
    <div className="space-y-4">
      <AssignmentCard title="Assignment 1" due="Sep 25" />
      <AssignmentCard title="Assignment 2" due="Oct 3" />
    </div>
  </div> */}

  {/* Iterative Submission */}
  {/* <div className="mb-10">
    <h2 className="text-lg font-semibold text-gray-800 mb-2">Iterative Submission</h2>
    <div className="bg-white p-4 rounded-lg shadow-sm border flex justify-between items-center">
      <div>
        <p className="font-medium">Draft Uploaded</p>
        <p className="text-sm text-gray-500">Sep 20</p>
      </div>
      <button className="text-blue-600 underline">Upload Revision</button>
    </div>
  </div>  */}

  {/* Recently Submitted */}
  {/* <div>
    <h2 className="text-lg font-semibold text-gray-800 mb-2">Recently Submitted</h2>
    <div className="space-y-3">
      <SubmittedItem title="Assignment A" date="Sep 18" grade="A" feedback="Well done!" />
      <SubmittedItem title="Assignment B" date="Sep 15" grade="B+" />
    </div>
  </div>
</main> */}

    </div>
    </>
  );
};


const SidebarItem = ({ icon, text, active }) => (
  <div className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer 
    ${active ? "bg-blue-100 text-blue-600 font-semibold" : "hover:bg-gray-100"}`}>
    {icon}
    <span>{text}</span>
  </div>
);

const AssignmentCard = ({ title, due }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm border flex justify-between items-center">
    <div>
      <h3 className="font-semibold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-500">Due {due}</p>
    </div>
    <div className="text-right">
      <p className="text-sm text-red-500">Incomplete</p>
      <button className="mt-1 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
        Submit
      </button>
    </div>
  </div>
);

const SubmittedItem = ({ title, date, grade, feedback }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm border">
    <div className="flex justify-between items-center">
      <div>
        <h4 className="font-semibold text-gray-800">{title}</h4>
        {feedback && <p className="text-sm text-gray-600">{feedback}</p>}
      </div>
      <div className="text-right text-sm text-gray-600">
        <p>Submitted {date}</p>
        <p className="font-medium">Grade: {grade}</p>
      </div>
    </div>
  </div>

);

export default DashboardStd;
