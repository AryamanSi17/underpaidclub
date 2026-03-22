import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../components/student/DashboardLayout';
import BountyCard from '../components/student/BountyCard';
import api from '../lib/api';
import { Briefcase, AlertTriangle, Loader2 } from 'lucide-react';

const FILTERS = ['all', 'internship', 'fulltime', 'bounty'];

export default function Bounties() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bounties, setBounties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(null);
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/api/bounties')
      .then((res) => setBounties(res.data.data))
      .catch(() => setError('Failed to load bounties'))
      .finally(() => setLoading(false));
  }, []);

  const handleApply = async (bountyId) => {
    setApplying(bountyId);
    setError('');
    try {
      await api.post(`/api/bounties/${bountyId}/apply`);
      setBounties((prev) =>
        prev.map((b) => b._id === bountyId ? { ...b, applicationStatus: 'pending' } : b)
      );
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to apply.');
    } finally {
      setApplying(null);
    }
  };

  const filtered = filter === 'all' ? bounties : bounties.filter((b) => b.type === filter);

  if (!user?.gauntletAttempted) {
    return (
      <DashboardLayout>
        <div className="max-w-xl mx-auto p-4 md:p-8 text-center pt-20">
          <AlertTriangle size={48} className="text-[var(--o1)] mx-auto mb-6" />
          <h1 className="text-[var(--text)] text-2xl font-display uppercase tracking-widest mb-4">Complete The Gauntlet First</h1>
          <p className="text-[var(--muted)] text-sm mb-8 leading-relaxed">Your Hustle Score is your entry ticket. Take the 3-minute challenge to unlock the room.</p>
          <button onClick={() => navigate('/gauntlet')} className="px-8 py-3 bg-gradient-to-r from-[var(--o1)] to-[var(--o3)] text-white font-bold rounded-full hover:opacity-90 transition-all uppercase tracking-widest text-sm shadow-xl shadow-[var(--o1)]/20">
            Take the Gauntlet →
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-4 md:p-8">
        <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-[var(--text)] text-2xl md:text-3xl font-display tracking-wider uppercase">Bounties & Roles</h1>
            <p className="text-[var(--muted)] text-sm mt-1">Your verified profile is auto-attached to every request.</p>
          </div>
          {user?.hustleScore != null && (
            <div className="bg-[var(--card)] border border-[var(--border-hot)] px-5 py-2.5 rounded-2xl flex items-center gap-4">
              <div>
                <p className="text-[var(--muted)] text-[10px] font-bold uppercase tracking-widest">Hustle Score</p>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[var(--o3)] font-display text-2xl font-black">{user.hustleScore}</span>
                  <span className="text-[var(--muted)] text-xs font-display">/100</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2 rounded-full text-[11px] font-bold transition-all capitalize tracking-widest border ${
                filter === f
                  ? 'bg-[var(--o2)] text-white border-[var(--o2)] shadow-lg shadow-[var(--o2)]/20'
                  : 'bg-[var(--surface)] border-[var(--border)] text-[var(--muted)] hover:text-white hover:border-[var(--o3)]/50'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {error && (
          <div className="mb-5 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">{error}</div>
        )}

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 size={32} className="animate-spin text-white" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <Briefcase size={40} className="text-zinc-700 mx-auto mb-4" />
            <p className="text-zinc-400">No {filter === 'all' ? '' : filter} roles available right now.</p>
            <p className="text-zinc-600 text-sm mt-1">Check back soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((bounty) => (
              <BountyCard
                key={bounty._id}
                bounty={bounty}
                onApply={handleApply}
                applying={applying === bounty._id}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
