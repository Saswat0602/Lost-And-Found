// const express = require("express");
// const morgan = require("morgan");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const helmet = require("helmet");
// const bodyParser = require("body-parser");
// const user = require("./routes/user");
// const cors = require("cors");

// require("dotenv").config();
// const app = express();

// dotenv.config();
// app.use(express.json());
// app.use(bodyParser.json({ limit: "30mb", extended: true }));
// app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
// app.use(morgan("common"));
// app.use(cors());

// app.use(user);

// const PORT = 5000;

// mongoose.set("strictQuery", false);

// mongoose
//   .connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     app.listen(PORT, () => console.log(`server is connected on ${PORT}`));
//   })
//   .catch((error) => console.log(`server not connected :: ${error}`));





import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import bodyParser from "body-parser";
import user from "./routes/user.js";
import cors from "cors";

dotenv.config();
const app = express();

app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors());

app.use(user);

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`Server is running on port ${port}`));
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
