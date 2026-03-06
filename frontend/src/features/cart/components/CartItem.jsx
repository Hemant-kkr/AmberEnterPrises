import {Plus,Trash,Minus} from 'lucide-react'
import { Button } from '../../../ui/button';
import useCart from '../../../hooks/useCart';
import { useContext } from 'react';
import { ProductContext } from '../../../store/ProductContext';
const BASE_URL = import.meta.env.VITE_BASE_URL;
function CartItem({productDetails}) {
  const {cartProducts}= useContext(ProductContext);
  const {incQuantity,decQuantity,removeFromCart}= useCart();
  return (
    <>
      <div className="space-y-4 lg:col-span-2 mb-4">
        <div className="flex gap-4 rounded-lg border border-border bg-card p-4">
          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-muted">
            <img
              src={`${BASE_URL}${productDetails?.imageList[0]}`}
              alt={productDetails?.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-1 flex-col">
            <div className="flex justify-between">
              <div>
                <h3 className="font-semibold text-foreground">
                  {productDetails?.name}
                </h3>
                <p className="text-sm text-muted-foreground">{productDetails?.description.slice(0, 100) || "No description available"}...</p>
              </div>
              <button
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:bg-accent h-10 w-10 text-muted-foreground hover:text-destructive"
                aria-label={`Remove ${productDetails?.name || "item"} from cart`}   
                onClick={()=>removeFromCart(productDetails._id) || console.log("Remove from cart")}  
              >
              <Trash></Trash>
              </button>
            </div>
            <div className="mt-auto flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button onClick={()=>decQuantity(productDetails._id)} size='icon'>
                 <Minus/>
                </Button>
                <span className="w-8 text-center font-medium">{cartProducts.find(item => item.productId === productDetails._id)?.quantity || 1}</span>
                <Button onClick={()=>incQuantity(productDetails._id)} size='icon'>
               <Plus/>
                </Button>
              </div>
              <p className="text-lg font-bold text-foreground">${productDetails?.price}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default CartItem;
