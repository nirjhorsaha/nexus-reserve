import { Link } from 'react-router-dom';
// import logo1 from "../../assets/logo-1.png";
import logo2 from "../../assets/logo-2.png";
import { FaFacebookF, FaInstagram, FaTwitter, FaGithub, FaDribbble, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const socialLinks = [
    { href: "#", icon: <FaFacebookF className='size-5' />, label: "Facebook" },
    { href: "#", icon: <FaInstagram className='size-5' />, label: "Instagram" },
    { href: "#", icon: <FaTwitter className='size-5' />, label: "Twitter" },
    { href: "#", icon: <FaGithub className='size-5' />, label: "GitHub" },
    { href: "#", icon: <FaDribbble className='size-5' />, label: "Dribbble" }
];

const FooterLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
    <Link to={to} className="text-black transition hover:text-blue-600">
        {children}
    </Link>
);

const FooterSection = ({ title, links }: { title: string; links: { to: string; text: string }[] }) => (
    <div className="text-center sm:text-left">
        <p className="text-xl font-medium text-blue-600">{title}</p>
        <nav className="mt-8">
            <ul className="space-y-4 text-sm">
                {links.map(({ to, text }, index) => (
                    <li key={index}>
                        <FooterLink to={to}>{text}</FooterLink>
                    </li>
                ))}
            </ul>
        </nav>
    </div>
);


const Footer = () => (
    <footer className="bg-gradient-to-r from-blue-50 via-white to-blue-100 max-w-[2520px] px-2 md:px-10 xl:px-20 ">
        <div className="max-w-7xl px-4 pt-12 pb-6 mx-auto border border-x-0 border-y-2">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div>
                    <div className="flex justify-center text-teal-300 sm:justify-start">
                        <img src={logo2} alt="Logo" className="h-24 lg:h-32" />
                    </div>
                    <p className="max-w-lg mx-auto mt-4 leading-relaxed text-center text-black sm:max-w-xs sm:mx-0 sm:text-left">
                        Nexus Reserve – Where your meeting needs are met with excellence.
                    </p>
                    <ul className="flex justify-center gap-6 mt-8 md:gap-8 sm:justify-start">
                        {socialLinks.map(({ href, icon, label }) => (
                            <li key={label}>
                                <a
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-primary transition-colors duration-200"
                                >
                                    <span className="sr-only">{label}</span>
                                    {icon}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:col-span-2 md:grid-cols-4">
                    <FooterSection
                        title="About Us"
                        links={[
                            { to: "/", text: "Company History" },
                            { to: "/", text: "Meet the Team" },
                        ]}
                    />
                    <FooterSection
                        title="Our Services"
                        links={[
                            { to: "/meeting-room", text: "Rooms" },
                            { to: "/", text: "Terms Of Services" },
                        ]}
                    />
                    <FooterSection
                        title="Helpful Links"
                        links={[
                            { to: "/", text: "FAQs" },
                            { to: "/", text: "Privacy Policy" },
                        ]}
                    />
                    <div className="text-center sm:text-left">
                        <p className="text-xl font-medium text-blue-600">Contact Us</p>
                        <ul className="mt-8 space-y-4 text-sm">
                            <li>
                                <a
                                    className="flex items-center sm:justify-start gap-1.5 group"
                                    href="mailto:info@nexusarcade.com"
                                >
                                    <FaEnvelope className="size-4 text-black" />
                                    <span className="text-black transition group-hover:text-blue-600">
                                        info@nexusreserve.com
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a
                                    className="flex items-center sm:justify-start gap-1.5 group"
                                    href="tel:0123456789"
                                >
                                    <FaPhone className="size-4 text-black" />
                                    <span className="text-black transition group-hover:text-blue-600">
                                        +880 1234567890
                                    </span>
                                </a>
                            </li>
                            <li className="flex items-start  gap-1.5 sm:justify-start">
                                <FaMapMarkerAlt className="size-4 text-black" />
                                <address className="-mt-0.5 not-italic text-black">
                                    Uttara, Dhaka
                                </address>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="pt-6 mt-12 border-t border-gray-800">
                <div className="text-center sm:flex sm:justify-between sm:text-left">
                    <p className="text-sm text-gray-400">
                        <a
                            className="inline-block text-blue-600 underline transition hover:text-teal-500/75"
                            href="/"
                        >
                            Terms & Conditions
                        </a>
                        <span>&middot; </span>
                        <a
                            className="inline-block text-blue-600 underline transition hover:text-teal-500/75"
                            href="/"
                        >
                            Privacy Policy
                        </a>
                    </p>
                    <p className="mt-4 text-sm text-gray-500 sm:order-first sm:mt-0">
                        <span className="block sm:inline">All rights reserved. </span>
                        &copy; {new Date().getFullYear()} Nexus Reserve
                    </p>
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;
