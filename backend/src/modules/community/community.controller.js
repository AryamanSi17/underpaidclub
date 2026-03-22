import { generateDiscordInvite } from './community.service.js';

export const getDiscordInvite = async (req, res) => {
  try {
    const result = await generateDiscordInvite(req.user._id);
    return res.status(200).json({ success: true, data: result });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};
