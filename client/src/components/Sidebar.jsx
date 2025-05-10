import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faUsers, faHome, faTasks } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  return (
    <div className="bg-white w-64 p-6 shadow-lg min-h-screen dark:bg-gray-800">
      <div className="flex items-center mb-8">
        <h1 className="ml-4 text-xl font-bold text-gray-800 dark:text-white">EduPanel</h1>
      </div>
      <nav>
        <ul>
          <li className="mb-4">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex items-center cursor-pointer ${isActive ? 'text-blue-500 font-semibold' : 'text-gray-700 dark:text-gray-200'}`
              }
            >
              <FontAwesomeIcon icon={faHome} className="mr-3" />
              Dashboard
            </NavLink>
          </li>
          <li className="mb-4">
            <NavLink
              to="/dashboard/add-student"
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
              to="/dashboard/student-list"
              className={({ isActive }) =>
                `flex items-center cursor-pointer ${isActive ? 'text-blue-500 font-semibold' : 'text-gray-700 dark:text-gray-200'}`
              }
            >
              <FontAwesomeIcon icon={faUsers} className="mr-3" />
              Student List
            </NavLink>
          </li>
          <li className="mb-4">
            <NavLink
              to="/dashboard/tasks"
              className={({ isActive }) =>
                `flex items-center cursor-pointer ${isActive ? 'text-blue-500 font-semibold' : 'text-gray-700 dark:text-gray-200'}`
              }
            >
              <FontAwesomeIcon icon={faTasks} className="mr-3" />
              Tasks
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;