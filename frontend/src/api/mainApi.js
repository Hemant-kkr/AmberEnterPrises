import axios from 'axios'
const BASE_URL = import.meta.env.VITE_BASE_URL;
const api = axios.create({    
    baseURL:BASE_URL,
    timeout:10000,
    withCredentials: true,
})

api.interceptors.request.use(
    (config)=>{
        console.log(`[REQUEST] ${config.method.toUpperCase()} ${config.url}`);
      return config;
    },
    (error)=>Promise.reject(error)
)
api.interceptors.response.use(
    (response)=>{
         return response.data;
    },
    (error)=>{
        return Promise.reject(error);
    }
);
export default api;