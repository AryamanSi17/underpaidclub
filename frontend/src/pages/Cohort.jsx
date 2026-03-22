import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../components/student/DashboardLayout';
import api from '../lib/api';
import { Trophy, Star, Loader2, AlertTriangle, CheckCircle } from 'lucide-react';

const PERKS = [
  'Weekly live sessions with founders',
  '2.5-month structured curriculum',
  'Platinum badge on your profile',
  'Priority placement in founder search results',
  'Exclusive cohort Discord channels',
  'Demo Day at the end of cohort',
];

export default function Cohort() {
  const { user, refreshUser } = useAuth();
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState('');

  const handleJoin = async () => {
    setJoining(true);
    setError('');
    try {
      await api.post('/api/cohort/join');
      await refreshUser();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to join. Try again.');
    } finally {
      setJoining(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-xl mx-auto p-4 md:p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full bg-[#ffffff]/10 border-2 border-[#ffffff]/40 flex items-center justify-center mx-auto mb-5">
            <Trophy size={36} className="text-[#ffffff]" />
          </div>
          <h1 className="text-white text-2xl font-bold">The 2.5-Month Cohort</h1>
          <p className="text-[#a1a1aa] text-sm mt-2">India's most intense student founder program.</p>
        </div>

        {/* Enrolled state */}
        {user?.cohortEnrolled ? (
          <div className="text-center">
            <div className="bg-[#ffffff]/10 border border-[#ffffff]/30 rounded-2xl p-6 mb-5">
              <CheckCircle size={28} className="text-[#ffffff] mx-auto mb-3" />
              <p className="text-[#ffffff] font-bold text-lg mb-1">You're in the cohort!</p>
              <p className="text-[#a1a1aa] text-sm">Enrolled {user.cohortEnrolledAt ? new Date(user.cohortEnrolledAt).toLocaleDateString() : ''}</p>
            </div>
            <div className="inline-flex items-center gap-2 bg-[#ffffff]/15 border border-[#ffffff]/40 text-[#ffffff] text-sm font-bold px-4 py-2.5 rounded-full">
              <Star size={14} fill="currentColor" />
              PLATINUM BADGE EARNED
            </div>
            <p className="text-[#a1a1aa] text-xs mt-5">
              Your profile appears at the top when founders search for candidates.
            </p>
          </div>
        ) : (
          <>
            {/* Perks */}
            <div className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-2xl p-6 mb-6">
              <p className="text-[#a1a1aa] text-xs font-semibold uppercase tracking-wider mb-4">What you get</p>
              <ul className="space-y-3">
                {PERKS.map((perk, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-white">
                    <span className="text-[#ffffff] font-bold shrink-0">✓</span>
                    {perk}
                  </li>
                ))}
              </ul>
            </div>

            {/* Platinum badge info */}
            <div className="bg-[#0d0d0d] border border-[#ffffff]/30 rounded-xl p-4 mb-6 flex items-center gap-3">
              <Star size={20} className="text-[#ffffff] shrink-0" fill="currentColor" />
              <div>
                <p className="text-[#ffffff] font-semibold text-sm">Earn the Platinum Badge</p>
                <p className="text-[#a1a1aa] text-xs mt-0.5">
                  Platinum members appear <span className="text-white font-medium">above all other applicants</span> in founder search results.
                </p>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm flex items-center gap-2">
                <AlertTriangle size={14} /> {error}
              </div>
            )}

            {!user?.gauntletAttempted ? (
              <div className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl p-4 text-center">
                <p className="text-[#a1a1aa] text-sm">Complete the Gauntlet first to join the cohort.</p>
              </div>
            ) : (
              <button
                onClick={handleJoin}
                disabled={joining}
                className="w-full py-3.5 bg-[#ffffff] text-black font-bold rounded-xl hover:bg-[#e6c84a] transition-colors disabled:opacity-60 flex items-center justify-center gap-2 text-base"
              >
                {joining ? <Loader2 size={18} className="animate-spin" /> : <Trophy size={18} />}
                {joining ? 'Joining...' : 'Join the Next Cohort'}
              </button>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
