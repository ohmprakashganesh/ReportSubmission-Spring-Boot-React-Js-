import React, { useEffect, useState } from 'react'



// Mock data for students and supervisors for the select dropdowns
const mockStudents = [
  { id: 101, name: "John Doe" },
  { id: 102, name: "Jane Smith" },
  { id: 103, name: "Peter Jones" },
  { id: 104, name: "Alice Brown" },
  { id: 105, name: "Bob White" },
  { id: 106, name: "Charlie Green" },
  { id: 107, name: "David Lee" },
  { id: 108, name: "Eve White" },
];

const mockSupervisors = [
  { id: 201, name: "Dr. Emily Clark" },
  { id: 202, name: "Prof. David Lee" },
  { id: 203, name: "Dr. Sarah Kim" },
  { id: 204, name: "Dr. Alex Johnson" },
];
const ReAssignGroup = ({ group, onClose, onSave }) => {
      // Convert IDs to strings for select value, as HTML select values are strings
    
      // Effect to update internal state if the group prop changes (e.g., when opening for a different group)
   const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectedSupervisor, setSelectedSupervisor] = useState("");

  // useEffect(() => {
  //   if (group?.stdIds && group.supervisorId) {
  //     setSelectedStudents(group.stdIds.map(String));
  //     setSelectedSupervisor(String(group.supervisorId));
  //   }
  // }, [group]);
    
      const handleStudentChange = (e) => {
      //   const selectedOptions = Array.from(e.target.selectedOptions);
      //   const values = selectedOptions.map(option => option.value);
      //   setSelectedStudents(values);
      };
    
      const handleSupervisorChange = (e) => {
        setSelectedSupervisor(e.target.value);
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
    
      //   if (selectedStudents.length === 0 || !selectedSupervisor) {
      //     alert("Please select at least one student and a supervisor.");
          return;
        }
    
      //   const updatedStdIds = selectedStudents.map(id => parseInt(id, 10));
      //   const updatedSupervisorId = parseInt(selectedSupervisor, 10);
    
      //   const supervisor = mockSupervisors.find(s => s.id === updatedSupervisorId);
      //   const updatedSupervisorName = supervisor ? supervisor.name : "Unknown Supervisor";
    
      //   const studentNames = updatedStdIds.map(id => {
      //     const student = mockStudents.find(s => s.id === id);
      //     return student ? student.name : `ID: ${id}`;
      //   }).join(', ');
      //   onSave(updatedGroup); // Call the parent's save function
      //   onClose(); // Close the modal
      // };
    
      return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50 overflow-auto">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl transform transition-all duration-300 scale-100 opacity-100">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <h2 className="text-3xl font-bold text-gray-800">Re-assign Group: {group.groupName}</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-3xl font-semibold leading-none"
                aria-label="Close"
              >
                &times;
              </button>
            </div>
    
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label htmlFor="reassignStudentSelect" className="block text-sm font-medium text-gray-700 mb-1">Select Students</label>
                <select
                  id="reassignStudentSelect"
                  multiple
                  value={selectedStudents}
                  onChange={handleStudentChange}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-32"
                  required
                >
                  {mockStudents.map(student => (
                    <option key={student.id} value={student.id}>
                      {student.name} (ID: {student.id})
                    </option>
                  ))}
                </select>
                <p className="mt-1 text-sm text-gray-500">Hold Ctrl (Windows) / Cmd (Mac) to select multiple students.</p>
              </div>
    
              <div className="md:col-span-2">
                <label htmlFor="reassignSupervisorSelect" className="block text-sm font-medium text-gray-700 mb-1">Select Supervisor</label>
                <select
                  id="reassignSupervisorSelect"
                  value={selectedSupervisor}
                  onChange={handleSupervisorChange}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                >
                  <option value="" disabled>Select a supervisor</option>
                  {mockSupervisors.map(supervisor => (
                    <option key={supervisor.id} value={supervisor.id}>
                      {supervisor.name} (ID: {supervisor.id})
                    </option>
                  ))}
                </select>
              </div>
    
              <div className="md:col-span-2 flex justify-end mt-6">
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    };
  

export default ReAssignGroup;
