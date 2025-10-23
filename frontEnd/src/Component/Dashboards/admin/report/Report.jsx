import React, { useEffect, useState, useRef } from "react";
import { 
  getAllAssignments, 
  getGroups, 
  getStudents, 
  reportAssignments, 
  reportGroup, 
  reportSupervisor 
} from "../../../services/AdminSer";

const Report = () => {
  const [activeTab, setActiveTab] = useState("students");
  const [students, setStudents] = useState([]);
  const [supervisors, setSupervisors] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [groups, setGroups] = useState([]);

  // Ref to the table container
  const tableRef = useRef(null);

  // Fetch data
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getStudents();
        setStudents(data);
      } catch (error) { console.log(error); }
    };
    fetchStudents();
  }, []);

  useEffect(() => {
    const fetchSupervisors = async () => {
      try {
        const data = await reportSupervisor();
        setSupervisors(data);
      } catch (error) { console.log(error); }
    };
    fetchSupervisors();
  }, []);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const data = await reportGroup();
        setGroups(data);
      } catch (error) { console.log(error); }
    };
    fetchGroups();
  }, []);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const data = await reportAssignments();
        setAssignments(data);
      } catch (error) { console.log(error); }
    };
    fetchAssignments();
  }, []);

  // Print function
  const handlePrint = () => {
    if (!tableRef.current) return;
    window.print();
  };

  // Dynamic table renderer
  const renderTable = () => {
    switch (activeTab) {
      case "students":
        return (
          <table className="w-full text-sm text-left mt-4 border" ref={tableRef}>
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">SN</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Group</th>
                <th className="border p-2">Domain</th>
                <th className="border p-2">Supervisor</th>
                <th className="border p-2">Assignments</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s, ind) => (
                <tr key={ind} className="hover:bg-gray-50">
                  <td className="border p-2">{ind + 1}</td>
                  <td className="border p-2">{s.name || "N/A"}</td>
                  <td className="border p-2">{s.group?.name || "N/A"}</td>
                  <td className="border p-2">{s.group?.domain || "N/A"}</td>
                  <td className="border p-2">{s.group?.supervisor?.name || "N/A"}</td>
                  <td className="border p-2">{s.group?.assignments?.length || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );

      case "supervisors":
        return (
          <table className="w-full text-sm text-left mt-4 border" ref={tableRef}>
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">SN</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Assigned Projects</th>
                <th className="border p-2">Assigned Groups</th>
                <th className="border p-2">Total Students</th>
              </tr>
            </thead>
            <tbody>
              {supervisors.map((sup, ind) => (
                <tr key={ind} className="hover:bg-gray-50">
                  <td className="border p-2">{ind + 1}</td>
                  <td className="border p-2">{sup.name || "N/A"}</td>
                  <td className="border p-2">{sup.email || "N/A"}</td>
                  <td className="border p-2">{sup.totalAssignment || "N/A"}</td>
                  <td className="border p-2">{sup.totalgrp || 0}</td>
                  <td className="border p-2">{sup.totalstudents || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );

      case "assignments":
        return (
          <table className="w-full text-sm text-left mt-4 border" ref={tableRef}>
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">#</th>
                <th className="border p-2">Title</th>
                <th className="border p-2">Total Submission</th>
                <th className="border p-2">Assigned By</th>
                <th className="border p-2">Total Students</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((a, ind) => (
                <tr key={a.id} className="hover:bg-gray-50">
                  <td className="border p-2">{ind + 1}</td>
                  <td className="border p-2">{a.name}</td>
                  <td className="border p-2">{a.itr}</td>
                  <td className="border p-2">{a.superviser}</td>
                  <td className="border p-2">{a.students.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );

      case "groups":
        return (
          <table className="w-full text-sm text-left mt-4 border" ref={tableRef}>
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">SN</th>
                <th className="border p-2">Group Name</th>
                <th className="border p-2">Supervisor</th>
                <th className="border p-2">Total Students</th>
                <th className="border p-2">Total Assignments</th>
              </tr>
            </thead>
            <tbody>
              {groups.map((g, ind) => (
                <tr key={g.id} className="hover:bg-gray-50">
                  <td className="border p-2">{ind + 1}</td>
                  <td className="border p-2">{g.groupName}</td>
                  <td className="border p-2">{g.supervisor.name}</td>
                  <td className="border p-2">{g.students.length}</td>
                  <td className="border p-2">{g.totalAssignment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );

      default:
        return null;
    }
  };

  // Tabs list
  const tabs = [
    { id: "students", label: "Students" },
    { id: "supervisors", label: "Supervisors" },
    { id: "assignments", label: "Assignments" },
    { id: "groups", label: "Groups" },
  ];

  return (
    <div className="bg-white shadow-md rounded-xl p-6 w-full">
      {/* Header Tabs */}
      <div className="flex gap-4 mb-4 border-b pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 font-medium rounded-t-md transition ${
              activeTab === tab.id
                ? "border-b-4 border-blue-600 text-blue-700"
                : "text-gray-500 hover:text-blue-600"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Print button */}
      <div className="mb-2">
        <button
          onClick={handlePrint}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Print Table
        </button>
      </div>

      {/* Table Display */}
      <div className="overflow-x-auto h-fit w-full printable">
  {renderTable()}
</div>
    </div>
  );
};

export default Report;
