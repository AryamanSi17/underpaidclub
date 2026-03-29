import api from '../lib/api';

/**
 * Common API Service to centralize all backend interactions.
 * Aligns with the TUC Student Dashboard PRD v1.
 */
const apiService = {
  // Auth
  auth: {
    requestOTP: (email, name, userType) => 
      api.post('/api/auth/request-otp', { email, name, userType }),
    verifyOTP: (email, otp) => 
      api.post('/api/auth/verify-otp', { email, otp }),
    getMe: () => 
      api.get('/api/auth/me'),
  },

  // Profile
  profile: {
    update: (data) => 
      api.put('/api/profile', data),
    get: () => 
      api.get('/api/auth/me'), // Profile is part of user/me
  },

  // Bounties
  bounties: {
    getAll: () => 
      api.get('/api/bounties'),
    save: (id) => 
      api.post(`/api/bounties/${id}/save`),
    requestIntro: (id, resumeId) => 
      api.post(`/api/bounties/${id}/request-intro`, { resumeId }),
  },

  // Activity
  activity: {
    getRecent: () => 
      api.get('/api/activity'),
    markRead: (id) => 
      api.put(`/api/activity/${id}/read`),
  },

  // Gauntlet & Score
  gauntlet: {
    start: () => 
      api.get('/api/gauntlet/start'),
    submit: (answer) => 
      api.post('/api/gauntlet/submit', { answer }),
  },

  // Resume
  resume: {
    generate: () => 
      api.post('/api/resume/generate'),
    download: () => 
      api.get('/api/resume/download', { responseType: 'blob' }),
    preview: () => 
      api.get('/api/resume/preview', { responseType: 'blob' }),
  },

  // Cohort
  cohort: {
    join: () => 
      api.post('/api/cohort/join'),
  },

  // Community / War Room
  community: {
    getDiscordInvite: () => 
      api.get('/api/community/discord-invite'),
  },
  
  // Waitlist (Landing Page)
  waitlist: {
    join: (data) => 
      api.post('/api/waitlist', data),
  }
};

export default apiService;
