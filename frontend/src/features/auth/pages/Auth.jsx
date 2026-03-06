import { NavLink } from "react-router"
import { Outlet } from "react-router"
import { Button } from "@/ui/button";
import BrandLogo from "../../../components/header/BrandLogo";
function Auth() {
    return (
        <>
           <div className= "flex justify-between px-4 pt-4 pb-4 bg-foreground-muted items-center w-full sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
             <BrandLogo/>
             <div className="flex justify-start items-center gap-5 ">
                 <NavLink className={({isActive})=>isActive?'bg-muted-foreground rounded-md ':'bg-primary rounded-md'} to={'/auth/login'} >
                        <Button size="lg" className="bg-inherit hover:bg-muted-foreground">
                             Sign in   
                        </Button>
                </NavLink>
               
                 <NavLink className={({isActive})=>isActive?'bg-muted-foreground rounded-md':'bg-primary rounded-md'} to={'/auth/signup'} >
                        <Button size="lg" className="bg-inherit hover:bg-muted-foreground">
                             Sign up   
                        </Button>
                </NavLink>
            </div>
           </div>
            <Outlet>

            </Outlet>
        </>

    )
}
export default Auth