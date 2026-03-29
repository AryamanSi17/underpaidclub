import express from 'express';
import { requestOTP, verifyOTP, getMe } from './auth.controller.js';
import { protectStudent } from '../../middleware/studentAuth.js';

const router = express.Router();

router.post('/request-otp', requestOTP);
router.post('/verify-otp', verifyOTP);
router.get('/me', protectStudent, getMe);

export default router;
