import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-v3">
            <div className="footer-marquee">
                <div className="marquee-content">
                    <span>THE UNDERESTIMATE CLUB</span>
                    <span className="dot"></span>
                    <span>ELITE</span>
                    <span className="dot"></span>
                    <span>VETTED</span>
                    <span className="dot"></span>
                    <span>VERIFIED</span>
                    <span className="dot"></span>
                    <span>THE UNDERESTIMATE CLUB</span>
                    <span className="dot"></span>
                    <span>ELITE</span>
                    <span className="dot"></span>
                    <span>VETTED</span>
                    <span className="dot"></span>
                    <span>VERIFIED</span>
                    <span className="dot"></span>
                </div>
                <div className="marquee-content" aria-hidden="true">
                    <span>THE UNDERESTIMATE CLUB</span>
                    <span className="dot"></span>
                    <span>ELITE</span>
                    <span className="dot"></span>
                    <span>VETTED</span>
                    <span className="dot"></span>
                    <span>VERIFIED</span>
                    <span className="dot"></span>
                    <span>THE UNDERESTIMATE CLUB</span>
                    <span className="dot"></span>
                    <span>ELITE</span>
                    <span className="dot"></span>
                    <span>VETTED</span>
                    <span className="dot"></span>
                    <span>VERIFIED</span>
                    <span className="dot"></span>
                </div>
            </div>
            <div className="footer-sep"></div>
            <div className="footer-c">
                <div className="f-left">
                    <div className="f-logo">TUC<span>.</span></div>
                    <p className="f-tag">Elite · Vetted · Verified</p>
                </div>
                
                <div className="f-links">
                    <div className="f-col">
                        <span className="f-h">Platform</span>
                        <a href="#">Bounties</a>
                        <a href="#">Gauntlet</a>
                        <a href="#">Cohorts</a>
                    </div>
                    <div className="f-col">
                        <span className="f-h">Social</span>
                        <a href="#">Twitter</a>
                        <a href="#">Instagram</a>
                        <a href="#">LinkedIn</a>
                    </div>
                </div>
            </div>
            
            <div className="f-bottom">
                <p>&copy; {new Date().getFullYear()} THE UNDERESTIMATE CLUB. All rights reserved.</p>
                <div className="f-legal">
                    <a href="#">Privacy</a>
                    <a href="#">Terms</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
