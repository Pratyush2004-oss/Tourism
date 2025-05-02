import express from 'express';
import { createTour, verifyPayment } from '../controllers/booking.controller.js';
import ProtectRoute from '../middleware/auth.middleware.js';

const router = express.Router();
router.post('/create-tour', ProtectRoute, createTour);
router.post('/verify-payment', ProtectRoute, verifyPayment);
export default router;