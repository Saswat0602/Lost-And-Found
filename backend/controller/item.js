import mongoose from "mongoose";
import Item from "../model/items.js";

const addItems = async (req, res) => {
  try {
    const { name, description, question, type, price, imgUris, thumbnailUrls } = req.body;
    console.log(req.body);
    
    // Check if all reqauired fields are provided
    if (!name || !description || !question || !price || !type || !imgUris || !thumbnailUrls) {
      return res.status(403).json({
        error: "Please fill up all fields and provide image URIs and thumbnail URLs",
      });
    }
    
    // Check if user is authenticated
    if (!req.user || !req.user._id) {
      return res.status(403).json({ error: "User not authenticated" });
    }
    
    // Create new item
    const newItem = new Item({
      name,
      description,
      question,
      type,
      imgUri: imgUris,
      thumbnailUrl: thumbnailUrls,
      author: req.user._id,
    });

    // Save the new item
    await newItem.save();
    res.status(200).json({ msg: "Item uploaded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { addItems };
