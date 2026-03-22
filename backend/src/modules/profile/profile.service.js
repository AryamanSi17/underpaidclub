import User from '../../models/User.js';

const REQUIRED_PROFILE_FIELDS = [
  'college', 'branch', 'year', 'expectedGraduation',
  'github', 'linkedin', 'bio', 'preferredRole',
];

export const isProfileComplete = (user) => {
  for (const field of REQUIRED_PROFILE_FIELDS) {
    if (!user[field]) return false;
  }
  if (!user.skills || user.skills.length === 0) return false;
  return true;
};

export const updateProfile = async (userId, data) => {
  const allowedFields = [
    'college', 'branch', 'year', 'expectedGraduation',
    'skills', 'github', 'linkedin', 'twitter', 'portfolio',
    'experience', 'bio', 'preferredRole',
  ];

  const update = {};
  for (const key of allowedFields) {
    if (data[key] !== undefined) update[key] = data[key];
  }

  const user = await User.findByIdAndUpdate(userId, update, { new: true });

  const complete = isProfileComplete(user);
  if (complete !== user.profileComplete) {
    user.profileComplete = complete;
    await user.save();
  }

  return user;
};
