import {type ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'gradient' | 'glow';
  onClick?: () => void;
}

const Card = ({ children, className = '', variant = 'default', onClick }: CardProps) => {
  const variants = {
    default: 'bg-card border border-border',
    gradient: 'bg-gradient-focus border border-primary/20',
    glow: 'bg-card border border-primary/30 shadow-glow',
  };

  return (
    <div 
      onClick={onClick}
      className={`rounded-2xl p-6 transition-all duration-300 ${variants[variant]} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
