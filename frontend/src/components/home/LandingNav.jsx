import React from 'react';

const LandingNav = ({ isStuck, panel, onGoHome, onGoStudent, onGoFounder, onHandleApply }) => {
  return (
    <nav id="nav" className={`home-nav ${isStuck ? 'stuck' : ''}`}>
      <div className="logo-container">
        <a href="#" className="logo" onClick={onGoHome}>
          <div className="logo-dot"></div>
          THE UNDERESTIMATE CLUB
        </a>
      </div>
      
      <div className="nav-center">
        <button 
          className={`nav-lnk ${panel === 1 ? 'active' : ''}`} 
          onClick={onGoStudent}
        >
          Students
        </button>
        <button 
          className={`nav-lnk ${panel === 2 ? 'active' : ''}`} 
          onClick={onGoFounder}
        >
          Founders
        </button>
      </div>

      <div className="nav-r">
        <button className="nav-apply student-apply" onClick={onHandleApply}>
          Apply Now
        </button>
        <button className="nav-apply founder-apply" onClick={(e) => {
            e.preventDefault();
            window.open('https://tally.so/r/n0X5dX', '_blank'); // Standard founder link or internal
        }}>
          Hire Talent
        </button>
      </div>
    </nav>
  );
};

export default LandingNav;
