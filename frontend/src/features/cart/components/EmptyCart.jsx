import { Button } from "@/ui/button";
import { NavLink } from "react-router";
function EmptyCart()
{
 return(
    <div className="container mx-auto px-4 py-16 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-shopping-bag mx-auto h-16 w-16 text-muted-foreground"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
         <h1 className="mt-4 text-2xl font-bold text-foreground">Your cart is empty</h1>
         <p className="mt-2 text-muted-foreground">Looks like you haven't added any items yet.</p>
        <NavLink to='/products'> <Button size="lg" className="mt-5">Start Shopping</Button></NavLink>
    </div>
 )
}
export default EmptyCart;