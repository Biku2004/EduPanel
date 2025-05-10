import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SidebarItem = ({ to, text, icon, showLogIcon, onClick }) => {
  const logIconContent = showLogIcon ? <span className="mr-2 text-sm">🔒</span> : null;

  return (
    <li className="mb-3">
      <NavLink
        to={to}
        onClick={onClick} // For handling non-router actions if needed, or triggering popup
        className={({ isActive }) =>
          `flex items-center py-2 px-3 rounded-md transition-colors duration-150 ease-in-out
           ${
             isActive
               ? 'bg-blue-100 text-blue-600 font-semibold dark:bg-blue-700 dark:text-blue-100'
               : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
           }`
        }
      >
        {logIconContent}
        {icon && <FontAwesomeIcon icon={icon} className="mr-3 w-5 h-5" />}
        <span className="flex-1">{text}</span>
      </NavLink>
    </li>
  );
};

export default SidebarItem;