import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ButtonLink from "@/components/ui/buttonLink";
import { useGetSingleRoomQuery } from "@/redux/features/room/roomApi";
import { TRoom } from "@/types";
import { FireOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GridLoader from "react-spinners/GridLoader";

const RoomDetails = () => {
    const [imageIndex, setImageIndex] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { id } = useParams();
    const { data, error, isLoading } = useGetSingleRoomQuery(id as string);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <GridLoader color="#2563eb" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto p-4 text-center text-red-500">
                <p>Something went wrong. Please try again later.</p>
            </div>
        );
    }

    const { name, pricePerSlot, amenities, roomNo, floorNo, images, capacity } = data?.data as TRoom || [];

    const breadcrumbs = [
        { name: 'Home', path: '/' },
        { name: 'Rooms', path: '/meeting-room' },
        { name: name || 'Room Details', path: `/rooms/${id}` },
    ]

    return (
        <div className="py-6">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                <Breadcrumbs breadcrumbs={breadcrumbs} />
                <div className="flex flex-col md:flex-row -mx-4 relative">
                    <div className="md:flex-1 px-4 ">
                        <ButtonLink
                            to="/user/bookings"
                            text="Book Now"
                            className="absolute top-4 right-4"
                        />
                        <div className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center">
                            {images[imageIndex] ? (
                                <img
                                    src={images[imageIndex]}
                                    alt={`Room Image ${imageIndex + 1}`}
                                    className="h-full w-full object-cover rounded-lg"
                                />
                            ) : (
                                <span className="text-5xl text-gray-400">No Image</span>
                            )}
                        </div>

                        <div className="flex -mx-2 mb-4">
                            {images.map((imgUrl, i) => (
                                <div key={i} className="flex-1 px-2">
                                    <button
                                        onClick={() => setImageIndex(i)}
                                        className={`focus:outline-none w-full rounded-lg h-24 md:h-32 bg-gray-100 flex items-center justify-center ${imageIndex === i ? 'ring-2 ring-indigo-300 ring-inset' : ''
                                            }`}
                                    >
                                        <img
                                            src={imgUrl}
                                            alt={`Room Thumbnail ${i + 1}`}
                                            className="h-full w-full object-cover rounded-lg"
                                            loading="lazy"
                                        />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="md:flex-1 px-4">
                        <h2 className="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">{name}</h2>
                        <p className="text-gray-500 text-sm">By <span className="text-blue-600 hover:underline">Nexus Reserve</span></p>

                        <div className="flex items-center space-x-4 my-4">
                            <div>
                                <div className="rounded-lg bg-gray-100 flex py-2 px-3">
                                    <span className="font-bold text-blue-600 text-3xl">${pricePerSlot}</span>
                                    <span className=" ml-1 mt-1">Per Slot</span>
                                </div>
                            </div>
                            <div className="flex-1">
                                <p className="text-blue-900 text-xl font-semibold">Save 12%</p>
                                <p className="text-gray-400 text-sm">Inclusive of all Taxes.</p>
                            </div>
                        </div>

                        <div className="mt-4">
                            <p className="text-gray-800 font-semibold text-xl">Room Details</p>
                            <p className="text-gray-500">A modern, adaptable space designed for any occasion—whether it's a team meeting, client presentation, or private discussion. Equipped with essential amenities and a professional ambiance, this room offers the perfect setting for productive and seamless gatherings.</p>
                            <div className="mt-2 flex flex-col sm:flex-row sm:space-x-8 space-y-2 sm:space-y-0">
                                <div className="flex-1">
                                    <p className="text-gray-600 bg-zinc-200 inline-block p-2 rounded-lg"><strong>Room Number:</strong> {roomNo}</p>
                                </div>
                                <div className="flex-1">
                                    <p className="text-gray-600 bg-zinc-200 inline-block p-2 rounded-lg"><strong>Floor Number:</strong> {floorNo}</p>
                                </div>
                                <div className="flex-1">
                                    <p className="text-gray-600 bg-zinc-200 inline-block p-2 rounded-lg"><strong>Capacity:</strong> {capacity} People</p>
                                </div>
                            </div>
                        </div>


                        <div className="mt-2">
                            <p className="text-gray-800 font-semibold text-xl">Amenities</p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 ">
                                {amenities.length > 0 ? (
                                    amenities.map((amenity, index) => (
                                        <div key={index} className="flex items-center space-x-2">
                                            <div className="text-indigo-600 text-xl">
                                                <FireOutlined className="text-blue-600" />
                                            </div>
                                            <span className="text-gray-600">{amenity}</span>
                                        </div>
                                    ))
                                ) : (
                                    <p>No amenities listed.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomDetails;
