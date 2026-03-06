import { findUserByEmail } from "../features/auth/services/existence.js";
import AppError from "../utils/appError.js";
import { verifyAuth } from "../utils/authToken.js";
import catchAsync from "../utils/catchAsync.js";

const requireLogin = catchAsync(async(req,res,next)=>{
const { accessToken } = req.cookies;
if(!accessToken)
{
    throw new AppError("Please Login First",404)
}
const decoded = await verifyAuth(accessToken);
const user = await findUserByEmail(decoded.email);
if(!user)   
{
  throw new AppError("something went wrong please re login",500);
}
req.user = user;
next();
})
export default requireLogin;