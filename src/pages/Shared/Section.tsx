import { FC } from 'react';
import { IconType } from 'react-icons';
import 'aos/dist/aos.css'; // Import AOS styles

interface SectionProps {
  icon: IconType;
  title: string;
  subtitle: string;
}

const Section: FC<SectionProps> = ({ icon: Icon, title, subtitle }) => {
  return (
    <div
      className="text-left mb-6"
      data-aos="fade-up" // Animation type
      data-aos-duration="500" // Duration of the animation
      data-aos-easing="ease-out" // Easing function
    >
      <div className='flex items-center mb-1'>
        <div className="hidden sm:block">
          <Icon className="text-blue-600 mr-2 text-3xl" />
        </div>
        <h2 className="text-3xl font-semibold text-blue-600 mb-1 tracking-wide">{title}</h2>
      </div>
      <h3 className="text-lg font-medium text-gray-600 mb-5">{subtitle}</h3>
    </div>
  );
};

export default Section;
