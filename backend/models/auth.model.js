import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    fullname: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
    },
    otp: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;