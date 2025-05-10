import React, { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt, faTrashAlt, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import SignInPopup from './SignInPopup';

const initialStudentsData = [
  { id: 1, name: 'Bikash Behera', email: 'bikash.behera24.04.2004@gmail.com', course: 'Mechanical Engineering', enrollmentYear: '2026', status: 'Active', selected: false },
  { id: 2, name: 'Kalinga Kishore', email: 'litubikash123@gmail.com', course: 'Computer Science', enrollmentYear: '2022', status: 'Pending', selected: false },
  { id: 3, name: 'Priya Sharma', email: 'priya.sharma@example.com', course: 'Electrical Engineering', enrollmentYear: '2024', status: 'Active', selected: false },
  { id: 4, name: 'Amit Patel', email: 'amit.patel@example.com', course: 'Computer Science', enrollmentYear: '2023', status: 'Graduated', selected: false },
  { id: 5, name: 'Sneha Reddy', email: 'sneha.reddy@example.com', course: 'Mechanical Engineering', enrollmentYear: '2025', status: 'Active', selected: false },
];

const StudentList = () => {
  const [students, setStudents] = useState(initialStudentsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourseFilter, setSelectedCourseFilter] = useState('');
  const [selectedYearFilter, setSelectedYearFilter] = useState('');
  const [showActionPopup, setShowActionPopup] = useState(false);
  const [actionPopupMessage, setActionPopupMessage] = useState('');

  const handleGenericAction = (actionName) => {
    setActionPopupMessage(`Please sign in to ${actionName}.`);
    setShowActionPopup(true);
  };

  const handleSelectStudent = (studentId, isSelected) => {
    setStudents(prevStudents =>
      prevStudents.map(s =>
        s.id === studentId ? { ...s, selected: isSelected } : s
      )
    );
  };

  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    setStudents(prevStudents => prevStudents.map(s => ({ ...s, selected: isChecked })));
  };

 
  const uniqueCourses = useMemo(() => ['', ...new Set(students.map(s => s.course))], [students]);
  const uniqueYears = useMemo(() => ['', ...new Set(students.map(s => s.enrollmentYear).sort())], [students]);

  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const term = searchTerm.toLowerCase();
      const nameMatch = student.name.toLowerCase().includes(term);
      const emailMatch = student.email.toLowerCase().includes(term);
      const courseMatch = selectedCourseFilter === '' || student.course === selectedCourseFilter;
      const yearMatch = selectedYearFilter === '' || student.enrollmentYear === selectedYearFilter;
      return (nameMatch || emailMatch) && courseMatch && yearMatch;
    });
  }, [students, searchTerm, selectedCourseFilter, selectedYearFilter]);

  const isAllSelected = filteredStudents.length > 0 && filteredStudents.every(s => s.selected);

  return (
    <div className="container mx-auto bg-white p-6 rounded-lg shadow dark:bg-gray-800 dark:text-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Student List</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleGenericAction('Reload data')}
            className="text-blue-500 hover:text-blue-700"
          >
            <span className="mr-1">🔒</span>
            <FontAwesomeIcon icon={faSyncAlt} className="mr-1" />
            Reload
          </button>
          <button
            onClick={() => handleGenericAction('Delete Selected students')}
            className="text-red-500 hover:text-red-700"
          >
            <span className="mr-1">🔒</span>
            <FontAwesomeIcon icon={faTrashAlt} className="mr-1" />
            Delete Selected
          </button>
          <button
            onClick={() => handleGenericAction('Export All students')}
            className="text-green-500 hover:text-green-700"
          >
            <span className="mr-1">🔒</span>
            <FontAwesomeIcon icon={faFilePdf} className="mr-1" />
            Export All
          </button>
          <button
            onClick={() => handleGenericAction('Export Selected students')}
            className="text-green-500 hover:text-green-700"
          >
            <span className="mr-1">🔒</span>
            <FontAwesomeIcon icon={faFilePdf} className="mr-1" />
            Export Selected
          </button>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow p-2 border border-gray-300 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600"
        />
        <select
          value={selectedCourseFilter}
          onChange={(e) => setSelectedCourseFilter(e.target.value)}
          aria-label="Filter by course"
          className="p-2 border border-gray-300 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600"
        >
          <option value="">All Courses</option>
          {uniqueCourses.filter(c => c).map(course => (
            <option key={course} value={course}>{course}</option>
          ))}
        </select>
        <select
          value={selectedYearFilter}
          onChange={(e) => setSelectedYearFilter(e.target.value)}
          aria-label="Filter by year"
          className="p-2 border border-gray-300 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600"
        >
          <option value="">All Years</option>
          {uniqueYears.filter(y => y).map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 dark:text-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-600"
                  aria-label="Select all students"
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                />
              </th>
              <th className="py-2 px-4 border-b text-left">Name</th>
              <th className="py-2 px-4 border-b text-left">Email</th>
              <th className="py-2 px-4 border-b text-left">Course</th>
              <th className="py-2 px-4 border-b text-left">Enrollment Year</th>
              <th className="py-2 px-4 border-b text-left">Status</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map(student => (
                <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="py-2 px-4 border-b">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-600"
                      aria-label={`Select student ${student.name}`}
                      checked={student.selected}
                      onChange={(e) => handleSelectStudent(student.id, e.target.checked)}
                    />
                  </td>
                  <td className="py-2 px-4 border-b">{student.name}</td>
                  <td className="py-2 px-4 border-b">{student.email}</td>
                  <td className="py-2 px-4 border-b">{student.course}</td>
                  <td className="py-2 px-4 border-b">{student.enrollmentYear}</td>
                  <td className="py-2 px-4 border-b">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      student.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100' :
                      student.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100' :
                      'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-100'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleGenericAction(`edit student "${student.name}"`)}
                      className="text-blue-500 hover:text-blue-700 mr-2"
                    >
                      <span className="mr-1">🔒</span> Edit
                    </button>
                    <button
                      onClick={() => handleGenericAction(`delete student "${student.name}"`)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <span className="mr-1">🔒</span> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-4 text-center text-gray-500 dark:text-gray-400">
                  No students found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <SignInPopup
        show={showActionPopup}
        onClose={() => setShowActionPopup(false)}
        message={actionPopupMessage}
      />
    </div>
  );
};

export default StudentList;