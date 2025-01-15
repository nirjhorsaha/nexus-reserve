import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ButtonLink from "@/components/ui/buttonLink";
import ErrorComponent from "@/components/ui/ErrorComponent";
import Loading from "@/components/ui/loading";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetSingleRoomQuery } from "@/redux/features/room/roomApi";
import { TRoom } from "@/types";
import { FireOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { MdOutlineStar, MdOutlineStarHalf, MdOutlineStarBorder } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";


const RoomDetails = () => {
    const [imageIndex, setImageIndex] = useState(0);


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { id } = useParams();
    const { data, error, isLoading } = useGetSingleRoomQuery(id as string);
    const { _id } = data?.data || []
    const user = useSelector(selectCurrentUser);

    if (isLoading) return <Loading />;

    if (error) {
        return (
            <ErrorComponent message="Something went wrong. Please try again later." />
        );
    }

    const { name, pricePerSlot, amenities, roomNo, floorNo, images, capacity } = data?.data as TRoom || [];

    const breadcrumbs = [
        { name: 'Home', path: '/' },
        { name: 'Rooms', path: '/meeting-room' },
        { name: name || 'Room Details', path: `/${user?.role}/rooms/${id}` },
    ];

    return (
        <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 mt-6">
                <Breadcrumbs breadcrumbs={breadcrumbs} />
                <div className="flex flex-col lg:flex-row -mx-4 relative border md:border-2 rounded-xl md:p-6 md:gap-x-4 lg:gap-x-6">
                    <div className="lg:flex-1 p-4 md:p-0">
                        <div className="h-64 md:h-80 rounded-lg= bg-gray-100 mb-4 flex items-center justify-center">
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
                                        className={`focus:outline-none w-full rounded-lg h-24 md:h-32 bg-gray-100 flex items-center justify-center ${imageIndex === i ? 'ring-2 ring-indigo-300 ring-inset' : ''}`}
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

                    <div className="lg:flex-1 p-4 md:p-0">
                        {/* button for large device */}
                        <div className="hidden lg:block absolute top-8 right-4 z-10">
                            <ButtonLink
                                to={
                                    user?.role === 'user'
                                        ? `/${user?.role}/bookings/${_id}`
                                        : `/login?redirect=/user/bookings/${_id}`
                                }
                                text="Book Now"
                                className="w-full"
                            />

                        </div>
                        <h2 className="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">{name}</h2>
                        <p className="text-gray-500 text-sm">By <span className="text-blue-600 hover:underline">Nexus Reserve</span></p>

                        <div className="flex items-center space-x-4 my-4">
                            <div>
                                <div className="rounded-lg bg-gray-100 flex py-2 px-3">
                                    <span className="font-bold text-blue-600 text-3xl">${pricePerSlot}</span>
                                    <span className="ml-1 mt-1">Per Slot</span>
                                </div>
                            </div>
                            <div className="flex-1">
                                <p className="text-blue-900 text-xl font-semibold mb-0">Save 12%</p>
                                <p className="text-gray-600 text-sm mb-0">Inclusive of all Taxes.</p>
                            </div>
                        </div>

                        <div className="mt-4">
                            <p className="text-gray-800 font-semibold text-xl">Room Details</p>
                            <p className="text-gray-500">A modern, adaptable space designed for any occasion whether it's a team meeting, client presentation, or private discussion. Equipped with essential amenities and a professional ambiance, this room offers the perfect setting for productive and seamless gatherings.</p>

                            <div className="mt-2 flex flex-col sm:flex-row sm:space-x-8 space-y-2 sm:space-y-0">
                                {[
                                    { label: 'Room Number', value: roomNo },
                                    { label: 'Floor Number', value: floorNo },
                                    { label: 'Capacity', value: `${capacity} People` },
                                ].map((detail, index) => (
                                    <div key={index} className="flex-1">
                                        <p className="text-gray-600 bg-zinc-100 inline-block p-2 rounded-lg">
                                            <strong>{detail?.label}:</strong> {detail?.value}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-2">
                            <p className="text-gray-800 font-semibold text-xl">Amenities</p>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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

                {/* book now button for small and medium device */}
                <div className="lg:hidden mt-6 flex items-center justify-center">
                    <ButtonLink
                        to={`/${user?.role}/bookings/${_id}`}
                        text="Book Now"
                        className="w-full text-center"
                    />
                </div>
            </div>

            <div className="pt-8 relative">
                <div className="w-full max-w-7xl px-4 mx-auto">
                    <div className="">
                        <h2 className="font-manrope font-bold text-3xl sm:text-4xl leading-10 text-black mb-8 ">
                            Customer reviews &
                            rating</h2>
                        <div className="grid grid-cols-12 mb-11">

                            <div className="col-span-12 xl:col-span-4 flex items-center">
                                <div className="box flex flex-col gap-y-4 w-full max-xl:max-w-3xl mx-auto">
                                    <div className="flex items-center w-full">
                                        <p className="font-medium text-lg py-[1px] text-black m-0">5</p>
                                        <MdOutlineStar className="text-amber-400 size-6 mr-4" />
                                        <p className="h-2 w-full sm:min-w-[278px] rounded-[30px] bg-gray-200 m-0">
                                            <span className="h-full w-[30%] rounded-[30px] bg-blue-600 flex"></span>
                                        </p>
                                        <p className="font-medium text-lg py-[1px] text-black m-0 pl-2">30</p>
                                    </div>
                                    <div className="flex items-center w-full">
                                        <p className="font-medium text-lg py-[1px] text-black m-0">4</p>
                                        <MdOutlineStar className="text-amber-400 size-6 mr-4" />
                                        <p className="h-2 w-full sm:min-w-[278px] rounded-[30px] bg-gray-200 m-0">
                                            <span className="h-full w-[40%] rounded-[30px] bg-blue-600 flex"></span>
                                        </p>
                                        <p className="font-medium text-lg py-[1px] text-black m-0 pl-2">40</p>
                                    </div>
                                    <div className="flex items-center w-full">
                                        <p className="font-medium text-lg py-[1px] text-black m-0">3</p>
                                        <MdOutlineStar className="text-amber-400 size-6 mr-4" />
                                        <p className="h-2 w-full sm:min-w-[278px] rounded-[30px] bg-gray-200 m-0">
                                            <span className="h-full w-[20%] rounded-[30px] bg-blue-600 flex"></span>
                                        </p>
                                        <p className="font-medium text-lg py-[1px] text-black m-0 pl-2">20</p>
                                    </div>
                                    <div className="flex items-center w-full">
                                        <p className="font-medium text-lg py-[1px] text-black m-0">2</p>
                                        <MdOutlineStar className="text-amber-400 size-6 mr-4" />
                                        <p className="h-2 w-full sm:min-w-[278px] rounded-[30px] bg-gray-200 m-0">
                                            <span className="h-full w-[16%] rounded-[30px] bg-blue-600 flex"></span>
                                        </p>
                                        <p className="font-medium text-lg py-[1px] text-black m-0 pl-2">16</p>
                                    </div>
                                    <div className="flex items-center w-full">
                                        <p className="font-medium text-lg py-[1px] text-black m-0">1</p>
                                        <MdOutlineStar className="text-amber-400 size-6 mr-4" />

                                        <p className="h-2 w-full sm:min-w-[278px] rounded-[30px] bg-gray-200 m-0">
                                            <span className="h-full w-[8%] rounded-[30px] bg-blue-600 flex"></span>
                                        </p>
                                        <p className="font-medium text-lg py-[1px] text-black m-0 pl-2">8</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 max-xl:mt-8 xl:col-span-8 xl:pl-8 w-full min-h-[230px]">
                                <div
                                    className="grid grid-cols-2 h-full px-8 max-lg:py-8 rounded-3xl bg-gray-100 w-full max-xl:max-w-3xl max-xl:mx-auto">
                                    <div className="col-span-12 md:col-span-8 flex items-center">
                                        <div className="flex flex-col sm:flex-row items-center max-lg:justify-center w-full h-full">
                                            <div
                                                className="sm:pr-3 sm:border-r border-gray-200 flex items-center justify-center flex-col">
                                                <h2 className="font-bold text-5xl text-black text-center mb-4">4.3</h2>
                                                <div className="flex items-center gap-2 mb-4">
                                                    <MdOutlineStar className="text-amber-400 size-11" />
                                                    <MdOutlineStar className="text-amber-400 size-11" />
                                                    <MdOutlineStar className="text-amber-400 size-11" />
                                                    <MdOutlineStar className="text-amber-400 size-11" />
                                                    <MdOutlineStar className="text-amber-400 size-11" />
                                                </div>
                                                <p className="font-normal text-lg leading-8 text-gray-400">46 Ratings</p>
                                            </div>

                                            <div className="flex items-center flex-col justify-center w-full md:w-[50%] h-full  mx-auto">
                                                <button
                                                    className="rounded-full px-4 py-3 bg-indigo-600 font-semibold text-lg whitespace-nowrap mb-6 w-full text-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-700 hover:shadow-indigo-400 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">Write A Review</button>
                                                <button
                                                    className="rounded-full px-4 py-3 bg-white font-semibold text-lg text-blue-600 whitespace-nowrap w-full text-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-100 hover:shadow-blue-200">See
                                                    All Reviews</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pb-8 border-b border-gray-200 max-xl:max-w-3xl max-xl:mx-auto">
                            <h4 className="font-manrope font-semibold text-3xl leading-10 text-black mb-6">Most helpful positive review</h4>
                            <div className="flex sm:items-center flex-col sm:flex-row justify-between  mb-4">
                                <div className="flex items-center my-auto gap-3">
                                    <h6 className="font-semibold text-lg leading-8 text-black m-0">Emily Cooper</h6>
                                    <p className="font-medium text-base leading-7 text-gray-400 m-0">Nov 01, 2023</p>
                                </div>
                                <div className="flex items-center gap-1">
                                    <MdOutlineStar className="text-amber-400 size-8" />
                                    <MdOutlineStar className="text-amber-400 size-8" />
                                    <MdOutlineStar className="text-amber-400 size-8" />
                                    <MdOutlineStar className="text-amber-400 size-8" />
                                    <MdOutlineStarHalf className="text-amber-400 size-8" />
                                </div>
                            </div>
                            <p className="font-normal text-lg leading-8 text-gray-500 ">
                                The room was spacious and well-equipped. It was perfect for our team meeting! The setup was seamless, and we had everything we needed for a productive day.
                            </p>
                            <div className="flex sm:items-center flex-col sm:flex-row justify-between  mb-4">
                                <div className="flex items-center my-auto gap-3">
                                    <h6 className="font-semibold text-lg leading-8 text-black m-0">Michael Scott</h6>
                                    <p className="font-medium text-base leading-7 text-gray-400 m-0">June 5, 2023"</p>
                                </div>
                                <div className="flex items-center gap-1">
                                    <MdOutlineStar className="text-amber-400 size-8" />
                                    <MdOutlineStar className="text-amber-400 size-8" />
                                    <MdOutlineStar className="text-amber-400 size-8" />
                                    <MdOutlineStar className="text-amber-400 size-8" />
                                    <MdOutlineStarBorder className="text-amber-400 size-8" />
                                </div>
                            </div>
                            <p className="font-normal text-lg leading-8 text-gray-500 ">
                                Good experience, but the Wi-Fi was a bit slow. It could be improved for better connectivity during work sessions, but the location and amenities were still impressive.
                            </p>
                        </div>
                        <div
                            className="flex flex-col sm:flex-row items-center justify-end pt-8  max-xl:max-w-3xl max-xl:mx-auto">
                            <form>
                                <div className="flex">
                                    <div className="relative ">
                                        <div className=" absolute -left-0 px-2 top-0 py-2">
                                            <p className="font-normal text-lg leading-8 text-gray-500">Sort by:</p>
                                        </div>
                                        <input type="text"
                                            className="block w-60 h-11 pr-4 pl-20 py-2.5 text-lg leading-8 font-medium rounded-full cursor-pointer shadow-xs text-black bg-transparent placeholder-black focus:outline-gray-200 "
                                            placeholder="Most Relevant" />
                                        <div id="dropdown-button" data-target="dropdown"
                                            className="dropdown-toggle flex-shrink-0 cursor-pointer z-10 inline-flex items-center py-2.5 px-4 text-base font-medium text-center text-gray-900 bg-transparent absolute right-0 top-2 "
                                        ><IoIosArrowDown />
                                        </div>
                                        <div id="dropdown"
                                            className="absolute top-9 right-0 z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200"
                                                aria-labelledby="dropdown-button">
                                                <li>
                                                    <a href="#"
                                                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Most Relevant</a>
                                                </li>
                                                <li>
                                                    <a href="#"
                                                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">last week</a>
                                                </li>
                                                <li>
                                                    <a href="#"
                                                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">oldest</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomDetails;


