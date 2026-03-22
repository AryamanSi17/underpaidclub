import { useNavigate } from 'react-router-dom';
import { DotPattern } from '../components/ui/DotPattern';
import { ShieldX } from 'lucide-react';

export default function Blocked() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center relative overflow-hidden">
      <DotPattern className="opacity-40" glowColor="#7f1d1d" />
      <div className="relative z-10 text-center px-6 max-w-lg">
        <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto mb-6">
          <ShieldX size={36} className="text-red-400" />
        </div>
        <h1 className="text-white font-black text-3xl mb-3">
          This club isn't for everyone.
        </h1>
        <p className="text-[#a1a1aa] text-base leading-relaxed mb-8">
          Access is restricted to students with an institutional{' '}
          <span className="text-[#ffffff]">.ac.in</span> email address.
          <br />
          No exceptions. No workarounds.
        </p>
        <p className="text-[#3f3f46] text-sm mb-6">
          If you're a student, use your college-issued email to apply.
        </p>
        <button
          onClick={() => navigate('/login')}
          className="px-6 py-2.5 bg-[#1a1a1a] border border-[#2a2a2a] text-[#a1a1aa] rounded-lg text-sm hover:text-white transition-colors"
        >
          Try another account
        </button>
      </div>
    </div>
  );
}
