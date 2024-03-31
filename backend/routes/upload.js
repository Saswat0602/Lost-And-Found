// // import uploadHandler from "../controller/uploadHandler.js"
// import express from "express";
// const router = express.Router();
// // router.post('/api/upload', uploadHandler);11111111

// // uploadHandler.js

// import { v4 as uuidv4 } from "uuid";
// import multer from "multer";
// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
// import AWS from 'aws-sdk';

// const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
// const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
// const AWS_REGION = process.env.REGION;
// const AWS_BUCKET = process.env.BUCKET_NAME;

// const s3Client = new S3Client({
//   region: AWS_REGION,
//   credentials: {
//     accessKeyId: AWS_ACCESS_KEY_ID,
//     secretAccessKey: AWS_SECRET_ACCESS_KEY,
//   },
// });

// const upload = multer();

// router.post("/api/upload", upload.single("image"), async (req, res) => {
//   const { mimetype } = req.file;

//   const fileId = uuidv4();
//   const myKey = `photos/${fileId}.${mimetype.split("/")[1]}`;
//   const signedUrlExpireSeconds = 60 * 60;

//   try {
//     const command = new PutObjectCommand({
//       Bucket: AWS_BUCKET,
//       Key: myKey,
//       Body: req.file.buffer,
//       ContentType: mimetype,
//       ACL: "public-read",
//       Expires: signedUrlExpireSeconds,
//     });

//     const presignedUrl = await getSignedUrl(s3Client, command, {
//       expiresIn: signedUrlExpireSeconds,
//     });

//     const awsUrl = `https://${AWS_BUCKET}.s3.${AWS_REGION}.amazonaws.com/${myKey}`;

//     // Custom URL with fileId and mime extension
//     const customUrl = `https://${AWS_BUCKET}.s3.${AWS_REGION}.amazonaws.com/photos/${fileId}.${
//       mimetype.split("/")[1]
//     }`;

//     return res.json({
//       awsURL: awsUrl,
//       customURL: customUrl,
//       presignedUrl: presignedUrl,
//     });
//   } catch (error) {
//     console.error("Error generating presigned URL:", error);
//     return res.status(422).json({ error: "Could not initiate upload" });
//   }
// });

// export default router;




import express from "express";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { S3Client, PutObjectCommand,ListBucketsCommand } from "@aws-sdk/client-s3";

const router = express.Router();
const upload = multer();

const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const AWS_REGION = process.env.REGION;
const AWS_BUCKET = process.env.BUCKET_NAME;


const s3Client = new S3Client({
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
  },
  region: AWS_REGION
});

(async () => {
  try {
    const response = await s3Client.send(new ListBucketsCommand({}));
    console.log("Connection to S3 established. List of buckets:", response.Buckets);
  } catch (error) {
    console.error("Error connecting to S3:", error);
  }
})();

router.post('/uploads', upload.array('images'), async (req, res) => {
  const images = req.files;

  const uploadedImageURLs = [];

  const uploadImage = async (image) => {
    console.log(image,"image-------------------")
    const uuid = uuidv4(); // Generate UUID for the image
    const params = {
      Bucket: AWS_BUCKET,
      Key: `${uuid}/${image.originalname}`, // Key format: {uuid}/{original_filename}
      Body: image.buffer,
      ACL: 'public-read' // Make the uploaded file publicly accessible
    };

    try {
      const command = new PutObjectCommand(params);
      await s3Client.send(command);
      const imageURL = `https://${AWS_BUCKET}.s3.amazonaws.com/${uuid}/${image.originalname}`;
      uploadedImageURLs.push(imageURL);
    } catch (err) {
      throw err;
    }
  };

  try {
    await Promise.all(images.map(uploadImage));
    res.json({ uploadedImageURLs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
