import express from 'express';
import formidable from 'express-formidable';
import { createProductController, deleteProductController, getAllProductsController, getProductController, getProductPhotoController } from '../controllers/productControllers.js';

const router = express.Router();

//to create a product
router.post('/create-product', formidable(), createProductController);

//to get all products
router.get('/all', getAllProductsController);

//to get single product
router.get('/get-product/:slug', getProductController);

//to get photo of product
router.get('/get-productphoto/:pid', getProductPhotoController);

//to delete a product
router.delete('/delete-product/:pid', deleteProductController);

export default router;