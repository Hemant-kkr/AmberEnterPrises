import { useState } from "react";
import api  from "../api/mainApi";

function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const request= async(path, method = 'GET', data = null)=>{
    setLoading(true); 
    setError(null);
    try {
        const config = { method, url: path }; 
        if (data) config.data = data; 
        const result = await api(config);
         return result;
    } catch (error) {
        setError(error);
         throw error;
    }
    finally{
         setLoading(false);
    }
  }
  return { request, loading, error,setLoading };
}

export default useApi;
