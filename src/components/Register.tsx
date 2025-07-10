import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../redux/Hooks";
import { register } from "../features/auth/auth";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "user",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [hasShownAlert, setHasShownAlert] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validatePassword = () => {
    if (formData.password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePassword()) return;

    dispatch(
      register({
        name: formData.name,
        email: formData.email,
        role: formData.role,
        password: formData.password,
      })
    );
  };

  useEffect(() => {
    if (token && !hasShownAlert) {
      setHasShownAlert(true);
      Swal.fire({
        title: "Welcome Aboard!",
        html: `
          <div class="text-center">
            <div class="flex justify-center items-center bg-emerald-100 mx-auto mb-4 rounded-full w-16 h-16">
              <svg class="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <p class="text-gray-600">Your account has been successfully created.</p>
          </div>
        `,
        timer: 2000,
        showConfirmButton: false,
        background: "#f8fafc",
        customClass: {
          popup: "rounded-xl shadow-2xl border border-gray-100",
        },
      }).then(() => {
        navigate("/batches");
      });
    }
  }, [token, hasShownAlert, navigate]);

  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-400 to-emerald-500 p-6 text-center">
            <motion.h2
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-bold text-white text-2xl"
            >
              Join Our Community
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-1 text-emerald-100"
            >
              Create your account in seconds
            </motion.p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8">
            <div className="space-y-4">
              <div>
                <label className="block mb-1 font-medium text-gray-700 text-sm">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="px-4 py-2.5 border border-gray-200 focus:border-emerald-500 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 w-full transition"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700 text-sm">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="px-4 py-2.5 border border-gray-200 focus:border-emerald-500 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 w-full transition"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700 text-sm">
                  Role
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className="px-4 py-2.5 border border-gray-200 focus:border-emerald-500 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 w-full transition appearance-none"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700 text-sm">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={validatePassword}
                    required
                    minLength={6}
                    className="px-4 py-2.5 border border-gray-200 focus:border-emerald-500 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 w-full transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="top-1/2 right-3 absolute text-gray-400 -translate-y-1/2 transform"
                    tabIndex={-1}
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
                <p className="mt-1 text-gray-500 text-xs">
                  Minimum 6 characters
                </p>
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700 text-sm">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onBlur={validatePassword}
                    required
                    className="px-4 py-2.5 border border-gray-200 focus:border-emerald-500 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 w-full transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="top-1/2 right-3 absolute text-gray-400 -translate-y-1/2 transform"
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? "🙈" : "👁️"}
                  </button>
                </div>
                {passwordError && (
                  <p className="mt-1 text-red-500 text-xs">{passwordError}</p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={!loading ? { scale: 1.02 } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
                className={`w-full py-3 px-4 rounded-lg font-medium text-white transition ${
                  loading
                    ? "bg-emerald-400 cursor-not-allowed"
                    : "bg-emerald-600 hover:bg-emerald-700 shadow-md"
                }`}
              >
                {loading ? (
                  <div className="flex justify-center items-center">
                    <svg
                      className="mr-2 -ml-1 w-4 h-4 text-white animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      ></path>
                    </svg>
                    Creating Account...
                  </div>
                ) : (
                  "Register Now"
                )}
              </motion.button>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 p-3 border border-red-100 rounded-lg text-red-600 text-sm"
                >
                  {error}
                </motion.div>
              )}
            </div>

            <div className="mt-6 text-gray-600 text-sm text-center">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-emerald-600 hover:text-emerald-700 hover:underline"
              >
                Sign in here
              </Link>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
