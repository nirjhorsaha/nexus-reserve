import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import mKeyboard1 from '../../assets/carousel/keyboard-1.jpg';
import mKeyboard2 from '../../assets/carousel/keyboard-2.jpg';
import mKeyboard3 from '../../assets/carousel/keyboard-3.jpg';
import mKeyboard4 from '../../assets/carousel/keyboard-4.jpg';

const images = [mKeyboard1, mKeyboard2, mKeyboard3, mKeyboard4]; // Array of images for the carousel

const Hero = () => {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
        dynamicBullets: true,
      }}
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper relative rounded-xl"
    >
      {images.map((src, index) => (
        <SwiperSlide key={index} className="flex items-center justify-center text-center bg-white">
          <img 
            src={src} 
            alt={`Mechanical keyboard ${index + 1}`} 
            className="block w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[650px] object-cover" 
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Hero;
