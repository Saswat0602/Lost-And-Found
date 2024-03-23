import express from 'express';
import { acceptResponse, createResponse, getResponsesForAuthor, getResponsesForItem } from '../controller/responseController.js';
const router = express.Router();
import verifyAuth from '../middleware/verify.js';





router.post('/api/postresponses',verifyAuth, createResponse);
router.get('/api/getuserresponse',verifyAuth, getResponsesForAuthor);
router.put('/api/responses/:responseId/responseBack', acceptResponse);
router.get('/api/item/:itemId/responses',verifyAuth, getResponsesForItem);


export default router;
