import express from 'express';
import {addItems} from "../controller/item.js"
import authMiddleware from '../middleware/authMiddleware.js';
import validate from '../middleware/validate.js'; // Import the validate middleware
import verifyAuth from '../middleware/verify.js';
const router = express.Router();

router.post('/api/postitem', verifyAuth, addItems);

export default router;
