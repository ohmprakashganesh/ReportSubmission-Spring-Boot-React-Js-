import React, { useState } from 'react'
import { httpClient } from '../../../services/Config/Config';

const FormAssignment = ({id, setShowForm }) => {
  console.log("group is is ",id);
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!topic.trim()) return setError("Topic is required");
    if (!description.trim()) return setError("Description is required");
    if (!dueDate) return setError("Due date is required");
    if (!file) return setError("Please upload a PDF file");

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", topic);
      formData.append("description", description);
      formData.append("dueDate", dueDate);
      formData.append("file", file);
      formData.append("studentGroupId",id)

      // const response = await fetch("http://localhost:8080/api/assignments", {
      //   method: "POST",
      //   body: formData,
      // });

       const response = await httpClient.post('/api/assignments',formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    
  if (response.status !== 201 && response.status !== 200) {
    throw new Error("Failed to create assignment");
  }
      setSuccess("Assignment created successfully!");
      setTopic("");
      setDescription("");
      setDueDate("");
      setFile(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 h-screen bg-black bg-opacity-50 flex justify-center items-center z-30 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] relative flex flex-col overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-500 to-purple-600 z-10 px-6 py-4 flex justify-between items-center">
          <h3 className="text-xl font-bold  text-white tracking-wide">Assign Task</h3>
          <button
            onClick={() => setShowForm(false)}
            className="px-3 py-1 bg-white text-blue-600 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition ease-in-out duration-150"
          >
            ✕
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="overflow-y-auto p-6 space-y-6"
        >
          {error && <p className="text-red-600 text-sm font-medium">{error}</p>}
          {success && <p className="text-green-600 text-sm font-medium">{success}</p>}

          <div>
            <label className="block text-sm font-medium text-gray-700">Topic</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Upload PDF</label>
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files[0])}
                className="mt-1 block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Assignment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormAssignment;