import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    razorpayPaymentId: { type: String },
    razorpayOrderId: { type: String },
    razorpaySignature: { type: String },
    status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
}, { timestamps: true });

export default mongoose.model('Payment', PaymentSchema);
