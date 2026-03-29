import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import { Loader2, ArrowLeft } from 'lucide-react';

export default function Login() {
  const { user, requestOTP, verifyOTP } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1: Email, 2: OTP
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [userType, setUserType] = useState('student'); // 'student' or 'alumni'
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) navigate('/dashboard', { replace: true });
  }, [user, navigate]);

  const handleRequestOTP = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await requestOTP(email, name, userType);
      setStep(2);
      setMessage(userType === 'student' 
        ? 'A 6-digit code has been sent to your institutional email.'
        : 'Verify your identity. Alumni without email access use Manual Path.'
      );
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed. Are you sure that is a Tier 1 institutional email?');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await verifyOTP(email, otp);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid or expired OTP.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-mono flex items-center justify-center p-6 sm:p-0">
      {/* Background Grains */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,#00FF8522_0%,transparent_60%)]" />
      </div>

      <div className="w-full max-w-[400px] relative z-10">
        {/* Logo */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#00FF85] shadow-[0_0_10px_#00FF85]" />
            <h1 className="text-[#00FF85] text-[18px] font-bold tracking-[0.2em] uppercase">UNDERCLUB</h1>
          </div>
          <p className="text-[#888888] text-[12px] mt-2 uppercase tracking-widest opacity-50">Private Room for Tier 1 Talent</p>
        </div>

        {step === 1 ? (
          <form onSubmit={handleRequestOTP} className="space-y-6">
            <h2 className="text-[28px] sm:text-[32px] font-bold leading-tight mb-2">
              Enter the<br />inner circle.
            </h2>
            
            <div className="flex gap-2 p-1 bg-[#1A1A1A] rounded-lg border border-[#2A2A2A] mb-8">
                <button 
                  type="button"
                  onClick={() => setUserType('student')}
                  className={`flex-1 py-2 text-[11px] font-bold uppercase tracking-widest rounded-md transition-all ${userType === 'student' ? 'bg-[#00FF85] text-black' : 'text-[#888888] hover:text-white'}`}
                >
                  Student
                </button>
                <button 
                  type="button"
                  onClick={() => setUserType('alumni')}
                  className={`flex-1 py-2 text-[11px] font-bold uppercase tracking-widest rounded-md transition-all ${userType === 'alumni' ? 'bg-[#00FF85] text-black' : 'text-[#888888] hover:text-white'}`}
                >
                  Alumni
                </button>
            </div>

            {error && <div className="p-4 bg-[#FF4444]/10 border border-[#FF4444]/20 rounded-lg text-[#FF4444] text-[13px]">{error}</div>}

            <div className="space-y-4">
              <div>
                <label className="block text-[#888888] text-[11px] font-bold uppercase tracking-widest mb-2">What's your name?</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  required
                  className="w-full bg-[#111111] border border-[#2A2A2A] text-white px-4 py-3 rounded-lg outline-none focus:border-[#00FF85] transition-all"
                />
              </div>
              <div>
                <label className="block text-[#888888] text-[11px] font-bold uppercase tracking-widest mb-2">
                  {userType === 'student' ? 'College Email' : 'Professional or Personal Email'}
                </label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={userType === 'student' ? 'you@iitb.ac.in' : 'you@gmail.com'}
                  required
                  className="w-full bg-[#111111] border border-[#2A2A2A] text-white px-4 py-3 rounded-lg outline-none focus:border-[#00FF85] transition-all"
                />
              </div>
            </div>

            <Button variant="primary" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="animate-spin text-[#000]" size={20} /> : 'REQUEST ACCESS'}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOTP} className="space-y-6">
            <button 
              type="button"
              onClick={() => setStep(1)}
              className="flex items-center gap-2 text-[#888888] hover:text-white text-[12px] mb-6 transition-colors"
            >
              <ArrowLeft size={14} /> Back to email
            </button>
            <h2 className="text-[32px] font-bold leading-tight mb-2">
              Check your<br />inbox.
            </h2>
            <p className="text-[#888888] text-[15px] mb-8 leading-relaxed">
              {message}
            </p>

            {error && <div className="p-4 bg-[#FF4444]/10 border border-[#FF4444]/20 rounded-lg text-[#FF4444] text-[13px]">{error}</div>}

            <div>
              <label className="block text-[#888888] text-[11px] font-bold uppercase tracking-widest mb-2">6-Digit Access Code</label>
              <input 
                type="text" 
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="000 000"
                required
                className="w-full bg-[#111111] border border-[#2A2A2A] text-white px-4 py-3 rounded-lg outline-none focus:border-[#00FF85] transition-all text-center text-[24px] font-bold tracking-[0.5em]"
              />
            </div>

            <Button variant="primary" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="animate-spin text-[#000]" size={20} /> : 'VERIFY & ENTER'}
            </Button>
            
            <p className="text-[12px] text-[#888888] text-center">
              Didn't get the code? <button type="button" onClick={handleRequestOTP} className="text-[#00FF85] hover:underline">Resend</button>
            </p>
          </form>
        )}

        <p className="text-[#888888] opacity-30 text-[10px] text-center mt-20 uppercase tracking-widest">
          Invite only · Verified · theunderestimateclub.in
        </p>
      </div>
    </div>
  );
}
