import React, { useEffect, useState } from 'react';
import { createGroup, getStudents, getSupervisors } from '../../services/AdminSer';

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

const CreateGroup = () => {
  const [supervisors, setSupervisors] = useState([]);
  const [students, setStudents] = useState([]);
  const [data, setData] = useState([]); // Store all groups created

  const [groupName, setGroupName] = useState('');
  const [newSelectedStudents, setNewSelectedStudents] = useState([]);
  const [newSelectedSupervisor, setNewSelectedSupervisor] = useState('');

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

  // const handleSubmitNewGroup = async (e) => {
  //   e.preventDefault();

  //   if (!groupName || newSelectedStudents.length === 0 || !newSelectedSupervisor) {
  //     alert("Please fill in all required fields: Group Name, Students, and Supervisor.");
  //     return;
  //   }

  //   const stdIdsAsNumbers = newSelectedStudents.map(id => parseInt(id, 10));
  //   const supervisorIdAsNumber = parseInt(newSelectedSupervisor, 10);

  //   const groupPayload = {
  //     groupName: groupName,
  //     studentIds: stdIdsAsNumbers,
  //     supervisorId: supervisorIdAsNumber
  //   };
  //     console.log("successfully ready to create group"+JSON.stringify(resp));

  //   try{
  //     const resp= await createGroup(groupPayload);
  //     console.log("successfully created group"+JSON.stringify(resp));
  //   }catch(error){
  //     console.log(error);
  //   }
    

 

  //   // const supervisor = mockSupervisors.find(s => s.id === supervisorIdAsNumber);
  //   // const supervisorName = supervisor ? supervisor.name : "Unknown Supervisor";

  //   // const studentNames = stdIdsAsNumbers.map(id => {
  //   //   const student = mockStudents.find(s => s.id === id);
  //   //   return student ? student.name : `ID: ${id}`;
  //   // }).join(', ');

  //   // const newEntry = {
  //   //   id: data.length > 0 ? Math.max(...data.map(g => g.id)) + 1 : 1,
  //   //   groupName,
  //   //   stdIds: stdIdsAsNumbers,
  //   //   supervisorId: supervisorIdAsNumber,
  //   //   supervisorName,
  //   //   projectName: "New Project (To be defined)",
  //   //   submissionDate: "N/A",
  //   //   feedback: "No feedback yet.",
  //   //   status: "Planning Phase",
  //   //   members: studentNames
  //   // };

  //   // setData([...data, newEntry]);

  //   setGroupName('');
  //   setNewSelectedStudents([]);
  //   setNewSelectedSupervisor('');
  // };

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
};

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mb-8">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Create New Student Group</h2>
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
            Create Group
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateGroup;
