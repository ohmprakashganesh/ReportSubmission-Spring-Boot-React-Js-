import React from "react";
import { UserPlus, FileText, Users, BookOpen, Bell, LogOut } from "lucide-react";
import Navbar from "../Navbar";

const AdminDashboard = () => {
  return (
       <>
 <div className="sticky top-0 z-50 bg-white shadow">
    <Navbar title="WelCome to Admin Dashboard" />
  </div> 
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow border-r p-6">
        <div className="mb-10">
          <img
            src="https://randomuser.me/api/portraits/men/12.jpg"
            alt="Admin"
            className="w-16 h-16 rounded-full mx-auto mb-2"
          />
          <h2 className="text-center text-lg font-semibold text-gray-800">
            Admin
          </h2>
          <p className="text-center text-sm text-gray-500">Super Admin</p>
        </div>
        <nav className="space-y-4 text-gray-700">
          <a href="#" className="block px-4 py-2 rounded hover:bg-gray-200">Dashboard</a>
          <a href="#" className="block px-4 py-2 rounded hover:bg-gray-200">Manage Students</a>
          <a href="#" className="block px-4 py-2 rounded hover:bg-gray-200">Manage Supervisors</a>
          <a href="#" className="block px-4 py-2 rounded hover:bg-gray-200">Groups</a>
          <a href="#" className="block px-4 py-2 rounded hover:bg-gray-200">Reports</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <Bell className="text-gray-500 cursor-pointer" />
            <LogOut className="text-gray-500 cursor-pointer" />
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card title="Total Students" value="45" icon={<Users className="text-blue-600" />} />
          <Card title="Total Supervisors" value="12" icon={<UserPlus className="text-green-600" />} />
          <Card title="Total Assignments" value="30" icon={<BookOpen className="text-yellow-600" />} />
          <Card title="Total Submissions" value="86" icon={<FileText className="text-purple-600" />} />
        </div>

        {/* Manage Students */}
        <Section title="Manage Students">
          <Table
            headers={["ID", "Name", "Email", "Group", "Actions"]}
            rows={[
              ["S001", "Alice Johnson", "alice@example.com", "Group A"],
              ["S002", "Bob Smith", "bob@example.com", "Group B"],
            ]}
          />
        </Section>

        {/* Manage Supervisors */}
        <Section title="Manage Supervisors">
          <Table
            headers={["ID", "Name", "Email", "Group", "Actions"]}
            rows={[
              ["SP001", "Dr. Rahul", "rahul@example.com", "Group A"],
              ["SP002", "Ms. Anita", "anita@example.com", "Group B"],
            ]}
          />
        </Section>

        {/* Group Assignment */}
        <Section title="Group Assignment">
          <form className="space-y-4 bg-white shadow border p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Group Name</label>
                <input type="text" className="w-full border px-3 py-2 rounded" placeholder="Group C" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Assign Students</label>
                <select multiple className="w-full border px-3 py-2 rounded">
                  <option>Alice Johnson</option>
                  <option>Bob Smith</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Assign Supervisor</label>
                <select className="w-full border px-3 py-2 rounded">
                  <option>Dr. Rahul</option>
                  <option>Ms. Anita</option>
                </select>
              </div>
            </div>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Create Group & Assign
            </button>
          </form>
        </Section>
      </main>
    </div>
    </>
  );
};

// Reusable components

const Card = ({ title, value, icon }) => (
  <div className="bg-white p-6 rounded-lg shadow border flex items-center justify-between">
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
    <div className="text-3xl">{icon}</div>
  </div>
);

const Section = ({ title, children }) => (
  <div className="mb-10">
    <h2 className="text-lg font-semibold text-gray-800 mb-4">{title}</h2>
    {children}
  </div>
);

const Table = ({ headers, rows }) => (
  <div className="overflow-x-auto bg-white rounded-lg shadow border">
    <table className="w-full text-left table-auto">
      <thead className="bg-gray-100 text-gray-700 font-semibold">
        <tr>
          {headers.map((header, idx) => (
            <th key={idx} className="px-4 py-2 border-b">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, idx) => (
          <tr key={idx} className="border-t">
            {row.map((cell, i) => (
              <td key={i} className="px-4 py-2">{cell}</td>
            ))}
            <td className="px-4 py-2 space-x-2">
              <button className="text-blue-600 hover:underline">Edit</button>
              <button className="text-red-600 hover:underline">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default AdminDashboard;
