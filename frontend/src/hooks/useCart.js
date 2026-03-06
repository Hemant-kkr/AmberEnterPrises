import { useContext, useEffect} from "react";
import { ProductContext } from "../store/ProductContext";
import { AuthContext } from "../store/AuthContext";
import useApi from "./useApi";
import {fetchCart} from '../services/cartServices.js';
import { toast } from "sonner";
function useCart() {

  const { cartProducts, setCartProducts } = useContext(ProductContext);
  const {user} = useContext(AuthContext);
  const { request}= useApi();
  
 async function getCart()
{
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  if(cart.length==0)
  {
    localStorage.setItem('cart',JSON.stringify(cart));
  }
  console.log(cart)
  if(user)
  {
   const result = await fetchCart(request);
   if(result.cart.length>0 && cart.length!=0)
   {
     const diff = result.cart.filter((item)=>{
      const isExists = cart.some((e)=>(item.id==e.productId));
      return !isExists;
     })
     cart =[...cart,...diff];
   }
   
  }
  setCartProducts(cart);
}
  function addToCart(productId) {
   const isExists = cartProducts.some((e)=>(e.productId==productId));
   console.log(isExists)
   if(isExists){toast.error("already in cart");
   return
  }
  const newCitem= {productId,quantity:1};
  const updated =[newCitem,...cartProducts];
  setCartProducts(updated);
  toast.success("Added");
  }

 function incQuantity(id) {
  setCartProducts((prev) =>
    prev.map((item) =>
      item.productId === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
  );
}

function decQuantity(id) {
  setCartProducts((prev) =>
    prev
      .map((item) =>
        item.productId === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0)
  );
}

function removeFromCart(id) {
  setCartProducts((prev) =>
    prev.filter((item) => item.productId !== id)
  );
}
function clearCart()
{
  setCartProducts([]);
}
  useEffect(()=>{
   localStorage.setItem('cart',JSON.stringify(cartProducts));
  },[cartProducts])

  return {incQuantity,decQuantity,removeFromCart, cartProducts,getCart ,addToCart,clearCart };
}

export default useCart;