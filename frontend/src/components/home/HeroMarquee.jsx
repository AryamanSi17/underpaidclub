import React from 'react';

const HeroMarquee = () => {
  const items = [
    "IDs · VERIFIED. EVERY SINGLE ONE.",
    "Tier 1 · IITs, NITs, IIITs, IIMs",
    "48hr · FROM APPLY TO FOUNDER RESPONSE"
  ];

  return (
    <div className="hero-footer-marquee">
      <div className="marquee-content">
        {items.concat(items).map((item, index) => (
          <React.Fragment key={index}>
            <span>{item}</span>
            <span className="dot"></span>
          </React.Fragment>
        ))}
      </div>
      <div className="marquee-content" aria-hidden="true">
        {items.concat(items).map((item, index) => (
          <React.Fragment key={index + items.length * 2}>
            <span>{item}</span>
            <span className="dot"></span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default HeroMarquee;
