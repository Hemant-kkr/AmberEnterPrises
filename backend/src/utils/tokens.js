import jwt from "jsonwebtoken";

export function generateEmailToken(email,userId) {
  const payload = {
     userId:userId,
    email:email,
    type: "email_verify"
  };
  const token = jwt.sign(payload, process.env.JWT_EMAIL_SECRET, {
    expiresIn: "1h",
  });
  return token;
}

export function verifyEmailToken(token) {
  const decodedToken = jwt.verify(token, process.env.JWT_EMAIL_SECRET);
  return decodedToken;
}
