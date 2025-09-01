import { httpClient } from "./Config/Config";


  export const getUser= async(id)=>{
    const  temp = await httpClient.get(`api/users/${id}`)
    return temp.data;
  }
 export const getSuperviosrByGroupId= async (id)=>{
    const obj= await httpClient.get(`/api/groups/group/${id}`);
    return obj.data;

}