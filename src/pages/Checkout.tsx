import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useUpdateProductMutation } from '@/redux/api/baseApi';
import { clearCart } from '@/redux/feature/CartSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import OrderSummary from '../components/card/OrderSummary';
import { Helmet } from 'react-helmet';
import CheckoutForm from '@/components/Form/CheckoutForm';
import { calculateTotals } from '@/utils/calculateTotals';



const Checkout: React.FC = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const [updateProduct] = useUpdateProductMutation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    paymentMethod: 'Cash On Delivery',
  });

  const { subtotal, shipping, taxes, total } = calculateTotals(cartItems);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.paymentMethod === 'Stripe') {
      // Prevent Stripe payment and show a message
      toast.error('Stripe payment are currently not accepted.! Please select Cash On Delivery.');
      return;
    }
    try {
      // Update stock for each product in the cart
      await Promise.all(
        cartItems.map((item) =>
          updateProduct({
            id: item?._id,
            product: { quantity: item.quantity - item.cartQuantity }, // Deduct quantity from stock
          }).unwrap()
        )
      );

      // Clear cart after successful order
      dispatch(clearCart());

      // Redirect to success page
      navigate('/success');
    } catch (error) {
      console.error('Failed to place order:', error);
      toast.error('Failed to place order')
    }
  };

  return (
    <div>
      <Helmet>
        <title>Checkout - Mech Arcade</title>
      </Helmet>
      <div className="container mx-auto p-4 md:p-6">
        <form onSubmit={handlePlaceOrder} className="flex flex-col md:flex-row gap-6">
          {/* Shipping Address Box */}
          <CheckoutForm formData={formData} handleInputChange={handleInputChange} />
          {/* Order Summary Box */}
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg border border-gray-200 w-full md:w-80 self-start">
            <OrderSummary
              subtotal={subtotal}
              shipping={shipping}
              taxes={taxes}
              total={total}
            />
            <button
              type="submit"
              className="w-full px-6 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700"
            >
              Place Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
