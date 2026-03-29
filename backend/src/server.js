import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB from './config/db.js';
import waitlistRoutes from './routes/waitlistRoutes.js';
import adminRoutes from './modules/admin/admin.routes.js';
import authRoutes from './modules/auth/auth.routes.js';
import profileRoutes from './modules/profile/profile.routes.js';
import gauntletRoutes from './modules/gauntlet/gauntlet.routes.js';
import resumeRoutes from './modules/resume/resume.routes.js';
import bountiesRoutes from './modules/bounties/bounties.routes.js';
import cohortRoutes from './modules/cohort/cohort.routes.js';
import communityRoutes from './modules/community/community.routes.js';
import activityRoutes from './modules/activity/activity.routes.js';

dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use((req, res, next) => {
    const origin = req.headers.origin;
    res.setHeader('Access-Control-Allow-Origin', origin || '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    next();
});

app.use(express.json({ limit: '10mb' }));
app.use(morgan('dev'));

// Existing routes (untouched)
app.use('/api/waitlist', waitlistRoutes);
app.use('/api/admin', adminRoutes);

// Student dashboard routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/gauntlet', gauntletRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/bounties', bountiesRoutes);
app.use('/api/cohort', cohortRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/activity', activityRoutes);

// Root route
app.get('/', (req, res) => {
    res.send('UNDERESTIMATE CLUB API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
