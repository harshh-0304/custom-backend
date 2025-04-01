import Booking from '../models/Booking.js';

// Create Booking
export const createBooking = async (req, res) => {
    try {
        const { listing, checkIn, checkOut, totalAmount } = req.body;
        const booking = await Booking.create({ 
            user: req.user.id, listing, checkIn, checkOut, totalAmount 
        });

        res.status(201).json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get User Bookings
export const getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id }).populate('listing');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
