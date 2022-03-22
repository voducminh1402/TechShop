import express from 'express'
const router = express.Router();
import {addOrderItems, getMyOrders, getOrderById, updateOrderToPaid} from '../controllers/orderController.js'
import {protect} from '../middleware/authMiddleware.js'
//@desc    Fetch all products
//@route   GET /api/product
//@access  Public 

router.route('/').post(protect, addOrderItems)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)



export default router