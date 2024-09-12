import React from "react";
import { TBookings } from "@/types/bookins";

interface UpdateBookingModalProps {
    visible: boolean;
    onClose: () => void;
    booking: TBookings | null;
}

const UpdateBookingModal: React.FC<UpdateBookingModalProps> = ({ visible, onClose, booking }) => {
    if (!visible) return null;

    return (
        <div
            className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-white w-full max-w-4xl mx-4 md:mx-0 p-6 rounded-lg shadow-lg relative overflow-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="absolute top-4 right-4 text-2xl font-bold text-gray-600 hover:text-gray-800 transition-transform transform hover:scale-110"
                    onClick={onClose}
                >
                    &times;
                </button>
                {booking ? (
                    <div className="space-y-6 max-h-[calc(100vh-3rem)] overflow-y-auto">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Booking Details</h3>

                        <section className="border-t border-gray-200 pt-4">
                            <h4 className="text-xl font-semibold text-gray-700 mb-2">Room Information</h4>
                            <div className="">
                                <div className="flex flex-wrap gap-2 text-center ">
                                    <p className="bg-gray-100 text-gray-700 py-1 px-3 rounded-xl text-base font-medium flex-1 mr-4"><strong className="font-medium">Room Number:</strong> <span>{booking.room.roomNo}</span></p>
                                    <p className="bg-gray-100 text-gray-700 py-1 px-3 rounded-xl text-base font-medium flex-1 mr-4"><strong className="font-medium">Floor Number:</strong> <span>{booking.room.floorNo}</span></p>
                                    <p className="bg-gray-100 text-gray-700 py-1 px-3 rounded-xl text-base font-medium flex-1 mr-4"><strong className="font-medium">Capacity:</strong> <span>{booking.room.capacity}</span></p>
                                    <p className="bg-gray-100 text-gray-700 py-1 px-3 rounded-xl text-base font-medium flex-1 mr-4"><strong className="font-medium">Price Per Slot:</strong> <span>${booking.room.pricePerSlot}</span></p>
                                </div>
                                <p className="text-lg "><strong className="font-semibold">Amenities:</strong></p>
                                <div className="flex flex-wrap gap-2">
                                    {booking.room.amenities.map((amenity, index) => (
                                        <span
                                            key={index}
                                            className="bg-gray-100 text-gray-700 py-1 px-3 rounded-full text-sm font-medium"
                                        >
                                            {amenity}
                                        </span>
                                    ))}
                                </div>
                                <p className="text-lg mt-4"><strong className="font-semibold">Total Amount:</strong> ${booking.totalAmount}</p>
                                <p className="text-lg mt-4"><strong className="font-semibold">Room Images:</strong></p>
                                <div className="flex flex-wrap gap-4">
                                    {booking.room.images.map((image, index) => (
                                        <img
                                            key={index}
                                            src={image}
                                            alt={`Room image ${index + 1}`}
                                            className="w-36 h-24 object-cover rounded-md border border-gray-300 shadow-sm"
                                        />
                                    ))}
                                </div>
                            </div>
                        </section>

                        <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
                            <section className="flex-1 border-t border-gray-200 pt-4">
                                <h4 className="text-xl font-semibold text-gray-700 mb-2">User Information</h4>
                                <div className="space-y-2">
                                    <p className="text-lg m-0"><strong className="font-medium">User Name:</strong> <span>{booking.user.name}</span></p>
                                    <p className="text-lg"><strong className="font-medium">User Email:</strong> <span>{booking.user.email}</span></p>
                                    <p className="text-lg"><strong className="font-medium">User Phone:</strong> <span>{booking.user.phone}</span></p>
                                </div>
                            </section>

                            <section className="flex-1 border-t border-gray-200 pt-4">
                                <h4 className="text-xl font-semibold text-gray-700 mb-2">Slot Information</h4>
                                <div className="space-y-4">
                                    <p className="text-lg"><strong className="font-medium">Slots:</strong></p>
                                    <ul className="list-disc pl-5 space-y-2">
                                        {booking.slots.map((slot) => (
                                            <li key={slot._id} className="text-gray-700">
                                                {slot.startTime} - {slot.endTime}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </section>
                        </div>
                    </div>
                ) : (
                    <p>No booking details available.</p>
                )}
            </div>
        </div>
    );
};

export default UpdateBookingModal;
