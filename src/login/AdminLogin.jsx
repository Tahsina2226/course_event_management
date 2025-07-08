import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Example API call
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok && data.token) {
      localStorage.setItem('adminToken', data.token);
      toast.success('Login successful!');
      navigate('/admin/dashboard');
    } else {
      toast.error(data.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow mx-auto mt-20 p-6 rounded max-w-sm">
      <h2 className="mb-6 font-bold text-2xl text-center">Admin Login</h2>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        required
        className="mb-4 p-3 border rounded w-full"
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        required
        className="mb-6 p-3 border rounded w-full"
      />
      <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 py-3 rounded w-full text-white transition">
        Login
      </button>
    </form>
  );
};

export default AdminLogin;
