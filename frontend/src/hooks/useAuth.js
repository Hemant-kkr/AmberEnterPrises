import { useContext, useEffect } from "react";
import { AuthContext } from "../store/AuthContext";
import { useNavigate } from "react-router-dom";
import useApi from "./useApi";
import { toast } from "sonner";

import {
  loginApi,
  signUpApi,
  getUserApi,
  signOutApi
} from "../services/authServices";

import useProduct from "./useProduct";

function  useAuth() {

  const { user, setUser } = useContext(AuthContext);
  const { request, loading, error ,setLoading} = useApi();
  const navigate = useNavigate();

  const { getSellerProducts } = useProduct();

  // ---------------- REFRESH USER ----------------

 const refreshUser = async () => {
  try {
    const data = await getUserApi(request);
    setUser(data.user);
  } catch (error) {
    setUser(null);
  } finally {
    setLoading(false);
  }
};

  // ---------------- LOGIN ----------------

  const login = async (data) => {
    try {
      const result = await loginApi(request, data);

      if (result) {
        toast.success(result.message);

        setUser(result.user);

        if (result.user.role === "seller") {
          await getSellerProducts();
        }

        navigate("/");
      }
    } catch (err) {
      const message = err.response?.data?.message || "Login failed";
      toast.error(message);
    }
  };

  // ---------------- SIGNUP ----------------

  const signUp = async (data) => {
    try {
      const result = await signUpApi(request, data);

      if (result) {
        toast.success(result.message);
        setUser(result.user);
        navigate("/");
      }
    } catch (err) {
      const message = err.response?.data?.message || "Signup failed";
      toast.error(message);
    }
  };

  // ---------------- SIGNOUT ----------------

  const signOut = async () => {
    try {
      const data = await signOutApi(request);

      toast.success(data.message);

      setUser(null);

      navigate("/auth/login");
    } catch (error) {
      console.error(error);
    }
  };

  // ---------------- ROLE CHECK ----------------

  const hasRole = (role) => {
    if (!user) return false;
    return user.role === role;
  };

  // ---------------- AUTO LOAD USER ----------------

  // useEffect(() => {
  // console.log('hello')  
  //   refreshUser();
  // }, []);

  return {
    user,
    login,
    signUp,
    signOut,
    refreshUser,
    hasRole,
    loading,
    error
  };
}

export default useAuth;