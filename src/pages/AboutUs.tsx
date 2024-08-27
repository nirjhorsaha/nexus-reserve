// import { Helmet } from 'react-helmet';
// import { FiAward, FiUsers, FiSettings, FiTrendingUp } from 'react-icons/fi';
// // import logo1 from "../../assets/logo-1.png";
// import logo2 from "../assets/logo-2.png";
// import 'aos/dist/aos.css';
// import AOS from 'aos';
// import { useEffect } from 'react';

// const AboutUs = () => {
//   useEffect(() => {
//     AOS.init({
//       once: true,
//       duration: 800,
//       easing: 'ease-in-out',
//     });
//   }, []);

//   return (
//     <div className="min-h-screen flex items-center justify-center rounded-lg">
//       <Helmet>
//         <title>About Us - Mech Arcade</title>
//       </Helmet>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
//           <div className="flex flex-col justify-center" data-aos="fade-right">
//             <h1 className="text-4xl sm:text-5xl font-bold text-blue-600 mb-4">
//               About Nexus Reserve
//             </h1>
//             <p className="text-lg text-gray-600 mb-6">
//               <span className='font-bold'>Mech Arcade</span> is dedicated to bringing you the latest and greatest
//               in mechanical keyboards. Our passion for innovation and quality
//               drives us to deliver the ultimate keyboard experience.
//             </p>
//             <p className="text-lg text-gray-600 mb-6">
//               Founded in 2024, Mech Arcade has quickly become a leader in the
//               keyboard enthusiast community. From gaming to professional use,
//               our curated selection ensures every keystroke is a pleasure.
//             </p>
//             <p className="text-lg text-gray-600">
//               Join us in exploring the world of mechanical keyboards and
//               discover what sets Mech Arcade apart.
//             </p>
//           </div>
//           <div className="flex justify-center" data-aos="fade-left">
//             <img
//               src={logo2}
//               alt="About Us"
//               className="max-h-72 rounded-lg  object-cover"
//             />
//           </div>
//         </div>

//         <div className="mt-12" data-aos="fade-up">
//           <h2 className="text-3xl sm:text-4xl font-bold text-blue-600 mb-6 animate-bounce">
//             Our Mission
//           </h2>
//           <p className="text-lg text-gray-600 mb-6">
//             At Mech Arcade, our mission is to provide keyboard enthusiasts with
//             top-quality products that enhance their computing experience. We
//             strive to deliver:
//           </p>
//           <ul className="list-disc list-inside text-lg text-gray-600 mb-6 space-y-4">
//             <li className="flex items-start">
//               <FiAward className="mr-2 mt-1 text-blue-500 animate-spin" /> Innovative and
//               cutting-edge mechanical keyboards.
//             </li>
//             <li className="flex items-start">
//               <FiUsers className="mr-2 mt-1 text-blue-500 animate-bounce" /> Exceptional
//               customer service and support.
//             </li>
//             <li className="flex items-start">
//               <FiSettings className="mr-2 mt-1 text-blue-500 animate-spin" /> Curated
//               collections that cater to diverse preferences.
//             </li>
//             <li className="flex items-start">
//               <FiTrendingUp className="mr-2 mt-1 text-blue-500 animate-bounce" /> Continuous
//               improvement and community engagement.
//             </li>
//           </ul>
//           <p className="text-lg text-blue-600 font-bold">
//             Whether you're a seasoned gamer or a professional typist, Mech
//             Arcade is here to elevate your typing experience.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AboutUs;

import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

interface TeamMember {
    name: string;
    role: string;
    imageUrl: string;
}

const AboutUs: React.FC = () => {
    const [team, setTeam] = useState<TeamMember[]>([]);

    useEffect(() => {
        // Define your team members here
        const teamData = [
            { name: "Jane Doe", role: "CEO & Founder", imageId: "men/44" },
            { name: "John Smith", role: "CTO", imageId: "men/45" },
            { name: "Emily Johnson", role: "COO", imageId: "women/46" },
        ];

        // Map over the teamData and fetch the image URLs
        const teamWithImages = teamData.map((member) => ({
            ...member,
            imageUrl: `https://randomuser.me/api/portraits/${member.imageId}.jpg`, // URL format for random user portraits
        }));

        setTeam(teamWithImages);
    }, []);

    return (
        <div>
            <Helmet>
                <title>About Us - Nexus Reserve</title>
            </Helmet>
            <div className="p-8">
                {/* <div className="container mx-auto"> */}
                <div className="mx-auto">
                    <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">About Us</h1>

                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Our Mission</h2>
                        <p className="text-gray-600">
                            Our mission is to provide seamless, efficient, and user-friendly meeting
                            room booking experiences. We aim to simplify the process of finding and
                            securing the perfect meeting space, allowing our users to focus on what
                            truly matters—collaboration and productivity.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Meet the Team</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {team.map((member, index) => (
                                <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                                    <img
                                        className="w-24 h-24 rounded-full mx-auto mb-4"
                                        src={member.imageUrl}
                                        alt={member.name}
                                    />
                                    <h3 className="text-xl font-semibold text-center text-gray-800">
                                        {member.name}
                                    </h3>
                                    <p className="text-center text-gray-600">{member.role}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Our Story</h2>
                        <p className="text-gray-600">
                            Founded in 2023, our company was born out of the need for a more
                            efficient way to book meeting rooms. We started as a small team of
                            professionals who saw the potential for technology to solve common
                            problems in the workplace. Today, we are proud to serve a growing
                            community of users who rely on our platform to enhance their
                            collaboration efforts.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
