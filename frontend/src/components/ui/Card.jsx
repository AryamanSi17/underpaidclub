import React from 'react';
import { cn } from '@/lib/utils';

const Card = ({ children, className, hoverEffect = true }) => {
  return (
    <div className={cn(
      "bg-[#111111] border border-[#2A2A2A] rounded-[12px] p-[24px] transition-all duration-[150ms] ease-in-out",
      hoverEffect && "hover:border-[#00FF85]/40 hover:bg-[#1A1A1A]",
      className
    )}>
      {children}
    </div>
  );
};

export default Card;
