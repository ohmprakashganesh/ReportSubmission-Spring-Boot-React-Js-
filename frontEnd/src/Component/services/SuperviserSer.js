import axios from "axios";
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
export const deleteAssignment=async (id)=>{
    const obj= await httpClient.delete(`/api/assignments/${id}`);
    return obj.data;
}

export const getProfile = async ()=>{
    const obj= await httpClient.get("/api/users/profile");
    return obj.data;
}

//all students of of particular supervisor  (by supervisor id)
export const SupervisedStudents= async (id)=>{
    const obj= await httpClient.get(`/api/users/SupervisedStudents/${id}`);
    return obj.data;
}
export const createFeedback = async (formData) => {
  return httpClient.post(`/api/feedbacks`,formData,
    {
   "Content-Type": "multipart/form-data"
  }
);
 
};


export const TotalChecked = async ()=>{
    const obj= await httpClient.get("/api/feedbacks/totalFeedback");
    return obj.data;
}



