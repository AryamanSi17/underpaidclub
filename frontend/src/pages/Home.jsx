import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import Footer from '../components/Footer';

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
            <div className="hero-mesh"></div>
            <div className="hero-grain"></div>
            <div className="hero-rule"></div>

            <div className="hero-content">
              <div className="eyebrow">
                <span className="eyebrow-line"></span>
                Where the underestimated become undeniable
              </div>
              <h1 className="hero-h1">
                <span>STOP</span>
                <span>BEING</span>
                <span className="hero-h1-main">
                  <span className="og">UNDER</span><span className="it">estimated</span>
                </span>
              </h1>
              <p className="hero-sub">
                India's first and largest private ecosystem built exclusively for the underestimated elite. Not a job board. Not a portal. A closed room where Tier 1 talent meets the companies ready to bet on them.
              </p>
              <div className="hero-btns">
                <button className="journey-btn btn-student" onClick={goStudent}>
                  <div className="journey-btn-inner">
                    <span className="jb-tag">For students</span>
                    <span className="jb-title">I want to get hired</span>
                    <span className="jb-sub">IITs, NITs, IIITs, IIMs only</span>
                  </div>
                  <span className="jb-arrow">↗</span>
                </button>
                <button className="journey-btn btn-founder" onClick={goFounder}>
                  <div className="journey-btn-inner">
                    <span className="jb-tag">For founders</span>
                    <span className="jb-title">I want to hire</span>
                    <span className="jb-sub">Stop sifting. Start building.</span>
                  </div>
                  <span className="jb-arrow">↗</span>
                </button>
              </div>
            </div>

            <div className="hero-stats">
              <div className="hstat">
                <div className="hstat-val">IDs</div>
                <div className="hstat-lbl">Verified. Every single one.</div>
              </div>
              <div className="hstat">
                <div className="hstat-val">Tier 1</div>
                <div className="hstat-lbl">IITs, NITs, IIITs, IIMs</div>
              </div>
              <div className="hstat">
                <div className="hstat-val">48hr</div>
                <div className="hstat-lbl">Average founder response</div>
              </div>
            </div>

            <div className="scroll-hint">
              <div className="sline"></div>
              <div className="stxt">Scroll</div>
            </div>
          </div>

          <div className="hero-join">
            <div className="hero-join-glow"></div>
            <div className="join-tag">Join the movement</div>
            <h2 className="join-h">
              Join the <span className="og">movement.</span><br />
              <span className="it">Not the crowd.</span>
            </h2>
            <p className="join-sub">Invite-only. Tier 1 institutions only. The bar is real and the room is worth it.</p>
            <div className="join-btns">
              <button className="btn-fire" onClick={handleApply}>I want to get hired</button>
              <button className="btn-ghost" onClick={goFounder}>I want to hire</button>
            </div>
            <p className="join-note">Elite · Vetted · Verified · theunderestimateclub.in</p>
          </div>

          <Footer />
        </div>

        {/* PANEL 1: STUDENT FLOW */}
        <div className="panel flow-panel" id="student-panel">
          {/* Removed redundant flow-back */}

          <div className="flow-hero">
            <div className="flow-hero-glow"></div>
            <div className="flow-eyebrow">For students</div>
            <h1 className="flow-h">
              You've been building.<br />
              <span className="it og">The right people</span><br />
              will notice now.
            </h1>
            <p className="flow-sub">
              A closed room. Every person inside is verified, tested, and serious.
              No application piles. No silence. Your profile reaches founders who are ready to move.
            </p>
          </div>

          <div className="flow-sec">
            <div className="sec-lbl rv">Your identity</div>
            <div className="split split-center">
              <div>
                <h2 className="sec-h rv">
                  The door only<br />opens for<br />
                  <span className="og it">the real ones.</span>
                </h2>
                <p className="sec-p rv">Access begins with your verified institutional email. Not a form. Not a checkbox. Your actual credentials from your actual institution. If you belong, you're in. If you don't, the door stays shut.</p>
                <p className="sec-p rv" style={{ fontSize: '13px', marginTop: '-8px' }}>IITs · NITs · IIITs · IIMs · BITS · and more.</p>
              </div>
              <div className="feat-rows rv rv1">
                <div className="feat-row">
                  <div className="feat-num">01</div>
                  <div>
                    <div className="feat-title">Institutional email verification</div>
                    <p className="feat-body">Your college email is your key. One OTP. Access confirmed. Nothing more needed.</p>
                  </div>
                </div>
                <div className="feat-row">
                  <div className="feat-num">02</div>
                  <div>
                    <div className="feat-title">100+ approved institutions</div>
                    <p className="feat-body">Every top institution in India is on our list. If yours is, you qualify. Simple.</p>
                  </div>
                </div>
                <div className="feat-row">
                  <div className="feat-num">03</div>
                  <div>
                    <div className="feat-title">One account, forever verified</div>
                    <p className="feat-body">Verified once. Trusted always. Your identity travels with your profile.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flow-sec flow-sec-dark">
            <div className="sec-lbl rv">The thinking test</div>
            <h2 className="sec-h rv">
              Your score.<br />
              <span className="og">Nobody else's.</span>
            </h2>
            <p className="sec-p rv">We put every member through a test that cannot be coached, copied, or bought. One real startup problem. A clock. Your answer. That's your signal. Founders trust it because it cannot be faked.</p>
            <div className="card-grid">
              <div className="cg-card rv">
                <div className="cg-icon">HS</div>
                <div className="cg-title">The Hustle Score</div>
                <p className="cg-body">A score that measures how fast and sharp your thinking is on a real business problem. Not your GPA. Not your college name. Just you.</p>
              </div>
              <div className="cg-card rv rv1">
                <div className="cg-icon">AI</div>
                <div className="cg-title">Graded by AI. Trusted by founders.</div>
                <p className="cg-body">The result is objective, consistent, and impossible to game. Founders see it next to your name on every application.</p>
              </div>
              <div className="cg-card rv rv2">
                <div className="cg-icon">UP</div>
                <div className="cg-title">Know where to improve</div>
                <p className="cg-body">Your score comes with specific, honest feedback. You see exactly what to work on before your next application goes out.</p>
              </div>
            </div>
          </div>

          <div className="flow-sec">
            <div className="sec-lbl rv">Cohort programs</div>
            <div className="split split-center">
              <div>
                <h2 className="sec-h rv">
                  Get trained.<br />
                  Get <span className="og it">Platinum.</span>
                </h2>
                <p className="sec-p rv">Four weeks. Real practitioners. Real startup problems. Complete a track, pass the capstone, and earn a Platinum badge that tells every founder exactly what you've been trained for.</p>
                <p className="sec-p rv" style={{ fontSize: '13px', marginTop: '-8px' }}>Platinum-badged members appear in a dedicated shortlist that founders see first. Before everyone else.</p>
              </div>
              <div className="rv rv1">
                <div className="cohort-mini">
                  {[
                    { id: '01', title: 'Product Management', price: 'Rs. 6,499' },
                    { id: '02', title: "Founder's Office", price: 'Rs. 6,999' },
                    { id: '03', title: 'Strategy', price: 'Rs. 5,999' },
                    { id: '04', title: 'Marketing & Growth', price: 'Rs. 5,499' },
                    { id: '05', title: 'Tech & Engineering', price: 'Rs. 6,499' }
                  ].map(c => (
                    <div key={c.id} className="cm-card">
                      <div className="cm-track">{c.id}</div>
                      <div className="cm-title">{c.title}</div>
                      <div className="cm-price">{c.price}</div>
                      <div className="cm-dur">4 weeks · Online</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flow-cta">
            <div className="flow-cta-glow"></div>
            <h2 className="flow-cta-h rv">
              Ready to stop<br />being <span className="og it">overlooked?</span>
            </h2>
            <p className="flow-cta-sub rv">Invite-only access. Tier 1 institutions only. Your application is reviewed within 48 hours.</p>
            <div className="flow-cta-btns rv">
              <button className="btn-fire" onClick={handleApply}>Apply for access</button>
              <button className="btn-ghost" onClick={goFounder}>I'm a founder instead</button>
            </div>
            <p className="flow-cta-note rv">Elite · Vetted · Verified</p>
          </div>
          <Footer />
        </div>

        {/* PANEL 2: FOUNDER FLOW */}
        <div className="panel flow-panel" id="founder-panel">
          {/* Removed redundant flow-back */}

          <div className="flow-hero">
            <div className="flow-hero-glow"></div>
            <div className="flow-eyebrow">For founders</div>
            <h1 className="flow-h">
              Stop sifting.<br />
              <span className="og it">Start hiring.</span>
            </h1>
            <p className="flow-sub">
              You've read enough AI-generated cover letters. Every member of TUC is verified, tested, and proven before their name reaches your desk. We've done the work. You just decide.
            </p>
          </div>

          <div className="flow-sec">
            <div className="sec-lbl rv">The talent pool</div>
            <div className="split split-center">
              <div>
                <h2 className="sec-h rv">
                  Zero noise.<br />
                  <span className="og it">Every time.</span>
                </h2>
                <p className="sec-p rv">Every person in the TUC talent pool has been verified against their institutional credentials, put through a thinking test, and scored. By the time they reach your inbox, the work is done.</p>
              </div>
              <div className="feat-rows rv rv1">
                <div className="feat-row">
                  <div className="feat-num">01</div>
                  <div>
                    <div className="feat-title">100% ID verified</div>
                    <p className="feat-body">Every member is verified against their actual institutional email. No fake profiles. No imposters.</p>
                  </div>
                </div>
                <div className="feat-row">
                  <div className="feat-num">02</div>
                  <div>
                    <div className="feat-title">Logic-tested, always</div>
                    <p className="feat-body">Every student has a Hustle Score. You see it next to their name on every application. Objective. Uncoachable.</p>
                  </div>
                </div>
                <div className="feat-row">
                  <div className="feat-num">03</div>
                  <div>
                    <div className="feat-title">Tier 1 only</div>
                    <p className="feat-body">IITs, NITs, IIITs, IIMs, BITS and more. The pool is curated before you ever open it.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flow-sec flow-sec-dark">
            <div className="sec-lbl rv">The applicant view</div>
            <h2 className="sec-h rv">
              Three buckets.<br />
              <span className="og it">You pick the depth.</span>
            </h2>
            <p className="sec-p rv">Post a role. Watch the applications come in. Then decide how much help you want. See everyone, or let the AI do the work. Your shortlist, your pace.</p>
            <div className="bucket-strip rv rv1">
              <div className="bucket bucket-1">
                <div className="bucket-tag b1-tag">Bucket 01</div>
                <div className="bucket-title">All applicants</div>
                <p className="bucket-body">Everyone who applied, sorted and filterable. Manual control. Full list. Still all verified and scored — just unranked by AI.</p>
              </div>
              <div className="bucket bucket-2">
                <div className="bucket-tag b2-tag">Bucket 02</div>
                <div className="bucket-title">AI top 15</div>
                <p className="bucket-body">AI reads your job description and ranks the 15 best fits. Each card has a match score and a one-line reason. No guesswork.</p>
              </div>
              <div className="bucket bucket-3">
                <div className="bucket-tag b3-tag">Bucket 03</div>
                <div className="bucket-title">Platinum picks</div>
                <p className="bucket-body">Students who completed a TUC cohort in your exact role type. Trained, assessed, and approved by our team. You skip two rounds.</p>
              </div>
            </div>
          </div>

          <div className="flow-sec">
            <div className="sec-lbl rv">Pricing</div>
            <h2 className="sec-h rv">
              Your first role<br />is <span className="og it">on us.</span>
            </h2>
            <p className="sec-p rv">Post your first bounty at zero cost. See the quality before you commit a single rupee. Then scale when you're ready.</p>
            <div className="price-strip rv rv1">
              <div className="price-block">
                <div className="price-free-tag">Start here</div>
                <div className="price-name">Free</div>
                <div className="price-val">Rs. 0</div>
                <div className="price-period">first bounty, forever</div>
                <div className="price-feats">
                  <div className="pf">1 active bounty post</div>
                  <div className="pf">All 3 applicant buckets</div>
                  <div className="pf">Approve, pass, or save candidates</div>
                  <div className="pf">No credit card required</div>
                </div>
                <button className="price-cta" onClick={handleApply}>Post a role free</button>
              </div>
              <div className="price-divider"></div>
              <div className="price-block">
                <div className="price-tag">Scale up</div>
                <div className="price-name">Pro</div>
                <div className="price-val">Rs. 2,999</div>
                <div className="price-period">per month</div>
                <div className="price-feats">
                  <div className="pf">Unlimited bounty posts</div>
                  <div className="pf">AI-ranked shortlists on every role</div>
                  <div className="pf">Full Platinum bucket access</div>
                  <div className="pf">Up to 4 team agent seats</div>
                  <div className="pf">Analytics dashboard</div>
                  <div className="pf">Priority support</div>
                </div>
                <button className="price-cta" onClick={handleApply}>Start with Pro</button>
              </div>
            </div>
          </div>

          <div className="flow-cta">
            <div className="flow-cta-glow"></div>
            <h2 className="flow-cta-h rv">
              Ready to find<br />your <span className="og it">next hire?</span>
            </h2>
            <p className="flow-cta-sub rv">Post a role in minutes. No noise. Just signal.</p>
            <div className="flow-cta-btns rv">
              <button className="btn-fire" onClick={handleApply}>Post a role free</button>
              <button className="btn-ghost" onClick={goStudent}>I'm a student instead</button>
            </div>
            <p className="flow-cta-note rv">Elite · Vetted · Verified</p>
          </div>
          <Footer />
        </div>

      </div>
    </div>
  );
};

export default Home;
