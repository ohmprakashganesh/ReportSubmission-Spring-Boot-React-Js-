import { Bell, LogOut, Home, FileText, BookOpen, Send, MessageSquare } from "lucide-react";


const Main = () => {
  return (
    <main className="flex-1 p-8">
  {/* Header */}
  <div className="flex justify-between items-center mb-6">
    <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
    <div className="flex items-center gap-4">
      <Bell className="text-gray-500 cursor-pointer" />
      <LogOut className="text-gray-500 cursor-pointer" />
    </div>
  </div>

  {/* Summary Cards */}
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
    <div className="bg-white p-6 rounded-lg shadow border">
      <p className="text-sm text-gray-500">Total Assignments</p>
      <p className="text-xl font-bold text-gray-800">5</p>
    </div>
    <div className="bg-white p-6 rounded-lg shadow border">
      <p className="text-sm text-gray-500">Total Submissions</p>
      <p className="text-xl font-bold text-gray-800">3</p>
    </div>
    <div className="bg-white p-6 rounded-lg shadow border">
      <p className="text-sm text-gray-500">Recent Submission</p>
      <p className="text-base font-medium text-gray-800">Assignment A - Sep 18</p>
    </div>
  </div>

  {/* Upcoming Assignments */}
  <div className="mb-10">
    <h2 className="text-lg font-semibold text-gray-800 mb-2">Upcoming Assignments</h2>
    <div className="space-y-4">
      <div title="Assignment 1" due="Sep 25" />
      <div title="Assignment 2" due="Oct 3" />
    </div>
  </div>

  {/* Iterative Submission */}
  <div className="mb-10">
    <h2 className="text-lg font-semibold text-gray-800 mb-2">Iterative Submission</h2>
    <div className="bg-white p-4 rounded-lg shadow-sm border flex justify-between items-center">
      <div>
        <p className="font-medium">Draft Uploaded</p>
        <p className="text-sm text-gray-500">Sep 20</p>
      </div>
      <button className="text-blue-600 underline">Upload Revision</button>
    </div>
  </div>

  {/* Recently Submitted */}
  <div>
    <h2 className="text-lg font-semibold text-gray-800 mb-2">Recently Submitted</h2>
    <div className="space-y-3">
      <SubmittedItem title="Assignment A" date="Sep 18" grade="A" feedback="Well done!" />
      <SubmittedItem title="Assignment B" date="Sep 15" grade="B+" />
    </div>
  </div>
</main>
  )
}
const AssignmentCard = ({ title, due }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm border flex justify-between items-center">
    <div>
      <h3 className="font-semibold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-500">Due {due}</p>
    </div>
    <div className="text-right">
      <p className="text-sm text-red-500">Incomplete</p>
      <button className="mt-1 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
        Submit
      </button>
    </div>
  </div>
);

const SubmittedItem = ({ title, date, grade, feedback }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm border">
    <div className="flex justify-between items-center">
      <div>
        <h4 className="font-semibold text-gray-800">{title}</h4>
        {feedback && <p className="text-sm text-gray-600">{feedback}</p>}
      </div>
      <div className="text-right text-sm text-gray-600">
        <p>Submitted {date}</p>
        <p className="font-medium">Grade: {grade}</p>
      </div>
    </div>
  </div>

);

export default Main
