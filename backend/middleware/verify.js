const jwt = require("jsonwebtoken"); 
const mongoose = require("mongoose");
// const Property = require("../models/property");
const secretKey = process.env.SECRATE; 
require('dotenv').config();

module.exports.verifyAuth =  (req, res, next) => {
  const token = req.headers.authorization;
  console.log(`Received Token : ${ token }----`);

  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: Missing or Invalid authentication token" });
  }
  const authToken = token.split(" ")[1];

  jwt.verify(authToken, secretKey, (err, decoded) => {
    if (err) {
      console.error("Error verifying token:", err);
      return res.status(401).json({ error: "Unauthorized: Invalid authentication token" });
    }

    console.log("Decoded Token:", decoded);
    req.user = decoded; 
    next();
  });
};








module.exports.verifyAuthorization = async (req, res, next) => {
  const propertyId = req.params.propertyId;

  if (!mongoose.Types.ObjectId.isValid(propertyId)) {
    return res.status(400).json({ error: "Invalid property ID" });
  }

  const userId = req.user._id; 

  try {
    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    if (!property.author || !property.author.equals(userId)) {
      return res.status(403).json({
        error: "Unauthorized: You are not the author of this property",
      });
    }

    next();
  } catch (error) {
    console.error("Error verifying authorization:", error);
    res
      .status(500)
      .json({ error: "An error occurred while verifying authorization" });
  }
};