import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/Hooks";
import { register } from "../features/auth/auth";
import { Link } from "react-router-dom";

const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error, token } = useAppSelector((state) => state.auth);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [role, setRole] = useState<string>("user");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    dispatch(register({ name, email, role, password }));
  };

  if (token) {
    return (
      <p className="mt-10 font-semibold text-green-600 text-lg text-center">
        Registered and logged in successfully!
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md mx-auto mt-10 p-8 rounded max-w-md"
    >
      <label className="block mb-1 font-medium text-gray-700">Name</label>
      <input
        type="text"
        placeholder="Your full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full text-gray-900"
      />

      <label className="block mb-1 font-medium text-gray-700">Email</label>
      <input
        type="email"
        placeholder="Your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full text-gray-900"
      />

      <label className="block mb-1 font-medium text-gray-700">Role</label>
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        required
        className="mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full text-gray-900"
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
        <option value="guest">Guest</option>
      </select>

      <label className="block mb-1 font-medium text-gray-700">Password</label>
      <div className="relative mb-4">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="p-3 pr-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full text-gray-900"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="top-1/2 right-3 absolute text-gray-600 hover:text-emerald-600 -translate-y-1/2"
          tabIndex={-1}
        >
          {showPassword ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4-9-7 0-1.52.714-3.04 1.979-4.4M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3l18 18"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          )}
        </button>
      </div>

      <label className="block mb-1 font-medium text-gray-700">
        Confirm Password
      </label>
      <div className="relative mb-6">
        <input
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="p-3 pr-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full text-gray-900"
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="top-1/2 right-3 absolute text-gray-600 hover:text-emerald-600 -translate-y-1/2"
          tabIndex={-1}
        >
          {showConfirmPassword ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4-9-7 0-1.52.714-3.04 1.979-4.4M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3l18 18"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          )}
        </button>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 py-3 rounded w-full font-semibold text-white transition-colors"
      >
        {loading ? "Registering..." : "Register"}
      </button>

      {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

      <p className="mt-6 text-gray-700 text-sm text-center">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-emerald-600 underline">
          Login here
        </Link>
      </p>
    </form>
  );
};

export default Register;
