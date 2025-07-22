
import axios from "axios";

export const base= "http://localhost:8080";

export const httpClient= axios.create({
    baseURL:'http://localhost:8080',
    timeout:8000,
    headers:{
        "Content-Type":'application/json'
    }
});