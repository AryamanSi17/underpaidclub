import {
  verifyGoogleToken,
  isAcInEmail,
  findOrCreateUser,
  generateStudentJWT,
} from './auth.service.js';

export const googleAuth = async (req, res) => {
  const { credential, access_token } = req.body;
  const token = access_token || credential;
  if (!token) {
    return res.status(400).json({ success: false, message: 'No credential provided' });
  }

  try {
    const payload = await verifyGoogleToken(token);

    if (!isAcInEmail(payload.email)) {
      return res.status(403).json({
        success: false,
        blocked: true,
        message: "This club isn't for everyone. No access granted.",
      });
    }

    const user = await findOrCreateUser(payload);
    const token = generateStudentJWT(user._id);

    return res.status(200).json({
      success: true,
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          photo: user.photo,
          profileComplete: user.profileComplete,
          gauntletAttempted: user.gauntletAttempted,
          hustleScore: user.hustleScore,
          cohortEnrolled: user.cohortEnrolled,
          badges: user.badges,
        },
      },
    });
  } catch (err) {
    console.error('Google auth error:', err);
    return res.status(401).json({ success: false, message: 'Invalid Google credential' });
  }
};

export const getMe = async (req, res) => {
  const u = req.user;
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
