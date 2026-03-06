import { Button } from "@/ui/button";
import { ShoppingCart, User,Package,LogOut } from "lucide-react";
import { NavLink } from "react-router";
import roles from "../../constants/roles-constant.js";

import { DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger, } from "@/ui/dropdown-menu.jsx";
import useAuth from "../../hooks/useAuth";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../store/AuthContext";
import useCart from "../../hooks/useCart.js";
function DashBoard() {
  const {hasRole,signOut,refreshUser}= useAuth();
  const {cartProducts} = useCart();
  const {user} = useContext(AuthContext)
  useEffect(() => {
    refreshUser();
  } , [])
  return (
    <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
            <NavLink to={'/cart'}>
          <ShoppingCart className="h-5 w-5" />
          {cartProducts.length > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                    {cartProducts.length}
                  </span>
                )}
            </NavLink>
        </Button>
      {user ? (<DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="User menu">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <NavLink to="/profile" className="flex items-center gap-2">
                      <User className="h-4 w-4" /> Profile
                    </NavLink>
                  </DropdownMenuItem>
                  {hasRole(roles.SUPERUSER) && (
                    <DropdownMenuItem asChild>
                      <NavLink>
                        <LayoutDashboard className="h-4 w-4" /> Admin Dashboard
                      </NavLink>
                    </DropdownMenuItem>
                  )}
                  {hasRole(roles.SELLER) && (
                    <DropdownMenuItem asChild>
                      <NavLink to="/seller" className="flex items-center gap-2">
                        <Package className="h-4 w-4" /> Seller Dashboard
                      </NavLink>
                    </DropdownMenuItem>
                  )}
                  {hasRole(roles.TRANSPORTER) && (
                    <DropdownMenuItem asChild>
                      <NavLink to="/transporter" className="flex items-center gap-2">
                        <Truck className="h-4 w-4" /> Deliveries
                      </NavLink>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut} className="flex items-center gap-2 text-destructive">
                    <LogOut className="h-4 w-4" /> Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
      ) : (
        <NavLink to={'/auth'}
          className="text-sm font-medium text-primary transition-colors hover:text-foreground"
        >
          Sign In
        </NavLink>
      )}

      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => {
          console.log("clicked");
        }}
        aria-label="Toggle menu"
      >
      </Button>
    </div>
  )
}
export default DashBoard;