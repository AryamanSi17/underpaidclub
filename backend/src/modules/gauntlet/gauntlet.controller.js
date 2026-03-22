import { getOrAssignPrompt, submitGauntlet } from './gauntlet.service.js';

export const startGauntlet = async (req, res) => {
  try {
    if (req.user.gauntletAttempted) {
      return res.status(400).json({ success: false, message: 'Gauntlet already attempted' });
    }
    const prompt = await getOrAssignPrompt(req.user._id);
    return res.status(200).json({ success: true, data: { prompt } });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

export const submitAnswer = async (req, res) => {
  const { answer } = req.body;
  if (!answer || answer.trim().length < 10) {
    return res.status(400).json({ success: false, message: 'Answer too short' });
  }

  try {
    const result = await submitGauntlet(req.user._id, answer.trim());
    return res.status(200).json({ success: true, data: result });
  } catch (err) {
    console.error('Gauntlet submit error:', err);
    if (err.message === 'Gauntlet already attempted') {
      return res.status(400).json({ success: false, message: err.message });
    }
    return res.status(500).json({ success: false, message: 'Scoring failed. Please contact support.' });
  }
};
