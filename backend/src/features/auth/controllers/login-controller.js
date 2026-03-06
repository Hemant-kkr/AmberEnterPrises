import bcrypt from "bcryptjs";
import AppError from "../../../utils/appError.js";
import { authTokenGenerator } from "../../../utils/authToken.js";
import catchAsync from "../../../utils/catchAsync.js";
import { findUserByEmail } from "../services/existence.js";

const login = catchAsync(async(req,res,next)=>{
  console.log(req.body);
  const {email,password} = req.body;
  if(!email||!password)
  {
    throw new AppError("All fields required",400);
  }
  const existed = await findUserByEmail(email);
  if(!existed)
  {
    throw new AppError("User not existed kindly signup",404);
  }
 const isMatch =await bcrypt.compare( password,existed.password);
   console.log(isMatch)
 if(!isMatch)
 {
    throw new AppError("Invalid credentials",401)
 }
   const token = await authTokenGenerator(existed._id, existed.email,existed.role);
    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });
    const resObj = {email:existed.email,name:existed.userName,role:existed.role,isVerified:existed.isVerified};
    res.status(200).json({
      status: true,
      message: existed.isVerified? "Login successful.":'Login sucessFul Please verify your Mail',
      role:existed.role,
      isVerified:existed.isVerified,
      user:resObj
    });
})
export default login;