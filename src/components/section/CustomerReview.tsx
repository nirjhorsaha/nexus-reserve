import React, { useEffect } from 'react';
import { Carousel, Rate } from 'antd';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { GoCodeReview } from "react-icons/go";
import Section from '@/pages/Shared/Section';
import '../styles/CustomerReview.css';
import reviewsData from '../../data/CustomerReviews.json'

const CustomerReview: React.FC = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
      <div className="max-w-7xl mx-auto py-12">
        <Section
          icon={GoCodeReview}
          title="Customer Reviews"
          subtitle="See what our customers are saying about us!"
        />
        <Carousel autoplay dotPosition="bottom" effect="fade">
          {reviewsData.map((review) => (
            <div key={review?.id} className="carousel-slide bg-gray-50 shadow-lg rounded-lg overflow-hidden">
              <div className="p-6 flex items-center">
                <img src={review.image} alt={review?.name} className="w-16 h-16 rounded-full border-2 border-gray-300 mr-4" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">{review?.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{review?.role}</p>
                  <Rate allowHalf disabled defaultValue={review?.rating} />
                </div>
              </div>
              <div className="p-6 border-t border-gray-200">
                <p className="text-gray-700 text-base italic">"{review?.text}"</p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
  );
};

export default CustomerReview;
