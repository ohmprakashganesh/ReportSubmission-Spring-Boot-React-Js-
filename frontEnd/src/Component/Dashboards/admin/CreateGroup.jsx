import React, { useEffect, useState } from 'react';
import { createGroup, getStudents, getSupervisors } from '../../services/AdminSer';

const domain = [
   {name:"WEB"},
    {name:"ANDROID"},
     {name:"IOS"},
      {name:"DESKTOP"},
       {name:"IOT"},
        {name:"GAME"},
         {name:"CLOUD"}
];


const CreateGroup = () => {
  const [supervisors, setSupervisors] = useState([]);
  const [students, setStudents] = useState([]);
  const [data, setData] = useState([]); // Store all groups created

  const [groupName, setGroupName] = useState('');
  const [newSelectedStudents, setNewSelectedStudents] = useState([]);
  const [newSelectedSupervisor, setNewSelectedSupervisor] = useState('');
    const [newSelectedDomain, setNewSelectedDomain] = useState(domain[0].name);


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
if (!newSelectedDomain) {
  alert("Please select a domain");
  return;
}

  const stdIdsAsNumbers = newSelectedStudents.map(id => parseInt(id, 10));
  const supervisorIdAsNumber = parseInt(newSelectedSupervisor, 10);

  const groupPayload = {
    groupName: groupName,
    stdIds: stdIdsAsNumbers,
    supervisorId: supervisorIdAsNumber,
     domain:newSelectedDomain
  };

  console.log("Ready to send payload:", JSON.stringify(groupPayload));

  try {
    const resp = await createGroup(groupPayload);
    console.log("Successfully created group:", JSON.stringify(resp));

    // Optionally reset form after success
    setGroupName('');
    setNewSelectedStudents([]);
    setNewSelectedSupervisor('');
    setNewSelectedDomain("");
    alert("Group created successfully!");
  } catch (error) {
    console.error("Failed to create group:", error);
    alert("Failed to create group. Please try again.");
  }
}

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

        <div className='flex  gap-5 col-span-2   w-full'>
          <div className=' w-[48%]'>
          <label htmlFor="supervisorSelect" className="block text-sm font-medium text-gray-700 mb-1">Select Supervisor</label>
          <select
            id="supervisorSelect"
            value={newSelectedSupervisor}
            onChange={(e) => setNewSelectedSupervisor(e.target.value)}
            className="mt-1 border-2  block w-full p-3  border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          >
            {supervisors.map((val) => (
              <option key={val.id} value={val.id} className=' w-1/2'>
                {val.name}
              </option>
            ))}
          </select>
          </div>
          <div className=' w-[48%]'>
      <label htmlFor="supervisorSelect" className="block text-sm font-medium text-gray-700 mb-1">Select Domain</label>

          <select
            id="domainSelect"
            value={newSelectedDomain}
            onChange={(e) => setNewSelectedDomain(e.target.value)}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          >
           {domain.map((val, ind) => (
           <option key={ind} value={val.name}>
           {val.name}
           </option>
            ))}
          </select>
          </div>
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
