import { httpClient } from "./Config/Config";

export const getAllGroups=async ()=>{
    const obj= await httpClient.get("/api/groups/all");
    return obj.data;
}
 //all groups of particular supervisor

//all groups of supervisor id
export const supervisorKoGroups= async (id)=>{
    const obj= await httpClient.get(`/api/groups/GroupsBySupervisor/${id}`);
    return obj.data;

}
//all students of of particular supervisor
export const SupervisedStudents= async (id)=>{
    const obj= await httpClient.get(`/api/users/SupervisedStudents/${id}`);
    return obj.data;
}