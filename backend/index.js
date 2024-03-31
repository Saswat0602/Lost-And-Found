
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import bodyParser from "body-parser";
import user from "./routes/user.js";
import item from "./routes/item.js"
import response from "./routes/response.js"
import cors from "cors";
import s3Router from "./s3Upload.js"
import upload from "./routes/upload.js"
dotenv.config();
const app = express();

app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors());

app.use(user);
app.use(item);
app.use(response);  
app.use(upload)
// app.use(s3Router)

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
