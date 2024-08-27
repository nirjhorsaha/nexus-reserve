import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Helmet } from "react-helmet";
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';

const ContactUs = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
      <div className="min-h-screen flex items-center justify-center">
          <Helmet>
              <title>Contact Us - Mech Arcade</title>
          </Helmet>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="flex flex-col justify-center" data-aos="fade-right">
                      <h1 className="text-4xl sm:text-5xl font-bold text-blue-600 mb-4">
                          Contact Us
                      </h1>
                      <p className="text-lg text-gray-600 mb-6">
                          Have a question or want to get in touch? Reach out to us via email, phone,
                          or visit our location.
                      </p>
                      <div className="flex items-start mb-6">
                          <FiMail className="text-blue-500 mt-1 mr-3 h-6 w-6" />
                          <div>
                              <p className="text-lg text-gray-800 font-semibold">Email</p>
                              <a
                                  href="mailto:info@nexusarcade.com"
                                  className="text-lg text-gray-600 hover:text-blue-500 transition duration-300"
                              >
                                  info@nexusarcade.com
                              </a>
                          </div>
                      </div>
                      <div className="flex items-start mb-6">
                          <FiPhone className="text-blue-500 mt-1 mr-3 h-6 w-6" />
                          <div>
                              <p className="text-lg text-gray-800 font-semibold">Phone</p>
                              <p className="text-lg text-gray-600">+880 1234567890</p>
                          </div>
                      </div>
                      <div className="flex items-start">
                          <FiMapPin className="text-blue-500 mt-1 mr-3 h-6 w-6" />
                          <div>
                              <p className="text-lg text-gray-800 font-semibold">Address</p>
                              <p className="text-lg text-gray-600">Uttara, Dhaka, Bangladesh</p>
                          </div>
                      </div>
                  </div>
                  <form className="flex flex-col space-y-4" data-aos="fade-left">
                      <input
                          type="text"
                          placeholder="Name"
                          className="rounded-md px-4 bg-gray-100 text-gray-800 text-lg pt-3 pb-2 focus:ring-blue-500 focus:ring-2 focus:outline-none"
                          required
                      />
                      <input
                          type="email"
                          placeholder="Email"
                          className="rounded-md px-4 bg-gray-100 text-gray-800 text-lg pt-3 pb-2 focus:ring-blue-500 focus:ring-2 focus:outline-none"
                          required
                      />
                      <input
                          type="text"
                          placeholder="Subject"
                          className="rounded-md px-4 bg-gray-100 text-gray-800 text-lg pt-3 pb-2 focus:ring-blue-500 focus:ring-2 focus:outline-none"
                          required
                      />
                      <textarea
                          placeholder="Message"
                          className="rounded-md px-4 bg-gray-100 text-gray-800 text-lg pt-3 pb-2 focus:ring-blue-500 focus:ring-2 focus:outline-none"
                          rows={5}
                          required
                      ></textarea>
                      <button
                          type="submit"
                          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-md text-lg flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                          <FiSend className="mr-2 h-6 w-6" /> Send Message
                      </button>
                  </form>
              </div>
          </div>
      </div>
  );
};

export default ContactUs;
