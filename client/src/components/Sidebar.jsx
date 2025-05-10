import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faUsers, faHome, faTasks, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Hamburger Menu Button (Visible on Mobile) */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 text-gray-800 dark:text-white focus:outline-none"
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} className="text-2xl" />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:static bg-white w-64 p-6 shadow-lg min-h-screen dark:bg-gray-800 transition-transform duration-300 ease-in-out z-40 md:w-64 lg:w-72`}
      >
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white md:text-2xl">
            EduPanel
          </h1>
          {/* Close Button (Visible on Mobile) */}
          <button
            className="md:hidden text-gray-800 dark:text-white focus:outline-none"
            onClick={toggleSidebar}
            aria-label="Close Sidebar"
          >
            <FontAwesomeIcon icon={faTimes} className="text-xl" />
          </button>
        </div>
        <nav>
          <ul className="space-y-4">
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `flex items-center cursor-pointer text-sm md:text-base lg:text-lg ${
                    isActive ? 'text-blue-500 font-semibold' : 'text-gray-700 dark:text-gray-200 hover:text-blue-500'
                  }`
                }
                onClick={() => setIsOpen(false)} // Close sidebar on link click (mobile)
              >
                <FontAwesomeIcon icon={faHome} className="mr-3 text-lg" />
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/add-student"
                className={({ isActive }) =>
                  `flex items-center cursor-pointer text-sm md:text-base lg:text-lg ${
                    isActive ? 'text-blue-500 font-semibold' : 'text-gray-700 dark:text-gray-200 hover:text-blue-500'
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                <FontAwesomeIcon icon={faUserPlus} className="mr-3 text-lg" />
                Add Student
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/student-list"
                className={({ isActive }) =>
                  `flex items-center cursor-pointer text-sm md:text-base lg:text-lg ${
                    isActive ? 'text-blue-500 font-semibold' : 'text-gray-700 dark:text-gray-200 hover:text-blue-500'
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                <FontAwesomeIcon icon={faUsers} className="mr-3 text-lg" />
                Student List
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/tasks"
                className={({ isActive }) =>
                  `flex items-center cursor-pointer text-sm md:text-base lg:text-lg ${
                    isActive ? 'text-blue-500 font-semibold' : 'text-gray-700 dark:text-gray-200 hover:text-blue-500'
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                <FontAwesomeIcon icon={faTasks} className="mr-3 text-lg" />
                Tasks
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      {/* Backdrop (Visible on Mobile when Sidebar is Open) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        ></div>
      )}
    </>
  );
};

export default Sidebar;