import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/Hooks";
import { register } from "../features/auth/auth";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useAppSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [hasShownAlert, setHasShownAlert] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "Passwords do not match",
      });
      return;
    }
    dispatch(register({ name, email, role, password }));
  };

  useEffect(() => {
    if (token && !hasShownAlert) {
      setHasShownAlert(true);
      Swal.fire({
        icon: "success",
        title: "Registered Successfully",
        text: "Welcome aboard!",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        navigate("/batches");
      });
    }
  }, [token, hasShownAlert, navigate]);

  return (
    <div className="flex justify-center items-center bg-gradient-to-tr from-green-100 to-green-300 px-4 min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-8 rounded-xl w-full max-w-md"
      >
        <h2 className="mb-6 font-bold text-gray-800 text-3xl text-center">
          Create Account
        </h2>

        <label className="block mb-1 font-medium text-gray-700">Name</label>
        <input
          type="text"
          placeholder="Your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mb-4 p-3 border border-gray-300 rounded focus:ring-2 focus:ring-emerald-500 w-full"
        />

        <label className="block mb-1 font-medium text-gray-700">Email</label>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mb-4 p-3 border border-gray-300 rounded focus:ring-2 focus:ring-emerald-500 w-full"
        />

        <label className="block mb-1 font-medium text-gray-700">Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
          className="mb-4 p-3 border border-gray-300 rounded focus:ring-2 focus:ring-emerald-500 w-full"
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
            className="p-3 pr-10 border border-gray-300 rounded focus:ring-2 focus:ring-emerald-500 w-full"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="top-1/2 right-3 absolute text-gray-500 -translate-y-1/2 transform"
            tabIndex={-1}
          >
            {showPassword ? "🙈" : "👁️"}
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
            className="p-3 pr-10 border border-gray-300 rounded focus:ring-2 focus:ring-emerald-500 w-full"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="top-1/2 right-3 absolute text-gray-500 -translate-y-1/2 transform"
            tabIndex={-1}
          >
            {showConfirmPassword ? "🙈" : "👁️"}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 py-3 rounded w-full font-semibold text-white transition"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        {error && (
          <p className="mt-4 font-medium text-red-600 text-center">{error}</p>
        )}

        <p className="mt-6 text-gray-700 text-sm text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-emerald-600 underline"
          >
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
