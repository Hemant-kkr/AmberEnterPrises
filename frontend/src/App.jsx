import { AuthProvider } from "./store/AuthContext";
import PageRoutes from "./router/pageRoutes";
import { Toaster } from "sonner";
import { ProductProvider } from "./store/ProductContext";
function App() {

  return (
    <AuthProvider>
      <ProductProvider>
        <Toaster
          richColors
          position="top-center"
          toastOptions={{
            className: "rounded-xl shadow-lg text-sm",
          }}
        />
        <PageRoutes />
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
