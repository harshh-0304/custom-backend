import Razorpay from 'razorpay';
import dotenv from 'dotenv';
import crypto from 'crypto';
import Payment from '../models/Payment.js';

dotenv.config();

// Initialize Razorpay
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Payment Order
export const createOrder = async (req, res) => {
    try {
        const { amount, currency } = req.body;
        const options = { amount: amount * 100, currency, receipt: `receipt_${Date.now()}` };
        const order = await razorpay.orders.create(options);

        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Verify Payment Signature
export const verifyPayment = async (req, res) => {
    try {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
        const generatedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest('hex');

        if (generatedSignature !== razorpay_signature) {
            return res.status(400).json({ message: 'Invalid payment signature' });
        }

        const payment = await Payment.create({ 
            user: req.user.id, razorpayPaymentId: razorpay_payment_id, razorpayOrderId: razorpay_order_id, razorpaySignature: razorpay_signature, status: 'completed' 
        });

        res.json(payment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
