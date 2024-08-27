import React, { useEffect } from 'react';
import { Carousel, Rate } from 'antd';
import AOS from 'aos';
import 'aos/dist/aos.css';
import reviewsData from '../../data/reviews.json';
import { GoCodeReview } from "react-icons/go";
import Section from '@/pages/Shared/Section';

const CustomerReview: React.FC = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Section
          icon={GoCodeReview}
          title="Customer Reviews"
          subtitle="See what our customers are saying about us!"
        />
        <Carousel autoplay>
          {reviewsData.map((review) => (
            <div key={review?.id} className="bg-gray-100 p-8 rounded-lg">
              <div className="flex items-center mb-4 ">
                <img src={review.image} alt={review?.name} className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{review?.name}</h3>
                  <Rate allowHalf defaultValue={review?.rating} />
                </div>
              </div>
              <p className="text-gray-600">{review?.text}</p>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default CustomerReview;
