import { NavLink } from "react-router"

function QuickLinks()
{
   return(
              <div>
            <h4 className="font-semibold text-foreground">Quick Links</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <NavLink to="/" className="text-muted-foreground hover:text-primary">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/products" className="text-muted-foreground hover:text-primary">
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink to="/cart" className="text-muted-foreground hover:text-primary">
                  Cart
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className="text-muted-foreground hover:text-primary">
                  About
                </NavLink>
              </li>
            </ul>
          </div>
   )
}
export default QuickLinks