import { Router } from 'express';
import { googleAuth, getMe } from './auth.controller.js';
import { protectStudent } from '../../middleware/studentAuth.js';

const router = Router();

router.post('/google', googleAuth);
router.get('/me', protectStudent, getMe);

export default router;
