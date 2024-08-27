import React from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

interface QuantityAdjusterProps {
    quantity: number;
    stock: number;
    onDecrease: () => void;
    onIncrease: () => void;
}

const QuantityAdjuster: React.FC<QuantityAdjusterProps> = ({ quantity, stock, onIncrease, onDecrease }) => {
  return (
    <div className="flex items-center mb-4">
      <button
        onClick={onDecrease}
        className={`border px-3 py-1 rounded-lg shadow-md flex items-center transition-colors duration-300 ease-in-out ${quantity <= 1 ? 'cursor-not-allowed' : ''}`}
        disabled={quantity <= 1}
      >
        <FaMinus className="text-xl" />
      </button>
      <span className="mx-3 text-lg">{quantity}</span>
      <button
        onClick={onIncrease}
        className={`border px-3 py-1 rounded-lg shadow-md flex items-center transition-colors duration-300 ease-in-out ${quantity >= stock ? 'cursor-not-allowed' : ''}`}
        disabled={quantity >= stock}
      >
        <FaPlus className="text-xl" />
      </button>
    </div>
  );
};

export default QuantityAdjuster;
