import express from 'express'
const router = express.Router();
import {getProducts, getProductById, deleteProduct, updateProduct, createProduct} from '../controllers/productController.js'
import {protect, admin} from '../middleware/authMiddleware.js'

//@desc    Fetch all products
//@route   GET /api/product
//@access  Public 

router.route('/').get(getProducts).post(protect, admin, createProduct)
router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct).put(protect, admin, updateProduct)


export default router