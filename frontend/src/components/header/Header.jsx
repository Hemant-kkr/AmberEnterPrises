import BrandLogo from "./BrandLogo";
import { NavLink } from "react-router";
import DashBoard from "./Dash";
import roles from "../../constants/roles-constant";
import useAuth from "../../hooks/useAuth";
function Header() {
 const {user,hasRole}= useAuth();

  return (
    <nav className="flex justify-around w-full sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="flex justify-between w-[95%] px-4 h-16">
        <BrandLogo />
        <div className="hidden items-center gap-6 md:flex">
          <NavLink to={'/'} className= { ({isActive})=>isActive ?"text-sm font-medium text-primary ": "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"}>
            Home
          </NavLink>
          <NavLink to={'/products'} className= { ({isActive})=>isActive ?"text-sm font-medium text-primary ": "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"}>
            Products
          </NavLink>
          <NavLink to={'/about'} className= { ({isActive})=>isActive ?"text-sm font-medium text-primary ": "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"}>
            About
          </NavLink>
          {user && hasRole(roles.SUPERUSER) && (
             <NavLink to={'/admin'} className= { ({isActive})=>isActive ?"text-sm font-medium text-primary ": "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"}>
            Admin
          </NavLink>
          )}
             {user && hasRole(roles.SELLER) && (
             <NavLink to={'/seller'} className= { ({isActive})=>isActive ?"text-sm font-medium text-primary ": "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"}>
            Seller
          </NavLink>
          )}
             {user && hasRole(roles.TRANSPORTER) && (
             <NavLink to={'/transporter'} className= { ({isActive})=>isActive ?"text-sm font-medium text-primary ": "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"}>
            Transporter
          </NavLink>
          )}
        </div>
        <DashBoard />
      </div>
    </nav>
  );
}
export default Header;
