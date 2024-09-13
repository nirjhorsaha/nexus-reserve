import { Helmet, HelmetProvider } from "react-helmet-async";
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import { motion } from "framer-motion";
import { useEffect } from "react";
import { formFields } from "@/data/FormField";

const contactInfo = [
    {
        icon: <FiMail className="text-blue-500 mt-1 mr-3 h-6 w-6" />,
        label: 'Email',
        value: 'info@nexusarcade.com',
        valueClass: 'text-gray-800'
    },
    {
        icon: <FiPhone className="text-blue-500 mt-1 mr-3 h-6 w-6" />,
        label: 'Phone',
        value: '+880 1234567890',
        valueClass: 'text-gray-600'
    },
    {
        icon: <FiMapPin className="text-blue-500 mt-1 mr-3 h-6 w-6" />,
        label: 'Address',
        value: 'Uttara, Dhaka, Bangladesh',
        valueClass: 'text-gray-600'
    }
];

const ContactUs = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <HelmetProvider>
                <Helmet>
                    <title>Contact Us - Nexus Reserve</title>
                </Helmet>
            </HelmetProvider>
            <div className="container mx-auto p-4">
                <div className="min-h-screen flex items-center justify-center">
                    <div className="">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <motion.div
                                className="flex flex-col justify-center"
                                initial={{ opacity: 0, x: -100 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1 }}
                            >
                                <h1 className="text-4xl text-center md:text-left sm:text-5xl font-bold text-blue-600 mb-4">
                                    Contact Us
                                </h1>
                                <p className="text-lg text-gray-600 mb-6">
                                    Have a question or want to get in touch? Reach out to us via email, phone,
                                    or visit our location.
                                </p>

                                <div>
                                    {contactInfo.map(({ icon, label, value, valueClass }, index) => (
                                        <div key={index} className="flex items-start mb-4">
                                            {icon}
                                            <div>
                                                <p className="text-lg text-gray-800 font-semibold">{label}</p>
                                                <p className={`text-lg ${valueClass}`}>{value}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                            <motion.form
                                className="flex flex-col space-y-4"
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1 }}
                            >
                                {formFields.map((field, index) => {
                                    const baseClasses = "border border-gray-00 rounded-md p-3";
                                    const className = `${baseClasses} ${field.className}`;

                                    if (field.type === 'textarea') {
                                        return (
                                            <textarea
                                                key={index}
                                                placeholder={field.placeholder}
                                                className={className}
                                                rows={field.rows}
                                                required={field.required}
                                            ></textarea>
                                        );
                                    }
                                    return (
                                        <input
                                            key={index}
                                            type={field.type}
                                            placeholder={field.placeholder}
                                            className={className}
                                            required={field.required}
                                        />
                                    );
                                })}
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-md text-lg flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <FiSend className="mr-2 h-6 w-6" /> Send Message
                                </button>
                            </motion.form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
