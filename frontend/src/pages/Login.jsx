import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { DotPattern } from '../components/ui/DotPattern';

const MOCK_USER = {
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
};

export default function Login() {
  const { setUser, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/dashboard', { replace: true });
  }, [user]);

  const handleLogin = () => {
    localStorage.setItem('tuc_token', 'dev-token');
    setUser(MOCK_USER);
    navigate('/dashboard', { replace: true });
  };

  return (
    <div className="min-h-screen bg-[var(--black)] flex items-center justify-center relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,61,0,0.08),transparent_70%)]" />
      
      <div className="relative z-10 w-full max-w-lg px-6">
        {/* Branding */}
        <div className="mb-12">
          <div className="branding" style={{ fontSize: '2rem' }}>
            <div className="branding-dot"></div>
            <div className="branding-main">
              <span className="branding-underestimate">underestimate</span>
              <span className="branding-club">Club</span>
            </div>
          </div>
        </div>

        <h1 className="text-[var(--text)] font-display text-5xl md:text-7xl leading-[0.9] mb-6 uppercase tracking-tight">
          Stop being<br />
          <span className="text-[var(--o2)]">under</span>estimated.
        </h1>
        <p className="text-[var(--muted)] text-lg mb-12 max-w-sm leading-relaxed">
          The private room for Tier 1 talent. Use your <span className="text-[var(--o4)] font-medium">.ac.in</span> institutional email to enter.
        </p>

        <button
          onClick={handleLogin}
          className="w-full py-4 bg-gradient-to-r from-[var(--o1)] to-[var(--o3)] text-white font-bold text-sm rounded-full hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-3 uppercase tracking-[0.2em] shadow-xl shadow-[var(--o1)]/20"
        >
          Continue with Google
        </button>

        <p className="text-[var(--muted)] opacity-40 text-[10px] text-center mt-8 uppercase tracking-widest">
          Invite only · Verified · theunderestimateclub.in
        </p>
      </div>
    </div>
  );
}
