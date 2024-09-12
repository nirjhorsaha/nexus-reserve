import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTopButton: React.FC = () => {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        // console.log('Scroll to Top Button Clicked');
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-4 right-4 p-2 bg-blue-500 text-white rounded-full shadow-lg transition-opacity duration-300 ${showButton ? 'opacity-100' : 'opacity-0'
                } sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 lg:bottom-10 lg:right-10`}
            aria-label="Scroll to top"
        >
            <FaArrowUp />
        </button>
    );
};

export default ScrollToTopButton;
