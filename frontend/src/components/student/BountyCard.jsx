import { Briefcase, DollarSign, Tag, Loader2 } from 'lucide-react';

const TYPE_COLORS = {
  internship: 'bg-[var(--o1)]/10 text-[var(--o1)] border-[var(--o1)]/30',
  fulltime: 'bg-[var(--o2)]/10 text-[var(--o2)] border-[var(--o2)]/30',
  bounty: 'bg-[var(--o3)]/10 text-[var(--o3)] border-[var(--o3)]/30',
};

export default function BountyCard({ bounty, onApply, applying }) {
  const { title, startupName, type, compensation, description, skills, applicationStatus } = bounty;

  const typeColor = TYPE_COLORS[type] || TYPE_COLORS.bounty;

  const renderButton = () => {
    if (applicationStatus === 'pending') {
      return (
        <button disabled className="px-4 py-2 rounded-lg text-xs bg-[var(--surface)] text-[var(--muted)] border border-[var(--border)] cursor-not-allowed font-medium uppercase tracking-wider">
          Pending Approval
        </button>
      );
    }
    if (applicationStatus === 'approved') {
      return (
        <button disabled className="px-4 py-2 rounded-lg text-xs bg-[var(--o3)]/10 text-[var(--o3)] border border-[var(--o3)]/30 cursor-not-allowed font-bold uppercase tracking-wider">
          Approved ✓
        </button>
      );
    }
    if (applicationStatus === 'rejected') {
      return (
        <button disabled className="px-4 py-2 rounded-lg text-xs bg-red-500/10 text-red-500 border border-red-500/30 cursor-not-allowed font-medium uppercase tracking-wider">
          Not Selected
        </button>
      );
    }
    return (
      <button
        onClick={() => onApply(bounty._id)}
        disabled={applying}
        className="px-4 py-2 rounded-lg text-xs bg-gradient-to-r from-[var(--o1)] to-[var(--o3)] text-white font-bold hover:opacity-90 transition-all disabled:opacity-60 flex items-center gap-2 uppercase tracking-widest shadow-lg shadow-[var(--o1)]/20"
      >
        {applying ? <Loader2 size={12} className="animate-spin" /> : null}
        Request Intro
      </button>
    );
  };

  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 hover:border-[var(--o2)]/40 hover:shadow-[0_0_15px_rgba(255,106,0,0.05)] transition-all group">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <h3 className="text-[var(--text)] font-bold group-hover:text-[var(--o4)] transition-colors">{title}</h3>
          <p className="text-[var(--muted)] text-xs mt-0.5 uppercase tracking-wide">{startupName}</p>
        </div>
        <span className={`shrink-0 text-[10px] px-2.5 py-1 rounded-full border font-bold uppercase tracking-widest ${typeColor}`}>
          {type}
        </span>
      </div>

      <p className="text-[var(--muted)] text-sm mb-4 line-clamp-2 leading-relaxed">{description}</p>

      {skills?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {skills.map((s) => (
            <span key={s} className="text-[10px] bg-[var(--surface)] text-[var(--text)]/70 px-2 py-0.5 rounded border border-[var(--border)]">
              {s}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between mt-5 pt-4 border-t border-[var(--border)]">
        <div className="flex items-center gap-1.5 text-[var(--o4)] text-sm font-bold font-display">
          <DollarSign size={14} className="text-[var(--o2)]" />
          {compensation}
        </div>
        {renderButton()}
      </div>
    </div>
  );
}
