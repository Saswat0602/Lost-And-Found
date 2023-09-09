// Import necessary libraries
const express = require("express");
const multer = require("multer");
const router = express.Router();
// const { checkToken } = require("./middleware");
const storage = multer.memoryStorage();
const addItems = require('../controller/item')

router.post("/api/postitem",addItems)

















module.exports = router;
