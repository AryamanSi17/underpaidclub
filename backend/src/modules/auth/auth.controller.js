import User from '../../models/User.js';
import { isAllowedDomain, generateStudentJWT } from './auth.service.js';
import { sendOTPEmail } from './email.service.js';

export const requestOTP = async (req, res) => {
  const { email, name, userType } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required' });
  }

  // 1. Verify institutional domain
  if (!isAllowedDomain(email)) {
    return res.status(403).json({
      success: false,
      message: "This club is exclusively for Tier 1 institutional talent. Use your college email.",
    });
  }

  try {
    // 2. Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // 3. Find or create user
    let user = await User.findOne({ email });
    if (!user) {
      if (!name) return res.status(400).json({ success: false, message: 'Name is required for new registration' });
      user = await User.create({ email, name, userType: userType || 'student' });
    }

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    // 4. Send email (Skip if dummy account for testing)
    if (email === 'aryaman@nitj.ac.in') {
      user.otp = '000000'; // Override for dummy login
      await user.save();
      return res.status(200).json({
        success: true,
        message: '[DEV] Use 000000 to enter.',
      });
    }

    const sent = await sendOTPEmail(email, otp);
    if (!sent) {
       return res.status(500).json({ success: false, message: 'Error sending OTP email' });
    }

    return res.status(200).json({
      success: true,
      message: 'OTP sent to your institutional email',
    });
  } catch (err) {
    console.error('OTP Request Error:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ success: false, message: 'Email and OTP are required' });
  }

  try {
    const user = await User.findOne({ email, otp, otpExpires: { $gt: Date.now() } });

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid or expired OTP' });
    }

    // Clear OTP after verification
    user.otp = undefined;
    user.otpExpires = undefined;
    user.isEmailVerified = true;
    await user.save();

    const token = generateStudentJWT(user._id);

    return res.status(200).json({
      success: true,
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          profileComplete: user.profileComplete,
          gauntletAttempted: user.gauntletAttempted,
          hustleScore: user.hustleScore,
          cohortEnrolled: user.cohortEnrolled,
          badges: user.badges,
        },
      },
    });
  } catch (err) {
    console.error('OTP Verification Error:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getMe = async (req, res) => {
  const u = req.user; // Set by auth middleware
  return res.status(200).json({
    success: true,
    data: {
      id: u._id,
      name: u.name,
      email: u.email,
      photo: u.photo,
      college: u.college,
      branch: u.branch,
      year: u.year,
      expectedGraduation: u.expectedGraduation,
      skills: u.skills,
      github: u.github,
      linkedin: u.linkedin,
      twitter: u.twitter,
      portfolio: u.portfolio,
      experience: u.experience,
      bio: u.bio,
      preferredRole: u.preferredRole,
      profileComplete: u.profileComplete,
      gauntletAttempted: u.gauntletAttempted,
      hustleScore: u.hustleScore,
      hustleNotes: u.hustleNotes,
      resumeGeneratedAt: u.resumeGeneratedAt,
      cohortEnrolled: u.cohortEnrolled,
      badges: u.badges,
      discordInviteGenerated: u.discordInviteGenerated,
    },
  });
};
