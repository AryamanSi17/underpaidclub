import React from 'react';

const LandingNav = ({ isStuck, panel, onGoHome, onGoStudent, onGoFounder, onHandleApply }) => {
  return (
    <nav id="nav" className={`home-nav ${isStuck ? 'stuck' : ''}`}>
      <a href="#" className="logo" onClick={onGoHome}>
        <div className="logo-dot"></div>
        THE UNDERESTIMATE CLUB
      </a>
      <div className="nav-r">
        <button 
          className={`nav-lnk ${panel === 1 ? 'active' : ''}`} 
          onClick={onGoStudent}
        >
          For Students
        </button>
        <button 
          className={`nav-lnk ${panel === 2 ? 'active' : ''}`} 
          onClick={onGoFounder}
        >
          For Founders
        </button>
        <button className="nav-apply" onClick={onHandleApply}>
          {panel === 2 ? 'Post a Role Free' : 'Apply Now'}
        </button>
      </div>
    </nav>
  );
};

export default LandingNav;
