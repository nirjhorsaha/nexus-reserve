import React from 'react';

interface OrderSummaryProps {
    subtotal: number;
    shipping: number;
    taxes: number;
    total: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ subtotal, shipping, taxes, total }) => {
    return (
        <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Order Summary</h2>
            <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                    <span className="text-base md:text-lg font-medium text-gray-700">Subtotal:</span>
                    <span className="text-base md:text-lg font-medium text-gray-800">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-base md:text-lg font-medium text-gray-700">Shipping:</span>
                    <span className="text-base md:text-lg font-medium text-gray-800">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-base md:text-lg font-medium text-gray-700">Tax:</span>
                    <span className="text-base md:text-lg font-medium text-gray-800">${taxes.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-lg md:text-xl font-bold text-gray-800">Total:</span>
                    <span className="text-lg md:text-xl font-bold text-gray-800">${total.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;
