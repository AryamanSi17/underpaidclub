import { Router } from 'express';
import { generateResume, downloadResume, previewResume } from './resume.controller.js';
import { protectStudent } from '../../middleware/studentAuth.js';

const router = Router();

router.post('/generate', protectStudent, generateResume);
router.get('/download', protectStudent, downloadResume);
router.get('/preview', protectStudent, previewResume);

export default router;
