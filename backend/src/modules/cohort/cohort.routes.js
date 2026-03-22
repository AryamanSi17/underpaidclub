import { Router } from 'express';
import { joinCohort } from './cohort.controller.js';
import { protectStudent } from '../../middleware/studentAuth.js';

const router = Router();

router.post('/join', protectStudent, joinCohort);

export default router;
