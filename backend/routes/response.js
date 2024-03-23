import express from 'express';
import { acceptResponse, createResponse, getResponsesForAuthor } from '../controller/responseController.js';
const router = express.Router();
import verifyAuth from '../middleware/verify.js';





router.post('/api/postresponses',verifyAuth, createResponse);
router.get('/api/getuserresponse',verifyAuth, getResponsesForAuthor);
router.put('/api/responses/:responseId/responseBack', acceptResponse);

export default router;
