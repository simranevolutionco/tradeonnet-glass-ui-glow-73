
import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <div className={`relative w-12 h-12 ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-trade-purple to-trade-purple-dark rounded-full opacity-70 animate-pulse"></div>
      <div className="absolute inset-1.5 bg-white rounded-full flex items-center justify-center">
        <span className="text-xl font-bold text-trade-purple">VB</span>
      </div>
    </div>
  );
};

export default Logo;
