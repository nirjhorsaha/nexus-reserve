import Cashback from '../../assets/service/Cashback.png';
import FreeShipping from '../../assets/service/FreeShipping.png';
import Payment from '../../assets/service/Payment.png';
import Support from '../../assets/service/Support.png';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { useEffect, useMemo } from 'react';

const Service = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const services = useMemo(() => [
    {
      id: 1,
      name: 'Free Shipping',
      description: 'Enjoy free shipping on all orders, no minimum purchase required.',
      image: FreeShipping
    },
    {
      id: 2,
      name: 'Quick Payment',
      description: 'Hassle-free checkout with quick payment options.',
      image: Payment
    },
    {
      id: 3,
      name: 'Big Cashback',
      description: 'Earn big cashback rewards on your purchases.',
      image: Cashback
    },
    {
      id: 4,
      name: '24/7 Support',
      description: 'Need assistance? Our dedicated support team is available around the clock to help.',
      image: Support
    },
  ], []);

  return (
    <div className="bg-white py-12 max-w-7xl mx-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-4xl font-semibold text-blue-600 mb-1 tracking-wide">Our Services</h2>
          <div className="flex items-center">
            <hr className="flex-grow border-t-2 border-gray-300" />
            <h3 className="mx-4 text-lg font-medium text-gray-600">Discover the range of services we offer to meet your needs!</h3>
            <hr className="flex-grow border-t-2 border-gray-300" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
          {services.map(service => (
            <div 
              key={service.id} 
              className="flex flex-col items-center justify-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300" 
              data-aos="zoom-in"
            >
              <img 
                className="w-full h-auto mb-2 object-contain md:w-48 md:h-20" 
                src={service.image} 
                alt={service.name} 
              />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Service;
