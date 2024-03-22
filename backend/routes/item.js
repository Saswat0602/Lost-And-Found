import express from 'express';
import {addItems, deleteItem, editItem, getAllItems, getItemsForUser ,getItemById} from "../controller/item.js"
import verifyAuth from '../middleware/verify.js';
import verifyAuthorization from '../middleware/verifyAuthorization.js';

const router = express.Router();

router.post('/api/postitem', verifyAuth, addItems);
router.get('/api/getAllItems', getAllItems);
router.put('/api/editItem/:id',verifyAuthorization, editItem);
router.get('/api/getItemsForUser',verifyAuth, getItemsForUser);
router.get('/api/getItemById/:id', getItemById);
router.delete('/api/deleteItem/:id',verifyAuth, verifyAuthorization,deleteItem);

export default router;
