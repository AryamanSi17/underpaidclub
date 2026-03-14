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
            <div className="min-h-screen flex flex-col w-full relative z-10">
                <Navbar />
                <main className="flex-1 container flex items-center justify-center py-12">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-[#030303]/80 border border-white/10 p-8 rounded-2xl backdrop-blur-md w-full max-w-md shadow-2xl"
                    >
                        <div className="flex flex-col items-center mb-8">
                            <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mb-4 text-[#d4af37]">
                                <Lock size={32} />
                            </div>
                            <h2 className="text-2xl font-bold text-white">Admin Access</h2>
                            <p className="text-gray-400 text-sm mt-1">Authorized personnel only</p>
                        </div>

                        <form onSubmit={handleLogin} className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-400">Email address</label>
                                <input 
                                    type="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#d4af37] transition-colors"
                                    required 
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-400">Password</label>
                                <input 
                                    type="password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#d4af37] transition-colors"
                                    required 
                                />
                            </div>

                            {loginError && (
                                <div className="text-red-500 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                                    {loginError}
                                </div>
                            )}

                            <button 
                                type="submit" 
                                disabled={isLoggingIn}
                                className="mt-4 bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#b38728] text-black font-semibold py-3 rounded-lg transition-transform hover:-translate-y-1 hover:shadow-[0_8px_15px_-8px_rgba(212,175,55,0.4)]"
                            >
                                {isLoggingIn ? 'Verifying...' : 'Login'}
                            </button>
                        </form>
                    </motion.div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col w-full relative z-10">
            <Navbar />

            <main className="flex-1 container py-12">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <Users className="w-8 h-8 text-[#d4af37]" />
                        <h1 className="text-3xl font-bold logo-text">Admin Dashboard</h1>
                    </div>
                    <button 
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-gray-300 transition-colors"
                    >
                        <LogOut size={16} />
                        Logout
                    </button>
                </div>

                <div className="bg-[#030303]/80 border border-white/10 rounded-2xl backdrop-blur-md overflow-hidden shadow-2xl">
                    <div className="flex border-b border-white/10">
                        <button 
                            className={`flex items-center gap-2 flex-1 md:flex-none px-6 py-4 font-medium text-sm transition-colors border-b-2 ${activeTab === 'waitlist' ? 'text-white border-[#d4af37] bg-white/5' : 'text-gray-400 border-transparent hover:text-gray-200 hover:bg-white/[0.02]'}`}
                            onClick={() => setActiveTab('waitlist')}
                        >
                            <Clock size={18} />
                            Waitlist Submissions
                        </button>
                        <button 
                            className={`flex items-center gap-2 flex-1 md:flex-none px-6 py-4 font-medium text-sm transition-colors border-b-2 ${activeTab === 'approved' ? 'text-white border-[#d4af37] bg-white/5' : 'text-gray-400 border-transparent hover:text-gray-200 hover:bg-white/[0.02]'}`}
                            onClick={() => setActiveTab('approved')}
                        >
                            <UserCheck size={18} />
                            Approved Users
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/10 bg-white/5 text-gray-300 text-sm">
                                    <th className="py-4 px-6 font-medium">Name</th>
                                    <th className="py-4 px-6 font-medium">Email</th>
                                    <th className="py-4 px-6 font-medium">LinkedIn</th>
                                    <th className="py-4 px-6 font-medium">Message</th>
                                    <th className="py-4 px-6 font-medium text-right">
                                        {activeTab === 'waitlist' ? 'Actions' : 'Approved Date'}
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {loading ? (
                                    <tr>
                                        <td colSpan="5" className="py-8 text-center text-gray-400">Loading records...</td>
                                    </tr>
                                ) : activeTab === 'waitlist' ? (
                                    submissions.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="py-8 text-center text-gray-400">No pending submissions found.</td>
                                        </tr>
                                    ) : (
                                        submissions.map((user) => (
                                            <motion.tr 
                                                key={user._id} 
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="hover:bg-white/[0.02] transition-colors"
                                            >
                                                <td className="py-4 px-6 text-white">{user.name}</td>
                                                <td className="py-4 px-6 text-gray-300">{user.email}</td>
                                                <td className="py-4 px-6">
                                                    <a href={user.linkedin} target="_blank" rel="noreferrer" className="text-[#d4af37] hover:underline hover:text-white transition-colors truncate max-w-[200px] block">
                                                        {user.linkedin}
                                                    </a>
                                                </td>
                                                <td className="py-4 px-6 text-gray-400 text-sm max-w-xs truncate">{user.message || '-'}</td>
                                                <td className="py-4 px-6 text-right">
                                                    <button
                                                        onClick={() => handleApprove(user._id)}
                                                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#d4af37]/10 text-[#d4af37] hover:bg-[#d4af37] hover:text-black border border-[#d4af37]/30 hover:border-[#d4af37] rounded-lg transition-all text-sm font-medium"
                                                    >
                                                        Approve <CheckCircle className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </motion.tr>
                                        ))
                                    )
                                ) : (
                                    approvedUsers.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="py-8 text-center text-gray-400">No approved users yet.</td>
                                        </tr>
                                    ) : (
                                        approvedUsers.map((user) => (
                                            <motion.tr 
                                                key={user._id} 
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="hover:bg-white/[0.02] transition-colors"
                                            >
                                                <td className="py-4 px-6 text-white">{user.name}</td>
                                                <td className="py-4 px-6 text-gray-300">{user.email}</td>
                                                <td className="py-4 px-6">
                                                    <a href={user.linkedin} target="_blank" rel="noreferrer" className="text-[#d4af37] hover:underline hover:text-white transition-colors truncate max-w-[200px] block">
                                                        {user.linkedin}
                                                    </a>
                                                </td>
                                                <td className="py-4 px-6 text-gray-400 text-sm max-w-xs truncate">{user.message || '-'}</td>
                                                <td className="py-4 px-6 text-right text-sm text-gray-400">
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
