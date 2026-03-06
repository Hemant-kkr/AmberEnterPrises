import {MoveLeft } from 'lucide-react';
import { Button } from '@/ui/button';
import { ProductContext } from '../../../store/ProductContext';
import { useContext } from 'react';
function CheckOut() {
    const {cartProducts,products}= useContext(ProductContext);
    
    const total = cartProducts.reduce((sum, item) => {
        const product = products.find(p => p._id === item.productId);
        return sum + (product ? product.price * item.quantity : 0);
    }, 0);
    console.log(cartProducts);
    return (
        <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground">Order Summary</h2>
            <div className="mt-4 space-y-3">
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium text-foreground">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium text-foreground">
                        <span className="text-success">Free</span>
                    </span>
                </div>
                <div
                    data-orientation="horizontal"
                    role="none"
                    className="shrink-0 bg-border h-[1px] w-full"
                ></div>
                <div className="flex justify-between">
                    <span className="font-semibold text-foreground">Total</span>
                    <span className="text-xl font-bold text-foreground">${total.toFixed(2)}</span>
                </div>
            </div>
            <Button
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md px-8 mt-6 w-full"
            >
                Proceed to Checkout
            </Button>
            <a
                className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary"
                href="/"
            >
               <MoveLeft />
                Continue Shopping
            </a>
        </div>
    )
}
export default CheckOut