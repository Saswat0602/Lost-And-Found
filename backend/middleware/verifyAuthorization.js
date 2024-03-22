import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import Item from "../model/items.js";


const verifyAuthorization = async (req, res, next) => {
  const itemId = req.params.itemId;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return res.status(400).json({ error: "Invalid Item ID" });
  }

  const userId = req.user._id;

  try {
    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    if (!item.author || !item.author.equals(userId)) {
      return res.status(403).json({
        error: "Unauthorized: You are not the author of this item",
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

export default verifyAuthorization;
