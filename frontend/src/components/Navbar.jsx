import React from 'react';
import { motion } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="container nav-content">
                <motion.div
                    className="logo"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <img src="/logo.png" alt="UNDERESTIMATE CLUB" className="w-auto" />
                </motion.div>
            </div>
        </nav>
    );
};

export default Navbar;
