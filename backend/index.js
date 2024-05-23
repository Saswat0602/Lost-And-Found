import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import bodyParser from "body-parser";
import cors from "cors";
import AWS from 'aws-sdk';

import userRoutes from "./routes/user.js";
import itemRoutes from "./routes/item.js";
import responseRoutes from "./routes/response.js";
import uploadRoutes from "./routes/upload.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors());

// Routes
app.use("/api/user", userRoutes);
app.use("/api/item", itemRoutes);
app.use("/api/response", responseRoutes);
app.use("/api/upload", uploadRoutes);

// AWS S3 Configuration and Connection Test
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.REGION,
  httpOptions: {
    timeout: 300000, // 5 minutes
    connectTimeout: 10000 // 10 seconds
  }
});

s3.listBuckets((err, data) => {
  if (err) {
    console.error("Error connecting to S3:", err);
    if (err.code === 'NetworkingError') {
      console.error("Networking Error Details:", err);
    }
  } else {
    console.log("S3 Buckets:", data.Buckets);
  }
});

// MongoDB Connection
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

export default app;
