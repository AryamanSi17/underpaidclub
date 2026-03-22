import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../components/student/DashboardLayout';
import api from '../lib/api';
import { Users, ExternalLink, AlertTriangle, Loader2, Lock, CheckCircle } from 'lucide-react';

export default function Community() {
  const { user, refreshUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [inviteLink, setInviteLink] = useState('');
  const [error, setError] = useState('');

  const isFullyComplete = user?.profileComplete && user?.linkedin && user?.github &&
    user?.college && user?.bio && user?.twitter;

  const handleGetInvite = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/api/community/discord-invite');
      setInviteLink(res.data.data.inviteLink);
      await refreshUser();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate invite.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenInvite = () => {
    window.open(inviteLink, '_blank');
  };

  const requirements = [
    { label: 'Profile complete', done: !!user?.profileComplete },
    { label: 'GitHub added', done: !!user?.github },
    { label: 'LinkedIn added', done: !!user?.linkedin },
    { label: 'Twitter added', done: !!user?.twitter },
    { label: 'College added', done: !!user?.college },
    { label: '1-line bio added', done: !!user?.bio },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-xl mx-auto p-4 md:p-8">
        <div className="text-center mb-8">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 border-2 transition-all ${
            isFullyComplete
              ? 'bg-[#ffffff]/10 border-[#ffffff]/40'
              : 'bg-[#1a1a1a] border-[#2a2a2a]'
          }`}>
            {isFullyComplete ? (
              <Users size={36} className="text-[#ffffff]" />
            ) : (
              <Lock size={36} className="text-[#3f3f46]" />
            )}
          </div>
          <h1 className="text-white text-2xl font-bold">
            {isFullyComplete ? 'War Room' : 'War Room 🔒'}
          </h1>
          <p className="text-[#a1a1aa] text-sm mt-2">
            {isFullyComplete
              ? "You've unlocked access. One single-use Discord invite below."
              : 'Complete your profile fully to unlock this.'}
          </p>
        </div>

        {/* Requirements checklist */}
        {!isFullyComplete && (
          <div className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-2xl p-6 mb-6">
            <p className="text-[#a1a1aa] text-xs font-semibold uppercase tracking-wider mb-4">Requirements</p>
            <ul className="space-y-3">
              {requirements.map((req, i) => (
                <li key={i} className="flex items-center gap-3 text-sm">
                  {req.done
                    ? <CheckCircle size={16} className="text-green-400 shrink-0" />
                    : <div className="w-4 h-4 rounded-full border border-[#3f3f46] shrink-0" />
                  }
                  <span className={req.done ? 'text-white' : 'text-[#3f3f46]'}>{req.label}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Warning: invite is single-use */}
        {isFullyComplete && !user?.discordInviteGenerated && (
          <div className="bg-[#ffffff]/5 border border-[#ffffff]/30 rounded-xl p-4 mb-6 flex gap-3">
            <AlertTriangle size={16} className="text-[#ffffff] shrink-0 mt-0.5" />
            <p className="text-[#a1a1aa] text-sm">
              This generates a <span className="text-[#ffffff] font-semibold">single-use</span> Discord invite link.
              It gets invalidated after first click — don't share it.
            </p>
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm flex items-center gap-2">
            <AlertTriangle size={14} /> {error}
          </div>
        )}

        {/* Invite already generated */}
        {(user?.discordInviteGenerated || inviteLink) && (
          <div className="bg-[#0d0d0d] border border-[#ffffff]/30 rounded-xl p-5 mb-5">
            <p className="text-[#a1a1aa] text-xs mb-2">Your invite link</p>
            <p className="text-[#ffffff] font-mono text-sm break-all">{inviteLink || user?.discordInviteLink}</p>
          </div>
        )}

        {isFullyComplete && (
          <>
            {inviteLink || user?.discordInviteGenerated ? (
              <button
                onClick={handleOpenInvite}
                className="w-full py-3.5 bg-[#5865F2] text-white font-bold rounded-xl hover:bg-[#4752C4] transition-colors flex items-center justify-center gap-2"
              >
                <ExternalLink size={18} />
                Open Discord
              </button>
            ) : (
              <button
                onClick={handleGetInvite}
                disabled={loading}
                className="w-full py-3.5 bg-[#ffffff] text-black font-bold rounded-xl hover:bg-[#e6c84a] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : <Users size={18} />}
                {loading ? 'Generating...' : 'Generate My Invite'}
              </button>
            )}
          </>
        )}

        <p className="text-[#3f3f46] text-xs text-center mt-5">
          The War Room is a private Discord community for verified TUC members only.
        </p>
      </div>
    </DashboardLayout>
  );
}
