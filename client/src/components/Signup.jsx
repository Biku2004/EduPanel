import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Staff',
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Signup failed");
      alert("Staff Registration successful");
      navigate("/staff-login");
    } catch (error) {
      console.error("Error:", error);
      alert("Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = () => {
    return (
      formData.name.trim() !== '' &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
      formData.password.length >= 8 &&
      formData.role !== ''
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center px-4 py-6 sm:px-6 lg:px-8">
      <div className="bg-white shadow-md rounded-lg w-full max-w-4xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Form Section - Full width on mobile, half width on larger screens */}
          <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-8">
            {/* Logo and Heading - Responsive text sizing */}
            <div className="text-center mb-6">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                Welcome to EduPanel!
              </h1>
            </div>

            {/* Form Section - Better padding on mobile */}
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-700 text-sm mb-1 sm:mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Kelvin Yeboah"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm mb-1 sm:mb-2"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-sm mb-1 sm:mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  placeholder="********"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="role"
                  className="block text-gray-700 text-sm mb-1 sm:mb-2"
                >
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                >
                  <option value="Staff">Staff</option>
                  {/* <option value="Recruiter">Recruiter</option> */}
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300 disabled:bg-blue-400 text-sm sm:text-base"
                  disabled={!isFormValid() || isLoading}
                >
                  {isLoading ? 'Creating account...' : 'Create an account'}
                </button>
              </div>
            </form>

            {/* Login Link - Better spacing on mobile */}
            <div className="text-center mt-4 sm:mt-6">
              <p className="text-gray-600 text-xs sm:text-sm">
                Already have an account?{' '}
                <Link
                  to="/staff-login"
                  className="text-blue-600 hover:underline"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>

          {/* Right Side: Image Section - Hidden on mobile, visible on larger screens */}
          <div className="hidden md:block md:w-1/2 relative">
            <img
              src="/signup_side.jpg"
              alt="Background Image"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;