import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faBell } from '@fortawesome/free-solid-svg-icons';
import Switch from './Switch';
import { useDarkMode } from '../context/DarkModeContext';
import { getAuth } from 'firebase/auth';

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useDarkMode();
  const [userData, setUserData] = useState({ name: 'Loading...', role: '...' });


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Try to get user data from localStorage
        const userDataString = localStorage.getItem('user');
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          setUserData({
            name: userData.name || userData.displayName || 'User',
            role: userData.role || 'User'
          });
        } else {
          // If not in localStorage, try to get from token/API
          const auth = await getAuth();
          if (auth && auth.currentUser) {
            setUserData({
              name: auth.currentUser.displayName || 'User',
              role: auth.currentUser.role || 'User'
            });
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUserData({ name: 'User', role: 'User' });
      }
    };

    fetchUserData();
  }, []);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Redirect to login page
    navigate('/');
  };

  // const handleEditProfile = () => {
  //   // Navigate to edit profile page
  //   navigate('/dashboard/edit-profile');
  // };


  return (
    <header className="bg-white dark:bg-gray-800 shadow-md rounded-lg mx-4 my-4">
      <div className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Babycode Dashboard</h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">Welcome back, {userData.name}</p>
          </div>
          <div className="flex items-center space-x-4">

          <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />

            <button className="relative p-2 text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200">
              <FontAwesomeIcon icon={faBell} />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="relative" ref={dropdownRef}>
              <div 
                className="flex items-center cursor-pointer"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <img
                  src="/assets/profile-placeholder.jpg" 
                  alt="User Profile"
                  className="h-10 w-10 rounded-full object-cover border-2 border-blue-500"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(userData.name) + '&background=random';
                  }}
                />
              </div>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1 z-10">
                  <div className="px-4 py-2 border-b dark:border-gray-600">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{userData.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-300">{userData.role}</p>
                  </div>
                  {/* <button
                    onClick={handleEditProfile}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    <FontAwesomeIcon icon={faUserEdit} className="mr-2" />
                    Edit Profile
                  </button> */}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );

};

export default Header;