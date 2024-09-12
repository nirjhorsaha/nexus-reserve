import React from 'react';
import { motion } from 'framer-motion';

interface DeleteModalProps {
    visible: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    title?: string;
    description?: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
    visible,
    onConfirm,
    onCancel,
    title = "Confirm Deletion",
    description = "Are you sure you want to delete this room?",
}) => {
    if (!visible) return null;

    return (
        <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <motion.div
                className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                transition={{ duration: 0.3 }}
            >
                <h2 className="text-lg font-bold mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
                    {title}
                </h2>
                <p className="mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
                    {description}
                </p>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Delete
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default DeleteModal;
