import express from 'express';
import { addCashback, checkAdmin, checkAuth, getAllUsers, resendOTP, resetPassword, signIn, signUp, verifyOTP } from '../controllers/auth.controller.js';
import ProtectRoute , {requireAdmin} from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/login', signIn)
router.post('/register', signUp)
router.put('/verify-account', verifyOTP);
router.post('/resend-otp', resendOTP);
router.post("/forgot-password", resetPassword);
router.get('/check-auth', ProtectRoute, checkAuth);
router.get('/check-admin', ProtectRoute, requireAdmin, checkAdmin);
router.get("/getAllUsers", ProtectRoute, getAllUsers);
router.post('/addCashback', ProtectRoute, requireAdmin, addCashback);


export default router;