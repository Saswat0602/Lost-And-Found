// import express from "express";
// import { v4 as uuidv4 } from "uuid";
// import multer from "multer";
// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// const router = express.Router();

// const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
// const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
// const AWS_REGION = process.env.REGION;
// const AWS_BUCKET = process.env.BUCKET_NAME;

// const s3 = new S3Client({
//   credentials: {
//     accessKeyId: AWS_ACCESS_KEY_ID,
//     secretAccessKey: AWS_SECRET_ACCESS_KEY,
//   },
//   region: AWS_REGION,
// });

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// const postFile = async (req, res) => {
//   console.log(req.file.buffer);

//   const params = {
//     Bucket: AWS_BUCKET,
//     Key: req.file.originalname,
//     Body: req.file.buffer,
//     ContentType: req.file.mimetype,
//     ACL: "public-read",
//   };

//   const command = new PutObjectCommand(params);

//   try {
//     await s3.send(command);
//     res.send({});
//   } catch (err) {
//     console.error("Error uploading file to S3:", err);
//     res.status(500).send("Error uploading file to S3");
//   }
// };

// router.post('/s3upload', upload.single('image'), postFile);

// export default router;



// import express from "express";
// import multer from "multer";
// import { v4 as uuidv4 } from "uuid";
// import { S3Client, PutObjectCommand,ListBucketsCommand } from "@aws-sdk/client-s3";

// const router = express.Router();
// const upload = multer();

// const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
// const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
// const AWS_REGION = process.env.REGION;
// const AWS_BUCKET = process.env.BUCKET_NAME;

// (async () => {
//   try {
//     const response = await s3Client.send(new ListBucketsCommand({}));
//     console.log("Connection to S3 established. List of buckets:", response.Buckets);
//   } catch (error) {
//     console.error("Error connecting to S3:", error);
//   }
// })();

// router.post('/uploads', upload.array('images'), async (req, res) => {
//   const images = req.files;

//   const uploadedImageURLs = [];

//   const uploadImage = async (image) => {
//     console.log(image,"image-------------------")
//     const uuid = uuidv4(); // Generate UUID for the image

//     try {
//       const command = new PutObjectCommand(params);
//       await s3Client.send(command);
//       const imageURL = `https://${AWS_BUCKET}.s3.amazonaws.com/${uuid}/${image.originalname}`;
//       uploadedImageURLs.push(imageURL);
//     } catch (err) {
//       throw err;
//     }
//   };

//   try {
//     await Promise.all(images.map(uploadImage));
//     res.json({ uploadedImageURLs });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// export default router;













// ! Trial 3 
import express from 'express';
import AWS from "aws-sdk";
import dotenv from "dotenv";
import multer from 'multer';

dotenv.config();
const router = express.Router();
const upload = multer(); // Initialize multer

export const uploadFile = async (req, res, next) => {
  try {
    console.log(req.files, "req.files"); // Log req.files to check its structure
    
    if (!req.files || !req.files.length) {
      return res.status(400).json({ message: "No file found" });
    }

    const file = req.files[0];

    const s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.REGION,
      httpOptions: {
        timeout: 300000, // 5 minutes
        connectTimeout: 10000 // 10 seconds
      }
    });

    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: `images/${Date.now()}_${file.originalname}`,
      Body: file.buffer,
    };

    const uploadResult = await s3.upload(params).promise();

    res.status(201).json({ url: uploadResult.Location });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Use 'uploads.array('files')' middleware before 'uploadFile'
router.post('/s3upload', upload.array('files'), uploadFile);

export default router;
