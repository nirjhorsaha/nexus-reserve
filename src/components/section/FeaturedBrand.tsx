import React, { useEffect } from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { TbBrandFeedly } from "react-icons/tb";
import corsairLogo from '../../assets/brand-logo/Brand_Corsair_logo.png';
import razerLogo from '../../assets/brand-logo/Brand_Razer_logo.png';
import steelseriesLogo from '../../assets/brand-logo/Brand_Steelsseries-logo.png';
import logitechLogo from '../../assets/brand-logo/Brand_Logitech_logo.png';
import keychronLogo from '../../assets/brand-logo/Brand_Keychron_logo.png';
import Section from '@/pages/Shared/Section';

interface Brand {
  id: number;
  title: string;
  logo: string;
}

// Sample data for featured brands
const featuredBrandsData: Brand[] = [
  { id: 1, title: "Corsair", logo: corsairLogo },
  { id: 2, title: "Razer", logo: razerLogo },
  { id: 3, title: "Ducky", logo: steelseriesLogo },
  { id: 4, title: "Logitech", logo: logitechLogo },
  { id: 5, title: "Keychron", logo: keychronLogo }
];

const FeaturedBrandsBanner: React.FC = () => {

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Section
          icon={TbBrandFeedly}
          title="Top Brands"
          subtitle="Discover the best brands in mechanical keyboards"
        />
        <section className="relative w-full">
          <div className="relative max-w-full overflow-x-auto py-6">
            <div className="flex flex-wrap justify-around items-center gap-8 px-4">
              {featuredBrandsData.map((brand: Brand) => (
                <div key={brand.id} className="flex-shrink-0" data-aos="zoom-in">
                  <img
                    src={brand.logo}
                    alt={`${brand.title} logo`}
                    className="w-24 h-24 md:w-32 md:h-32 object-contain transition-transform duration-300 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FeaturedBrandsBanner;
