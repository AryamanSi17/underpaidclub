import Bounty from '../../models/Bounty.js';
import Application from '../../models/Application.js';
import Resume from '../../models/Resume.js';
import User from '../../models/User.js';

export const listBounties = async () => {
  return Bounty.find({ isActive: true }).sort({ createdAt: -1 });
};

export const applyToBounty = async (userId, bountyId) => {
  const user = await User.findById(userId);
  if (!user.hustleScore && user.hustleScore !== 0) {
    throw new Error('Complete the Gauntlet before applying');
  }

  const existing = await Application.findOne({ userId, bountyId });
  if (existing) throw new Error('Already applied to this bounty');

  const bounty = await Bounty.findById(bountyId);
  if (!bounty || !bounty.isActive) throw new Error('Bounty not found or inactive');

  const application = await Application.create({ userId, bountyId });
  return application;
};

export const getApplicationsByUser = async (userId) => {
  return Application.find({ userId }).populate('bountyId').sort({ appliedAt: -1 });
};

// Admin: get all applications for a bounty
export const getApplicationsForBounty = async (bountyId) => {
  return Application.find({ bountyId }).populate('userId', 'name email hustleScore college branch badges').sort({ appliedAt: -1 });
};

export const updateApplicationStatus = async (applicationId, status) => {
  return Application.findByIdAndUpdate(applicationId, { status }, { new: true });
};

// Admin: create bounty
export const createBounty = async (data) => {
  return Bounty.create(data);
};
