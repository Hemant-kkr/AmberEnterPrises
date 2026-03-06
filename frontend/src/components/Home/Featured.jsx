
import { useContext, useEffect } from "react";
import ProductCard from "../../features/products/components/ProductCard";
import { ProductContext } from "../../store/ProductContext";
import useProduct from "../../hooks/useProduct";
import useCart from "../../hooks/useCart";


function Featured() {
 const {products} = useContext(ProductContext);
const { getProducts} = useProduct();
const {getCart}= useCart();
useEffect(() => { 
  console.log(getProducts())
 getProducts();
}, []);
  return (
    <>
      <section className="flex justify-around my-auto mb-10 mt-10">
        <div className="container mx-3 px-1">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold text-foreground md:text-4xl">
              Featured Safety Products
            </h1>
            <p className="mt-3 text-muted-foreground">
              Browse our selection of premium safety equipment
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.map((p) => {
              const productDetails = {
                _id: p._id,
                name: p.name,
                description: p.description,
                price: p.price,
                imageList: p.imageList,
                discount: p.discount,
                stock: p.stock,
                rating: p.avgRating,
              };
              return <ProductCard key={p._id} productDetails={productDetails} />;
            })}
          </div>
        </div>
      </section>
    </>
  );
}
export default Featured;
