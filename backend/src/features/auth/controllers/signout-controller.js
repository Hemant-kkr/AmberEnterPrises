import catchAsync from "../../../utils/catchAsync.js";

const signOut = catchAsync(async(req,res,next)=>{
res.clearCookie("accessToken");
res.status(200).json({ message: "Cookies cleared, user logged out" });
})
export default signOut;