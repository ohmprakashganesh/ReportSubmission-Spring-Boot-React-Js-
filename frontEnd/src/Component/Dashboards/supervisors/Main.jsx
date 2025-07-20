import React, { useState } from "react";
import { Bell, LogOut, Send, Upload, Printer, FileText } from "lucide-react";
import Navbar from "../Navbar";

const SupervisorDashboard = () => {
  const [assignmentType, setAssignmentType] = useState("text");

  return (

       <>
 <div className="sticky top-0 z-50 bg-white shadow">
    {/* <Navbar title="Welcome to Student Dashboard" />
  </div>  
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow border-r p-6">
        <div className="mb-10">
          <img
            src="https://randomuser.me/api/portraits/men/45.jpg"
            alt="Profile"
            className="w-16 h-16 rounded-full mx-auto mb-2"
          />
          <h2 className="text-center text-lg font-semibold text-gray-800">
            Mr. Ganesh
          </h2>
          <p className="text-center text-sm text-gray-500">Supervisor</p>
        </div>
        <nav className="space-y-4 text-gray-700">
          <a href="#" className="block px-4 py-2 rounded hover:bg-gray-200">
            Dashboard
          </a>
          <a href="#" className="block px-4 py-2 rounded hover:bg-gray-200">
            Assign Tasks
          </a>
          <a href="#" className="block px-4 py-2 rounded hover:bg-gray-200">
            Submissions
          </a>
          <a href="#" className="block px-4 py-2 rounded hover:bg-gray-200">
            Feedback
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Supervisor Dashboard</h1>
          <div className="flex items-center gap-4">
            <Bell className="text-gray-500 cursor-pointer" />
            <LogOut className="text-gray-500 cursor-pointer" />
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: "Total Assigned", value: 10 },
            { label: "Reviewed", value: 7 },
            { label: "Pending", value: 3 },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow border"
            >
              <p className="text-sm text-gray-500">{item.label}</p>
              <p className="text-2xl font-bold text-gray-800">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Assign Task */}
        <div className="bg-white p-6 rounded-lg shadow border mb-10">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Assign Task</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Group</label>
              <select className="w-full border rounded px-3 py-2">
                <option>Group A</option>
                <option>Group B</option>
                <option>Group C</option>
              </select>
            </div>

            {/* Assignment Type Toggle */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Assignment Type</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="assignmentType"
                    value="text"
                    checked={assignmentType === "text"}
                    onChange={() => setAssignmentType("text")}
                  />
                  Text
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="assignmentType"
                    value="pdf"
                    checked={assignmentType === "pdf"}
                    onChange={() => setAssignmentType("pdf")}
                  />
                  Upload PDF
                </label>
              </div>
            </div>

            {assignmentType === "text" ? (
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Assignment Content
                </label>
                <textarea
                  className="w-full border rounded px-3 py-2"
                  rows={4}
                  placeholder="Describe the assignment..."
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Upload PDF
                </label>
                <input
                  type="file"
                  accept="application/pdf"
                  className="border px-3 py-2 rounded w-full"
                />
              </div>
            )}

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
            >
              <Send size={16} /> Assign Task
            </button>
          </form>
        </div>

        {/* Received Submissions */}
        <div className="mb-10">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Submissions</h2>
          <div className="space-y-4">
            {[
              { group: "Group A", file: "projectA.pdf", date: "Jun 24, 2025" },
              { group: "Group B", file: "taskB.pdf", date: "Jun 23, 2025" },
            ].map((submission, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow border flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{submission.group}</p>
                  <p className="text-sm text-gray-500">
                    {submission.file} - {submission.date}
                  </p>
                </div>
                <div className="flex gap-3">
                  <a
                    href={`/pdfs/${submission.file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    View
                  </a>
                  <a
                    href={`/pdfs/${submission.file}`}
                    download
                    className="text-green-600 underline"
                  >
                    Download
                  </a>
                  <button
                    onClick={() => window.print()}
                    className="text-gray-700 hover:text-black flex items-center"
                  >
                    <Printer size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Give Feedback */}
        <div className="bg-white p-6 rounded-lg shadow border mb-10">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Provide Feedback</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Group</label>
              <select className="w-full border rounded px-3 py-2">
                <option>Group A</option>
                <option>Group B</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Feedback</label>
              <textarea
                className="w-full border rounded px-3 py-2"
                rows={3}
                placeholder="Write your feedback..."
              />
            </div>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center gap-2"
            >
              <Send size={16} /> Submit Feedback
            </button>
          </form>
        </div>
      </main> 
    </div>
    </>
  );
};

export default SupervisorDashboard;
