import express from "express";
import bcrypt from "bcrypt";
import User from "../model/user.js";
import validate from "../middleware/validate.js";

const router = express.Router();

router.get("/", async (req, res) => {
  res.send("hello from backend server");
});

// Route for register
router.post("/api/register", async (req, res) => {
  const { firstname, lastname, email, number, password, cpassword } = req.body;
  if (!firstname || !lastname || !email || !number || !password || !cpassword) {
    return res.status(403).json({ error: "Please fill up all fields" });
  }
  if (password !== cpassword) {
    return res.status(401).json({ error: "Passwords do not match" });
  }
  try {
    const check = await User.findOne({ email: email });
    if (check) {
      return res.status(401).json({ msg: "User already exists" });
    }
    const newUser = new User({ firstname, lastname, email, number, password });
    await newUser.save();
    res.status(200).json({ msg: "User created successfully" });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

// Route for login
router.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "field missing" });
  }
  try {
    const findEmail = await User.findOne({ email: email });

    if (findEmail) {
      const userPass = await bcrypt.compare(password, findEmail.password);

      if (!userPass) {
        return res.status(400).json({ msg: "invalid credentials" });
      } else {
        // Generate the user token
        const userToken = await findEmail.generateToken();
        const userId = findEmail._id; // Assuming your User model has _id field

        if (!userToken) {
          return res.status(500).json({ msg: "internal server error" });
        } else {
          res.status(200).json({
            msg: "user logged in successfully",
            token: userToken,
            userId: userId,
          });
        }
      }
    } else {
      return res.status(404).json({ msg: "user not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "error in login", error: error });
  }
});

// Route for updating user information
router.put("/api/login/:id", async (req, res) => {
  console.log(req.body);
});

// Route for Property page
router.get("/api/allitems", validate, (req, res) => {
  console.log(req.correctUser);

  const finalUser = req.correctUser;

  res.send(finalUser);
});

export default router;
