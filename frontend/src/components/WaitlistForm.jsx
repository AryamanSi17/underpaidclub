import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import apiService from '../services/api.service';
import { cn } from '../lib/utils';
import './WaitlistForm.css';

const WaitlistForm = ({ className }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        linkedin: '',
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
        if (!formData.email.match(/^\S+@\S+\.\S+$/)) {
            setStatus('error');
            setErrorMessage('Please provide a valid institute email address.');
            return;
        }

        setStatus('loading');

        try {
            const response = await apiService.waitlist.join(formData);
            if (response.data.success) {
                setStatus('success');
                setFormData({ name: '', email: '', linkedin: '', message: '' });
            }
        } catch (error) {
            setStatus('error');
            setErrorMessage(error.response?.data?.message || 'Something went wrong. Please try again.');
        }
    };

    return (
        <>
            <motion.section
                className={cn("waitlist-section", className)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <div className="form-card">
                    <h2 className="form-title">Join the Club</h2>
                    <p className="form-desc">Be the first to know when we launch.</p>

                    <form
                        onSubmit={handleSubmit}
                        className="actual-form"
                    >
                        <div className="input-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Rahul"
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
                                placeholder="name@institute.edu.in"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label>LinkedIn ID URL</label>
                            <input
                                type="url"
                                name="linkedin"
                                placeholder="https://linkedin.com/in/username"
                                value={formData.linkedin}
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
                                    Join the Club <Send size={18} />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </motion.section>

            <AnimatePresence>
                {status === 'success' && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div 
                            className="absolute inset-0 bg-black/60 backdrop-blur-md"
                            onClick={() => setStatus('idle')}
                        ></div>
                        <motion.div
                            className="form-card relative z-10 w-full max-w-sm flex flex-col items-center justify-center p-8 text-center"
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        >
                            <CheckCircle className="status-icon w-16 h-16 mb-4" />
                            <h3 className="form-title mb-2">Thank You!</h3>
                            <p className="form-desc mb-6">Thanks for the submission!</p>
                            <button
                                className="submit-btn w-full"
                                onClick={() => setStatus('idle')}
                            >
                                Close
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default WaitlistForm;
