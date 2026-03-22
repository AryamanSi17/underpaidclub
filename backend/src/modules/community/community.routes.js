import { Router } from 'express';
import { getDiscordInvite } from './community.controller.js';
import { protectStudent } from '../../middleware/studentAuth.js';

const router = Router();

router.get('/discord-invite', protectStudent, getDiscordInvite);

export default router;
