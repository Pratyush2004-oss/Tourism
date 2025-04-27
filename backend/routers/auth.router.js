import express from 'express';
import { signIn, signUp, verifyOTP } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/login', signIn)
router.post('/register', signUp)
router.put('/verify-account', verifyOTP);


export default router;