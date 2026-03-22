import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <nav className="navbar-v3">
            <div className="nav-c">
                <div onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                    <div className="f-logo" style={{ fontSize: '1.4rem', marginBottom: 0 }}>
                        TUC<span>.</span>
                    </div>
                </div>

                <div className="nav-r">
                    {user ? (
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="nav-btn-ghost"
                        >
                            Dashboard →
                        </button>
                    ) : (
                        <button
                            onClick={() => navigate('/login')}
                            className="nav-btn-fire"
                        >
                            Apply Now
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
