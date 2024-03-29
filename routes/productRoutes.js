import express from 'express';
import formidable from 'express-formidable';
import { createProductController, deleteProductController, getAllProductsController, getFilteredProductsController, getProductController, getProductPhotoController, productCountController, productListController, productSearchController } from '../controllers/productControllers.js';

const router = express.Router();

//to create a product
router.post('/create-product', formidable(), createProductController);

//to get all products
router.get('/all', getAllProductsController);

//to get filtered products
router.post('/filtered', getFilteredProductsController);

//to get single product
router.get('/get-product/:slug', getProductController);

//to get photo of product
router.get('/get-productphoto/:pid', getProductPhotoController);

//to delete a product
router.delete('/delete-product/:pid', deleteProductController);

//to get product count
router.get('/get-count', productCountController);

//to get products per page
router.get('/product-list/:page', productListController);

//to search for products using keyword
router.get('/search/:keyword', productSearchController);

export default router;