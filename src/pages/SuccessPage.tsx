// src/pages/SuccessPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaHome } from 'react-icons/fa';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const SuccessPage: React.FC = () => {
  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>Order - Nexus Reserve</title>
        </Helmet>
      </HelmetProvider>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className=" mx-auto text-center bg-white p-8 rounded-lg shadow-lg">
          <div className="mb-4">
            <FaCheckCircle className="text-green-500 text-6xl mx-auto" />
          </div>
          <h1 className="text-4xl font-bold text-green-600">Order Successful!</h1>
          <p className="mt-4 text-lg text-gray-700">Your order has been placed successfully. Thank you for booking with us!</p>
          <p className="mt-4 text-sm text-gray-500">You will receive a confirmation email with your bookings details shortly.</p>
          <Link
            to="/"
            className="mt-6 inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
            <FaHome className="mr-2 text-xl" />
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
