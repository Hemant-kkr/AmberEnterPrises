import{ Shield } from "lucide-react";
import { NavLink } from "react-router";
function BrandLogo(){

    return(
          <NavLink to={'/'} className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Shield className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="hidden sm:block">
            <span className="text-lg font-bold text-foreground">
              Amber Safety
            </span>
            <span className="block text-xs text-muted-foreground">
              Enterprises
            </span>
          </div>
        </NavLink>
    )
}
export default BrandLogo;