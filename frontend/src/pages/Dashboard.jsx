import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/student/DashboardLayout';
import { ArrowRight, Zap, FileText, Briefcase, Trophy, Users, CheckCircle } from 'lucide-react';

const SCORE_COLOR = (s) => {
  if (s >= 80) return 'text-[var(--o4)]';
  if (s >= 50) return 'text-[var(--o2)]';
  return 'text-[var(--o1)]';
};

const SCORE_LABEL = (s) => {
  if (s >= 80) return 'Exceptional';
  if (s >= 60) return 'Strong';
  if (s >= 40) return 'Developing';
  return 'Keep Hustling';
};

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const steps = [
    {
      id: 'profile',
      icon: <CheckCircle size={18} />,
      title: 'Build your profile',
      desc: 'Fill out all your details to get started',
      done: user?.profileComplete,
      action: () => navigate('/profile'),
      cta: 'Setup Profile',
    },
    {
      id: 'gauntlet',
      icon: <Zap size={18} />,
      title: 'Take The Gauntlet',
      desc: '3-minute logic test. No re-attempts.',
      done: user?.gauntletAttempted,
      locked: !user?.profileComplete,
      action: () => navigate('/gauntlet'),
      cta: 'Start Test',
    },
    {
      id: 'resume',
      icon: <FileText size={18} />,
      title: 'Generate your resume',
      desc: 'Auto-built from your profile data',
      done: !!user?.resumeGeneratedAt,
      locked: !user?.profileComplete,
      action: () => navigate('/resume'),
      cta: 'Generate Resume',
    },
    {
      id: 'bounties',
      icon: <Briefcase size={18} />,
      title: 'Apply to roles',
      desc: 'Browse internships, full-time & bounties',
      locked: !user?.gauntletAttempted,
      action: () => navigate('/bounties'),
      cta: 'Browse Roles',
    },
    {
      id: 'cohort',
      icon: <Trophy size={18} />,
      title: 'Join the 2.5-month cohort',
      desc: 'Earn your Platinum badge & priority placement',
      done: user?.cohortEnrolled,
      locked: !user?.gauntletAttempted,
      action: () => navigate('/cohort'),
      cta: 'Join Cohort',
    },
    {
      id: 'community',
      icon: <Users size={18} />,
      title: 'Unlock the War Room',
      desc: '100% profile + all links required',
      done: user?.discordInviteGenerated,
      locked: !user?.profileComplete,
      action: () => navigate('/community'),
      cta: 'Enter War Room',
    },
  ];

  return (
    <DashboardLayout>
      <div className="p-4 md:p-8">
        {/* Header */}
        <div className="mb-8 md:mb-10">
          <h1 className="text-white text-3xl md:text-4xl font-black">
            Welcome back, {user?.name?.split(' ')[0]}
          </h1>
          <p className="text-zinc-500 text-sm md:text-base mt-1">{user?.email}</p>
        </div>

        {/* Hustle Score */}
        {user?.hustleScore != null && (
          <div className="mb-8 md:mb-10 bg-[var(--card)] border border-[var(--border-hot)] rounded-2xl p-5 md:p-7 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[var(--o1)]/10 to-transparent blur-3xl group-hover:from-[var(--o1)]/20 transition-all duration-500" />
            <div className="flex items-center justify-between flex-wrap gap-4 md:gap-6 relative z-10">
              <div>
                <p className="text-[var(--o3)] text-xs md:text-sm font-semibold uppercase tracking-widest mb-2 font-display">Hustle Score</p>
                <div className="flex items-baseline gap-2 md:gap-3">
                  <span className={`text-7xl md:text-8xl font-black leading-none font-display ${SCORE_COLOR(user.hustleScore)}`}>
                    {user.hustleScore}
                  </span>
                  <span className="text-[var(--muted)] text-xl md:text-2xl font-display">/100</span>
                </div>
                <p className={`text-base md:text-lg font-bold mt-2 ${SCORE_COLOR(user.hustleScore)}`}>
                  {SCORE_LABEL(user.hustleScore)}
                </p>
              </div>
              <div className="flex-1 max-w-sm">
                <div className="w-full h-1.5 bg-[var(--black)] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000 bg-gradient-to-r from-[var(--o1)] to-[var(--o3)]"
                    style={{ width: `${user.hustleScore}%` }}
                  />
                </div>
                {user?.badges?.includes('platinum') && (
                  <div className="mt-4 inline-flex items-center gap-2 bg-[var(--o1)]/10 border border-[var(--o1)]/30 text-[var(--o4)] text-xs font-bold px-4 py-2 rounded-full tracking-wider">
                    <Trophy size={14} />
                    PLATINUM MEMBER
                  </div>
                )}
              </div>
            </div>

            {user?.hustleNotes?.length > 0 && (
              <div className="mt-6 pt-6 border-t border-[var(--border)]">
                <p className="text-[var(--muted)] text-xs font-semibold uppercase tracking-widest mb-4 font-display">Improvement Notes</p>
                <ul className="space-y-3">
                  {user.hustleNotes.map((note, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[var(--text)]/80">
                      <span className="text-[var(--o2)] mt-0.5">→</span>
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Steps */}
        <div>
          <h2 className="text-[var(--text)] font-semibold text-lg md:text-xl mb-4 md:mb-5 font-display tracking-wide uppercase">Your Journey</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`group bg-[var(--card)] border rounded-2xl p-6 transition-all duration-300 ${
                  step.done
                    ? 'border-[var(--border)] opacity-60'
                    : step.locked
                    ? 'border-[var(--border)]/10 opacity-40'
                    : 'border-[var(--border)] hover:border-[var(--o2)]/50 hover:shadow-[0_0_20px_rgba(255,106,0,0.1)]'
                }`}
              >
                <div className={`mb-4 transition-transform group-hover:scale-110 ${step.done ? 'text-[var(--o4)]' : step.locked ? 'text-[var(--muted)]' : 'text-[var(--o2)]'}`}>
                  {step.icon}
                </div>
                <h3 className={`font-bold text-base mb-1 ${step.locked ? 'text-[var(--muted)]' : 'text-[var(--text)]'}`}>
                  {step.title}
                  {step.done && <span className="ml-2 text-[var(--o4)] text-sm font-normal">✓ Done</span>}
                  {step.locked && <span className="ml-1 text-sm">🔒</span>}
                </h3>
                <p className="text-[var(--muted)] text-sm mb-5 leading-relaxed">{step.desc}</p>
                {!step.done && !step.locked && (
                  <button
                    onClick={step.action}
                    className="flex items-center gap-1.5 text-[var(--o3)] text-sm font-semibold hover:gap-3 transition-all hover:text-[var(--o4)]"
                  >
                    {step.cta} <ArrowRight size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
