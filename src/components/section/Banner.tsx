import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { RightOutlined } from '@ant-design/icons';

type ImageCardProps = {
    src: string;
    alt: string;
};

const ImageCard = ({ src, alt }: ImageCardProps) => (
    <div className="relative snap-start scroll-ml-6 shrink-0 last:pr-6">
        <div className="relative flex flex-col overflow-hidden transition-all duration-200 transform shadow w-60 md:w-80 group rounded-xl 
        hover:shadow-lg hover:-translate-y-1">
            <a href="#" title="" className="flex shrink-0 aspect-w-4 aspect-h-3">
                <img
                    className="object-cover w-full h-full transition-all duration-200 transform group-hover:scale-110"
                    src={src}
                    alt={alt}
                    loading="lazy"
                />
            </a>
        </div>
    </div>
);

const Banner = () => {
    const scrollRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const scrollElement = scrollRef.current;
        if (!scrollElement) return;

        let scrollPosition = 0;
        const scrollWidth = scrollElement.scrollWidth;
        // const containerWidth = scrollElement.clientWidth;

        const scrollContent = () => {
            if (scrollPosition >= scrollWidth) {
                // Reset the scroll position to the start for continuous effect
                scrollElement.scrollLeft = 0;
                scrollPosition = 0;
            } else {
                scrollElement.scrollLeft = scrollPosition;
                scrollPosition += 1; 
            }
        };

        // Set interval for continuous scrolling
        const interval = setInterval(scrollContent, 5); 

        return () => clearInterval(interval); 
    }, []);

    return (
        <section className="bg-blue-50 mx-auto max-w-7xl relative text-center px-8 md:px-0 mt-4 rounded-xl">
            <div className="relative z-10 py-12 sm:py-16 lg:max-w-7xl lg:mx-auto lg:py-20 xl:py-28 lg:grid lg:grid-cols-2">
                <div className="">
                    <div className="lg:text-left lg:ml-14">
                        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
                            Book Your Ideal Meeting Room with Ease.
                        </h1>
                        <p className="text-base font-normal leading-7 text-gray-900">
                            Efficient, hassle-free room booking for all your meeting needs.
                        </p>
                        <Link
                            to="/meeting-room"
                            className="inline-flex items-center justify-center py-3 px-7 text-base font-semibold text-center text-white rounded-xl 
                            bg-blue-600 shadow-xs hover:bg-blue-700 transition-all duration-500 relative z-10"
                        >
                            Book Now
                            <RightOutlined className="ml-2 text-white" />
                        </Link>
                        {/* Stats Section */}
                        <div className="my-6 lg:mt-10 w-full md:w-2/3 md:mx-auto lg:ml-0">
                            <div className="flex justify-around md:gap-14 ">
                                <div className="flex flex-col items-center ">
                                    <span className="text-3xl md:text-4xl font-bold text-blue-600">50+</span>
                                    <span className="text-base text-gray-700">Rooms</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="text-3xl md:text-4xl font-bold text-blue-600">200+</span>
                                    <span className="text-base text-gray-700">Bookings</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="text-3xl md:text-4xl font-bold text-blue-600">24/7</span>
                                    <span className="text-base text-gray-700">Support</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pb-8 lg:absolute lg:inset-0 lg:pb-0">
                    <div className="flex flex-col items-center justify-center lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                        <div
                            ref={scrollRef}
                            className="flex justify-start w-full gap-3 py-6 overflow-hidden snap-x whitespace-nowrap scroll-smooth"
                        >
                            {/* Image Cards */}
                            <ImageCard
                                src="https://i.ibb.co.com/Cn9dqph/banner-room-2.jpg"
                                alt="Business executives doing video conference"
                            />
                            <ImageCard
                                src="https://i.ibb.co.com/0ZG3gYL/banner-room-1.jpg"
                                alt="People taking part in a business event"
                            />
                            <ImageCard
                                src="https://i.ibb.co.com/9qHZ0cQ/banner-room-3.jpg"
                                alt="Workplace violence among colleagues"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;
