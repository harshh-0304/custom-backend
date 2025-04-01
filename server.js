import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/UserRoutes.js";
import listingRoutes from "./routes/ListingRoutes.js";
import bookingRoutes from "./routes/BookingRoutes.js";
import paymentRoutes from "./routes/PaymentRoutes.js";
import errorHandler from "./middleware/ErrorMiddleware.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
connectDB();

// Routes
app.use("/api/users", userRoutes);
app.use("/api/listings", listingRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes);

// Error Handling Middleware
app.use(errorHandler);

// Root Route
app.get("/", (req, res) => {
  res.send("🔥 ChillSpace Backend API is running...");
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
