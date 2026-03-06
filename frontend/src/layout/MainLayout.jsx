import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { ShieldLoader } from "@/ui/SheildLoader.jsx";

export default function MainLayout() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [location.pathname]); 
  return (
    <>
      <Header />

      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/60 z-50">
          <ShieldLoader />
        </div>
      )}

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
