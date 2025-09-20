
const SummeryBoxs = ({assignments,submissions,unChecked,checked}) =>
         {

    console.log(assignments,submissions,)
    console.log(unChecked);
    console.log(checked);
    return (
      <div className="grid grid-cols-1 mt-4 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold text-gray-700">Total Assignments</h3>
          <p className="text-3xl font-bold text-blue-600">{assignments?.length ||" X"}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold text-gray-700">Total Submissions</h3>
          <p className="text-3xl font-bold text-blue-600">{submissions.length ||" X"}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold text-gray-700">Pending</h3>
          <p className="text-3xl font-bold text-yellow-600">{unChecked.length || " X"}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold text-gray-700">Checked</h3>
          <p className="text-3xl font-bold text-green-600">{ checked.length ||" X"}</p>
        </div>
      </div>
    );
  };
export default SummeryBoxs;

