import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../components/student/DashboardLayout';
import api from '../lib/api';
import { Plus, Trash2, Loader2, CheckCircle } from 'lucide-react';

const YEARS = [1, 2, 3, 4, 5];
const ROLES = [
  { value: 'internship', label: 'Internship' },
  { value: 'fulltime', label: 'Full-time' },
  { value: 'bounty', label: 'Bounty / Freelance' },
];

const Input = ({ label, required, ...props }) => (
  <div>
    <label className="block text-[#a1a1aa] text-xs font-medium mb-1.5 uppercase tracking-wide">
      {label} {required && <span className="text-[#ffffff]">*</span>}
    </label>
    <input
      className="w-full bg-[#0d0d0d] border border-[#1a1a1a] text-white text-sm rounded-lg px-3.5 py-2.5 outline-none focus:border-[#ffffff]/60 transition-colors placeholder:text-[#3f3f46]"
      {...props}
    />
  </div>
);

export default function ProfileSetup() {
  const { user, refreshUser } = useAuth();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    college: '', branch: '', year: '', expectedGraduation: '',
    skills: ['', '', ''],
    github: '', linkedin: '', twitter: '', portfolio: '',
    experience: [{ company: '', role: '', description: '' }],
    bio: '', preferredRole: 'internship',
  });

  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        college: user.college || '',
        branch: user.branch || '',
        year: user.year || '',
        expectedGraduation: user.expectedGraduation || '',
        skills: user.skills?.length ? [...user.skills, ...Array(3).fill('')].slice(0, 3) : ['', '', ''],
        github: user.github || '',
        linkedin: user.linkedin || '',
        twitter: user.twitter || '',
        portfolio: user.portfolio || '',
        experience: user.experience?.length ? user.experience : [{ company: '', role: '', description: '' }],
        bio: user.bio || '',
        preferredRole: user.preferredRole || 'internship',
      }));
    }
  }, [user]);

  const set = (key, val) => setForm((p) => ({ ...p, [key]: val }));

  const setSkill = (i, val) => {
    const s = [...form.skills];
    s[i] = val;
    set('skills', s);
  };

  const setExp = (i, key, val) => {
    const e = form.experience.map((x, idx) => idx === i ? { ...x, [key]: val } : x);
    set('experience', e);
  };

  const addExp = () => set('experience', [...form.experience, { company: '', role: '', description: '' }]);
  const removeExp = (i) => set('experience', form.experience.filter((_, idx) => idx !== i));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const payload = {
        ...form,
        year: Number(form.year),
        skills: form.skills.filter(Boolean),
        experience: form.experience.filter((ex) => ex.company && ex.role),
      };
      await api.put('/api/profile', payload);
      await refreshUser();
      setSaved(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 1200);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save. Try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto p-4 md:p-8">
        <div className="mb-8">
          <h1 className="text-white text-2xl font-bold">Build your profile</h1>
          <p className="text-[#a1a1aa] text-sm mt-1">This is what founders see. Make it count.</p>
        </div>

        {error && (
          <div className="mb-5 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">{error}</div>
        )}
        {saved && (
          <div className="mb-5 p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm flex items-center gap-2">
            <CheckCircle size={15} /> Profile saved!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <section>
            <h2 className="text-[#ffffff] font-semibold text-xs uppercase tracking-widest mb-4">Basic Info</h2>
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
              <Input label="Full Name" value={user?.name || ''} disabled placeholder="From Google account" />
              <Input label="College / University" required value={form.college} onChange={(e) => set('college', e.target.value)} placeholder="IIT Bombay" />
              <Input label="Branch / Major" required value={form.branch} onChange={(e) => set('branch', e.target.value)} placeholder="Computer Science" />
              <div>
                <label className="block text-[#a1a1aa] text-xs font-medium mb-1.5 uppercase tracking-wide">Year <span className="text-[#ffffff]">*</span></label>
                <select
                  required
                  value={form.year}
                  onChange={(e) => set('year', e.target.value)}
                  className="w-full bg-[#0d0d0d] border border-[#1a1a1a] text-white text-sm rounded-lg px-3.5 py-2.5 outline-none focus:border-[#ffffff]/60 transition-colors"
                >
                  <option value="">Select year</option>
                  {YEARS.map((y) => <option key={y} value={y}>Year {y}</option>)}
                </select>
              </div>
              <Input label="Expected Graduation" required value={form.expectedGraduation} onChange={(e) => set('expectedGraduation', e.target.value)} placeholder="May 2026" />
            </div>
          </section>

          {/* Top 3 Skills */}
          <section>
            <h2 className="text-[#ffffff] font-semibold text-xs uppercase tracking-widest mb-4">Top 3 Skills <span className="text-[#ffffff]">*</span></h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {form.skills.map((s, i) => (
                <Input key={i} label={`Skill ${i + 1}`} required={i === 0} value={s} onChange={(e) => setSkill(i, e.target.value)} placeholder={['React', 'Python', 'Sales'][i]} />
              ))}
            </div>
          </section>

          {/* 1-Line Bio */}
          <section>
            <h2 className="text-[#ffffff] font-semibold text-xs uppercase tracking-widest mb-4">Your Edge</h2>
            <div>
              <label className="block text-[#a1a1aa] text-xs font-medium mb-1.5 uppercase tracking-wide">I am best at <span className="text-[#ffffff]">*</span></label>
              <div className="flex items-center bg-[#0d0d0d] border border-[#1a1a1a] rounded-lg px-3.5 focus-within:border-[#ffffff]/60 transition-colors">
                <span className="text-[#3f3f46] text-sm whitespace-nowrap">I am best at&nbsp;</span>
                <input
                  required
                  value={form.bio}
                  onChange={(e) => set('bio', e.target.value)}
                  placeholder="building 0→1 products fast"
                  className="flex-1 bg-transparent text-white text-sm py-2.5 outline-none placeholder:text-[#3f3f46]"
                />
              </div>
            </div>
          </section>

          {/* Links */}
          <section>
            <h2 className="text-[#ffffff] font-semibold text-xs uppercase tracking-widest mb-4">Links</h2>
            <div className="grid grid-cols-1 gap-4">
              <Input label="GitHub" required value={form.github} onChange={(e) => set('github', e.target.value)} placeholder="https://github.com/username" />
              <Input label="LinkedIn" required value={form.linkedin} onChange={(e) => set('linkedin', e.target.value)} placeholder="https://linkedin.com/in/username" />
              <Input label="Twitter / X" value={form.twitter} onChange={(e) => set('twitter', e.target.value)} placeholder="https://twitter.com/username" />
              <Input label="Portfolio" value={form.portfolio} onChange={(e) => set('portfolio', e.target.value)} placeholder="https://yoursite.com" />
            </div>
          </section>

          {/* Experience */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[#ffffff] font-semibold text-xs uppercase tracking-widest">Experience</h2>
              <button type="button" onClick={addExp} className="flex items-center gap-1.5 text-[#ffffff] text-xs hover:underline">
                <Plus size={13} /> Add more
              </button>
            </div>
            <div className="space-y-4">
              {form.experience.map((exp, i) => (
                <div key={i} className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[#a1a1aa] text-xs">Entry {i + 1}</span>
                    {i > 0 && (
                      <button type="button" onClick={() => removeExp(i)} className="text-red-400/70 hover:text-red-400">
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input label="Company / Project" value={exp.company} onChange={(e) => setExp(i, 'company', e.target.value)} placeholder="Startup Inc." />
                    <Input label="Role" value={exp.role} onChange={(e) => setExp(i, 'role', e.target.value)} placeholder="Frontend Intern" />
                  </div>
                  <Input label="1-2 liner description" value={exp.description} onChange={(e) => setExp(i, 'description', e.target.value)} placeholder="Built X which did Y, resulting in Z" />
                </div>
              ))}
            </div>
          </section>

          {/* Preferred Role */}
          <section>
            <h2 className="text-[#ffffff] font-semibold text-xs uppercase tracking-widest mb-4">Preferred Role Type <span className="text-[#ffffff]">*</span></h2>
            <div className="flex gap-3 flex-wrap">
              {ROLES.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => set('preferredRole', value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                    form.preferredRole === value
                      ? 'bg-[#ffffff]/15 border-[#ffffff] text-[#ffffff]'
                      : 'bg-[#0d0d0d] border-[#1a1a1a] text-[#a1a1aa] hover:text-white'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </section>

          <button
            type="submit"
            disabled={saving}
            className="w-full py-3 bg-[#ffffff] text-black font-bold rounded-xl hover:bg-[#e6c84a] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {saving ? <Loader2 size={18} className="animate-spin" /> : null}
            {saving ? 'Saving...' : 'Save Profile'}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}
