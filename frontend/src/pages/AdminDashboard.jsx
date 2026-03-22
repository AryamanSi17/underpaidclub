import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { CheckCircle, Users, LogOut, Lock, UserCheck, Clock } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AdminDashboard = () => {
    const [token, setToken] = useState(localStorage.getItem('adminToken'));
    const [activeTab, setActiveTab] = useState('waitlist'); // waitlist | approved
    const [submissions, setSubmissions] = useState([]);
    const [approvedUsers, setApprovedUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    // Login state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoggingIn(true);
        setLoginError('');
        try {
            const response = await axios.post('https://underpaidclub-hfq3.vercel.app/api/admin/login', { email, password });
            if (response.data.success) {
                const newToken = response.data.data.token;
                localStorage.setItem('adminToken', newToken);
                setToken(newToken);
            }
        } catch (error) {
            setLoginError(error.response?.data?.message || 'Invalid login credentials');
        } finally {
            setIsLoggingIn(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        setToken(null);
        setSubmissions([]);
        setApprovedUsers([]);
    };

    const fetchWaitlist = async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://underpaidclub-hfq3.vercel.app/api/admin/submissions', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.data.success) {
                setSubmissions(response.data.data);
            }
        } catch (error) {
            if (error.response?.status === 401) handleLogout();
        } finally {
            setLoading(false);
        }
    };

    const fetchApproved = async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://underpaidclub-hfq3.vercel.app/api/admin/approved', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.data.success) {
                setApprovedUsers(response.data.data);
            }
        } catch (error) {
            if (error.response?.status === 401) handleLogout();
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            if (activeTab === 'waitlist') {
                fetchWaitlist();
            } else {
                fetchApproved();
            }
        }
    }, [token, activeTab]);

    const handleApprove = async (id) => {
        try {
            const response = await axios.post(`https://underpaidclub-hfq3.vercel.app/api/admin/approve/${id}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.data.success) {
                setSubmissions(prev => prev.filter(user => user._id !== id));
            }
        } catch (error) {
            if (error.response?.status === 401) handleLogout();
            else alert(error.response?.data?.message || 'Error approving user');
        }
    };

    if (!token) {
        return (
            <div className="min-h-screen bg-[var(--black)] flex items-center justify-center relative overflow-hidden font-sans">
                <div className="hero-grain" style={{ opacity: 0.3 }}></div>
                <div className="hero-mesh" style={{ opacity: 0.4 }}></div>
                
                <div className="relative z-10 w-full max-w-md px-6">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-[var(--dark)]/80 border border-[var(--border)] p-10 rounded-3xl backdrop-blur-xl shadow-2xl"
                    >
                        <div className="flex flex-col items-center mb-10">
                            <div className="w-20 h-20 bg-[var(--o1)]/10 border border-[var(--o1)]/30 rounded-full flex items-center justify-center mb-6 text-[var(--o3)]">
                                <Lock size={40} />
                            </div>
                            <h2 className="text-3xl font-display uppercase tracking-widest text-[var(--text)]">Admin Access</h2>
                            <p className="text-[var(--muted)] text-[10px] uppercase tracking-[0.2em] mt-3">Authorized Personnel Only</p>
                        </div>

                        <form onSubmit={handleLogin} className="flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]">Email address</label>
                                <input 
                                    type="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-4 text-[var(--text)] focus:outline-none focus:border-[var(--o2)] transition-all"
                                    required 
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]">Password</label>
                                <input 
                                    type="password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-4 text-[var(--text)] focus:outline-none focus:border-[var(--o2)] transition-all"
                                    required 
                                />
                            </div>

                            {loginError && (
                                <div className="text-red-400 text-xs bg-red-400/10 p-4 rounded-xl border border-red-400/20">
                                    {loginError}
                                </div>
                            )}

                            <button 
                                type="submit" 
                                disabled={isLoggingIn}
                                className="mt-4 bg-gradient-to-r from-[var(--o1)] to-[var(--o3)] text-white font-bold py-4 rounded-full transition-all active:scale-[0.98] uppercase tracking-[0.2em] text-sm shadow-xl shadow-[var(--o1)]/20"
                            >
                                {isLoggingIn ? 'Verifying...' : 'Access Console'}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--black)] flex flex-col w-full relative overflow-hidden font-sans">
            <div className="hero-grain" style={{ opacity: 0.2 }}></div>
            <div className="hero-mesh" style={{ opacity: 0.3 }}></div>
            
            <Navbar />

            <main className="flex-1 container mx-auto px-6 pt-32 pb-12 relative z-10">
                <div className="flex items-center justify-between mb-12">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-[var(--o1)]/10 rounded-2xl border border-[var(--o1)]/20">
                            <Users className="w-8 h-8 text-[var(--o3)]" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-display tracking-widest uppercase text-[var(--text)]">Admin Console</h1>
                            <p className="text-[var(--muted)] text-xs uppercase tracking-widest mt-1">Management Dashboard</p>
                        </div>
                    </div>
                    <button 
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-6 py-2.5 bg-[var(--surface)] hover:bg-[var(--dark)] border border-[var(--border)] rounded-full text-[var(--muted)] hover:text-red-400 transition-all uppercase tracking-widest text-[10px] font-bold"
                    >
                        <LogOut size={16} />
                        Logout
                    </button>
                </div>

                <div className="bg-[var(--dark)]/80 border border-[var(--border)] rounded-3xl backdrop-blur-xl overflow-hidden shadow-2xl">
                    <div className="flex border-b border-[var(--border)]">
                        <button 
                            className={`flex items-center gap-3 px-8 py-5 font-bold text-[10px] uppercase tracking-widest transition-all border-b-2 ${activeTab === 'waitlist' ? 'text-[var(--o3)] border-[var(--o3)] bg-[var(--o3)]/5' : 'text-[var(--muted)] border-transparent hover:text-[var(--text)] hover:bg-white/[0.02]'}`}
                            onClick={() => setActiveTab('waitlist')}
                        >
                            <Clock size={16} />
                            Waitlist Submissions
                        </button>
                        <button 
                            className={`flex items-center gap-3 px-8 py-5 font-bold text-[10px] uppercase tracking-widest transition-all border-b-2 ${activeTab === 'approved' ? 'text-[var(--o3)] border-[var(--o3)] bg-[var(--o3)]/5' : 'text-[var(--muted)] border-transparent hover:text-[var(--text)] hover:bg-white/[0.02]'}`}
                            onClick={() => setActiveTab('approved')}
                        >
                            <UserCheck size={16} />
                            Approved Users
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] text-[10px] uppercase tracking-widest font-bold">
                                    <th className="py-5 px-8">Name</th>
                                    <th className="py-5 px-8">Email</th>
                                    <th className="py-5 px-8">LinkedIn</th>
                                    <th className="py-5 px-8">Message</th>
                                    <th className="py-5 px-8 text-right">
                                        {activeTab === 'waitlist' ? 'Actions' : 'Approved Date'}
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[var(--border)]">
                                {loading ? (
                                    <tr>
                                        <td colSpan="5" className="py-12 text-center text-[var(--muted)] text-sm uppercase tracking-widest">Initialising records...</td>
                                    </tr>
                                ) : activeTab === 'waitlist' ? (
                                    submissions.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="py-12 text-center text-[var(--muted)] text-sm uppercase tracking-widest">No pending submissions found.</td>
                                        </tr>
                                    ) : (
                                        submissions.map((user) => (
                                            <motion.tr 
                                                key={user._id} 
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="hover:bg-white/[0.02] transition-colors"
                                            >
                                                <td className="py-5 px-8 text-[var(--text)] font-medium">{user.name}</td>
                                                <td className="py-5 px-8 text-[var(--muted)] text-sm">{user.email}</td>
                                                <td className="py-5 px-8">
                                                    <a href={user.linkedin} target="_blank" rel="noreferrer" className="text-[var(--o3)] hover:underline transition-colors truncate max-w-[200px] block text-sm">
                                                        LinkedIn Profile ↗
                                                    </a>
                                                </td>
                                                <td className="py-5 px-8 text-[var(--muted)] text-xs max-w-xs truncate">{user.message || '-'}</td>
                                                <td className="py-5 px-8 text-right">
                                                    <button
                                                        onClick={() => handleApprove(user._id)}
                                                        className="inline-flex items-center gap-2 px-5 py-2 bg-[var(--o1)]/10 text-[var(--o3)] hover:bg-[var(--o1)] hover:text-white border border-[var(--o1)]/30 rounded-full transition-all text-[10px] font-bold uppercase tracking-widest"
                                                    >
                                                        Approve <CheckCircle className="w-3.5 h-3.5" />
                                                    </button>
                                                </td>
                                            </motion.tr>
                                        ))
                                    )
                                ) : (
                                    approvedUsers.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="py-12 text-center text-[var(--muted)] text-sm uppercase tracking-widest">No approved users yet.</td>
                                        </tr>
                                    ) : (
                                        approvedUsers.map((user) => (
                                            <motion.tr 
                                                key={user._id} 
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="hover:bg-white/[0.02] transition-colors"
                                            >
                                                <td className="py-5 px-8 text-[var(--text)] font-medium">{user.name}</td>
                                                <td className="py-5 px-8 text-[var(--muted)] text-sm">{user.email}</td>
                                                <td className="py-5 px-8">
                                                    <a href={user.linkedin} target="_blank" rel="noreferrer" className="text-[var(--o3)] hover:underline transition-colors truncate max-w-[200px] block text-sm">
                                                        LinkedIn Profile ↗
                                                    </a>
                                                </td>
                                                <td className="py-5 px-8 text-[var(--muted)] text-xs max-w-xs truncate">{user.message || '-'}</td>
                                                <td className="py-5 px-8 text-right text-xs text-[var(--muted)] uppercase tracking-widest font-medium">
                                                    {new Date(user.approvedAt).toLocaleDateString()}
                                                </td>
                                            </motion.tr>
                                        ))
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default AdminDashboard;
