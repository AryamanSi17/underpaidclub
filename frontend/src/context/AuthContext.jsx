import { createContext, useContext, useState, useEffect } from 'react';
import api from '../lib/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('tuc_token');
    if (token === 'dev-token') {
      // Dev bypass — restore mock user
      setUser({
        id: 'dev-user-1',
        name: 'Aryaman Sharma',
        email: 'aryaman@iitb.ac.in',
        photo: 'https://api.dicebear.com/7.x/initials/svg?seed=AS&backgroundColor=000000&textColor=ffffff',
        college: 'IIT Bombay',
        branch: 'Computer Science & Engineering',
        year: 3,
        expectedGraduation: 'May 2026',
        skills: ['Full-Stack Dev', 'Product Design', 'Growth Hacking'],
        github: 'https://github.com/aryamansharma',
        linkedin: 'https://linkedin.com/in/aryamansharma',
        twitter: 'https://twitter.com/aryaman_builds',
        portfolio: 'https://aryaman.dev',
        experience: [
          { company: 'Razorpay', role: 'SDE Intern', description: 'Built internal tooling that reduced onboarding time by 40%.' },
          { company: 'Stealth Startup', role: 'Co-Founder', description: 'Built a B2B SaaS for college placement cells — 12 colleges onboarded.' },
        ],
        bio: 'building 0→1 products that actually ship',
        preferredRole: 'internship',
        profileComplete: true,
        gauntletAttempted: true,
        hustleScore: 84,
        hustleNotes: [
          'Be more specific about execution steps — show the exact order of operations.',
          'Quantify your decisions with metrics or timeframes when possible.',
          'Address stakeholder communication earlier in your response.',
        ],
        resumeGeneratedAt: new Date().toISOString(),
        cohortEnrolled: false,
        badges: [],
        discordInviteGenerated: false,
      });
      setLoading(false);
    } else if (token) {
      api.get('/api/auth/me')
        .then((res) => setUser(res.data.data))
        .catch(() => {
          localStorage.removeItem('tuc_token');
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const loginWithGoogle = async (credential) => {
    const res = await api.post('/api/auth/google', { credential });
    const { token, user: userData } = res.data.data;
    localStorage.setItem('tuc_token', token);
    setUser(userData);
    return userData;
  };

  const logout = () => {
    localStorage.removeItem('tuc_token');
    localStorage.removeItem('tuc_user');
    setUser(null);
  };

  const refreshUser = async () => {
    const res = await api.get('/api/auth/me');
    setUser(res.data.data);
    return res.data.data;
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, loginWithGoogle, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
