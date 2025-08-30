import { httpClient } from "./Config/Config";

export const getAllGroups=async ()=>{
    const obj= await httpClient.get("/api/groups/all");
    return obj.data;
}
 
export const getSuperviosrByGroupId= async (id)=>{
    const obj= await httpClient.get(`/api/groups/group/${id}`);
    return obj.data;

}

