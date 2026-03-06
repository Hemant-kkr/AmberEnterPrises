import catchAsync from "../../../utils/catchAsync.js";
import { findUserByEmail } from "../services/existence.js";
import { verifyEmailToken } from "../../../utils/tokens.js";
import AppError from "../../../utils/appError.js";
import { logger } from "../../../utils/logger.js";
import findAndUpdate from "../services/findAndUpdate.js";

const verifyEmail = catchAsync(async (req, res, next) => {
  const token = req.query.token;
  if (!token) throw new AppError("Token is missing", 400);

  const payload = await verifyEmailToken(token);
  if(!payload)
  {
    throw new AppError("Invalid reqeuest kindly regenrate verification request")
  }
  const user = await findUserByEmail(payload.email);
   if (payload.type != "email_verify") {
    throw new AppError("invalid request link", 400);
  }
  if (!user) {
    throw new AppError("User not found", 404);
  }
  if (user.isVerified) {
    return res.status(200).json({
      status: "success",
      message: "User is already verified",
    });
  }

  const findBy = { email: user.email };
  const update ={isVerified: true}
  const verifiedUser = await findAndUpdate(findBy,update);
  

  if (!verifiedUser) {
    throw new AppError("Unable to verify user", 500);
  }

  return res.status(200).json({
    status: "success",
    message: "User verified successfully",
    data: verifiedUser.isVerified,
  });
});

export default verifyEmail;
