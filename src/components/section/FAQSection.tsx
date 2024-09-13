import { useState, useEffect } from 'react';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import Section from '@/pages/Shared/Section';
import { RiQuestionnaireLine } from "react-icons/ri";
import { faqItems } from '@/data/FAQItems';
import { motion } from 'framer-motion';

const FAQSection = () => {
    const [openAccordion, setOpenAccordion] = useState(faqItems[0].id);
    const [inViewItems, setInViewItems] = useState<Set<string>>(new Set());

    // Toggle accordion item
    const toggleAccordion = (id: string) => {
        setOpenAccordion(openAccordion === id ? '' : id);
    };

    // Animation control for each FAQ item
    const handleScroll = () => {
        const elements = document.querySelectorAll('.accordion');
        const newInViewItems = new Set<string>();
        elements.forEach((element) => {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const id = element.getAttribute('data-id');
            if (rect.top <= windowHeight && rect.bottom >= 0) {
                newInViewItems.add(id || '');
            }
        });
        setInViewItems(newInViewItems);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Trigger scroll handler on component mount

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div>
            <div className="py-12 max-w-7xl mx-auto px-8 md:px-0">
                <Section
                    title='Frequently asked questions'
                    subtitle='Find answers to the most common questions we receive.'
                    icon={RiQuestionnaireLine}
                />
                <div className="accordion-group">
                    {faqItems.map((item) => (
                        <motion.div
                            key={item?.id}
                            data-id={item?.id}
                            className={`accordion border border-solid border-gray-300 p-4 rounded-xl 
                                ${openAccordion === item?.id ? 'bg-indigo-50 border-indigo-600' : ''} mb-4 lg:p-4`}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: inViewItems.has(item?.id) ? 1 : 0, y: inViewItems.has(item?.id) ? 0 : 50 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            layout
                        >
                            <button
                                className="accordion-toggle group inline-flex items-center justify-between text-left text-lg font-normal leading-8 
                                text-gray-900 w-full"
                                aria-controls={`collapse-${item?.id}`}
                                onClick={() => toggleAccordion(item?.id)}
                            >
                                <h5 className='text-xl'>{item?.question}</h5>
                                {openAccordion === item?.id ? (
                                    <MinusOutlined className="w-6 h-6 text-gray-900" />
                                ) : (
                                    <PlusOutlined className="w-6 h-6 text-gray-900" />
                                )}
                            </button>
                            <motion.div
                                id={`collapse-${item?.id}`}
                                className="w-full overflow-hidden"
                                initial={{ height: 0 }}
                                animate={{ height: openAccordion === item?.id ? 'auto' : 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                aria-labelledby={item?.id}
                                layout
                            >
                                <p className="text-gray-900 leading-6">
                                    {item?.answer}
                                </p>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQSection;
