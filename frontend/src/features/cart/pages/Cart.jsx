import EmptyCart from "../components/EmptyCart";
import CartItem from "../components/CartItem";
import CheckOut from "../components/CheckOut";
import { Button } from "@/ui/button";
import { ProductContext } from "../../../store/ProductContext";
import { useContext, useEffect } from "react";
import useCart from "../../../hooks/useCart";
import useProduct from "../../../hooks/useProduct";

function Cart() {
  const { products, cartProducts } = useContext(ProductContext);

  const { getProducts } = useProduct();
  const { getCart,clearCart } = useCart();

  useEffect(() => {
    async function loadData() {
      await getProducts();
      await getCart();
    }

    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-background py-8 mx-10">
      <div className="px-4">
        <div className="flex justify-between mb-8">
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">
            Shopping Cart
          </h1>

          <Button size="lg" className="hover:bg-muted-foreground" onClick={clearCart}>
            Clear Cart
          </Button>
        </div>

        {cartProducts.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="col-span-2">
              {cartProducts.map((item) => {
                const productDetails = products.find(
                  (prod) => prod._id === item.productId,
                );

                if (!productDetails) return null;
                return (
                  <CartItem
                    key={item.productId}
                    item={item}
                    productDetails={productDetails}
                  />
                );
              })}
            </div>
            <div>
              <CheckOut />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
