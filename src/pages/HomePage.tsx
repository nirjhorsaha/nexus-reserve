import CustomerReview from "@/components/section/CustomerReview";
import Hero from "@/components/section/Hero";
import Service from "@/components/section/Service";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import WhyChooseUs from "@/components/section/WhyChooseUs";
import BookingSteps from "@/components/section/BookingSteps";
import FeaturedRoom from "@/components/section/FeaturedRoom";
import { useEffect } from "react";
import FAQSection from "@/components/section/FAQSection";


const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>Home - Nexus Reserve</title>
        </Helmet>
      </HelmetProvider>
      <Hero />
      <Service />
      <FeaturedRoom />
      <CustomerReview />
      <BookingSteps />
      <FAQSection/>
      <WhyChooseUs />
    </div>
  );
};

export default HomePage;