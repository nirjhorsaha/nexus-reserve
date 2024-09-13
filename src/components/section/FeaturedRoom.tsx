import Section from "@/pages/Shared/Section";
import { useGetAllRoomsQuery } from "@/redux/features/room/roomApi";
import { TRoom } from "@/types/room";
import { TbBrandFeedly } from "react-icons/tb";
import { Card, Skeleton } from 'antd';
import RoomCard from "../card/RoomCard";
import ButtonLink from "../ui/buttonLink";

const FeaturedRoom = () => {
    const { data, isError, isLoading } = useGetAllRoomsQuery({});
    const rooms = data?.data?.result as TRoom[];

    if (isLoading) {
        return (
            <div className="max-w-7xl py-12 mx-auto px-8 md:px-0">
                <div className="max-w-7xl mx-auto">
                    <Section
                        icon={TbBrandFeedly}
                        title="Featured Rooms"
                        subtitle=""
                    />
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <Card key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
                                <Skeleton.Image className="w-full h-48" />
                                <Skeleton active>
                                    <Skeleton.Input style={{ width: '80%' }} className="mt-2" />
                                    <Skeleton.Input style={{ width: '60%' }} className="mt-2" />
                                    <Skeleton.Input style={{ width: '40%' }} className="mt-2" />
                                </Skeleton>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="max-w-7xl py-12 mx-auto px-8 md:px-0">
                <div className="max-w-7xl mx-auto ">
                    <Section
                        icon={TbBrandFeedly}
                        title="Featured Rooms"
                        subtitle="There was an error loading the rooms."
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl py-12 mx-auto px-8 md:px-0">
            <div className=" ">
                <Section
                    icon={TbBrandFeedly}
                    title="Featured Rooms"
                    subtitle="Explore our top-rated meeting rooms that offer exceptional comfort and facilities for your next event."
                />
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Array.isArray(rooms) ? (
                        rooms.slice(0, 6).map((room, index) => (
                            <div key={room?._id} data-aos="fade-up" data-aos-delay={index * 100}>
                                <RoomCard room={room} />
                            </div>))
                    ) : (
                        <p>No rooms available.</p>
                    )}
                </div>
            </div>
            <div className="mt-8 text-center" data-aos="fade-up" data-aos-delay='500'>
                <ButtonLink to="/meeting-room" text="See More"/>
            </div>
        </div>
    );
};

export default FeaturedRoom;
