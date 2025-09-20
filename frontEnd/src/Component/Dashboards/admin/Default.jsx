import React, { useEffect, useState } from "react";
import { getAllUsers, getGroups } from "../../services/AdminSer";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

const COLORS = ["#2563eb", "#16a34a", "#f59e0b", "#dc2626"];

const Default = () => {


  const [tUsers, setUsers] = useState([]);
    const [groups, setGroups] = useState([]);


  useEffect(() => {
    const totalUsers = async () => {
      try {
        const totalUsers = await getAllUsers();
        setUsers(totalUsers);
      } catch (error) {
        console.log(error);
      }
    };
    totalUsers();
  }, []);


   useEffect(() => {
      const fetchGroups = async () => {
        try {
          const response = await getGroups();
          setGroups(response);
        } catch (error) {
          console.error('Error fetching groups:', error);
          // Consider adding error state handling here
        }
      };
      fetchGroups();
    }, []);

  // Role distribution
  const roleData = [
    {
      name: "Students",
      value: tUsers.filter((u) => u.role === "STUDENT").length,
    },
    {
      name: "Supervisors",
      value: tUsers.filter((u) => u.role === "SUPERVISER").length,
    },
    { name: "Admins", value: tUsers.filter((u) => u.role === "ADMIN").length },
  ];

  // Proposal stats (dummy data for now)
  const proposalData = [
    { name: "Pending", value: 18 },
    { name: "Approved", value: 42 },
  ];

  return (
    <section id="dashboard" className="section-content p-6">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8">
        📊 Admin Dashboard
      </h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-gray-600 mb-2">
            Total Users
          </h2>
          <p className="text-5xl font-bold text-blue-600">{tUsers.length}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-gray-600 mb-2">
            Total Professors
          </h2>
          <p className="text-5xl font-bold text-green-600">
            {tUsers.filter((u) => u.role === "SUPERVISER").length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-gray-600 mb-2">
            Active Groups
          </h2>
          <p className="text-5xl font-bold text-purple-600">{groups.length}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            User Roles Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={roleData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {roleData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Proposals Overview
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={proposalData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#2563eb" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

export default Default;
