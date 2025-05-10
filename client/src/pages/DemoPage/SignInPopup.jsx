import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignInPopup = ({ show, onClose, message }) => {
  const navigate = useNavigate();

  if (!show) {
    return null;
  }

  const handleOkClick = () => {
    onClose(); // Close the popup
    navigate('/staff-signup'); // Redirect to /staff-signup
  };

  const handleCancelClick = () => {
    onClose(); // Close the popup without redirecting
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl text-center w-full max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-gray-800 dark:text-gray-200 text-lg mb-6">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            onClick={handleOkClick}
          >
            OK
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded focus:outline-none focus:ring-2 focus:ring-gray-300"
            onClick={handleCancelClick}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInPopup;