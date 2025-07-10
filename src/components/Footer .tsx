import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaUniversity,
  FaCalendarAlt,
  FaNewspaper,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { path: "/", name: "Home" },
    { path: "/batches", name: "Batches" },
    { path: "/routine", name: "Routine" },
    { path: "/events", name: "Events" },
    { path: "/news", name: "News" },
  ];

  const contactInfo = [
    { icon: <FaEnvelope />, text: "tahsinatanvin274@gmail.com" },
    { icon: <FaPhoneAlt />, text: "01859702848" },
    { icon: <FaMapMarkerAlt />, text: "Chattogram, Bangladesh" },
  ];

  const socialLinks = [
    {
      icon: <FaGithub size={20} />,
      url: "https://github.com/Tahsina2226",
      label: "GitHub",
    },
    {
      icon: <FaLinkedin size={20} />,
      url: "https://www.linkedin.com/in/tahsina-tanvin-8a49162b3/",
      label: "LinkedIn",
    },
    {
      icon: <FaEnvelope size={20} />,
      url: "mailto:tahsinatanvin274@gmail.com",
      label: "Email",
    },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100 mt-16 border-gray-200 border-t text-gray-800">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl">
        <div className="gap-8 grid grid-cols-1 md:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2">
              <FaUniversity className="text-emerald-600 text-xl" />
              <h2 className="font-bold text-emerald-700 text-xl">
                University Management
              </h2>
            </div>
            <p className="text-gray-600 text-sm">
              A smart university management platform designed to handle academic
              schedules, student batches, events, and more with ease.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h2 className="flex items-center gap-2 mb-4 font-semibold text-emerald-700 text-lg">
              <FaCalendarAlt /> Quick Links
            </h2>
            <ul className="space-y-3">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `text-gray-600 hover:text-emerald-600 transition flex items-center gap-2 ${
                        isActive ? "text-emerald-600 font-medium" : ""
                      }`
                    }
                  >
                    <span className="bg-emerald-500 rounded-full w-2 h-2"></span>
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4 font-semibold text-emerald-700 text-lg">
              Contact Info
            </h2>
            <ul className="space-y-3">
              {contactInfo.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-gray-600"
                >
                  <span className="mt-0.5 text-emerald-600">{item.icon}</span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h2 className="flex items-center gap-2 mb-4 font-semibold text-emerald-700 text-lg">
              <FaNewspaper /> Follow Me
            </h2>
            <p className="mb-4 text-gray-600 text-sm">
              Connect with me on these platforms
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                  className="bg-white shadow-sm p-2 rounded-full hover:text-emerald-600 transition"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 pt-6 border-gray-200 border-t text-gray-500 text-sm text-center"
        >
          <p>© {currentYear} Tahsina Tanvin | All rights reserved.</p>
          <p className="mt-1">Made with ❤️ for better education management</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
