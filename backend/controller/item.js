import mongoose from "mongoose";
import Item from "../model/items.js";

const addItems = async (req, res) => {
  try {
    const { name, description, question, type, price, imgUris, thumbnailUrls } =
      req.body;
    console.log(req.body,"reqlsss .bodyyyyy");

    // Check if all reqauired fields are provided
    if (
      !name ||
      !description ||
      !question ||
      !price ||
      !type ||
      !imgUris ||
      !thumbnailUrls
    ) {
      return res.status(403).json({
        error:
          "Please fill up all fields and provide image URIs and thumbnail URLs",
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
const getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getItemsForUser = async (req, res) => {
  try {
    // Check if user is authenticated
    if (!req.user || !req.user._id) {
      return res.status(403).json({ error: "User not authenticated" });
    }

    const userId = req.user._id; // Retrieve user ID from req.user

    // Fetch items where author ID matches the user ID
    const items = await Item.find({ author: userId });

    // Send the items as a response
    res.status(200).json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getItemById = async (req, res) => {
  try {
    // Extract item ID from request parameters
    const { id } = req.params;

    // Fetch the item by ID from the database
    const item = await Item.findById(id);

    // Check if the item exists
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    // Send the item as a response
    res.status(200).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Route to get items for a particular user by their ID

const editItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, question, type, price, imgUris, thumbnailUrls } =
      req.body;

    // Check if required fields are provided
    if (
      !name ||
      !description ||
      !question ||
      !price ||
      !type ||
      !imgUris ||
      !thumbnailUrls
    ) {
      return res.status(400).json({
        error: "Please provide all required fields",
      });
    }

    // Find the item by ID
    const item = await Item.findById(id);

    // Check if item exists
    if (!item) {
      return res.status(404).json({
        error: "Item not found",
      });
    }

    item.name = name;
    item.description = description;
    item.question = question;
    item.type = type;
    item.price = price;
    item.imgUri = imgUris;
    item.thumbnailUrl = thumbnailUrls;

    // Save the updated item
    await item.save();

    // Send success response
    res.status(200).json({ message: "Item updated successfully", item });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteItem = async (req, res) => {
  try {
    // Extract item ID from request parameters
    const { id } = req.params;

    // Check if user is authenticated
    if (!req.user || !req.user._id) {
      return res.status(403).json({ error: "User not authenticated" });
    }

    // Find the item by ID
    const item = await Item.findById(id);

    // Check if the item exists
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    // Check if the item's author matches the authenticated user
    if (item.author.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ error: "Unauthorized to delete this item" });
    }

    // Delete the item from the database
    await item.remove();

    // Send success response
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  addItems,
  getAllItems,
  editItem,
  getItemsForUser,
  deleteItem,
  getItemById,
};
