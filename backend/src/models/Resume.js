import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  pdfData: { type: Buffer, required: true },
  generatedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Resume', resumeSchema);
