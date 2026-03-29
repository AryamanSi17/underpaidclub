import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  activityType: { 
    type: String, 
    enum: [
      'profile_view', 'intro_sent', 'intro_accepted', 'intro_rejected', 
      'new_match', 'score_update', 'badge_earned', 'message_received', 
      'co_founder_request', 'system'
    ],
    required: true 
  },
  message: { type: String, required: true },
  metadata: { type: Object, default: {} },
  actorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  isRead: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('Activity', activitySchema);
