import { createContext, useState } from "react";
export const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [sellerProducts, setSellerProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  return (
    <ProductContext.Provider
      value={{
        products,setProducts,
        sellerProducts, setSellerProducts,
        cartProducts,setCartProducts
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}