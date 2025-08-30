import { httpClient } from "./Config/Config";


  export const getUser= async(id)=>{
    const  temp = await httpClient.get(`api/users/${id}`)
    return temp.data;
  }
 