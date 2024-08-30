import 'antd/dist/reset.css'; // Import Ant Design CSS
import meetingRoom from '../../assets/MeetingRoom.jpg';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="bg-white">
      <section className="bg-[#FCF8F1] bg-opacity-30 py-10 sm:py-16 lg:py-12">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="text-center lg:text-left">
              <h1 className="text-2xl font-bold text-black lg:mt-8 xl:text-6xl">
                Book Your Ideal Meeting Room with Ease.
              </h1>
              <p className="mt-4 text-base text-black lg:mt-8 sm:text-xl">
                Efficient, hassle-free room booking for all your meeting needs.
              </p>

              <Link
                to="/meeting-rooms"
                className="inline-flex items-center px-8 py-4 mt-8 font-semibold text-white bg-gradient-to-r from-blue-400 to-blue-600 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
                Book Now
                <svg className="w-6 h-6 ml-8 -mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </Link>
              {/* <p className="mt-5 text-gray-600">Already joined us? <a href="#" title="" className="text-black transition-all duration-200 hover:underline">Log in</a></p> */}
            </div>

            <div>
              <img className="w-full h-full rounded-xl" src={meetingRoom} alt="" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
