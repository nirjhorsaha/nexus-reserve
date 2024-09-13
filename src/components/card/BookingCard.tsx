import { motion } from "framer-motion";
import { DeleteOutlined } from "@ant-design/icons";
import { useUpdateBookingMutation } from "@/redux/features/booking/bookingApi";
import toast from "react-hot-toast";
import { TBookings } from "@/types/bookins";
import { TSlot } from "@/types";
import { useState } from "react";
import ConfirmationModal from "../Modal/ConfirmationModal";

interface BookingCardProps {
    booking: TBookings;
}

const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [updateBooking] = useUpdateBookingMutation();


    // Function to handle the status display logic
    const renderStatus = () => {
        switch (booking?.isConfirmed) {
            case "confirmed":
                return (
                    <span className="text-green-600 font-semibold">Confirmed</span>
                );
            case "unconfirmed":
                return (
                    <span className="text-yellow-600 font-semibold ">Unconfirmed</span>
                );
            case "canceled":
                return (
                    <span className="text-red-600 font-semibold ">Canceled</span>
                );
            default:
                return (
                    <span className="text-gray-600 font-semibold ">Pending</span>
                );
        }
    };
    const renderBookingStatus = () => {
        switch (booking?.status) {
            case "approved":
                return (
                    <span className="text-green-600 font-semibold px-2 py-1 bg-zinc-200 rounded-xl">Approved</span>
                );
            case "rejected":
                return (
                    <span className="text-red-600 font-semibold px-2 py-1 bg-zinc-200 rounded-xl">Rejected</span>
                );
            default:
                return (
                    <span className="text-gray-600 font-semibold px-1 md:px-2 md:py-1 md:bg-zinc-200 md:rounded-xl">Pending</span>
                );
        }
    };

    // Handle the cancellation of the booking
    const handleConfirm = async () => {
        if (booking?.isConfirmed === "unconfirmed") {
            try {
                await updateBooking({ id: booking._id, updatedBooking: { isConfirmed: 'canceled' } }).unwrap();
                toast.success('Booking canceled successfully!');
            } catch (error) {
                toast.error('Failed to cancel booking.');
            }
            setIsModalVisible(false);
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div className="relative border border-gray-200 p-4 sm:p-6 rounded-xl">
            {/* For small device -> Cancel Booking Icon  */}
            {booking?.isConfirmed === "unconfirmed" && (
                <button
                    onClick={() => setIsModalVisible(true)}
                    className="absolute top-2 right-2 sm:hidden bg-red-500 text-white p-2 rounded-full flex items-center justify-center hover:bg-red-600 transition"
                    aria-label="Cancel Booking">
                    <DeleteOutlined className="text-lg" />
                </button>
            )}

            <div className="flex flex-col sm:flex-row justify-between items-start">
                <div className="mb-4 sm:mb-0">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                        {booking?.room.name}
                    </h2>
                    <p className="text-gray-600">
                        <strong>Date:</strong> {booking?.date}
                    </p>
                    <p className="text-gray-600">
                        <strong>Status:</strong> {renderStatus()}
                    </p>
                    <p className="text-gray-600 ">
                        <strong >Booking Confirmation:</strong> <span className="">{renderBookingStatus()}</span>
                    </p>
                    <p className=" font-bold text-gray-700">
                        <strong>Total Amount:</strong> ${booking?.totalAmount}
                    </p>
                    {/* {
                        booking?.isConfirmed === 'confirmed' ? (
                            <p className="text-lg font-bold text-gray-700 px-2 py-1 bg-zinc-200 rounded-xl">
                                <strong>Transaction ID :</strong> {booking?.transactionID}
                            </p>
                        ) : ('')
                    } */}
                </div>
                {/* For large & Medium device -> Cancel Booking Button */}
                {booking?.isConfirmed === "unconfirmed" ? (
                    <div className="text-right hidden sm:block">
                        <button
                            onClick={() => setIsModalVisible(true)}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-red-600 transition">
                            <DeleteOutlined className="text-lg" />
                            Cancel Booking
                        </button>
                    </div>
                ) : (
                    <div>

                        <p className="text-lg font-bold text-gray-700 ">
                            <strong>Transaction ID :</strong> {booking?.transactionID}
                        </p>
                    </div>
                )}
            </div>

            {/* Room Details */}
            <div className="mt-6">
                <p className="text-xl font-semibold text-gray-700">Room Details:</p>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                    <p className="text-gray-600 bg-zinc-200 rounded-lg p-2">
                        <strong>Amenities:</strong> {booking?.room.amenities.join(", ")}
                    </p>
                    <p className="text-gray-600 bg-zinc-200 rounded-lg p-2">
                        <strong>Capacity:</strong> {booking?.room.capacity} people
                    </p>
                    <p className="text-gray-600 bg-zinc-200 rounded-lg p-2">
                        <strong>Room No:</strong> {booking?.room.roomNo}
                    </p>
                    <p className="text-gray-600 bg-zinc-200 rounded-lg p-2">
                        <strong>Price Per Slot:</strong> ${booking?.room.pricePerSlot}
                    </p>
                </div>
            </div>

            {/* Booked Slots */}
            <div className="mt-6">
                <p className="text-xl font-semibold text-gray-700">Booked Slots:</p>
                <div className="space-y-4 mt-4">
                    {booking?.slots.length > 0 ? (
                        booking.slots.map((slot: TSlot) => (
                            <div
                                key={slot?._id}
                                className="flex flex-col sm:flex-row  justify-between items-center bg-zinc-200 p-3 rounded-lg"
                            >
                                <p className="text-gray-600 font-semibold">
                                    Date: {slot.date}
                                </p>
                                <p className="text-gray-600 font-semibold">
                                    Time: {slot.startTime} - {slot.endTime}
                                </p>
                                <p className="text-grey-600 font-semibold">
                                    Status:{" "}
                                    <span
                                        className={`text-sm font-semibold ${slot.isBooked ? "text-green-600" : "text-red-600"
                                            }`}
                                    >
                                        {slot.isBooked ? "Booked" : "Canceled"}
                                    </span>
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-red-500">It looks like no slots have been booked yet.!</p>
                    )}
                </div>

            </div>

            {/* Room Images */}
            <div className="mt-8">
                <p className="text-xl font-semibold text-gray-700">Room Images:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                    {booking?.room.images.map((image, index) => (
                        <motion.img
                            key={index}
                            src={image}
                            alt={`Room ${index + 1}`}
                            className="w-full h-40 object-cover rounded-lg shadow-md"
                        />
                    ))}
                </div>
            </div>
            {/* <Modal
                // centered
                title={<span style={{ fontWeight: 'bold', fontSize: '20px', fontFamily: 'Nunito' }}>Confirm Booking Canceling</span>}
                open={isModalVisible}
                onOk={handleCancel}
                onCancel={() => setIsModalVisible(false)}
                okText={<span className="font-Nunito">Yes, Cancel</span>}
                cancelText={<span className="font-Nunito" >No, Keep</span>}
            >
                <p className="font-Nunito">Are you sure you want to cancel this booking?</p>
            </Modal> */}
            <ConfirmationModal
                visible={isModalVisible}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                title="Confirm Booking Canceling"
                description="Are you sure you want to cancel this booking?"
                okText={<span className="font-Nunito">Yes, Cancel</span>}
                cancelText={<span className="font-Nunito" >No, Keep</span>}
            />

            {/* <DeleteModal
                visible={isModalVisible}
                onConfirm={handleCancel}
                onCancel={() => setIsModalVisible(false)}
                title="Confirm Booking Cancellation"
                description="Are you sure you want to cancel this booking?"
            /> */}
        </div>
    );
};

export default BookingCard;
