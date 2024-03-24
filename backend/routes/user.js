import express from "express";
import { login, register } from "../controller/user.js";

import validate from '../middleware/validate.js'
const router = express.Router();

router.get("/", async (req, res) => {
  res.send("hello from backend server");
});

// Route for register
router.post("/api/register",register);

// Route for login
router.post("/api/login",login);

// Route for updating user information
router.put("/api/login/:id", async (req, res) => {
});


export default router;
