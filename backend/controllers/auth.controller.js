import User from "../models/auth.model.js";
import jwt from "jsonwebtoken";
import twilio from 'twilio';
import dotenv from 'dotenv';
dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Account SID from www.twilio.com/console
const authToken = process.env.TWILIO_AUTH_TOKEN; // Your Auth Token from www.twilio.com/console

const twilioClient = new twilio(accountSid, authToken);

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "15d" });
}

// SignUp controller
export const signUp = async (req, res, next) => {
    try {
        const { fullname, password, mobile } = req.body;

        if (!fullname || !password || !mobile) {
            return res.status(400).json({ message: "All fields are required" });
        }


        // check if user already exists
        const existingUser = await User.findOne({ mobile });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP

        // send OTP to mobile number (you can use a service like Twilio or Nexmo for this)
        let messageOptions = {
            body: `Your OTP for Explore-India-View is ${otp}. Please verify your mobile number.`,
            from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio phone number
            to: mobile, // The user's mobile number
        }
        await twilioClient.messages.create(messageOptions)
            .then(message => console.log("OTP sent successfully:", message.sid))
            .catch(error => {
                console.error("Error sending OTP:", error);
                return res.status(500).json({ message: "Error sending OTP" });
            });

        // create new user
        const newUser = new User({
            fullname,
            password,
            mobile,
            otp,
            isVerified: false, // Set to false initially
        });

        await newUser.save();
        return res.status(201).json({
            message: "Otp sent successfully, please verify your mobile number",
            user: {
                id: newUser._id,
                fullname: newUser.fullname,
                mobile: newUser.mobile,
                isVerified: newUser.isVerified,
            },
        });
    } catch (error) {
        console.log("Error in signUp controller:", error);
        next(error);
    }
}

// Verify OTP controller
export const verifyOTP = async (req, res, next) => {
    try {
        const { mobile, otp } = req.body;

        if (!mobile || !otp) {
            return res.status(400).json({ message: "Mobile number and OTP are required" });
        }

        // check if user exists
        const user = await User.findOne({ mobile });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // check if OTP is correct
        if (user.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        // update user to verified
        user.isVerified = true;
        user.otp = null; // Clear OTP after verification
        await user.save();

        return res.status(200).json({
            message: "OTP verified successfully",
            user: {
                id: user._id,
                username: user.username,
                fullname: user.fullname,
                mobile: user.mobile,
                isVerified: user.isVerified,
            },
        });
    } catch (error) {
        console.log("Error in verifyOTP controller:", error);
        next(error);
    }
}

// Login controller
export const signIn = async (req, res, next) => {
    try {
        const { mobile, password } = req.body;

        if (!mobile || !password) {
            return res.status(400).json({ message: "Mobile number and password are required" });
        }

        // check if user exists
        const user = await User.findOne({ mobile });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // check if password is correct
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const token = generateToken(user._id); // Assuming you have a method to generate a token
        return res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                username: user.username,
                fullname: user.fullname,
                mobile: user.mobile,
                isVerified: user.isVerified,
            },
            token, // Send the token back to the client
        });
    } catch (error) {
        console.log("Error in signIn controller:", error);
        next(error);
    }
}