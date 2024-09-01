import React from 'react';
import { GridLoader } from 'react-spinners';

interface LoadingProps {
  message?: string;
}

const Loading: React.FC<LoadingProps> = ( ) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <GridLoader color="#2563eb" />
      </div>
    </div>
  );
};

export default Loading;
