import multer from 'multer';
import express from 'express';
import { S3Client } from '@aws-sdk/client-s3';
import { fromIni } from '@aws-sdk/credential-provider-ini';
import { S3 } from '@aws-sdk/client-s3-node'; 
import multerS3 from 'multer-s3';
import dotenv from 'dotenv';

dotenv.config();

const BUCKET_NAME = process.env.BUCKET_NAME;
const REGION = process.env.REGION;
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;

// Initialize S3 client using AWS SDK v3
const s3Client = new S3Client({
  region: REGION,
  credentials: fromIni({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
  })
});

// Create an instance of S3 from AWS SDK v3 for use with multer-s3
const s3 = new S3({
  region: REGION,
  credentials: fromIni({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
  })
});



const uploadWithMulter = () =>
  multer({
    storage: multerS3({
      s3: s3Client,
      bucket: BUCKET_NAME,
      metadata: function (req, file, cb) {
        cb(null, { filedname: file.fieldname });
      },
      key: function (req, file, cb) {
        cb(null, file.originalname);
      }
    })
  }).array('s3Images', 2);

const uploadToAws = (req, res) => {
  console.log(req, 'req==========');
  const upload = uploadWithMulter();

  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      res.json({ err, msg: 'Error occurred while uploading' });
      return;
    }
    res.json({ msg: 'File uploaded successfully', files: req.files });
  });
};

const router = express.Router();

router.post('/upload', uploadToAws);

export default router;
