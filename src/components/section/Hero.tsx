import 'antd/dist/reset.css'; // Import Ant Design CSS
import meetingRoom from '../../assets/MeetingRoom.jpg';
import { Link } from 'react-router-dom';
import { RightOutlined } from '@ant-design/icons';

const Hero = () => {
  return (
    // <div classNameName="bg-white">
    //   <section classNameName="bg-[#FCF8F1] bg-opacity-30 py-10 sm:py-16 lg:py-12">
    //     <div classNameName="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
    //       <div classNameName="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
    //         <div classNameName="text-center lg:text-left">
    //           <h1 classNameName="text-4xl font-bold text-black lg:mt-8 xl:text-6xl">
    //             Book Your Ideal Meeting Room with Ease.
    //           </h1>
    //           <p classNameName="mt-4 text-base text-black lg:mt-8 sm:text-xl">
    //             Efficient, hassle-free room booking for all your meeting needs.
    //           </p>

    //           <Link
    //             to="/meeting-room"
    //             classNameName="inline-flex items-center px-8 py-4 mt-8 font-semibold text-white bg-gradient-to-r from-blue-400 to-blue-600 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
    //             Book Now
    //             <svg classNameName="w-6 h-6 ml-8 -mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    //             </svg>
    //           </Link>
    //           {/* <p classNameName="mt-5 text-gray-600">Already joined us? <a href="#" title="" classNameName="text-black transition-all duration-200 hover:underline">Log in</a></p> */}
    //         </div>

    //         <div>
    //           <img classNameName="w-full h-full rounded-xl" src={meetingRoom} alt="" />
    //         </div>
    //       </div>
    //     </div>
    //   </section>
    // </div>
    <div>
      {/* <section
        className="bg-[url('https://pagedone.io/asset/uploads/1691055810.png')] bg-center bg-cover"
      > */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative text-center">
        <h1
          className="lg:max-w-3xl mx-auto text-center font-bold text-4xl md:text-5xl text-gray-900 mb-5 leading-[50px]">
          Book Your Ideal Meeting Room with Ease.
          {/* <span className="text-indigo-600">Smart Tool </span> */}
        </h1>
        <p className="max-w-lg mx-auto text-center md:text-lg font-normal leading-7 text-gray-600 mb-6">
          Efficient, hassle-free room booking for all your meeting needs.
        </p>
        <Link
          to="/meeting-room"
          className="w-full md:w-auto mb-14 inline-flex items-center justify-center py-3 px-7 text-base font-semibold text-center text-white rounded-full bg-blue-600 shadow-xs hover:bg-blue-700 transition-all duration-500">
          Book Now
          <RightOutlined className="ml-2 text-white" />
        </Link>
        <div className="flex justify">
          <img
            src={meetingRoom}
            alt="Dashboard image" className="rounded-t-3xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;