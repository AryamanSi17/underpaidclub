import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import axios from 'axios';
import { cn } from '@/lib/utils';
import './WaitlistForm.css';

const WaitlistForm = ({ className }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (status === 'error') setStatus('idle');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Simple validation
        if (!formData.email.endsWith('@nitj.ac.in')) {
            setStatus('error');
            setErrorMessage('Please use your @nitj.ac.in email address.');
            return;
        }

        setStatus('loading');

        try {
            const response = await axios.post('http://localhost:5000/api/waitlist', formData);
            if (response.data.success) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
            }
        } catch (error) {
            setStatus('error');
            setErrorMessage(error.response?.data?.message || 'Something went wrong. Please try again.');
        }
    };

    return (
        <motion.section
            className={cn("waitlist-section", className)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
        >
            <div className="form-card">
                <h2 className="form-title">Join the Waitlist</h2>
                <p className="form-desc">Be the first to know when we launch.</p>

                <AnimatePresence mode="wait">
                    {status === 'success' ? (
                        <motion.div
                            key="success"
                            className="status-message success"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                        >
                            <CheckCircle className="status-icon" />
                            <p>You're on the list! We'll be in touch soon.</p>
                            <button
                                className="reset-btn"
                                onClick={() => setStatus('idle')}
                            >
                                Add another
                            </button>
                        </motion.div>
                    ) : (
                        <motion.form
                            key="form"
                            onSubmit={handleSubmit}
                            className="actual-form"
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <div className="input-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label>Institute Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="name@nitj.ac.in"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label>Message (Optional)</label>
                                <textarea
                                    name="message"
                                    placeholder="Tell us about yourself..."
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="3"
                                ></textarea>
                            </div>

                            {status === 'error' && (
                                <motion.div
                                    className="error-alert"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <AlertCircle size={16} />
                                    <span>{errorMessage}</span>
                                </motion.div>
                            )}

                            <button
                                type="submit"
                                className={`submit-btn ${status === 'loading' ? 'loading' : ''}`}
                                disabled={status === 'loading'}
                            >
                                {status === 'loading' ? 'Joining...' : (
                                    <>
                                        Join Waitlist <Send size={18} />
                                    </>
                                )}
                            </button>
                        </motion.form>
                    )}
                </AnimatePresence>
            </div>
        </motion.section>
    );
};

export default WaitlistForm;
