import WhyChooseMechanicalKeyboards from "@/components/section/WhyChooseMechanicalKeyboards";
import CustomerReview from "@/components/section/CustomerReview";
import FeaturedBrand from "@/components/section/FeaturedBrand";
import Hero from "@/components/section/Hero";
import Service from "@/components/section/Service";
import { Helmet } from "react-helmet";
import FeaturedProduct from "@/components/section/FeaturedProduct";

const HomePage = () => {
  return (
    <div>
      <Helmet>
        <title>Home - Nexus Reserve</title>
      </Helmet>
      <Hero />
      <Service />
      <FeaturedProduct />
      <FeaturedBrand />
      <CustomerReview />
      <WhyChooseMechanicalKeyboards />
    </div>
  );
};

export default HomePage;