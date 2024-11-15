import React, { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { motion } from "framer-motion";

interface TeamMember {
    name: string;
    role: string;
    imageUrl: string;
}

const AboutUs: React.FC = () => {
    const [team, setTeam] = useState<TeamMember[]>([]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        // Define your team members here
        const teamData = [
            { name: "Wade Warren", role: "CEO & Founder", imageId: "1696238684" },
            { name: "Jane Doe", role: "CTO", imageId: "1696238720" },
            { name: "Emily Johnson", role: "COO", imageId: "1696238665" },
        ];

        // Map over the teamData and fetch the image URLs
        const teamWithImages = teamData.map((member) => ({
            ...member,
            // imageUrl: `https://randomuser.me/api/portraits/${member.imageId}.jpg`,
            imageUrl: `https://pagedone.io/asset/uploads/${member.imageId}.png`,
        }));

        setTeam(teamWithImages);
    }, []);

    // Container variants for staggered animations
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3, // Stagger animation for children components
            },
        },
    };

    // Item variants for individual components
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" },
        },
    };

    return (
        <div>
            <HelmetProvider>
                <Helmet>
                    <title>About Us - Nexus Reserve</title>
                </Helmet>
            </HelmetProvider>
            <div className="container mx-auto p-4">
                <motion.h1
                    className="text-4xl font-bold text-center text-gray-800 mb-4"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}>About Us</motion.h1>

                <motion.section
                    className="mb-12"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible">
                    <motion.h2
                        className="text-2xl font-semibold text-gray-700 mb-4"
                        variants={itemVariants}>Our Mission</motion.h2>
                    <motion.p
                        className="text-gray-600"
                        variants={itemVariants}
                    >
                        Our mission is to provide seamless, efficient, and user-friendly meeting
                        room booking experiences. We aim to simplify the process of finding and
                        securing the perfect meeting space, allowing our users to focus on what
                        truly matters—collaboration and productivity.
                    </motion.p>
                </motion.section>

                <motion.section
                    className="mb-12"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible">
                    <motion.h2
                        className="text-2xl font-semibold text-gray-700 mb-4"
                        variants={itemVariants}
                    >Meet the Team</motion.h2>
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                        variants={containerVariants}
                    >
                        {team.map((member, index) => (
                            <motion.div
                                key={index}
                                className=" "
                                variants={itemVariants}>
                                <img src={member.imageUrl}
                                    alt="Team tailwind section"
                                    className=" rounded-2xl object-cover " />

                                <h3 className="text-xl mt-4 font-semibold text-center text-gray-800">
                                    {member.name}
                                </h3>
                                <p className="text-center text-gray-600">{member.role}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.section>

                <motion.section
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible">
                    <motion.h2
                        className="text-2xl font-semibold text-gray-700 mb-4"
                        variants={itemVariants}>Our Story</motion.h2>
                    <motion.p
                        className="text-gray-600"
                        variants={itemVariants}>
                        Founded in 2023, our company was born out of the need for a more
                        efficient way to book meeting rooms. We started as a small team of
                        professionals who saw the potential for technology to solve common
                        problems in the workplace. Today, we are proud to serve a growing
                        community of users who rely on our platform to enhance their
                        collaboration efforts.
                    </motion.p>
                </motion.section>
            </div>
        </div>
    );
};

export default AboutUs;