import express from 'express';
import { getActivities, markAsRead } from './activity.controller.js';
import { protectStudent } from '../../middleware/studentAuth.js';

const router = express.Router();

router.get('/', protectStudent, getActivities);
router.put('/mark-read', protectStudent, markAsRead);

export default router;
