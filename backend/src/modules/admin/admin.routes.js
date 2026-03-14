import express from 'express';
import { login, getSubmissions, getApprovedSubmissions, approveUser } from './admin.controller.js';
import { protectAdmin } from '../../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', login);
router.get('/submissions', protectAdmin, getSubmissions);
router.get('/approved', protectAdmin, getApprovedSubmissions);
router.post('/approve/:id', protectAdmin, approveUser);

export default router;
