import express from 'express';
import { requiresAdmin } from '../middlewares/authMiddleware.js';
import { createCategoryController } from '../controllers/createCategoryController.js';
import { categoryController, deleteCategory, singleCategoryController } from '../controllers/categoryController.js';


const router = express.Router();

router.post("/create-category", createCategoryController);

//to get all categories
router.get("/category", categoryController);

//to get single category using id as request parameter
router.get("/single-category/:id", singleCategoryController);

//to delete a single category using ID as request parameter
router.get("/delete-category/:id", deleteCategory);

export default router;

