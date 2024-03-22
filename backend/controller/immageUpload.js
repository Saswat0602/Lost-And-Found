import express from 'express';
import multer from 'multer';
import aws from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp'; // Import sharp for image resizing

const router = express.Router();

const s3 = new aws.S3({
  // Configure AWS credentials
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const upload = multer({
  storage: multer.memoryStorage(),
});

// Function to generate a thumbnail
const generateThumbnail = async (buffer) => {
  return await sharp(buffer)
    .resize({ width: 200, height: 200 }) // Adjust width and height as needed for the thumbnail
    .toBuffer();
};

router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const file = req.file;
    const uniqueId = uuidv4(); // Generate a single UUID for both original and thumbnail

    // Generate thumbnail
    const thumbnailBuffer = await generateThumbnail(file.buffer);

    // Upload original image
    const originalFileName = `${uniqueId}_original.${file.originalname.split('.').pop()}`; // Get the original extension
    const originalParams = {
      Bucket: 'your-bucket-name',
      Key: originalFileName, // Unique filename for original image
      Body: file.buffer,
      ContentType: file.mimetype,
    };
    const uploadedOriginalObject = await s3.upload(originalParams).promise();
    const originalImageUrl = `http://your-bucket-name/${originalFileName}`;

    // Upload thumbnail image
    const thumbnailFileName = `${uniqueId}_thumbnail.${file.originalname.split('.').pop()}`; // Get the original extension
    const thumbnailParams = {
      Bucket: 'your-bucket-name',
      Key: thumbnailFileName, // Unique filename for thumbnail image
      Body: thumbnailBuffer,
      ContentType: file.mimetype, // Use same mimetype as original image
    };
    const uploadedThumbnailObject = await s3.upload(thumbnailParams).promise();
    const thumbnailImageUrl = `http://your-bucket-name/${thumbnailFileName}`;

    // Save image URLs to your database
    // Example with MongoDB
    // await ImageModel.create({ originalImageUrl, thumbnailImageUrl });

    res.json({ originalImageUrl, thumbnailImageUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
