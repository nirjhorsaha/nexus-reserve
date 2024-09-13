import 'antd/dist/reset.css'; // Import Ant Design CSS
import meetingRoom from '../../assets/MeetingRoom.jpg';
import { Link } from 'react-router-dom';
import { RightOutlined } from '@ant-design/icons';

const Hero = () => {
  return (
    <div>
      {/* <section
        className="bg-[url('https://pagedone.io/asset/uploads/1691055810.png')] bg-center bg-cover"
      > */}
      <div className="mx-auto max-w-7xl relative text-center px-8 md:px-0 mt-4">
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
          className="mb-14 inline-flex items-center justify-center py-3 px-7 text-base font-semibold text-center text-white rounded-full bg-blue-600 shadow-xs hover:bg-blue-700 transition-all duration-500">
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