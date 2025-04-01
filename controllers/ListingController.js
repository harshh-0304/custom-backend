import Listing from '../models/Listing.js';

// Create Listing
export const createListing = async (req, res) => {
    try {
        const { title, description, pricePerNight, location, amenities, images } = req.body;
        const listing = await Listing.create({ 
            title, description, pricePerNight, location, amenities, images, host: req.user.id 
        });

        res.status(201).json(listing);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get All Listings
export const getListings = async (req, res) => {
    try {
        const listings = await Listing.find().populate('host', 'name email');
        res.json(listings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Single Listing
export const getListing = async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id).populate('host', 'name email');
        if (!listing) return res.status(404).json({ message: 'Listing not found' });

        res.json(listing);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Listing
export const deleteListing = async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) return res.status(404).json({ message: 'Listing not found' });

        await listing.deleteOne();
        res.json({ message: 'Listing deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
