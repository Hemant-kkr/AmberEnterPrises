import AppError from "../../../utils/appError.js";
import catchAsync from "../../../utils/catchAsync.js";
import { mailSender } from "../../../utils/mailSender.js";
import { generateEmailToken } from "../../../utils/tokens.js";
import { findUserByEmail } from "../services/existence.js";

const resendverification = catchAsync(async (req, res, err) => {
  const { email } = req.body;
  const user = await findUserByEmail(email);
  if (!user) {
    throw new AppError("User not existed", 400);
  }
  if (user.isVerified) {
    res.status(200).json({ messsage: "Already Verified" });
    return;
  }
const verificationToken = generateEmailToken(email,user._id);  
const subject='verify your email'
const Link = `${process.env.BASE_URL}/api/auth/verify/email/?token=${verificationToken}`;
const text =`Amber Safety Enterprises SaysPlease verify your email by clicking the link below:\n ${Link}`;
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
const mailObj ={ to:email, subject:subject, text:text, html:html }
await mailSender(mailObj);
  res.status(201).json({
    status: "success",
    message: "Check your mail for verification",
  });
});
export default resendverification;
