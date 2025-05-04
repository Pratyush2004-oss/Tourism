import { createRazorpayInstance } from "../config/razorpay.config.js";
import Booking from "../models/booking.model.js";
import crypto from "crypto";
import dotendv from "dotenv";

dotendv.config();

// Create tour and get the order id from razorpay
export const createTour = async (req, res, next) => {
    const user = req.user;
    const { PackageName, PackageDays, PackagePrice, people, startDate } = req.body;

    if (!PackageName || !PackageDays || !PackagePrice || !people || !startDate || !user) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const options = {
        amount: PackagePrice * 100,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "receipt_order_1",
    };
    try {
        const razorpayInstance = createRazorpayInstance()

        razorpayInstance.orders.create(options, function (err, order) {
            if (err) {
                console.log(err);
                next(err);
            }
            return res.status(200).json({ message: "Order created successfully", order });
        })
    } catch (error) {
        console.log("Error in BookTour controller:", error);
        next(error);
    }
};

// Verifying Payment and then dave the Booking details and payment status to the database
export const verifyPayment = async (req, res, next) => {
    try {
        const user = req.user;
        const { order_id, payment_id, signature, PackageName, PackageDays, PackagePrice, people, startDate } = req.body;

        const razorpaySecret = process.env.RAZORPAY_KEY_SECRET;

        // create an object
        const hmac = crypto.createHmac('sha256', razorpaySecret);
        hmac.update(order_id + "|" + payment_id);

        const generatedSignature = hmac.digest('hex');

        if (generatedSignature === signature) {
            // saving data to the database
            const newBooking = new Booking({
                user: user._id,
                PackageName,
                PackageDays,
                PackagePrice,
                people,
                startDate,
                paymentStatus: {
                    order_id,
                    payment_id,
                }
            });
            await newBooking.save();
            return res.status(200).json({ message: "Payment Verified" });
        } else {
            return res.status(400).json({ message: "Payment not verified" });
        }
    } catch (error) {
        console.log("Error in verify Payment controller:", error);
        next(error);
    }
}

// Booking without payment
export const bookTourWithoutPayment = async (req, res, next) => {
    try {
        const user = req.user;
        const { PackageName, PackageDays, PackagePrice, people, startDate } = req.body;
        const newBooking = new Booking({
            user: user._id,
            PackageName,
            PackageDays,
            PackagePrice,
            people,
            startDate,
        });
        await newBooking.save();
        return res.status(200).json({ message: "Tour Booked Successfully" });
    } catch (error) {
        console.log("Error in bookTourWithoutPayment controller:", error);
        next(error);
    }
}

// get Bookings of the user
export const getBookings = async (req, res, next) => {
    try {
        const user = req.user;
        const bookings = await Booking.find({ user: user._id }).sort({ createdAt: -1 }).populate(
            "user",
            "fullname mobile isVerified _id",
        );
        return res.status(200).json({ message: "Bookings fetched successfully", bookings });
    } catch (error) {
        console.log("Error in getBookings controller:", error);
        next(error);
    }
}

// Get Booking Details for the Admin
export const getBookingsForAdmin = async (req, res, next) => {
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 15;
        const skip = (page - 1) * limit;
        const bookings = await Booking.find().sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate(
            "user",
            "fullname mobile isVerified _id",
        );
        return res.status(200).json({ message: "Bookings fetched successfully", bookings });
    } catch (error) {
        console.log("Error in getBookingsForAdmin controller:", error);
        next(error);
    }
}