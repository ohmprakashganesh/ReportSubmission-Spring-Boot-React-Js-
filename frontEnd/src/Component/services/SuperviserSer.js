import { httpClient } from "./Config/Config";

export const getAllGroups=async ()=>{
    const obj= await httpClient.get("/api/groups/all");
    return obj.data;
}