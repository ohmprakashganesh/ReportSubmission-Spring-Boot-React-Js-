import { httpClient } from "./Config/Config";

export const getAssignments= async()=>{
    const res= await httpClient.get("/api/assignments/all");
    return res.data;

}

export const getIterationByUser = async()=>{
    const res= await httpClient.get("/api/users/groupsOfUser");
    return res.data;
}

export const getGroupStudents=async (id)=>{
    const res= await httpClient.get(`api/users/usersByGroup/${id}`)
    return res.data;
}