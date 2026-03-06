import { Card, CardHeader, CardContent, CardFooter } from "@/ui/card"
import { Button } from "@/ui/button"
import { Eye, Heart, Star, ShoppingCart } from "lucide-react";
import useCart from "../../../hooks/useCart";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function ProductCard({productDetails}) {

 const {addToCart}= useCart();
const images=`${BASE_URL}${productDetails.imageList[0]}`;
  return (
    <Card className="rounded-lg border bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">

      <CardHeader className="flex justify-center h-56">
        <img
          className="mx-auto h-full dark:hidden"
          src={images}
          alt={productDetails.name}
        />
        <img
          className="mx-auto hidden h-full dark:block"
          src={images}
          alt={productDetails.name}
        />
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
            Up to {productDetails.discount}% off
          </span>

          <div className="flex gap-2">
            <Button variant="ghost" size="icon">
              <Eye className="h-5 w-5" />
              <span className="sr-only">Quick look</span>
            </Button>
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
              <span className="sr-only">Add to favorites</span>
            </Button>
          </div>
        </div>

        <h3 className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white">
         {productDetails.description.length > 50 ? productDetails.description.substring(0, 50) + "..." : productDetails.description }
        </h3>

        <div className="flex items-center gap-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" />
            ))}
          </div>
          <p className="text-sm font-medium text-gray-900 dark:text-white">{productDetails.rating}</p>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">({productDetails.stock})</p>
        </div>

      </CardContent>

      <CardFooter className="flex items-center gap-4 justify-between">
        <p className="text-2xl font-extrabold text-gray-900 dark:text-white">${productDetails.price}</p>
        <Button onClick={()=>{
             addToCart(productDetails._id);
        }} variant="default" size="sm">
          <ShoppingCart className="mr-2 h-5 w-5" />
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  )
}
