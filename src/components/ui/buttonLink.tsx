import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonLinkProps {
  to?: string;
  text: React.ReactNode;
  className?: string; 
  onClick?: () => void; 
  disabled?: boolean;
}

const ButtonLink: React.FC<ButtonLinkProps> = ({ to = '', text, onClick, className = '', disabled }) => {
  return (
    <Link
      onClick={onClick}
      to={to}
      className={` bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {text}
    </Link>
  );
};

export default ButtonLink;