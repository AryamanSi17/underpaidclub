import { Router } from 'express';
import { saveProfile } from './profile.controller.js';
import { protectStudent } from '../../middleware/studentAuth.js';

const router = Router();

router.put('/', protectStudent, saveProfile);

export default router;
