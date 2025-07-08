import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 mt-12 border-t text-gray-800">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-10 max-w-7xl">
        <div className="gap-8 grid grid-cols-1 md:grid-cols-4">
          <div>
            <h2 className="mb-3 font-semibold text-emerald-700 text-lg">
              🎓 University
            </h2>
            <p className="text-sm">
              A smart university management platform designed to handle academic
              schedules, student batches, events, and more with ease.
            </p>
          </div>

          <div>
            <h2 className="mb-3 font-semibold text-emerald-700 text-lg">
              Quick Links
            </h2>
            <ul className="space-y-2 text-sm">
              <li>
                <NavLink to="/" className="hover:text-emerald-600">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/batches" className="hover:text-emerald-600">
                  Batches
                </NavLink>
              </li>
              <li>
                <NavLink to="/routine" className="hover:text-emerald-600">
                  Routine
                </NavLink>
              </li>
              <li>
                <NavLink to="/events" className="hover:text-emerald-600">
                  Events
                </NavLink>
              </li>
              <li>
                <NavLink to="/news" className="hover:text-emerald-600">
                  News
                </NavLink>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-3 font-semibold text-emerald-700 text-lg">
              Contact Us
            </h2>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <FaEnvelope /> tahsinatanvin274@gmail.com
              </li>
              <li className="flex items-center gap-2">
                <FaPhoneAlt /> 01859702848
              </li>
              <li className="flex items-center gap-2">
                <FaMapMarkerAlt /> Chattogram, Bangladesh
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-3 font-semibold text-emerald-700 text-lg">
              Follow Me
            </h2>
            <div className="flex space-x-4">
              <a
                href="https://github.com/Tahsina2226"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-600 transition"
                aria-label="GitHub"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/tahsina-tanvin-8a49162b3/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-600 transition"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href="mailto:tahsinatanvin274@gmail.com"
                className="hover:text-emerald-600 transition"
                aria-label="Email"
              >
                <FaEnvelope size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t text-gray-500 text-sm text-center">
          © {new Date().getFullYear()} Tahsina Tanvin | All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
