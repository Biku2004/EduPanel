import React, { useState } from 'react';
import {  Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthProvider';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'Staff',
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
  };

  

const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      const idToken = await userCredential.user.getIdToken();
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Login failed');
      }
      const data = await response.json();
      localStorage.setItem('token', idToken);
      localStorage.setItem('user', JSON.stringify({
        uid: data.uid,
        name: data.name,
        email: data.email,
        role: data.role,
    }));
      navigate('/dashboard/add-student');
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'Login failed. Please check your credentials and try again.');
    } finally {
      setIsLoading(false);
    }
  };


  const isFormInvalid = !formData.email || formData.password.length < 8;

  return (
    <div className="bg-gray-100 flex justify-center items-center min-h-screen">
      <div className="bg-white shadow-lg rounded-lg flex max-w-4xl w-full">
        {/* Left Side (Image) */}
        <div className="hidden md:block md:w-1/2">
          <img
            src="/signup_side.jpg"
            alt="Background Image"
            className="object-cover h-full w-full rounded-l-lg"
          />
        </div>

        {/* Right Side (Login Form) */}
        <div className="flex flex-col justify-center md:w-1/2 w-full p-8">
          <h2 className="text-center text-2xl font-bold text-gray-800 mt-4">
            Edu Panel
          </h2>
          <h3 className="text-center text-xl font-semibold text-gray-600 mt-1">
            Welcome Back
          </h3>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Example@email.com"
                className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="At least 8 characters"
                className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
            <label className="block text-gray-700 dark:text-white">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded dark:bg-gray-800 dark:text-white"
              required
            >
              <option value="Staff">Staff</option>
              {/* <option value="Recruiter">Recruiter</option> */}
            </select>
          </div>
            <div className="flex justify-between items-center mb-4">
              <Link to="/forgot-password" className="text-sm text-blue-500 hover:underline">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-blue-400"
              disabled={isFormInvalid || isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link
                to="/staff-signup"
                className="text-blue-500 hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;