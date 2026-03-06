import AppError from "../../../utils/appError.js";
import catchAsync from "../../../utils/catchAsync.js";
import { verifyAuth } from "../../../utils/authToken.js";
import { findUserByEmail } from "../services/existence.js";

const me = catchAsync(async(req,res,next)=>{
  const { accessToken } = req.cookies;
  if(!accessToken)
  {
    res.status(200).json({user:null});
    return;
  }
  const decoded = await verifyAuth(accessToken);
  const user = await findUserByEmail(decoded.email);
  if(!user)
  {
    throw new AppError("something went wrong please re login",500);
  }
  const resObj = {email:user.email,name:user.userName,role:user.role,isVerified:user.isVerified};
  console.log('hey',resObj)
  res.status(200).json({status:true,user:resObj});
})
export default me;