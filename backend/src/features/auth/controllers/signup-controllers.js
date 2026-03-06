import catchAsync from "../../../utils/catchAsync.js";
import AppError from "../../../utils/appError.js";
import userModel from "../models/user-model.js";
import { findUserByEmail } from "../services/existence.js";
import { generateEmailToken } from "../../../utils/tokens.js";
import { mailSender } from "../../../utils/mailSender.js";
import { authTokenGenerator } from "../../../utils/authToken.js";

const signup = catchAsync(async (req, res, next) => {
  let { username, email, password,role } = req.body;

  if (!username || !email || !password) {
    throw new AppError("All fields required", 400);
  }
  role =  "buyer";
  
  const userObj = {
    userName: username,
    email: email,
    password: password,
    role: role,
    isVerified: false,
  };

  const newuser = new userModel(userObj);
  const registered = await newuser.save();
  const verificationToken = generateEmailToken(registered._id);

  const subject = "verify your email";
  const Link = `${process.env.BASE_URL}/api/verify/email/?token=${verificationToken}`;
  const text = `Amber Safety Enterprises SaysPlease verify your email by clicking the link below:\n ${Link}`;
  const html = `
    <div style="font-family: sans-serif; text-align: center;">
      <h2>Welcome to Our App!</h2>
      <p>Click the button below to verify your email:</p>
      <a href="${Link}" style="
        display: inline-block;
        padding: 10px 20px;
        background-color:  hsl(38, 92%, 50%);
        color: white;
        text-decoration: none;
        border-radius: 5px;
        font-weight: bold;
      ">Verify Email</a>
      <p>If the button doesn't work, copy and paste this link into your browser:</p>
      <p><a href="${Link}">${Link}</a></p>
    </div>
  `;
  const mailObj = { to: email, subject: subject, text: text, html: html };
  await mailSender(mailObj);

  const token = await authTokenGenerator(registered._id, registered.email);
  res.cookie("accessToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 1000,
  });
 const resObj = {email:registered.email,name:registered.userName,role:registered.role,isVerified:registered.isVerified};
  res.status(201).json({
    status: true,
    message: "Signup successful. Please verify your email.",
    user:resObj
  });
});

export default signup;
