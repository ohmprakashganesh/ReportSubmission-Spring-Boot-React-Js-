import { httpClient } from "./Config/Config";

export const getAssignments= async()=>{
    const res= await httpClient.get("/api/assignments/all");
    return res.data;

}
//iterations by particular user
export const getIterationByUser = async()=>{
    const res= await httpClient.get("/api/users/groupsOfUser");
    return res.data;
}


//total users of particular  group
export const getGroupStudents=async (id)=>{
    const res= await httpClient.get(`api/users/usersByGroup/${id}`)
    return res.data;
}

//total iterations by student 
export const IterationsByStudent=async ()=>{
    const res= await httpClient.get(`api/itr/byStudent`);
    return res.data;
}
 export const getAssignmentsOfGroup=async ()=>{
    const res= await httpClient.get("api/assignments/assignmentsOfGroup");
    return res.data
 }
