import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  description: { type: String, maxlength: 200 },
}, { _id: false });

const userSchema = new mongoose.Schema({
  googleId: { type: String, sparse: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  photo: { type: String },
  
  // Auth fields
  otp: { type: String },
  otpExpires: { type: Date },
  isEmailVerified: { type: Boolean, default: false },
  userType: { type: String, enum: ['student', 'alumni'], default: 'student' },
  alumniVerificationStatus: { type: String, enum: ['unverified', 'pending', 'verified'], default: 'unverified' },
  alumniDegreeCertificate: { type: String }, // URL to PDF/Image

  // Step 2 — Profile Form
  college: { type: String },
  branch: { type: String },
  year: { type: Number },
  expectedGraduation: { type: String },
  skills: [{ type: String }],
  github: { type: String },
  linkedin: { type: String },
  twitter: { type: String },
  portfolio: { type: String },
  experience: [experienceSchema],
  bio: { type: String },
  preferredRole: { type: String, enum: ['internship', 'fulltime', 'bounty'] },
  seniority: { type: String }, // IC, Lead, Manager, etc.
  roleTypePreference: { type: String }, // Tech, Non-Tech, Both
  ctcPreference: { type: String }, 
  graduationYear: { type: Number },
  profileComplete: { type: Boolean, default: false },

  // Step 3 & 4 — Gauntlet
  gauntletAttempted: { type: Boolean, default: false },
  gauntletPrompt: { type: String },
  gauntletAnswer: { type: String },
  hustleScore: { type: Number, min: 0, max: 100 },
  hustleNotes: [{ type: String }],

  // Resume
  resumeGeneratedAt: { type: Date },

  // Step 5 — Applications tracked via Application model

  // Step 6 — Cohort & Badge
  cohortEnrolled: { type: Boolean, default: false },
  cohortEnrolledAt: { type: Date },
  badges: [{ type: String }],

  // Step 6 — Community
  discordInviteGenerated: { type: Boolean, default: false },
  discordInviteLink: { type: String },
  discordInviteUsedAt: { type: Date },
}, { timestamps: true });

export default mongoose.model('User', userSchema);
