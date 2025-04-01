import express from 'express';
import {
    CreateBooking,
    GetUserBookings,
    CancelBooking
} from '../controllers/BookingController.js';
import AuthMiddleware from '../middleware/AuthMiddleware.js';

const Router = express.Router();

Router.post('/', AuthMiddleware, CreateBooking);
Router.get('/', AuthMiddleware, GetUserBookings);
Router.delete('/:id', AuthMiddleware, CancelBooking);

export default Router;
