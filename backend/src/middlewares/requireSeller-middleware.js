import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

const requireSeller = catchAsync(async(req,res,next)=>{
 const user = req.user;
 if(user.role!=='seller')
 {
    throw new AppError("Unauthorized Request! Seller Account required",401);
 }
 next();
})
export default requireSeller;