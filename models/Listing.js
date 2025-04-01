import mongoose from 'mongoose';

const ListingSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    pricePerNight: { type: Number, required: true },
    location: { type: String, required: true },
    images: [{ type: String, required: true }],
    host: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amenities: [{ type: String }],
    availability: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model('Listing', ListingSchema);
