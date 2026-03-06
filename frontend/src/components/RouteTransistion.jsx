import { useEffect, useState } from "react";

import { ShieldLoader } from "./SheildLoader.jsx";

export function RouteTransition({ x, children }) {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [x]);

  if (loading) {
    return <ShieldLoader text="Loading..." />;
  }

  return <>{children}</>;
}
