import { httpClient } from "./Config/Config";


//user related task 
export const createUser=async (user)=>{
    const resp= await httpClient.post('/api/users',user);
    return resp.data;
}

//groups 
export const createGroup = async (group)=>{
    const resp=await httpClient.post('/api/groups',group);
    return resp.data;
}


export const getGroups = async ()=>{
    const resp= await httpClient.get(`/api/groups/all`);
    return resp.data;
}
 


export const getAllUsers=async()=>{
    const resp= await httpClient.get('/api/users/all');
    return resp.data;
}

export const getUser= async(id)=>{
    const resp= await httpClient.get(`/api/users/${id}`);
    return resp.data;
}
 
export const getSupervisors= async()=>{
    const resp= await httpClient.get(`/api/admin/supervisors`);
    return resp.data;
}
export const getStudents= async()=>{
    const resp= await httpClient.get(`/api/admin/students`)
    return resp.data;

}

export const updateUser= async(id, user)=>{
    const resp= await httpClient.put(`/api/users/${id}`,user);
    return resp.data;
}

