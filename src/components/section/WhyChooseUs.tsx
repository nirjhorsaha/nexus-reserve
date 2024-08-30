import React, { useEffect } from 'react';
import { CheckCircleOutlined, SecurityScanOutlined, CustomerServiceOutlined, AppstoreOutlined } from '@ant-design/icons';
import Section from '@/pages/Shared/Section';
import { MdOutlineQuestionAnswer } from 'react-icons/md';
import AOS from 'aos';
import 'aos/dist/aos.css';

const features = [
    {
        title: 'Seamless Booking Experience',
        description: 'Experience a smooth and easy booking process with our user-friendly interface.',
        icon: <CheckCircleOutlined className="text-blue-600 text-4xl" />,
        aos: 'fade-up',
    },
    {
        title: 'Secure Transactions',
        description: 'Your transactions are safeguarded with advanced security protocols.',
        icon: <SecurityScanOutlined className="text-green-600 text-4xl" />,
        aos: 'fade-up',
    },
    {
        title: '24/7 Customer Support',
        description: 'We’re here to assist you anytime, with round-the-clock customer service.',
        icon: <CustomerServiceOutlined className="text-yellow-600 text-4xl" />,
        aos: 'fade-up',
    },
    {
        title: 'Wide Range of Options',
        description: 'Explore a variety of services tailored to meet all your needs.',
        icon: <AppstoreOutlined className="text-purple-600 text-4xl" />,
        aos: 'fade-up',
    },
];

const WhyChooseUs: React.FC = () => {

    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <Section
                    icon={MdOutlineQuestionAnswer}
                    title="Why Choose Us?"
                    subtitle="We offer a range of benefits to ensure the best experience for our customers"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-150"
                            data-aos={feature.aos}
                            data-aos-delay={index * 100} // Staggered delay
                        >
                            <div className="flex items-center justify-center mb-4">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
