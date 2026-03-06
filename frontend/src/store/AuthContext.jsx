// import { createContext, useState, useEffect, use } from "react";
// const BASE_URL = import.meta.env.VITE_BASE_URL;
// export const AuthContext = createContext();
// import useApi from "../hooks/useApi";
// import { toast } from "sonner";
// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const {request} = useApi();
//   const [error,setError] = useState(null);
//    const refreshUser = async () => {
//     try {
//       const data = await request("/api/auth/get/user");
//       setUser(data.user);
//     } catch (error) {
//       setUser(null);
//       console.log(error);
//     } 
//   };
//   function hasRole(role) {
//     try {
//       if (role == user.role) {
//         return true;
//       } else {
//         return false;
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   async function signOut() {
//     try {
//       const data = await request("/api/auth/signout")
//        toast.success(data.message);
//       if (!data) throw new Error("Signout failed");
//       setUser(null);
//     } catch (error) { 
//       console.error(error);
//     }
//   }
//   useEffect(() => {
//     refreshUser();
//   }, []);
//   return (
//     <AuthContext.Provider
//       value={{ user, setUser, refreshUser, hasRole, signOut ,error}}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }
import { createContext, useState, } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}