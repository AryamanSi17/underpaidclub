import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../components/student/DashboardLayout';
import apiService from '../services/api.service';
import { Zap, Clock, AlertTriangle, Loader2, Trophy } from 'lucide-react';

const TOTAL_SECONDS = 180; // 3 minutes

export default function Gauntlet() {
  const { user, refreshUser } = useAuth();
  const navigate = useNavigate();

  const [phase, setPhase] = useState('intro'); // intro | active | submitting | result | done
  const [prompt, setPrompt] = useState('');
  const [answer, setAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(TOTAL_SECONDS);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const timerRef = useRef(null);

  useEffect(() => {
    if (user?.gauntletAttempted) {
      setPhase('done');
    }
  }, [user]);

  const submitAnswer = useCallback(async (text) => {
    clearInterval(timerRef.current);
    setPhase('submitting');
    try {
      const res = await apiService.gauntlet.submit(text || 'No answer provided');
      setResult(res.data.data);
      await refreshUser();
      setPhase('result');
    } catch (err) {
      setError(err.response?.data?.message || 'Submission failed. Contact support.');
      setPhase('error');
    }
  }, [refreshUser]);

  useEffect(() => {
    if (phase === 'active') {
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            clearInterval(timerRef.current);
            submitAnswer(answer);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [phase, submitAnswer]);

  const startGauntlet = async () => {
    try {
      const res = await apiService.gauntlet.start();
      setPrompt(res.data.data.prompt);
      setTimeLeft(TOTAL_SECONDS);
      setPhase('active');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to start. Try again.');
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isUrgent = timeLeft <= 30;

  if (phase === 'done' || (user?.gauntletAttempted && phase === 'intro')) {
    return (
      <DashboardLayout>
        <div className="max-w-xl mx-auto p-4 md:p-8 text-center pt-16">
          <div className="w-24 h-24 rounded-full bg-[var(--o1)]/10 border border-[var(--o1)]/30 flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-[var(--o1)]/10">
            <Trophy size={48} className="text-[var(--o3)]" />
          </div>
          <h1 className="text-[var(--text)] text-3xl font-display uppercase tracking-widest mb-2">Gauntlet Complete</h1>
          <div className="text-8xl font-black text-[var(--o2)] my-6 font-display drop-shadow-lg">{user?.hustleScore ?? '—'}</div>
          <p className="text-[var(--muted)] text-sm mb-10 font-display tracking-widest uppercase">out of 100 — Hustle Score</p>
          {user?.hustleNotes?.length > 0 && (
            <div className="bg-[var(--card)] border border-[var(--border-hot)] rounded-2xl p-6 text-left shadow-xl">
              <p className="text-[var(--o4)] text-xs font-semibold uppercase tracking-[0.2em] mb-4 font-display">Improvement Notes</p>
              <ul className="space-y-4">
                {user.hustleNotes.map((n, i) => (
                  <li key={i} className="flex items-start gap-4 text-sm text-[var(--text)]/80 leading-relaxed">
                    <span className="text-[var(--o1)] font-bold">→</span> {n}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <button onClick={() => navigate('/bounties')} className="mt-10 px-10 py-4 bg-gradient-to-r from-[var(--o1)] to-[var(--o3)] text-white font-bold rounded-full hover:opacity-90 transition-all uppercase tracking-[0.2em] text-sm shadow-xl shadow-[var(--o1)]/20">
            Browse Roles →
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto p-4 md:p-8">

        {phase === 'intro' && (
          <div className="text-center pt-8">
            <div className="w-24 h-24 rounded-full bg-[var(--o1)]/10 border border-[var(--o1)]/30 flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-[var(--o1)]/10">
              <Zap size={48} className="text-[var(--o3)]" />
            </div>
            <h1 className="text-[var(--text)] text-3xl font-display uppercase tracking-widest mb-4">The Gauntlet</h1>
            <p className="text-[var(--muted)] mb-10 max-w-md mx-auto leading-relaxed">
              One startup scenario. <span className="text-[var(--o4)] font-bold font-display tracking-wide">3 minutes</span> to respond.
              Clock hits zero — it auto-submits. <span className="text-[var(--o1)] font-bold uppercase tracking-widest text-xs">No re-attempts.</span>
            </p>

            {!user?.profileComplete ? (
              <div className="bg-[var(--card)] border border-[var(--o1)]/20 rounded-2xl p-6 mb-8 shadow-xl">
                <AlertTriangle size={24} className="text-[var(--o1)] mx-auto mb-3" />
                <p className="text-[var(--muted)] text-sm mb-4">Complete your profile before taking the Gauntlet.</p>
                <button onClick={() => navigate('/profile')} className="px-6 py-2 border border-[var(--o2)]/30 text-[var(--o2)] text-xs font-bold rounded-full hover:bg-[var(--o2)]/10 transition-all uppercase tracking-widest">
                  Setup Profile →
                </button>
              </div>
            ) : (
              <>
                <div className="bg-[var(--card)] border border-[var(--border-hot)] rounded-2xl p-6 mb-10 text-left space-y-4 shadow-xl">
                  {['One scenario. One shot.', '3-minute timer, starts immediately.', 'Auto-submit when time runs out.', 'AI scores your hustle.'].map((rule, i) => (
                    <div key={i} className="flex items-center gap-4 text-sm text-[var(--muted)]">
                      <span className="text-[var(--o2)] font-display text-lg font-black">{i + 1}.</span> {rule}
                    </div>
                  ))}
                </div>

                {error && <p className="text-red-400 text-sm mb-6">{error}</p>}

                <button onClick={startGauntlet} className="px-10 py-4 bg-gradient-to-r from-[var(--o1)] to-[var(--o3)] text-white font-bold text-sm rounded-full hover:opacity-90 transition-all uppercase tracking-[0.2em] shadow-xl shadow-[var(--o1)]/20">
                  Start the Clock
                </button>
              </>
            )}
          </div>
        )}

        {phase === 'active' && (
          <div>
            {/* Timer */}
            <div className={`flex items-center gap-3 mb-6 ${isUrgent ? 'text-[var(--o1)]' : 'text-[var(--text)]'}`}>
              <Clock size={20} className={isUrgent ? 'animate-pulse' : ''} />
              <span className={`font-mono font-bold text-3xl ${isUrgent ? 'animate-pulse' : ''}`}>
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </span>
              <span className="text-[var(--muted)] text-sm ml-2 font-display tracking-widest uppercase">remaining</span>
            </div>

            {/* Prompt */}
            <div className="bg-[var(--dark)] border border-[var(--border)] rounded-2xl p-6 mb-6">
              <p className="text-[var(--o4)] text-[10px] font-bold uppercase tracking-widest mb-3">Your Scenario</p>
              <p className="text-[var(--text)] text-base leading-relaxed">{prompt}</p>
            </div>

            {/* Answer */}
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your response here..."
              className="w-full h-64 bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] text-sm rounded-2xl p-6 outline-none focus:border-[var(--o2)]/50 resize-none placeholder:text-[var(--muted)]/50 transition-all font-sans leading-relaxed shadow-inner"
            />

            <div className="flex items-center justify-between mt-6">
              <p className="text-[var(--muted)] text-[10px] font-bold uppercase tracking-widest">{answer.length} characters</p>
              <button
                onClick={() => submitAnswer(answer)}
                disabled={answer.trim().length < 10}
                className="px-8 py-3 bg-[var(--o2)] text-white font-bold rounded-full hover:opacity-90 transition-all disabled:opacity-30 text-xs uppercase tracking-widest"
              >
                Submit Early →
              </button>
            </div>
          </div>
        )}

        {phase === 'submitting' && (
          <div className="text-center py-16">
            <Loader2 size={40} className="animate-spin text-[var(--text)] mx-auto mb-4" />
            <p className="text-[var(--text)] font-semibold text-lg">Claude is scoring your hustle...</p>
            <p className="text-[var(--muted)] text-sm mt-2">This takes a few seconds.</p>
          </div>
        )}

        {phase === 'result' && result && (
          <div className="text-center py-8">
            <div className="w-24 h-24 rounded-full bg-[var(--o1)]/10 border border-[var(--o1)]/30 flex items-center justify-center mx-auto mb-8 shadow-2xl">
              <Trophy size={48} className="text-[var(--o3)]" />
            </div>
            <p className="text-[var(--muted)] text-[10px] font-bold uppercase tracking-widest mb-1">Your Hustle Score</p>
            <div className="text-8xl font-black text-[var(--o2)] my-6 font-display drop-shadow-lg">{result.score}</div>
            <p className="text-[var(--muted)] text-[10px] font-bold uppercase tracking-widest mb-10">out of 100</p>

            {result.notes?.length > 0 && (
              <div className="bg-[var(--card)] border border-[var(--border-hot)] rounded-2xl p-6 text-left mb-10 shadow-xl">
                <p className="text-[var(--o4)] text-[10px] font-bold uppercase tracking-widest mb-4">Improvement Notes</p>
                <ul className="space-y-4">
                  {result.notes.map((n, i) => (
                    <li key={i} className="flex items-start gap-4 text-sm text-[var(--text)]/80 leading-relaxed">
                      <span className="text-[var(--o1)] font-bold">→</span> {n}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button onClick={() => navigate('/bounties')} className="px-10 py-4 bg-gradient-to-r from-[var(--o1)] to-[var(--o3)] text-white font-bold rounded-full hover:opacity-90 transition-all uppercase tracking-[0.2em] text-sm shadow-xl shadow-[var(--o1)]/20">
              Browse Roles →
            </button>
          </div>
        )}

        {phase === 'error' && (
          <div className="text-center py-12">
            <AlertTriangle size={40} className="text-red-400 mx-auto mb-4" />
            <p className="text-red-400 font-semibold text-lg mb-2">Something went wrong</p>
            <p className="text-[var(--muted)] text-sm">{error}</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
