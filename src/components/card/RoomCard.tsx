import React from 'react';
import ButtonLink from '../ui/buttonLink';
import { TRoom } from '@/types';
import { useAppSelector } from '@/redux/hooks';
import { useCurrentToken } from '@/redux/features/auth/authSlice';
import { verifyToken } from '@/utils/verifyToken';
import { FaUsers } from 'react-icons/fa'; 

interface RoomCardProps {
    room?: TRoom;
}

const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
    const { images, name, capacity, pricePerSlot, _id } = room || {};

    const token = useAppSelector(useCurrentToken);

    let isUser;

    if (token) {
        isUser = verifyToken(token);
    }

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <img
                src={images?.[0] || 'https://via.placeholder.com/300'}
                alt={name}
                loading='lazy'
                className="w-full h-48 object-cover rounded-t-lg" />
            <div className="mt-2">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">{name}</h3>
                    <h3 className="font-semibold text-lg text-blue-600">{`$${pricePerSlot} per slot`}</h3>
                </div>
                <p className="text-gray-600 flex items-center mt-1">
                    <FaUsers className="h-4 w-5 text-gray-600 mr-1" />
                    {`Capacity: ${capacity}`}
                </p>
            </div>
            <ButtonLink
                key={_id}
                to={isUser?.role === 'user' ? `/${isUser?.role}/rooms/${_id}` : '/login'}
                text="See Details"
                className="block mt-4 text-center w-full"
            />
        </div>
    );
};

export default RoomCard;
