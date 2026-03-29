import React from 'react';
import HeroCard from './HeroCard';

const HeroContent = ({ onGoStudent, onGoFounder }) => {
  return (
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
          <HeroCard 
            tag="For students" 
            title="I want to get hired" 
            sub="Tier 1 institutions. Invite only." 
            onClick={onGoStudent} 
            variant="main"
          />
          <HeroCard 
            tag="For founders" 
            title="I want to hire" 
            sub="Your next hire is already inside." 
            onClick={onGoFounder} 
            variant="dark"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroContent;
