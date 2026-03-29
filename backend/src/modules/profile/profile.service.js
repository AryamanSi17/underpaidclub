import User from '../../models/User.js';

const STUDENT_REQUIRED = ['college', 'branch', 'year', 'expectedGraduation', 'github', 'linkedin', 'bio', 'preferredRole'];
const ALUMNI_REQUIRED = ['college', 'branch', 'graduationYear', 'github', 'linkedin', 'bio', 'preferredRole', 'seniority'];

export const isProfileComplete = (user) => {
  const required = user.userType === 'alumni' ? ALUMNI_REQUIRED : STUDENT_REQUIRED;
  for (const field of required) {
    if (!user[field]) return false;
  }
  if (!user.skills || user.skills.length === 0) return false;
  return true;
};

export const updateProfile = async (userId, data) => {
  const allowedFields = [
    'college', 'branch', 'year', 'expectedGraduation', 'graduationYear',
    'skills', 'github', 'linkedin', 'twitter', 'portfolio',
    'experience', 'bio', 'preferredRole', 'seniority', 'roleTypePreference', 
    'ctcPreference', 'alumniDegreeCertificate'
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
