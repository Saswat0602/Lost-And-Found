import multer from 'multer';
import express from "express";
import multerS3 from 'multer-s3';
import dotenv from "dotenv";
import AWS from 'aws-sdk';

dotenv.config();


const BUCKET_NAME = process.env.BUCKET_NAME;
const REGION = process.env.REGION;
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;

//s3Client
const s3 = new AWS.S3({
    credentials: {
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY

    },
    region: REGION
})

const uploadWithMulter = () =>multer({
    storage: multerS3({
        s3:s3,
        bucket: BUCKET_NAME,
        metadata: function(req, file, cb){
            cb(null,{filedname: file.filedname})
        },
        key: function(req, file, cb){
            cb(null, file.originalname)
        }
    })
}).array("s3Images",2)

const uploadToAws = (req, res) =>{
    const upload = uploadWithMulter();

    upload(req, res, err=>{
        if(err){
           console.log(err);
           res.json({err, msg: 'Error occured while uploading'})
           return 
        }
        res.json({msg: 'File uploaded successfully', files: req.files})
    })
}

const router = express.Router();

router.post('/upload',uploadToAws)

export default router;