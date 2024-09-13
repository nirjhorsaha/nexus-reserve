import { useGetMyBookingsQuery } from "@/redux/features/booking/bookingApi";
import Loading from "@/components/ui/loading";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { FaClipboardList } from "react-icons/fa";
import { useEffect } from "react";
import BookingCard from "@/components/card/BookingCard";
import { TBookings } from "@/types/bookins";


const MyBookings = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { data, isLoading } = useGetMyBookingsQuery({});
    const bookings = data?.data || [];
    console.log(data)

    if (isLoading) return <Loading />;

    const activeBookings = bookings.filter((booking: TBookings) => booking?.isConfirmed !== "canceled");

    return (
        <div>
            <HelmetProvider>
                <Helmet>
                    <title>My Bookings - Nexus Reserve</title>
                </Helmet>
            </HelmetProvider>
            <div className="container mx-auto p-4">
                {activeBookings?.length > 0 && (
                    <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
                        My Bookings
                    </h1>
                )}
                <div className="space-y-12">
                    {activeBookings.length > 0 ? (
                        activeBookings.map((booking: TBookings) => (
                            <BookingCard key={booking?._id} booking={booking} />
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center min-h-screen">
                            <FaClipboardList className="text-6xl text-gray-400 mb-4" />
                            <p className="text-2xl font-semibold text-gray-700 text-center">
                                You have no bookings yet.!
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyBookings;
