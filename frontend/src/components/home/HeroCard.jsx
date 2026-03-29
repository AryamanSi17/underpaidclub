import React from 'react';
import { cn } from '@/lib/utils';

const HeroCard = ({ tag, title, sub, arrow = "↗", onClick, variant = "default", className }) => {
  const isDark = variant === "dark";
  
  return (
    <button 
      className={cn(
        isDark ? "btn-dark" : "btn-main",
        className
      )} 
      onClick={onClick}
    >
      <span className={isDark ? "btn-dark-tag" : "btn-main-tag"}>{tag}</span>
      <span className={isDark ? "btn-dark-title" : "btn-main-title"}>{title}</span>
      <span className={isDark ? "btn-dark-sub" : "btn-main-sub"}>{sub}</span>
      <span className={isDark ? "btn-dark-arrow" : "btn-main-arrow"}>{arrow}</span>
      {!isDark && <div className="btn-glow-pastel" />}
    </button>
  );
};

export default HeroCard;
