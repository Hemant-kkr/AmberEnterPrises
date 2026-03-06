import {UserRoundPen,ShoppingBag,Gem,Heart,ChartNoAxesCombined} from 'lucide-react';
import roles from '../../../../backend/src/constants/roles-constant.js';
import { NavLink } from 'react-router';
import useAuth from '../../hooks/useAuth.js';

function ProfileNav(){
const {hasRole} = useAuth();
    return(<>
    <div className='flex justify-center items-center my-10 h-[90px] px-4 bg-primary w-[60%] rounded rounded-2xl'>
        <ul className='flex w-[100%] justify-around text-secondary-foreground'>
            <NavLink to='/profile' className={({isActive})=>isActive?"flex":"flex text-gray-600"}><UserRoundPen/>Account Info</NavLink>
             <NavLink to='/profile/Orders' className={({isActive})=>isActive?"flex":"flex text-gray-600"}><ShoppingBag/>Orders</NavLink>
             <NavLink to='/profile/favourites' className={({isActive})=>isActive?"flex":"flex text-gray-600"}><Heart/>Favourites </NavLink>
            {hasRole(roles.SELLER)? (<NavLink to='/seller' className={({isActive})=>isActive?"flex":"flex text-gray-600"}><ChartNoAxesCombined/>DashBoard</NavLink>):(<NavLink to='/dash' className={({isActive})=>isActive?"flex":"flex text-gray-600"}> <> <Gem/>Become a Seller</></NavLink>)}
        </ul>
    </div>
    </>)
}
export default ProfileNav;