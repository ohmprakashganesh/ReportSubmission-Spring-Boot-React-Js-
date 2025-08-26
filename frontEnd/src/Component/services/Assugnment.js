import { httpClient } from "./Config/Config";

export const getAssignments= async()=>{
    const res= await httpClient.get("/api/assignments/all");
    return res.data;

}