import Activity from '../../models/Activity.js';

export const getActivities = async (req, res) => {
  try {
    const activities = await Activity.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(20);

    return res.status(200).json({ success: true, data: activities });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const markAsRead = async (req, res) => {
  try {
    await Activity.updateMany(
      { userId: req.user._id, isRead: false },
      { isRead: true }
    );
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};
