import { Router } from 'express';
import { startGauntlet, submitAnswer } from './gauntlet.controller.js';
import { protectStudent } from '../../middleware/studentAuth.js';

const router = Router();

router.get('/start', protectStudent, startGauntlet);
router.post('/submit', protectStudent, submitAnswer);

export default router;
