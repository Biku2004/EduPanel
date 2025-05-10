import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUserPlus, faUsers, faTasks } from '@fortawesome/free-solid-svg-icons';
import SignInPopup from './SignInPopup';

const Sidebar = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const handleProtectedItemClick = (e, itemName) => {
    e.preventDefault();
    setPopupMessage(`Please sign in to access ${itemName}.`);
    setShowPopup(true);
  };

  return (
    <div className="bg-white w-64 p-6 shadow-lg min-h-screen dark:bg-gray-800">
      <div className="flex items-center mb-8">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">EduPanel</h1>
      </div>
      <nav>
        <ul>
          <li className="mb-4">
            <NavLink
              to="/demo/dashboard"
              onClick={(e) => handleProtectedItemClick(e, 'Dashboard')}
              className={({ isActive }) =>
                `flex items-center cursor-pointer ${isActive ? 'text-blue-500 font-semibold' : 'text-gray-700 dark:text-gray-200'}`
              }
            >
              <span className="mr-2">🔒</span>
              <FontAwesomeIcon icon={faHome} className="mr-3" />
              Dashboard
            </NavLink>
          </li>
          <li className="mb-4">
            <NavLink
              to="/demo/add-student"
              className={({ isActive }) =>
                `flex items-center cursor-pointer ${isActive ? 'text-blue-500 font-semibold' : 'text-gray-700 dark:text-gray-200'}`
              }
            >
              <FontAwesomeIcon icon={faUserPlus} className="mr-3" />
              Add Student
            </NavLink>
          </li>
          <li className="mb-4">
            <NavLink
              to="/demo/student-list"
              onClick={(e) => handleProtectedItemClick(e, 'Student List')}
              className={({ isActive }) =>
                `flex items-center cursor-pointer ${isActive ? 'text-blue-500 font-semibold' : 'text-gray-700 dark:text-gray-200'}`
              }
            >
              <span className="mr-2">🔒</span>
              <FontAwesomeIcon icon={faUsers} className="mr-3" />
              Student List
            </NavLink>
          </li>
          <li className="mb-4">
            <NavLink
              to="/demo/tasks"
              onClick={(e) => handleProtectedItemClick(e, 'Tasks')}
              className={({ isActive }) =>
                `flex items-center cursor-pointer ${isActive ? 'text-blue-500 font-semibold' : 'text-gray-700 dark:text-gray-200'}`
              }
            >
              <span className="mr-2">🔒</span>
              <FontAwesomeIcon icon={faTasks} className="mr-3" />
              Tasks
            </NavLink>
          </li>
        </ul>
      </nav>
      <SignInPopup
        show={showPopup}
        onClose={() => setShowPopup(false)}
        message={popupMessage}
      />
    </div>
  );
};

export default Sidebar;