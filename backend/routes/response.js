import express from 'express';
import { acceptResponse, createResponse } from '../controller/responseController';
const router = express.Router();



router.post('/api/postresponses', createResponse);
router.put('/api/responses/:responseId/responseBack', acceptResponse);
