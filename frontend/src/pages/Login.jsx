import axios from "axios";
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { FaRocket } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      if (response.data.success) {
        login(response.data.user);
        localStorage.setItem("token", response.data.token);
        navigate(response.data.user.role === "admin" ? '/admin-dashboard' : '/employee-dashboard');
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        setError(error.response.data.error);
      } else {
        setError("Server Error");
      }
    }
    setLoading(false);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-teal-500 to-blue-500">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <FaRocket className="text-teal-500 text-6xl mb-4 animate-pulse" />
          <h1 className="text-3xl font-semibold text-gray-800 mt-2">HR Portal</h1>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Login</h2>

        {error && <p className="text-red-500 text-center mb-6">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-200"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6 relative">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type={passwordVisible ? "text" : "password"}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-200"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-4 top-8 text-gray-600"
            >
              {passwordVisible ? 'Hide' : 'Show'}
            </button>
          </div>

          <div className="mb-4 flex items-center justify-between">
            <label className="inline-flex items-center text-gray-600">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2">Remember me</span>
            </label>
            {/* <a href="/register" className="text-teal-500 text-sm hover:underline">
              New Admin User?
            </a> */}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 focus:outline-none transition duration-200"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* <div className="my-6 text-center text-gray-600">Or log in with</div>
        
        <div className="flex justify-center space-x-4">
          <button className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-200">
            <FaGoogle className="mr-2" /> Google
          </button>
          <button className="flex items-center bg-blue-800 text-white px-6 py-3 rounded-md hover:bg-blue-900 transition duration-200">
            <FaFacebook className="mr-2" /> Facebook
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Login;
