import React from 'react';

const StudentListItem = ({ student, onActionClick, onSelect, isSelected }) => {
  const { name, email, course, enrollmentYear, status } = student;

  const handleCheckboxChange = (e) => {
    onSelect(student.id, e.target.checked);
  };

  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
      <td className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 text-center">
        <input
          type="checkbox"
          className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-900 dark:border-gray-600 dark:checked:bg-blue-500"
          aria-label={`Select student ${name}`}
          checked={isSelected}
          onChange={handleCheckboxChange}
        />
      </td>
      <td className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300">{name}</td>
      <td className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300">{email}</td>
      <td className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300">{course}</td>
      <td className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300">{enrollmentYear}</td>
      <td className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 text-sm">
        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
          status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100' :
          status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100' :
          'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-100'
        }`}>
          {status || 'N/A'}
        </span>
      </td>
      <td className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300">
        <div className="flex items-center space-x-2">
          <button
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium py-1 px-2 rounded text-xs flex items-center"
            onClick={() => onActionClick(`edit student "${name}"`)}
            aria-label={`Edit student ${name}`}
          >
            <span className="mr-1">🔒</span> Edit
          </button>
          <button
            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 font-medium py-1 px-2 rounded text-xs flex items-center"
            onClick={() => onActionClick(`delete student "${name}"`)}
            aria-label={`Delete student ${name}`}
          >
            <span className="mr-1">🔒</span> Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default StudentListItem;