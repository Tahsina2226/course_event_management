import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/Hooks";
import { login } from "../features/auth/auth";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading, error, token } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasShownAlert, setHasShownAlert] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (token && !hasShownAlert) {
      setHasShownAlert(true);
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome back!",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        navigate("/batches");
      });
    }
  }, [token, hasShownAlert, navigate]);

  return (
    <div className="flex justify-center items-center bg-gradient-to-tr from-green-200 via-green-100 to-green-300 px-4 min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-8 rounded-lg w-full max-w-md"
      >
        <h2 className="mb-8 font-bold text-gray-800 text-3xl text-center">
          Welcome Back
        </h2>

        <label
          htmlFor="email"
          className="block mb-1 font-semibold text-gray-700"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mb-6 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400 w-full transition"
        />

        <label
          htmlFor="password"
          className="block mb-1 font-semibold text-gray-700"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mb-6 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400 w-full transition"
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded text-white font-semibold ${
            loading
              ? "bg-green-300 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700 transition"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {error && (
          <p className="mt-4 font-medium text-red-600 text-center">{error}</p>
        )}

        <p className="mt-6 text-gray-600 text-sm text-center">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-green-700 hover:underline"
          >
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
