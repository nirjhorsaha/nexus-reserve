import React, { useEffect } from 'react';
import { Steps } from 'antd';
import { CalendarOutlined, ClockCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS CSS

const { Step } = Steps;

const steps = [
    {
        title: 'Select a Room',
        description: 'Browse our available rooms and choose the one that suits your needs.',
        icon: <CalendarOutlined className="text-blue-600 text-2xl" />,
    },
    {
        title: 'Choose Date & Time',
        description: 'Pick a convenient date and time for your booking from our calendar.',
        icon: <ClockCircleOutlined className="text-green-600 text-2xl" />,
    },
    {
        title: 'Confirm Booking',
        description: 'Review your selections and confirm your booking to finalize the process.',
        icon: <CheckCircleOutlined className="text-yellow-600 text-2xl" />,
    },
];

const BookingSteps: React.FC = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    const stepTitleStyle = { fontFamily: 'Nunito' };

    return (
        <section className="py-12  max-w-7xl mx-auto">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="text-center mb-6">
                    <h2 className="text-4xl font-semibold text-blue-600 mb-1 tracking-wide">How does it work?</h2>
                    <div className="flex items-center">
                        <h3 className="text-lg mx-auto font-medium text-gray-600">Follow these simple steps to book your room with ease.</h3>
                    </div>
                </div>
                <div className="relative md:mt-12 lg:mt-20">
                    <div className="relative hidden md:block">
                        <div className="absolute inset-x-0 hidden xl:px-44 top-2 md:block md:px-20 lg:px-28">
                            <img
                                className="w-full"
                                src="https://cdn.rareblocks.xyz/collection/celebration/images/steps/2/curved-dotted-line.svg"
                                alt=""
                            />
                        </div>
                    </div>

                    {/* Use Steps component for small devices */}
                    <div className="block md:hidden">
                        <Steps current={0} direction="vertical" className="px-4">
                            {steps.map((step, index) => (
                                <Step
                                    key={index}
                                    title={<span style={stepTitleStyle}>{step.title}</span>}
                                    description={<span style={stepTitleStyle}>{step.description}</span>}
                                    icon={step?.icon}
                                    className="step-item"
                                    data-aos="fade-up"
                                    data-aos-delay={`${index * 200}`}
                                />
                            ))}
                        </Steps>
                    </div>

                    {/* Grid layout for larger devices */}
                    <div className="relative hidden md:grid grid-cols-1 text-center gap-y-6 md:grid-cols-3 gap-x-12">
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className="text-center"
                        
                            >
                                <div className="hidden sm:flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                                    <span className="text-xl font-semibold text-gray-700 hidden sm:block">{index + 1}</span>
                                </div>
                                <div className="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">
                                    {step.icon}
                                    <h3 className="mt-2">{step.title}</h3>
                                </div>
                                <p className="mt-4 text-base text-gray-600">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BookingSteps;
