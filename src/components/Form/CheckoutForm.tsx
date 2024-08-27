import React from 'react';
import { FaShippingFast, FaCreditCard } from 'react-icons/fa';

interface CheckoutFormProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    paymentMethod: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ formData, handleInputChange }) => {
  return (
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg border border-gray-200 flex-1">
            <div className="flex items-center mb-4">
              <FaShippingFast className="text-3xl text-blue-600 mr-2" />
              <h1 className="text-2xl font-extrabold text-gray-800">Shipping Address</h1>
            </div>
            <p className="text-gray-600 mb-4">Fill in the form below to complete your purchase</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="block text-gray-700">
                <span className="text-lg font-medium">First Name:</span>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </label>
              <label className="block text-gray-700">
                <span className="text-lg font-medium">Last Name:</span>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </label>
              <label className="block text-gray-700">
                <span className="text-lg font-medium">Email:</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </label>
              <label className="block text-gray-700">
                <span className="text-lg font-medium">Phone:</span>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </label>
              <label className="block text-gray-700">
                <span className="text-lg font-medium">Address:</span>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  rows={4}
                  required
                />
              </label>
            </div>
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg border border-gray-200 mt-6">
              <div className="flex items-center mb-4">
                <FaCreditCard className="text-3xl text-blue-600 mr-2" />
                <h1 className="text-2xl font-extrabold text-gray-800">Payment Information</h1>
              </div>
              <label className="block text-gray-700">
                <span className="text-lg font-medium">Payment Method:</span>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                >
                  <option value="Cash On Delivery">Cash On Delivery</option>
                  <option value="Stripe">Stripe</option>
                </select>
              </label>
            </div>
          </div>
  );
};

export default CheckoutForm;
