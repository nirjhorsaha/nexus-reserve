import React from 'react';
import { CalendarOutlined, ClockCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';

const steps = [
    {
        title: 'Select a Room',
        description: 'Browse our available rooms and choose the one that suits your needs.',
        icon: <CalendarOutlined className="text-blue-600 text-2xl" />,
        number: '1',
    },
    {
        title: 'Choose Date & Time',
        description: 'Pick a convenient date and time for your booking from our calendar.',
        icon: <ClockCircleOutlined className="text-green-600 text-2xl" />,
        number: '2',
    },
    {
        title: 'Confirm Booking',
        description: 'Review your selections and confirm your booking to finalize the process.',
        icon: <CheckCircleOutlined className="text-yellow-600 text-2xl" />,
        number: '3',
    },
];

const BookingSteps: React.FC = () => {
    return (
        <section className="py-12 bg-white">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl font-bold leading-tight text-blue-600 sm:text-4xl lg:text-5xl">
                        How does it work?
                    </h2>
                    <p className="mt-4 text-lg font-medium leading-relaxed text-gray-600">
                        Follow these simple steps to book your room with ease.
                    </p>
                </div>

                <div className="relative mt-12 lg:mt-20">
                    <div className="absolute inset-x-0 hidden xl:px-44 top-2 md:block md:px-20 lg:px-28">
                        <img
                            className="w-full"
                            src="https://cdn.rareblocks.xyz/collection/celebration/images/steps/2/curved-dotted-line.svg"
                            alt=""
                        />
                    </div>

                    <div className="relative grid grid-cols-1 text-center gap-y-12 md:grid-cols-3 gap-x-12">
                        {steps.map((step, index) => (
                            <div key={index}>
                                <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                                    <span className="text-xl font-semibold text-gray-700">{step?.number}</span>
                                </div>
                                <div className="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">
                                    {step?.icon}
                                    <h3 className="mt-2">{step?.title}</h3>
                                </div>
                                <p className="mt-4 text-base text-gray-600">{step?.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BookingSteps;
