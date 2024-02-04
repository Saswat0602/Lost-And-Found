import Items from "../model/items";
import mongoose from "mongoose";
import { storage, cloudinary } from "../cloudinary/index";
import multer from "multer";

const upload = multer({ storage });

const addItems = async (req, res) => {
  try {
    const { name, description, question, type, price } = req.body;
    console.log(req.body);
    if (!name || !description || !question || !price || !type || !req.file) {
      return res.status(403).json({
        error: "Please fill up all fields and upload a single picture",
      });
    }
    try {
      const newItems = new Items({
        name,
        description,
        itemPictures: { url: req.file.path, filename: req.file.filename },
        author: req.user._id,
        type,
      });

      await newItems.save();
      res.status(200).json({ msg: "Item uploaded successfully" });
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { addItems };
