import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonLinkProps {
  to?: string;
  text: string;
  onClick?: () => void; // Added onClick prop for handling custom actions
  className?: string; // Optional className prop for additional styling
}

const ButtonLink: React.FC<ButtonLinkProps> = ({ to, text, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    >
      {to ? <Link to={to}>{text}</Link> : text}
    </button>
  );
};

export default ButtonLink;

// import React from 'react';
// import { Link } from 'react-router-dom';

// interface ButtonLinkProps {
//   to: string;
//   text: string;
//   className?: string; // Optional className prop for additional styling
//   onClick?: () => void; // Added onClick prop for handling custom actions
// }

// const ButtonLink: React.FC<ButtonLinkProps> = ({ to, text, onClick, className = '' }) => {
//   return (
//     <Link
//       to={to}
//       className={`bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
//     >
//       {text}
//     </Link>
//   );
// };

// export default ButtonLink;
