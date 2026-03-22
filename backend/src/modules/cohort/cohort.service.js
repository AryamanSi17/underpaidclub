import User from '../../models/User.js';

export const enrollInCohort = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');
  if (!user.hustleScore && user.hustleScore !== 0) throw new Error('Complete the Gauntlet first');
  if (user.cohortEnrolled) throw new Error('Already enrolled in cohort');

  user.cohortEnrolled = true;
  user.cohortEnrolledAt = new Date();
  if (!user.badges.includes('platinum')) {
    user.badges.push('platinum');
  }
  await user.save();

  return { cohortEnrolled: true, badges: user.badges };
};
