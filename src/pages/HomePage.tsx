import CustomerReview from "@/components/section/CustomerReview";
import Hero from "@/components/section/Hero";
import Service from "@/components/section/Service";
import { Helmet } from "react-helmet";
import WhyChooseUs from "@/components/section/WhyChooseUs";
import BookingSteps from "@/components/section/BookingSteps";
import FeaturedRoom from "@/components/section/FeaturedRoom";
// import FeaturedProduct from "@/components/section/FeaturedProduct";

const HomePage = () => {
  return (
    <div>
      <Helmet>
        <title>Home - Nexus Reserve</title>
      </Helmet>
      <Hero />
      <Service />
      <FeaturedRoom/>
      <CustomerReview />
      <BookingSteps/>
      <WhyChooseUs/>
    </div>
  );
};

export default HomePage;