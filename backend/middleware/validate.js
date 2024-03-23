import jwt from "jsonwebtoken";
import User from "../model/user.js";

const validate = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];

    const verifyToken = jwt.verify(token, process.env.SECRET);

    const correctUser = await User.findById({ _id: verifyToken._id });


    if (!verifyToken && !correctUser) {
      throw new Error("user not found");
    }

    req.correctUser = correctUser;

    next();
  } catch (error) {
    res.status(401).send("unauthorised user");
    console.log(error);
  }
};

export default validate;
