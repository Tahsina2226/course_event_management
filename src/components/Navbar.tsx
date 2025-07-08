import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinkStyle = ({ isActive }: { isActive: boolean }): string =>
    isActive
      ? "text-emerald-600 font-semibold border-b-2 border-emerald-400"
      : "text-gray-600 hover:text-emerald-500 transition duration-300";

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="top-0 z-10 sticky bg-gray-50 shadow-sm">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex justify-between items-center h-16">
          <h1 className="font-bold text-emerald-700 text-xl">🎓 University</h1>

          <div className="hidden md:flex space-x-6">
            <NavLink to="/" className={navLinkStyle}>
              Home
            </NavLink>
            <NavLink to="/batches" className={navLinkStyle}>
              Batches
            </NavLink>
            <NavLink to="/routines" className={navLinkStyle}>
              Routine
            </NavLink>
            <NavLink to="/events" className={navLinkStyle}>
              Events
            </NavLink>
            <NavLink to="/news" className={navLinkStyle}>
              News
            </NavLink>
          </div>

          <div className="md:hidden">
            <button onClick={toggleMenu} aria-label="Toggle menu">
              {menuOpen ? (
                <X className="w-6 h-6 text-emerald-700" />
              ) : (
                <Menu className="w-6 h-6 text-emerald-700" />
              )}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden flex flex-col items-end space-y-3 mt-2 pr-2 pb-4">
            <NavLink
              to="/"
              className={navLinkStyle}
              onClick={() => setMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/batches"
              className={navLinkStyle}
              onClick={() => setMenuOpen(false)}
            >
              Batches
            </NavLink>
            <NavLink
              to="/routines"
              className={navLinkStyle}
              onClick={() => setMenuOpen(false)}
            >
              Routine
            </NavLink>
            <NavLink
              to="/events"
              className={navLinkStyle}
              onClick={() => setMenuOpen(false)}
            >
              Events
            </NavLink>
            <NavLink
              to="/news"
              className={navLinkStyle}
              onClick={() => setMenuOpen(false)}
            >
              News
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
