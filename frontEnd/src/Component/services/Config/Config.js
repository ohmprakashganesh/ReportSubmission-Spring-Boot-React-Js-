
import axios from "axios";

export const base= "http://localhost:8080";

 const token=localStorage.getItem("accessToken");
console.log(token);


export const httpClient= axios.create({
    baseURL:'http://localhost:8080',
    timeout:8000,
   
});

httpClient.interceptors.request.use((con)=>{
    if(token){
        con.headers.Authorization=`Bearer ${token}`
    }
    return con;
})