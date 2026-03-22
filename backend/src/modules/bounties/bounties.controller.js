import {
  listBounties,
  applyToBounty,
  getApplicationsByUser,
  getApplicationsForBounty,
  updateApplicationStatus,
  createBounty,
} from './bounties.service.js';

export const getBounties = async (req, res) => {
  try {
    const bounties = await listBounties();
    // Attach user's application status if logged in
    const userId = req.user?._id;
    if (userId) {
      const { default: Application } = await import('../../models/Application.js');
      const userApps = await Application.find({ userId }).select('bountyId status');
      const appMap = {};
      for (const app of userApps) {
        appMap[app.bountyId.toString()] = app.status;
      }
      const result = bounties.map((b) => ({
        ...b.toObject(),
        applicationStatus: appMap[b._id.toString()] || null,
      }));
      return res.status(200).json({ success: true, data: result });
    }
    return res.status(200).json({ success: true, data: bounties });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Failed to fetch bounties' });
  }
};

export const applyBounty = async (req, res) => {
  const { bountyId } = req.params;
  try {
    const application = await applyToBounty(req.user._id, bountyId);
    return res.status(201).json({ success: true, data: application, message: 'Application submitted' });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

export const myApplications = async (req, res) => {
  try {
    const apps = await getApplicationsByUser(req.user._id);
    return res.status(200).json({ success: true, data: apps });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to fetch applications' });
  }
};

// Admin endpoints
export const adminGetBountyApplications = async (req, res) => {
  try {
    const apps = await getApplicationsForBounty(req.params.bountyId);
    return res.status(200).json({ success: true, data: apps });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to fetch applications' });
  }
};

export const adminUpdateStatus = async (req, res) => {
  const { applicationId } = req.params;
  const { status } = req.body;
  if (!['approved', 'rejected', 'pending'].includes(status)) {
    return res.status(400).json({ success: false, message: 'Invalid status' });
  }
  try {
    const updated = await updateApplicationStatus(applicationId, status);
    return res.status(200).json({ success: true, data: updated });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to update status' });
  }
};

export const adminCreateBounty = async (req, res) => {
  try {
    const bounty = await createBounty(req.body);
    return res.status(201).json({ success: true, data: bounty });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};
