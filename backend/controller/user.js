import User from "../model/user.js"; 
import bcrypt from "bcrypt";

const register = async (req, res) => {
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
};

const login = async (req, res) => {
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
        const userId = findEmail._id;

        if (!userToken) {
          return res.status(500).json({ msg: "Some Error Occurs" });
        } else {
          res.status(200).json({
            msg: "user logged in successfully",
            firstName: findEmail.firstname, 
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
};


export { register, login };
