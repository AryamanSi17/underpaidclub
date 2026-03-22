import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bountyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bounty', required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  appliedAt: { type: Date, default: Date.now },
}, { timestamps: true });

applicationSchema.index({ userId: 1, bountyId: 1 }, { unique: true });

export default mongoose.model('Application', applicationSchema);
