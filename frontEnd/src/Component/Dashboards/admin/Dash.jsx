import { lazy, Suspense, useEffect, useState } from "react";
import Assignments from "../admin/assignments/Assignemnts";
import Default from "./Default";
const Dashboard=lazy(()=>import("./Default"));
import Groups from "./groups/Groups";
import Settings from "./Setting";
import { httpClient } from "../../services/Config/Config";
import Students from "././students/Students";
import Supervisors from "./supervisors/Supervisors";
import { getGroups } from "../../services/AdminSer";
import Domain from "./Domain/Domain";
import { getProfile } from "../../services/SuperviserSer";
import {  WorkflowIcon } from "lucide-react";
import Navbar from "../Navbar";
import Sidebar from "./dashboard/Sidebar";
import Report from "./Report";

const Dash = () => {
  // State to manage the currently active section
  const [activeSection, setActiveSection] = useState("dashboard");
  // State to manage the visibility of the assign users modal
  const [isAssignUsersModalOpen, setIsAssignUsersModalOpen] = useState(false);
  // State to store the group name for the modal
  const [modalGroupName, setModalGroupName] = useState("");
  const [groups, setGroups] = useState([]);

  const [user, setUser] = useState([]);

  useEffect(() => {
    const allGroups = async () => {
      try {
        const resp = await getGroups();
        setGroups(resp);
      } catch (error) {
        console.log("could not success to fetch all groups", error);
      }
    };
    allGroups();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/login";
  };
  // Function to change the active section
  const showSection = (sectionId) => {
    setActiveSection(sectionId);
  };

  // Function to show the "Assign Users to Group" modal
  const showAssignUsersToGroupModal = (groupName) => {
    setModalGroupName(groupName);
    setIsAssignUsersModalOpen(true);
  };

  // Function to hide the "Assign Users to Group" modal
  const hideAssignUsersToGroupModal = () => {
    setIsAssignUsersModalOpen(false);
    setModalGroupName(""); // Clear group name when modal closes
  };

  // useEffect to set the initial active section on component mount
  useEffect(() => {
    // No direct DOM manipulation needed here, state handles initial display
  }, []);

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <Suspense fallback={<div>Loading....</div>}>
        <Dashboard />;
        </Suspense>
      case "students":
        return <Students />;
      case "supervisors":
        return <Supervisors />;
      case "domain":
        return <Domain groups={groups} />;
      case "groups":
        return  <Groups showAssignUsersToGroupModal={showAssignUsersToGroupModal} />
      case "assignments":
        return <Assignments />;
      case "report":
        return <Report />;
      default:
        return <Default />;
    }
  };

  return (
    <div>
     <Navbar />
      <div className="flex-row w-[100%]  min-h-screen">
        {/* Sidebar Navigation */}
        <Sidebar activeSection={activeSection} showSection={showSection} handleLogout={handleLogout}/>
        <div className=" absolute ml-[20%] mt-16 min-h-screen w-[80%]">
          {/* Main Content Area */}
          <main className="flex-1 p-8 w-full relative overflow-y-auto">
            {renderSection()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dash;
