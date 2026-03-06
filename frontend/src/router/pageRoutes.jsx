import { createBrowserRouter,Navigate } from "react-router";
import { RouterProvider } from "react-router";
import Homepage from "../pages/HomePage.jsx";
import About from "../pages/AboutPage.jsx";

import SignUpForm from "../features/auth/components/SignUpForm.jsx";
import LoginForm from "../features/auth/components/LoginForm.jsx";
import Seller from "../features/seller/pages/Seller.jsx";
import Cart from "../features/cart/pages/Cart.jsx";
import MainLayout from "../layout/MainLayout.jsx";
import AuthLayout from "../layout/AuthLayout.jsx";
import Profile from "../components/profile/Profile.jsx";
import ProductsPage from "../pages/ProductsPage.jsx";
import { useContext } from "react";
import { AuthContext } from "../store/AuthContext.jsx";

const ProtectedRoute =({children})=>{
  const {user}= useContext(AuthContext);
  if(!user){
  return <Navigate to="/auth/login" replace />;
  }
  else{
    return children;
  }
}
const ProtectAuth = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null; // ya spinner

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
};
const PageRoutes = () => {
  const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Homepage /> },
      { path: "about", element: <ProtectedRoute><About /></ProtectedRoute> },
      { path: "cart", element: <Cart /> },
      {path:"products",element:<ProductsPage/>},
      { path: "profile", element: <ProtectedRoute><Profile /></ProtectedRoute> },
      { path: "seller", element: <ProtectedRoute><Seller /></ProtectedRoute> }
    ]
  },
  {
    path: "/auth",
    element: <ProtectAuth><AuthLayout /></ProtectAuth>,
    children: [
      { index: true, element: <LoginForm /> },
      { path: "login", element: <LoginForm /> },
      { path: "signup", element: <SignUpForm /> }
    ]
  }
]);
  return( 
<RouterProvider router={router} />
  )
  
  
};
export default PageRoutes;
