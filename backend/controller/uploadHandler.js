// uploadHandler.js

import { v4 as uuidv4 } from "uuid";
import multer from "multer";
import { S3Client, PutObjectCommand,ListBucketsCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const AWS_REGION = process.env.REGION;
const AWS_BUCKET = process.env.BUCKET_NAME;

const s3Client = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

(async () => {
  try {
    const response = await s3Client.send(new ListBucketsCommand({}));
    console.log("Connection to S3 established. List of buckets:", response.Buckets);
  } catch (error) {
    console.error("Error connecting to S3:", error);
  }
})();


const uploadHandler = async (req, res) => {
  const upload = multer();

  // Configure multer to handle multiple file uploads

  try {
    const signedUrlExpireSeconds = 60 * 60;
    const uploadedFiles = req.files;
    const responseUrls = [];
    const uploadPromises = [];

    // Process each uploaded file
    uploadedFiles?.forEach((file) => {
      const { mimetype } = file;
      const fileId = uuidv4();
      const myKey = `photos/${fileId}.${mimetype.split("/")[1]}`;

      const command = new PutObjectCommand({
        Bucket: AWS_BUCKET,
        Key: myKey,
        Body: file.buffer,
        ContentType: mimetype,
        ACL: "public-read",
        Expires: signedUrlExpireSeconds,
      });

      // Generate presigned URL
      const presignedUrl = getSignedUrl(s3Client, command, {
        expiresIn: signedUrlExpireSeconds,
      });
      console.log(presignedUrl, "presignedUrl");
      uploadPromises.push(presignedUrl.then((url) => responseUrls.push(url)));
    });

    // Wait for all presigned URLs to be generated
    await Promise.all(uploadPromises);
    console.log(responseUrls, "responseUrls");

    return res.json({ awsURLs: responseUrls });
  } catch (error) {
    console.error("Error generating presigned URLs:", error);
    return res.status(422).json({ error: "Could not initiate upload" });
  }
};

export default uploadHandler;
