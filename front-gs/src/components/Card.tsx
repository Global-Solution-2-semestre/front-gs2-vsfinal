import { type ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'gradient' | 'glow';
  onClick?: () => void;
}

const Card = ({ children, className = '', variant = 'default', onClick }: CardProps) => {
  const variants = {
    default: 'bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700',
    gradient: 'bg-gradient-to-br from-purple-500 to-purple-600 border border-purple-500/20',
    glow: 'bg-white dark:bg-gray-900 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.4)]',
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
