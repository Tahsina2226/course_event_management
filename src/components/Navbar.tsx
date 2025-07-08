import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../redux/Hooks";
import { logout } from "../features/auth/auth";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { token, email } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const navLinkStyle = ({ isActive }: { isActive: boolean }): string =>
    isActive
      ? "text-emerald-600 font-semibold border-b-2 border-emerald-400"
      : "text-gray-600 hover:text-emerald-500 transition duration-300";

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="top-0 z-10 sticky bg-gray-50 shadow-sm">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex justify-between items-center h-16">
          <h1 className="font-bold text-emerald-700 text-xl">🎓 University</h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
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
            {token ? (
              <>
                <span className="text-gray-600 text-sm">{email}</span>
                <button
                  onClick={handleLogout}
                  className="bg-rose-200 hover:bg-rose-300 px-3 py-1 rounded text-gray-800 text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink to="/login" className={navLinkStyle}>
                Login
              </NavLink>
            )}
          </div>

          {/* Mobile Menu Toggle */}
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

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden flex flex-col items-end space-y-3 mt-2 pr-2 pb-4">
            <NavLink to="/" className={navLinkStyle} onClick={toggleMenu}>
              Home
            </NavLink>
            <NavLink
              to="/batches"
              className={navLinkStyle}
              onClick={toggleMenu}
            >
              Batches
            </NavLink>
            <NavLink
              to="/routines"
              className={navLinkStyle}
              onClick={toggleMenu}
            >
              Routine
            </NavLink>
            <NavLink to="/events" className={navLinkStyle} onClick={toggleMenu}>
              Events
            </NavLink>
            <NavLink to="/news" className={navLinkStyle} onClick={toggleMenu}>
              News
            </NavLink>
            {token ? (
              <>
                <span className="text-gray-600 text-sm">{email}</span>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="bg-rose-200 hover:bg-rose-300 px-3 py-1 rounded text-gray-800 text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink
                to="/login"
                className={navLinkStyle}
                onClick={() => setMenuOpen(false)}
              >
                Login
              </NavLink>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
