import React from 'react';
import { cn } from '@/lib/utils';

const Button = ({ 
  children, 
  variant = 'primary', 
  className, 
  onClick, 
  disabled = false,
  ...props 
}) => {
  const baseStyles = "px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-wider transition-all duration-150 flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-[#00FF85] text-[#000000] hover:bg-[#00CC6A] disabled:bg-[#2A2A2A] disabled:text-[#555555] disabled:cursor-not-allowed",
    ghost: "bg-transparent border border-[#00FF85] text-[#00FF85] hover:bg-[#00FF85]/10 disabled:opacity-50",
    dark: "bg-[#1A1A1A] border border-[#2A2A2A] text-white hover:border-[#00FF85]/40",
  };

  return (
    <button 
      className={cn(baseStyles, variants[variant], className)}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
