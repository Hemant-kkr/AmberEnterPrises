import jwt from "jsonwebtoken";

export async function authTokenGenerator(id,email,role) {
  const payload = {
    id: id,
    email:email,
    type: "auth",
    role:role,
    iss: process.env.BASE_URL
  };

  const token = jwt.sign(payload, process.env.JWT_AUTH_SECRET, { expiresIn: "1h" });
  return token;
}

export async function verifyAuth(token) {
    const decodedToken = jwt.verify(token,process.env.JWT_AUTH_SECRET);
    return decodedToken;
}