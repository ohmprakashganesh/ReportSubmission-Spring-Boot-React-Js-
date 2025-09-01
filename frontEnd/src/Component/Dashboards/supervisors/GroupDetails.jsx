import { useState } from "react";

export const GroupDetails = ({ group, onNavigate }) => {
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [feedbackInputs, setFeedbackInputs] = useState({});

  // Handle feedback input change
  const handleFeedbackInputChange = (iterationId, value) => {
    setFeedbackInputs((prev) => ({
      ...prev,
      [iterationId]: value,
    }));
  };

  // Handle feedback submit
  const handleSubmitFeedback = (iterationId) => {
    const newFeedback = feedbackInputs[iterationId];
    if (newFeedback) {
      // Normally, you'd POST to backend here
      console.log("Submitted feedback:", iterationId, newFeedback);

      // Clear input
      setFeedbackInputs((prev) => {
        const newState = { ...prev };
        delete newState[iterationId];
        return newState;
      });
    }
  };

  return (
    <section id="group-details-section" className="content-section">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <span
          className="cursor-pointer hover:underline"
          onClick={() => onNavigate("dashboard")}
        >
          Dashboard
        </span>{" "}
        &gt;{" "}
        <span
          className="cursor-pointer hover:underline"
          onClick={() => onNavigate("groups")}
        >
          All Groups
        </span>{" "}
        &gt; <span id="group-breadcrumb-name">{group.name}</span>
      </nav>

      {/* Title */}
      <div className="flex items-center justify-between mb-6">
        <h3
          className="text-2xl font-semibold text-gray-800"
          id="group-details-title"
        >
          {group.name}
        </h3>
        <div className="space-x-3">
          <button className="py-2 px-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200">
            <i className="fas fa-edit mr-2"></i>Manage Group
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Group Members */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h4 className="text-xl font-semibold text-gray-800 mb-4">
            Group Members
          </h4>
          <ul
            id="group-members-list"
            className="list-disc list-inside text-gray-700 space-y-2"
          >
            {group.members.map((member, index) => (
              <li key={index}>{member}</li>
            ))}
          </ul>
        </div>

        {/* Assignments */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h4 className="text-xl font-semibold text-gray-800 mb-4">
            Assignments
          </h4>
          {group.assignments?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {group.assignments.map((assignment) => (
                <div
                  key={assignment.id}
                  className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition cursor-pointer"
                  onClick={() =>
                    setSelectedAssignment(
                      selectedAssignment?.id === assignment.id
                        ? null
                        : assignment
                    )
                  }
                >
                  <h5 className="font-bold text-lg text-gray-800 mb-2">
                    {assignment.title}
                  </h5>
                  <p className="text-gray-600 text-sm mb-2">
                    {assignment.description}
                  </p>
                  <p className="text-gray-500 text-xs">
                    Iterations: {assignment.iterations.length}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">
              No assignments available for this group.
            </p>
          )}
        </div>

        {/* Iterations Section */}
        {selectedAssignment && (
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h4 className="text-xl font-bold text-gray-800 mb-4">
              Iterations for: {selectedAssignment.title}
            </h4>
            {selectedAssignment.iterations.map((iteration, index) => (
              <div
                key={iteration.id}
                className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <h5 className="text-lg font-semibold text-blue-700">
                    Iteration {index + 1} ({iteration.iterationType})
                  </h5>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      iteration.status === "SUBMITTED"
                        ? "bg-green-200 text-green-800"
                        : iteration.status === "IN_PROGRESS"
                        ? "bg-yellow-200 text-yellow-800"
                        : iteration.status === "GRADED"
                        ? "bg-purple-200 text-purple-800"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {iteration.status}
                  </span>
                </div>

                <p className="text-gray-700">
                  <strong>Submitted By:</strong> {iteration.submittedBy.name}
                </p>
                <p className="text-gray-700">
                  <strong>Document:</strong>{" "}
                  <a
                    href={iteration.documentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {iteration.documentName}
                  </a>
                </p>

                {/* Feedback */}
                <div className="mt-3">
                  <strong className="text-gray-800">Feedback:</strong>
                  {iteration.feedbacks?.length > 0 ? (
                    <ul className="mt-2 text-gray-700 list-disc list-inside">
                      {iteration.feedbacks.map((f, i) => (
                        <li key={i}>"{f}"</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 italic">No feedback yet.</p>
                  )}

                  <div className="mt-2 flex">
                    <input
                      type="text"
                      value={feedbackInputs[iteration.id] || ""}
                      onChange={(e) =>
                        handleFeedbackInputChange(iteration.id, e.target.value)
                      }
                      placeholder="Enter feedback..."
                      className="flex-1 p-2 border rounded-md"
                    />
                    <button
                      onClick={() => handleSubmitFeedback(iteration.id)}
                      className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
