import express from "express";
import multer from "multer";
import addItems from "../controller/item";

const router = express.Router();

// Define storage using multer
const storage = multer.memoryStorage();

// Define a route for posting items
router.post("/api/postitem", addItems);

export default router;
