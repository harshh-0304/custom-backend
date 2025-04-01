import express from 'express';
import {
    CreateListing,
    GetListings,
    GetListingById,
    UpdateListing,
    DeleteListing
} from '../controllers/ListingController.js';
import AuthMiddleware from '../middleware/AuthMiddleware.js';

const Router = express.Router();

Router.post('/', AuthMiddleware, CreateListing);
Router.get('/', GetListings);
Router.get('/:id', GetListingById);
Router.put('/:id', AuthMiddleware, UpdateListing);
Router.delete('/:id', AuthMiddleware, DeleteListing);

export default Router;
