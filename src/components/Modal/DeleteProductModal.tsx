import { Product } from '@/types';
import React from 'react';
import { FiX } from 'react-icons/fi';

interface DeleteProductModalProps {
  product: Product;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteProductModal: React.FC<DeleteProductModalProps> = ({
  product,
  onClose,
  onDelete,
}) => {
  const handleDelete = () => {
    onDelete();
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Delete Product</h2>
            <button onClick={onClose}>
              <FiX className="text-gray-500 hover:text-gray-700" />
            </button>
          </div>
          <p>Are you sure you want to delete the product "{product.name}"?</p>
          <div className="mt-4 flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded-md"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteProductModal;
