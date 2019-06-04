/*
* The routes will be here
*
*/
import express from 'express';
import dotenv from 'dotenv';
import multerConfig from '../../config/multerConfig';
import bookController from '../../controllers/products';
import tokenVerify from '../../middlewares/customPass';

dotenv.config();


const router = express.Router({});

router.post('/book', tokenVerify.checkToken, multerConfig, bookController.createProduct);
router.get('/book/:bookId', tokenVerify.checkToken, bookController.getProduct);
router.get('/book', tokenVerify.checkToken, bookController.getProducts);
router.put('/book/:bookId', tokenVerify.checkToken, bookController.updateProduct);


export default router;
