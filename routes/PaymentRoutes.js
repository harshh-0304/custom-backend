import express from 'express';
import { protect } from '../middleware/AuthMiddleware.js';
import { createOrder, verifyPayment, getPaymentHistory } from '../controllers/PaymentController.js';

const router = express.Router();

router.post('/create-order', protect, createOrder);
router.post('/verify', protect, verifyPayment);
router.get('/history', protect, getPaymentHistory);

export default router;