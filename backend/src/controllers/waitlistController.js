import Waitlist from '../models/Waitlist.js';
import { z } from 'zod';

const waitlistSchema = z.object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
    linkedin: z.string().url().refine(url => url.includes('linkedin.com'), {
        message: "Must be a valid LinkedIn URL"
    }),
    message: z.string().max(500).optional()
});

// @desc    Register for waitlist
// @route   POST /api/waitlist
// @access  Public
export const addToWaitlist = async (req, res) => {
    try {
        const validatedData = waitlistSchema.parse(req.body);

        const exists = await Waitlist.findOne({ email: validatedData.email });
        if (exists) {
            return res.status(400).json({ success: false, message: 'You are already on the waitlist!' });
        }

        const waitlistEntry = await Waitlist.create(validatedData);

        res.status(201).json({
            success: true,
            data: waitlistEntry,
            message: 'Successfully added to the waitlist!'
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ success: false, errors: error.errors });
        }
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};
