import React, { useState } from 'react';
import ButtonLink from '../ui/buttonLink';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useCreateBookingMutation } from '@/redux/features/booking/bookingApi';
import toast from 'react-hot-toast';
import { FaSpinner } from 'react-icons/fa';
import { clearBookingDetails } from '@/redux/features/booking/bookingSlice';
// import { useUpdateSlotsMutation } from '@/redux/features/slot/slotApi';


interface ShippingAndPaymentProps {
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

const ShippingAndPayment: React.FC<ShippingAndPaymentProps> = ({ formData, handleInputChange }) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const bookingData = useSelector((state: RootState) => state.booking);
  const dispatch = useDispatch();

  const { room, date, user, totalAmount, slot } = bookingData;
  const [createBooking] = useCreateBookingMutation();
  // const [updateSlots] = useUpdateSlotsMutation(); 

  const [loading, setLoading] = useState<boolean>(false);

  const slotIds = slot.map((slotItem) => slotItem?._id);

  // Function to validate form fields
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    for (const [key, value] of Object.entries(formData)) {
      if (!value.trim()) {
        newErrors[key] = 'This field is required';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Function to handle form submission
  const handleButtonClick = async () => {
    if (validateForm()) {
      setLoading(true); // Set loading to true when the request starts
      const CheckoutData = {
        formData,
        bookingData,
      };
      console.log('Checkout Data:', CheckoutData);

      const bookingDetails = {
        date: date,
        user: user?._id,
        slots: slotIds,
        room: room?._id,
        totalAmount: totalAmount,
      };

      try {
        const userBooking = await createBooking(bookingDetails).unwrap();
        toast.success('Room Booked successfully.!')
        if (userBooking.success) {
          console.log(userBooking?.data?.payment_url)
          console.log(userBooking)
          // Update the isBooked status of each slot to true
          // await Promise.all(
          //   slotIds.map(async (slotId) => {
          //     await updateSlots({ id: slotId, isBooked: true }).unwrap();
          //   })
          // );
          window.location.href = userBooking?.data?.payment_url // redirect to payment page
          dispatch(clearBookingDetails()) // Reset the booking state
        }
        console.log("Booking successful! Redirecting to payment...");
      } catch (error) {
        console.log("Booking failed:", error);
        toast.error("Something went wrong while creating the booking. Please try again.");
      }
      finally {
        setLoading(false); // Set loading to false when the request finishes
      }
    } else {
      console.log("Please fill all the fields.");
    }
  };


  return (
    <section className=" p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Shipping Address & Payment Information</h2>
      {/* Personal Information */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
        <div className="grid gap-4 mb-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-lg ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="First Name"
              required
            />
            {errors?.firstName && <p className="text-red-500 text-sm">{errors?.firstName}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-lg ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Last Name"
              required
            />
            {errors?.lastName && <p className="text-red-500 text-sm">{errors?.lastName}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-lg ${errors?.email ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Email"
              required
            />
            {errors?.email && <p className="text-red-500 text-sm">{errors?.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-lg ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Phone Number"
              required
            />
            {errors?.phone && <p className="text-red-500 text-sm">{errors?.phone}</p>}
          </div>
        </div>
      </div>

      {/* Shipping Address */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
        <div className="grid gap-4 mb-4 md:grid-cols-1">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-lg ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Address"
              required
            />
            {errors?.address && <p className="text-red-500 text-sm">{errors?.address}</p>}
          </div>
        </div>
      </div>

      {/* Payment Method (Optional) */}
      {/* <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="paymentMethod">Payment Method</label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg"
              required
            >
              <option value="AmarPay">AmarPay</option>
              <option value="Stripe">Stripe</option>
            </select>
          </div>
        </div> */}

      <div className="flex justify-center mt-4">
        <ButtonLink
          text={loading ? <><FaSpinner className="animate-spin mr-2" />Processing...</> : "Proceed to Payment"}
          className='flex items-center justify-center'
          onClick={handleButtonClick}
          disabled={loading} // Disable the button when loading
        />
      </div>
    </section>
  );
};

export default ShippingAndPayment;
