import React from 'react';

interface LifeBridgeLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  theme?: 'light' | 'dark';
  className?: string;
}

export const LifeBridgeLogo: React.FC<LifeBridgeLogoProps> = ({
  size = 'md',
  theme = 'light',
  className = '',
}) => {
  const isDark = theme === 'dark';

  const textSize = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl',
  }[size];

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <span className={`font-extrabold tracking-tight ${textSize}`}>
        <span className={isDark ? 'text-white' : 'text-[#18212B]'}>Life</span>
        {' '}
        <span className="text-[#E5252A]">Bridge</span>
      </span>
    </div>
  );
};
