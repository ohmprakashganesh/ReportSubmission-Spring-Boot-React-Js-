import { httpClient } from "./Config/Config"


export const SendMessage=async (message)=>{ 
     const  data=httpClient.post(`localhost:8080/api/chat/rooms/${message.id}/messages`,data)
     return data.message;
}
