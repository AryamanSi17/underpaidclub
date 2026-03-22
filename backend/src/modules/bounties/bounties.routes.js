import { Router } from 'express';
import {
  getBounties,
  applyBounty,
  myApplications,
  adminGetBountyApplications,
  adminUpdateStatus,
  adminCreateBounty,
} from './bounties.controller.js';
import { protectStudent } from '../../middleware/studentAuth.js';
import { protectAdmin } from '../../middleware/authMiddleware.js';

const router = Router();

// Student routes
router.get('/', protectStudent, getBounties);
router.post('/:bountyId/apply', protectStudent, applyBounty);
router.get('/my-applications', protectStudent, myApplications);

// Admin routes
router.post('/admin/create', protectAdmin, adminCreateBounty);
router.get('/admin/:bountyId/applications', protectAdmin, adminGetBountyApplications);
router.patch('/admin/applications/:applicationId/status', protectAdmin, adminUpdateStatus);

export default router;
