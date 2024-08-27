import React, { useState, useEffect } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { MdOutlineQuestionAnswer } from "react-icons/md";
import Section from '@/pages/Shared/Section';


const WhyChooseMechanicalKeyboards: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    AOS.init();
  }, []);

  // Toggle the collapse of a section based on index
  const toggleCollapse = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Section
          icon={MdOutlineQuestionAnswer}
          title="Why Choose Mechanical Keyboards?"
          subtitle="Discover the benefits of using mechanical keyboards"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4 transition duration-300 ease-in-out hover:shadow-md" data-aos="fade-up" data-aos-delay="100">
              <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleCollapse(0)}>
                <h3 className="text-xl font-semibold text-gray-800">Durability and Longevity</h3>
                {openIndex === 0 ? <FiChevronUp className="text-gray-600 h-6 w-6" /> : <FiChevronDown className="text-gray-600 h-6 w-6" />}
              </div>
              {openIndex === 0 && (
                <p className="text-gray-600 mt-2">
                  Mechanical keyboards are known for their robustness and long lifespan, often lasting decades with proper maintenance.
                </p>
              )}
            </div>
            <div className="border border-gray-200 rounded-lg p-4 transition duration-300 ease-in-out hover:shadow-md" data-aos="fade-up" data-aos-delay="200">
              <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleCollapse(1)}>
                <h3 className="text-xl font-semibold text-gray-800">Typing Experience</h3>
                {openIndex === 1 ? <FiChevronUp className="text-gray-600 h-6 w-6" /> : <FiChevronDown className="text-gray-600 h-6 w-6" />}
              </div>
              {openIndex === 1 && (
                <p className="text-gray-600 mt-2">
                  Enjoy a tactile typing experience with mechanical switches, providing satisfying feedback and reduced typing fatigue.
                </p>
              )}
            </div>
          </div>
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4 transition duration-300 ease-in-out hover:shadow-md" data-aos="fade-up" data-aos-delay="300">
              <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleCollapse(2)}>
                <h3 className="text-xl font-semibold text-gray-800">Customization Options</h3>
                {openIndex === 2 ? <FiChevronUp className="text-gray-600 h-6 w-6" /> : <FiChevronDown className="text-gray-600 h-6 w-6" />}
              </div>
              {openIndex === 2 && (
                <p className="text-gray-600 mt-2">
                  Mechanical keyboards offer extensive customization possibilities, from key switches to keycaps, allowing users to tailor their typing experience and aesthetics.
                </p>
              )}
            </div>
            <div className="border border-gray-200 rounded-lg p-4 transition duration-300 ease-in-out hover:shadow-md" data-aos="fade-up" data-aos-delay="400">
              <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleCollapse(3)}>
                <h3 className="text-xl font-semibold text-gray-800">Typing Speed and Accuracy</h3>
                {openIndex === 3 ? <FiChevronUp className="text-gray-600 h-6 w-6" /> : <FiChevronDown className="text-gray-600 h-6 w-6" />}
              </div>
              {openIndex === 3 && (
                <p className="text-gray-600 mt-2">
                  Many users find that mechanical keyboards improve typing speed and accuracy due to distinct key actuation points and consistent key response.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseMechanicalKeyboards;
