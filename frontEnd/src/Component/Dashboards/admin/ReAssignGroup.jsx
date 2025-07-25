import React, { useEffect, useState } from 'react';
import { createGroup, getStudents, getSupervisors } from '../../services/AdminSer';

const students = [
  { id: 101, name: "John Doe" },
  { id: 102, name: "Jane Smith" },
  { id: 103, name: "Peter Jones" },
  { id: 104, name: "Alice Brown" },
  { id: 105, name: "Bob White" },
  { id: 106, name: "Charlie Green" },
  { id: 107, name: "David Lee" },
  { id: 108, name: "Eve White" },
];

const supervisors = [
  { id: 201, name: "Dr. Emily Clark" },
  { id: 202, name: "Prof. David Lee" },
  { id: 203, name: "Dr. Sarah Kim" },
  { id: 204, name: "Dr. Alex Johnson" },
];

const ReAssignGroup = ({gid, onClose}) => {
  const [supervisors, setSupervisors] = useState([]);
  const [students, setStudents] = useState([]);

  const [groupName, setGroupName] = useState('');
  const [newSelectedStudents, setNewSelectedStudents] = useState([]);
  const [newSelectedSupervisor, setNewSelectedSupervisor] = useState('');

   const closeFun=()=>{
    onClose();
   }
   console.log(gid);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await getStudents();
        setStudents(response);
      } catch (error) {
        console.log('Error fetching students:', error);
      }
    };

    const fetchSupervisors = async () => {
      try {
        const response = await getSupervisors();
        setSupervisors(response);
      } catch (error) {
        console.log('Error fetching supervisors:', error);
      }
    };

    fetchStudents();
    fetchSupervisors();
  }, []);


  const handleNewStudentChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions);
    const values = selectedOptions.map(option => option.value);
    setNewSelectedStudents(values);
  };
 

  const handleSubmitNewGroup = async (e) => {
  e.preventDefault();

  if (!groupName || newSelectedStudents.length === 0 || !newSelectedSupervisor) {
    alert("Please fill in all required fields: Group Name, Students, and Supervisor.");
    return;
  }

  const stdIdsAsNumbers = newSelectedStudents.map(id => parseInt(id, 10));
  const supervisorIdAsNumber = parseInt(newSelectedSupervisor, 10);

  const groupPayload = {
    groupName: groupName,
    stdIds: stdIdsAsNumbers,
    supervisorId: supervisorIdAsNumber
  };

  console.log("Ready to send payload:", JSON.stringify(groupPayload));

  try {
    const resp = await createGroup(groupPayload);
    console.log("Successfully created group:", JSON.stringify(resp));

    // Optionally reset form after success
    setGroupName('');
    setNewSelectedStudents([]);
    setNewSelectedSupervisor('');
    alert("Group created successfully!");
  } catch (error) {
    console.error("Failed to create group:", error);
    alert("Failed to create group. Please try again.");
  }
}
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mb-8">
     
       <div className="relative flex  justify-between items-center p-4">
  <h2 className="text-2xl font-semibold  text-black">Update the Group-Assign</h2>
  <button
    onClick={closeFun}
    className="absolute bg-gray-600 px-2 rounded-md top-2 right-4 text-red-800 hover:text-gray-200 text-2xl font-bold"
    aria-label="Close"
  >
    &times;
  </button>
</div>

      <form onSubmit={handleSubmitNewGroup} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="groupName" className="block text-sm font-medium text-gray-700 mb-1">Group Name</label>
          <input
            type="text"
            id="groupName"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="e.g., AI Research Team"
            required
          />
        </div>

        <div>
          <label htmlFor="studentSelect" className="block text-sm font-medium text-gray-700 mb-1">Select Students</label>
          <select
            id="studentSelect"
            multiple
            value={newSelectedStudents}
            onChange={handleNewStudentChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-32"
            required
          >
            {students.map((val) => (
              <option key={val.id} value={val.id}>
                {val.name}
              </option>
            ))}
          </select>
          <p className="mt-1 text-sm text-gray-500">Hold Ctrl (Windows) / Cmd (Mac) to select multiple students.</p>
        </div>

        <div>
          <label htmlFor="supervisorSelect" className="block text-sm font-medium text-gray-700 mb-1">Select Supervisor</label>
          <select
            id="supervisorSelect"
            value={newSelectedSupervisor}
            onChange={(e) => setNewSelectedSupervisor(e.target.value)}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          >
            {supervisors.map((val) => (
              <option key={val.id} value={val.id} className=' w-1/2'>
                {val.name}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
           update group
          </button>
        </div>
      </form>
    </div>
  );
};
export default ReAssignGroup;
