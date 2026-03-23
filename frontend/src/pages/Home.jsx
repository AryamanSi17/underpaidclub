import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import LightRays from '../components/LightRays';


const Home = () => {
  const [panel, setPanel] = useState(0); // 0: Hero, 1: Student, 2: Founder
  const [isStuck, setIsStuck] = useState(false);
  const shellRef = useRef(null);
  const navigate = useNavigate();

  // Custom Cursor
  useEffect(() => {
    const cur = document.getElementById('cur');
    const curRing = document.getElementById('cur-ring');
    
    const moveCursor = (e) => {
      if (cur && curRing) {
        cur.style.transform = `translate3d(${e.clientX - 4}px, ${e.clientY - 4}px, 0)`;
        curRing.style.transform = `translate3d(${e.clientX - 16}px, ${e.clientY - 16}px, 0)`;
      }
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);



  // Sticky Nav & Reveal Observer
  useEffect(() => {
    const handleScroll = () => {
      setIsStuck(window.scrollY > 50);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.rv').forEach(el => observer.observe(el));
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [panel]);

  const goHome = (e) => {
    if (e) e.preventDefault();
    setPanel(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goStudent = (e) => {
    if (e) e.preventDefault();
    setPanel(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goFounder = (e) => {
    if (e) e.preventDefault();
    setPanel(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleApply = (e) => {
    if (e) e.preventDefault();
    navigate('/login');
  };

  return (
    <div className="home-root">
      <div id="cur"></div>
      <div id="cur-ring"></div>

      {/* NAV */}
      <nav id="nav" className={`home-nav ${isStuck ? 'stuck' : ''}`}>
        <a href="#" className="logo" onClick={goHome}>
          <div className="logo-dot"></div>
          THE UNDERESTIMATE CLUB
        </a>
        <div className="nav-r">
          <button className={`nav-lnk ${panel === 1 ? 'active' : ''}`} onClick={goStudent}>For Students</button>
          <button className={`nav-lnk ${panel === 2 ? 'active' : ''}`} onClick={goFounder}>For Founders</button>
          <button className="nav-apply" onClick={handleApply}>
            {panel === 2 ? 'Post a Role Free' : 'Apply Now'}
          </button>
        </div>
      </nav>

      {/* PAGE SHELL */}
      <div className="page-shell" ref={shellRef} style={{ transform: `translate3d(-${panel * 100}vw, 0, 0)` }}>
        
        {/* PANEL 0: HERO */}
        <div className="panel" id="hero-panel">
          <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
            <LightRays
              raysOrigin="top-center"
              raysColor="#ffffff"
              raysSpeed={1.2}
              lightSpread={0.8}
              rayLength={3}
              followMouse={true}
              mouseInfluence={0.08}
              noiseAmount={0}
              distortion={0.1}
              pulsating={false}
              fadeDistance={1}
              saturation={1}
              style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.8 }}
            />
            <div className="glow-right"></div>
            <div className="glow-right-2"></div>
            <div className="glow-floor"></div>
            <div className="scanline"></div>
            <div className="vignette"></div>



          <div className="hero-content cinematic-layout">
            <div className="hero-left">
              <div className="eyebrow cinematic-eyebrow">
                Where the underestimated become undeniable
              </div>
              <div className="h1-wrap">
                <span className="h1-line1">STOP</span>
                <span className="h1-line1">BEING</span>
                  <span className="h1-line2">UNDER<span className="h1-line3">estimated</span></span>
              </div>
              <p className="hero-sub cinematic-sub">
                India's first and largest private ecosystem built exclusively for the underestimated elite. Not a job board. Not a portal. A closed room where Tier 1 talent meets the companies ready to bet on them.
              </p>
            </div>

            <div className="hero-right">
              <div className="hero-btns-vertical">
                <button className="btn-main" onClick={goStudent}>
                  <span className="btn-main-tag">For students</span>
                  <span className="btn-main-title">I want to get hired</span>
                  <span className="btn-main-sub">Tier 1 institutions. Invite only.</span>
                  <span className="btn-main-arrow">↗</span>
                </button>
                <button className="btn-dark" onClick={goFounder}>
                  <span className="btn-dark-tag">For founders</span>
                  <span className="btn-dark-title">I want to hire</span>
                  <span className="btn-dark-sub">Your next hire is already inside.</span>
                  <span className="btn-dark-arrow">↗</span>
                </button>
              </div>
            </div>
          </div>

          </div>

          <div className="hero-footer-marquee">
            <div className="marquee-content">
              <span>IDs · VERIFIED. EVERY SINGLE ONE.</span>
              <span className="dot"></span>
              <span>Tier 1 · IITs, NITs, IIITs, IIMs</span>
              <span className="dot"></span>
              <span>48hr · FROM APPLY TO FOUNDER RESPONSE</span>
              <span className="dot"></span>
              <span>IDs · VERIFIED. EVERY SINGLE ONE.</span>
              <span className="dot"></span>
              <span>Tier 1 · IITs, NITs, IIITs, IIMs</span>
              <span className="dot"></span>
              <span>48hr · FROM APPLY TO FOUNDER RESPONSE</span>
              <span className="dot"></span>
            </div>
            <div className="marquee-content" aria-hidden="true">
              <span>IDs · VERIFIED. EVERY SINGLE ONE.</span>
              <span className="dot"></span>
              <span>Tier 1 · IITs, NITs, IIITs, IIMs</span>
              <span className="dot"></span>
              <span>48hr · FROM APPLY TO FOUNDER RESPONSE</span>
              <span className="dot"></span>
              <span>IDs · VERIFIED. EVERY SINGLE ONE.</span>
              <span className="dot"></span>
              <span>Tier 1 · IITs, NITs, IIITs, IIMs</span>
              <span className="dot"></span>
              <span>48hr · FROM APPLY TO FOUNDER RESPONSE</span>
              <span className="dot"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
