import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

interface ErrorComponentProps {
  message: string;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ message }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <FaExclamationTriangle className="text-red-600 text-6xl" />
        </div>
        <p className="text-xl text-red-600 font-semibold mb-2"></p>
        <p className="text-gray-600 text-xl font-semibold">{message}</p>
      </div>
    </div>
  );
};

export default ErrorComponent;
