import mongoose from 'mongoose';

const bountySchema = new mongoose.Schema({
  title: { type: String, required: true },
  startupName: { type: String, required: true },
  type: { type: String, enum: ['internship', 'fulltime', 'bounty'], required: true },
  compensation: { type: String, required: true },
  description: { type: String, required: true },
  skills: [{ type: String }],
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model('Bounty', bountySchema);
