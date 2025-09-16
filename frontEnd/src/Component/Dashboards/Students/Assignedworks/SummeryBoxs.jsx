
const SummeryBoxs = ({assignments,submissions,unChecked,checked}) =>
         {

// const [assignments,setAssignments]=useState([]);
//  const [submissions,setSubmissions]=useState([]);
// const [checked,setChecked]=useState([]);
// const [unChecked,setUnchecked]=useState([]);
//          useEffect(()=>{
//            const assignmentsOfGroup= async()=>{
//              try{
//                const res= await getAssignmentsOfGroup();
//                setAssignments(res);
//              }catch(error){
//                console.log("not found");
//              }
       
//            };
//            assignmentsOfGroup();
       
//          },[]);


//            useEffect(()=>{
//            const iterationsByUser=async ()=>{
//              try{
//                const res=await IterationsByStudent();
//                setSubmissions(res);
//                const temp= res.filter((i)=> i.status==="SUBMITTED");
//                const temp2=res.filter((i)=> i.status==="APPROVED")
//                setChecked(temp2);
//                setUnchecked(temp);


//              }catch(error){
//                console.log("not found");
//              }
       
//            };
//            iterationsByUser();
       
//          },[]);

//       console.log(assignments,submissions,)
    
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

