import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import './Hero.css';

const Hero = ({ className }) => {
    return (
        <section className={cn("hero", className)}>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <span className="badge">Private Community</span>
                <h1 className="hero-title">
                    The Underestimate <span className="gradient-text">Club</span>
                </h1>
                <p className="hero-subtitle">
                    Because Tier 1 talent shouldn't be underestimated.
                </p>
                <p className="hero-description">
                    Building the bridge for IIT/IIM talent. A private community for students from
                    IITs, NITs, IIMs, BITS, and IIITs bridging the gap between "working for free" and
                    "landing the dream PPO."
                </p>
            </motion.div>
        </section>
    );
};

export default Hero;
