import { useState } from 'react';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'; 
import Section from '@/pages/Shared/Section';
import { RiQuestionnaireLine } from "react-icons/ri";
import { faqItems } from '@/data/FAQItems';

const FAQSection = () => {
    // Initialize state with the ID of the first item open by default
    const [openAccordion, setOpenAccordion] = useState(faqItems[0].id);

    const toggleAccordion = (id: string) => {
        setOpenAccordion(openAccordion === id ? '' : id);
    };

    return (
        <div>
            <div className="bg-white py-12 max-w-7xl mx-auto">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Section
                        title='Frequently asked questions'
                        subtitle='Find answers to the most common questions we receive. If you have any other inquiries, feel free to contact us.'
                        icon={RiQuestionnaireLine}
                    />
                    <div className="accordion-group" data-accordion="default-accordion">
                        {faqItems.map((item) => (
                            <div
                                key={item?.id}
                                className={`accordion border border-solid border-gray-300 p-4 rounded-xl transition duration-500 ${
                                    openAccordion === item?.id ? 'bg-indigo-50 border-indigo-600' : ''
                                } mb-4 md:mb-8 lg:p-4`}
                            >
                                <button
                                    className="accordion-toggle group inline-flex items-center justify-between text-left text-lg font-normal leading-8 text-gray-900 w-full transition duration-500 hover:text-indigo-600"
                                    aria-controls={`collapse-${item?.id}`}
                                    onClick={() => toggleAccordion(item?.id)}
                                >
                                    <h5 className='text-xl'>{item?.question}</h5>
                                    {openAccordion === item?.id ? (
                                        <MinusOutlined className="w-6 h-6 text-gray-900 transition duration-500 group-hover:text-indigo-600" />
                                    ) : (
                                        <PlusOutlined className="w-6 h-6 text-gray-900 transition duration-500 group-hover:text-indigo-600" />
                                    )}
                                </button>
                                <div
                                    id={`collapse-${item?.id}`}
                                    className={`w-full overflow-hidden pr-4 ${
                                        openAccordion === item?.id ? 'max-h-[250px]' : 'max-h-0'
                                    } transition-max-height duration-500`}
                                    aria-labelledby={item?.id}
                                >
                                    <p className=" text-gray-900  leading-6">
                                        {item?.answer}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQSection;
