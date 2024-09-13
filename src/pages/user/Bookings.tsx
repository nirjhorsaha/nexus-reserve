import { useState, useEffect, useCallback } from "react";
import { FaCalendarAlt, FaClock, FaUser } from "react-icons/fa";
import { DatePicker, Checkbox } from "antd";
import 'antd/dist/reset.css';
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetAllSlotsQuery } from "@/redux/features/slot/slotApi";
import moment, { Moment } from "moment";
import Loading from "@/components/ui/loading";
import { useNavigate, useParams } from "react-router-dom";
import { saveBookingDetails } from "@/redux/features/booking/bookingSlice";
import { useGetSingleRoomQuery } from "@/redux/features/room/roomApi";
import ButtonLink from "@/components/ui/buttonLink";
import { TSlot } from "@/types";


const Bookings = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector(selectCurrentUser);
    const { id } = useParams<{ id: string }>(); // Get room ID from the URL
    
    const { data } = useGetAllSlotsQuery({});
    const slots: TSlot[] = data?.data;
    const { data: roomdata, isLoading: isRoomLoading } = useGetSingleRoomQuery(id as string);


    const [selectedDate, setSelectedDate] = useState<Moment | null>(null);
    const [availableSlots, setAvailableSlots] = useState<TSlot[]>([]);
    const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (data) {
            setLoading(false);
        }
    }, [data]);

    const fetchAvailableSlots = useCallback((date: Moment) => {
        if (!slots) return;

        const selectedDateString = date.format('YYYY-MM-DD');
        const filteredSlots = slots
            .filter(slot => slot?.date === selectedDateString && slot?.room?._id == id && !slot.isBooked)
            .map(slot => ({
                _id: slot?._id, 
                room: slot?.room,
                startTime: slot?.startTime,
                endTime: slot?.endTime,
                time: `${slot?.startTime} - ${slot.endTime}`,
                isBooked: slot?.isBooked,
                date: slot?.date,
            }))
            .sort((a, b) => moment(a.time.split(' - ')[0], 'HH:mm').diff(moment(b.time.split(' - ')[0], 'HH:mm')));
        // console.log("Available Time Slots:", filteredSlots); 
        setAvailableSlots(filteredSlots);

    }, [slots, id]);

    useEffect(() => {
        if (selectedDate && !isRoomLoading) {
            fetchAvailableSlots(selectedDate);
        }
    }, [selectedDate, fetchAvailableSlots, isRoomLoading]);

    useEffect(() => {
        if (roomdata?.data && selectedTimes.length > 0) {
            const pricePerSlot = roomdata.data.pricePerSlot;
            setTotalPrice(pricePerSlot * selectedTimes.length);
        } else {
            setTotalPrice(0);
        }
    }, [roomdata, selectedTimes]);

    const handleDateChange = (date: Moment | null) => {
        setSelectedDate(date);
        setSelectedTimes([]); // Reset selected times when date changes
    };

    const handleSlotChange = (checkedValues: string[]) => {
        setSelectedTimes(checkedValues);
    };

    const handleProceedToCheckout = () => {
        if (selectedDate && selectedTimes.length > 0) {
            const bookingDetails = {
                date: selectedDate.format('YYYY-MM-DD'),
                selectedTimes,
                user: user,
                slot: availableSlots,
                room: roomdata?.data,
                totalAmount: totalPrice,
            };
            console.log(bookingDetails);
            dispatch(saveBookingDetails(bookingDetails));
            navigate(`/${user?.role}/checkout`, { state: { selectedDate, selectedTimes } });
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="max-w-7xl mx-auto p-2 md:p-8 rounded-lg mt-10 border border-gray-300">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 flex items-center justify-center">
                Book Your Slot
            </h2>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* User Information */}
                <div className="flex-1 p-4 md:p-6 lg:p-8 rounded-lg border border-gray-300 shadow-sm">
                    <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 flex items-center">
                        <FaUser className="mr-3 text-blue-600" size={28} />
                        User Information
                    </h3>
                    <form>
                        <div className="mb-5">
                            <label className="block text-lg font-medium text-gray-700 mb-2">Name</label>
                            <input
                                type="text"
                                value={user?.name || ""}
                                disabled
                                className="w-full py-3 px-4 border rounded-lg bg-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
                            />
                        </div>
                        <div className="mb-5">
                            <label className="block text-lg font-medium text-gray-700 mb-2">Email</label>
                            <input
                                type="email"
                                value={user?.email || ""}
                                disabled
                                className="w-full py-3 px-4 border rounded-lg bg-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
                            />
                        </div>
                        <div className="mb-5">
                            <label className="block text-lg font-medium text-gray-700 mb-2">Phone</label>
                            <input
                                type="tel"
                                value={user?.phone || ""}
                                disabled
                                className="w-full py-3 px-4 border rounded-lg bg-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
                            />
                        </div>
                    </form>
                </div>

                {/* Date and Time Slots */}
                <div className="flex-1 p-4 md:p-6 lg:p-8 rounded-lg border border-gray-300 shadow-sm">
                    {/* Date Selection */}
                    <div className="mb-6">
                        <label
                            className="flex items-center text-lg text-gray-700 mb-4 font-bold"
                            style={{ fontFamily: 'Nunito, sans-serif' }}
                        >
                            <FaCalendarAlt className="mr-3 text-blue-600" size={24} />
                            Select Date
                        </label>
                        <DatePicker
                            onChange={handleDateChange}
                            style={{ fontFamily: 'Nunito, sans-serif' }}
                            className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                            placeholder="Pick a date"
                            aria-label="Select date"
                        />
                    </div>

                    {/* Time Slots */}
                    {selectedDate && (
                        <div>
                            <label className="text-lg font-bold text-gray-700 mb-4 flex items-center">
                                <FaClock className="mr-3 text-blue-600" size={24} />
                                Available Time Slots
                            </label>
                            <Checkbox.Group
                                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                                value={selectedTimes}
                                onChange={handleSlotChange}
                            >
                                {availableSlots.length > 0 ? (
                                    availableSlots.map((slot, index) => (
                                        <Checkbox
                                            key={index}
                                            value={`${slot.startTime} - ${slot.endTime}`}
                                            style={{ fontFamily: 'Nunito, sans-serif' }}
                                            className="py-3 px-4 border rounded-lg cursor-pointer hover:bg-gray-100 transition duration-300">
                                            {`${slot.startTime} - ${slot.endTime}`}
                                        </Checkbox>
                                    ))
                                ) : (
                                    <div className="col-span-2 flex justify-center items-center h-20">
                                        <p className="text-red-600 font-semibold text-md" style={{ fontFamily: 'Nunito' }}
                                        >No available slots for the selected date.</p>
                                    </div>
                                )}
                            </Checkbox.Group>

                            {selectedTimes.length > 0 && (
                                <div className="mt-6 flex justify-center">
                                    <ButtonLink
                                        text="Proceed to Checkout"
                                        onClick={handleProceedToCheckout}
                                    />
                                </div>
                            )}

                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Bookings;