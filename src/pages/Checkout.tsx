import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Helmet, HelmetProvider } from "react-helmet-async";
import ShippingAndPayment from '@/components/Form/ShippingAndPayment';
import BookingSummary from '@/components/Form/BookingSummary';

const Checkout: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    paymentMethod: 'Cash On Delivery',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const isFormValid = () => {
    return (
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.phone &&
      formData.address &&
      formData.paymentMethod
    );
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid()) {
      toast.error('Please fill out all required fields.');
      return;
    }

    if (formData.paymentMethod === 'Stripe') {
      toast.error('Stripe payments are currently not accepted! Please select Cash On Delivery.');
      return;
    }

    try {
      // Redirect to success page
      navigate('/success');
    } catch (error) {
      console.error('Failed to place order:', error);
      toast.error('Failed to place order');
    }
  };

  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>Checkout - Nexus Reserve</title>
        </Helmet>
      </HelmetProvider>
      <div className="max-w-7xl mx-auto p-2 md:p-8 rounded-lg mt-10 border border-gray-300">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 flex items-center justify-center">
          Checkout
        </h2>
        <div className="container mx-auto p-4 md:p-6">
          <form onSubmit={handlePlaceOrder} className="flex flex-col md:flex-row gap-6">
            {/* Shipping and Payment Form */}
            <div className="flex-1">
              <ShippingAndPayment formData={formData} handleInputChange={handleInputChange} />
            </div>

            {/* Booking Summary */}
            <div className="flex-1 p-6 rounded-lg shadow-md bg-white ">
              <BookingSummary />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
