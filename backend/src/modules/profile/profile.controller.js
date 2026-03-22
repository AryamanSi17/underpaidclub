import { updateProfile } from './profile.service.js';

export const saveProfile = async (req, res) => {
  try {
    const user = await updateProfile(req.user._id, req.body);
    return res.status(200).json({
      success: true,
      data: { profileComplete: user.profileComplete },
      message: 'Profile saved successfully',
    });
  } catch (err) {
    console.error('Profile save error:', err);
    return res.status(500).json({ success: false, message: 'Failed to save profile' });
  }
};
