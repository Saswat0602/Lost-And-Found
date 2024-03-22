import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


const verifyAuth = (req, res, next) => {
  const secretKey = process.env.SECRATE;
  const token = req.headers.authorization;
  if (!token || !token.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Unauthorized: Missing or Invalid authentication token" });
  }
  const authToken = token.split(" ")[1];

  jwt.verify(authToken, secretKey, (err, decoded) => {
    if (err) {
      console.error("Error verifying token:", err);
      return res
        .status(401)
        .json({ error: "Unauthorized: Invalid authentication token" });
    }

    console.log("Decoded Token:", decoded);
    req.user = decoded;
    next();
  });
};

export default verifyAuth;