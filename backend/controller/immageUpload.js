import express from 'express';
import multer from 'multer';
import aws from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

const s3 = new aws.S3({
  // Configure AWS credentials
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const file = req.file;
    const params = {
      Bucket: 'your-bucket-name',
      Key: `${uuidv4()}.jpg`, // Unique filename
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const uploadedObject = await s3.upload(params).promise();
    const imageUrl = uploadedObject.Location;

    // Save imageUrl to your database
    // Example with MongoDB
    // await ImageModel.create({ imageUrl });

    res.json({ imageUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
