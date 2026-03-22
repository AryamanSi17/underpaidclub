import { enrollInCohort } from './cohort.service.js';

export const joinCohort = async (req, res) => {
  try {
    const result = await enrollInCohort(req.user._id);
    return res.status(200).json({ success: true, data: result, message: 'Welcome to the 2.5-month cohort! You earned the Platinum badge.' });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};
