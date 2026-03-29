import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import LightRays from '../components/LightRays';
import LandingNav from '../components/home/LandingNav';
import HeroContent from '../components/home/HeroContent';
import HeroMarquee from '../components/home/HeroMarquee';

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

  // Scroll Observer
  useEffect(() => {
    const handleScroll = () => setIsStuck(window.scrollY > 50);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('in'));
    }, { threshold: 0.1 });
    document.querySelectorAll('.rv').forEach(el => observer.observe(el));
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [panel]);

  const goHome = (e) => { e?.preventDefault(); setPanel(0); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const goStudent = (e) => { e?.preventDefault(); setPanel(1); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const goFounder = (e) => { e?.preventDefault(); setPanel(2); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const handleApply = (e) => { e?.preventDefault(); navigate('/login'); };

  return (
    <div className="home-root">
      <div id="cur" />
      <div id="cur-ring" />

      <LandingNav 
        isStuck={isStuck} 
        panel={panel} 
        onGoHome={goHome} 
        onGoStudent={goStudent} 
        onGoFounder={goFounder} 
        onHandleApply={handleApply} 
      />

      <div className="page-shell" ref={shellRef} style={{ transform: `translate3d(-${panel * 100}vw, 0, 0)` }}>
        <div className="panel" id="hero-panel">
          <div className="relative min-h-screen flex flex-col overflow-hidden">
            <LightRays
              raysOrigin="top-center"
              raysColor="#ffffff"
              raysSpeed={1.2}
              style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.2 }}
            />
            <div className="glow-right" />
            <div className="glow-right-2" />
            <div className="glow-floor" />
            <div className="scanline" />
            <div className="vignette" />

            <HeroContent onGoStudent={goStudent} onGoFounder={goFounder} />
          </div>
          <HeroMarquee />
        </div>
      </div>
    </div>
  );
};

export default Home;
