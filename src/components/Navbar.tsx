import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  GraduationCap,
  CalendarDays,
  Newspaper,
  CalendarCheck2,
  Home,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../redux/Hooks";
import { logout } from "../features/auth/auth";
import { motion, AnimatePresence } from "framer-motion";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { token, email } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const navLinkStyle = ({ isActive }: { isActive: boolean }): string =>
    isActive
      ? "text-emerald-700 font-medium bg-emerald-100 rounded-lg text-sm"
      : "text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors duration-200 text-sm";

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const navItems = [
    { path: "/", name: "Home", icon: <Home className="w-5 h-5" /> },
    {
      path: "/batches",
      name: "Batches",
      icon: <GraduationCap className="w-5 h-5" />,
    },
    {
      path: "/routines",
      name: "Routine",
      icon: <CalendarCheck2 className="w-5 h-5" />,
    },
    {
      path: "/events",
      name: "Events",
      icon: <CalendarDays className="w-5 h-5" />,
    },
    { path: "/news", name: "News", icon: <Newspaper className="w-5 h-5" /> },
  ];

  return (
    <>
      <nav
        className={`sticky top-0 z-50 ${
          scrolled
            ? "bg-emerald-50 shadow-md"
            : "bg-emerald-50/90 backdrop-blur-sm"
        } transition-all duration-300 mb-8`}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex justify-between items-center h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center"
            >
              <GraduationCap className="mr-2 text-emerald-600" />
              <h1 className="font-bold text-emerald-700 text-sm sm:text-base">
                University Management
              </h1>
            </motion.div>
            <div className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={navLinkStyle}
                >
                  <motion.div
                    whileHover={{ y: -2 }}
                    className="flex items-center space-x-1 px-3 py-2"
                  >
                    {item.icon}
                    <span className="text-sm">{item.name}</span>
                  </motion.div>
                </NavLink>
              ))}
              {token ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center space-x-4 ml-4"
                >
                  <span className="bg-emerald-100 px-3 py-1 rounded-full text-emerald-700 text-xs sm:text-sm">
                    {email}
                  </span>
                  <motion.button
                    onClick={handleLogout}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-rose-100 hover:from-rose-200 to-rose-200 hover:to-rose-300 shadow-sm px-4 py-1.5 rounded-lg font-medium text-rose-800 text-xs sm:text-sm"
                  >
                    Logout
                  </motion.button>
                </motion.div>
              ) : (
                <NavLink to="/login" className={navLinkStyle}>
                  <motion.div
                    whileHover={{ y: -2 }}
                    className="flex items-center space-x-1 px-3 py-2"
                  >
                    <span className="text-sm">Login</span>
                  </motion.div>
                </NavLink>
              )}
            </div>
            <motion.div
              className="md:hidden"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <button
                onClick={toggleMenu}
                aria-label="Toggle menu"
                className="hover:bg-emerald-100 p-2 rounded-lg"
              >
                {menuOpen ? (
                  <X className="w-6 h-6 text-emerald-700" />
                ) : (
                  <Menu className="w-6 h-6 text-emerald-700" />
                )}
              </button>
            </motion.div>
          </div>
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden overflow-hidden"
              >
                <div className="flex flex-col space-y-2 bg-emerald-50 shadow-sm mt-2 pb-4 rounded-md">
                  {navItems.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={navLinkStyle}
                    >
                      <div className="flex items-center space-x-3 px-4 py-3">
                        {item.icon}
                        <span className="text-sm">{item.name}</span>
                      </div>
                    </NavLink>
                  ))}
                  {token ? (
                    <div className="mt-2 pt-2 border-emerald-200 border-t">
                      <div className="px-4 py-2 text-emerald-700 text-xs sm:text-sm">
                        Logged in as: {email}
                      </div>
                      <button
                        onClick={handleLogout}
                        className="flex justify-center items-center bg-rose-100 hover:bg-rose-200 mt-2 px-4 py-2 rounded-lg w-full font-medium text-rose-800 text-xs sm:text-sm"
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <NavLink
                      to="/login"
                      className="flex items-center hover:bg-emerald-100 px-4 py-3 rounded-lg text-emerald-700 hover:text-emerald-800"
                    >
                      <span className="text-sm">Login</span>
                    </NavLink>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
