import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa'; // Using FontAwesome for the error icon

interface ErrorComponentProps {
  message: string;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ message }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <FaExclamationTriangle className="text-red-600 text-6xl" /> {/* Error icon */}
        </div>
        <p className="text-xl text-red-600 font-semibold mb-2">Error</p>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
};

export default ErrorComponent;
