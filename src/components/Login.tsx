import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/Hooks";
import { login } from "../features/auth/auth";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error, token } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  if (token) {
    return (
      <p className="text-green-600 text-center">Logged in successfully!</p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto p-8 max-w-md">
      <h2 className="mb-6 font-semibold text-2xl text-center">Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="mb-4 p-3 border rounded w-full"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="mb-4 p-3 border rounded w-full"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-emerald-600 py-3 rounded w-full text-white"
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      {error && <p className="mt-2 text-red-500">{error}</p>}

      <p className="mt-4 text-gray-700 text-sm text-center">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-semibold text-emerald-600 underline"
        >
          Register here
        </Link>
      </p>
    </form>
  );
};

export default Login;
