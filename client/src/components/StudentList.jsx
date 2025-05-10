import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt, faTrashAlt, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Loader from './Loader';

const AddedStudentTable = ({
  students,
  setStudents,
  selectedCourse,
  setSelectedCourse,
  fetchStudents,
  handleEdit,
  handleDelete,
  isLoading,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  // Define courses and years
  const courses = [
    'Computer Science',
    'Mechanical Engineering',
    'Electrical Engineering',
    'Civil Engineering',
  ];
  const years = ['2020', '2021', '2022', '2023', '2024', '2025'];

  // Filter students based on course, year, and search query
  const filteredStudents = students.filter((student) => {
    const matchesCourse = selectedCourse
      ? student.course === selectedCourse
      : true;
    const matchesYear = selectedYear
      ? student.enrollmentYear === selectedYear
      : true;
    const matchesSearch = searchQuery
      ? student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesCourse && matchesYear && matchesSearch;
  });

  // Export to PDF function
  const exportToPDF = (exportSelectedOnly = false) => {
    const doc = new jsPDF();
    const tableData = (exportSelectedOnly
      ? filteredStudents.filter((s) => s.selected)
      : filteredStudents
    ).map((student) => [
      student.name,
      student.email,
      student.course,
      student.enrollmentYear,
      student.status,
    ]);

    if (tableData.length === 0) {
      alert('No students to export');
      return;
    }

    doc.autoTable({
      head: [['Name', 'Email', 'Course', 'Enrollment Year', 'Status']],
      body: tableData,
    });

    doc.save('students.pdf');
  };

  return (
    <div className="container mx-auto bg-white p-6 rounded-lg shadow dark:bg-gray-800 dark:text-white">
      {isLoading && <Loader />}
      <div className="flex justify-between items-center mb-4 dark:bg-gray-800 dark:text-white">
        <h2 className="text-2xl font-bold dark:bg-gray-800 dark:text-white">
          Student List
        </h2>
        <div className="flex items-center gap-2 dark:bg-gray-800 dark:text-white">
          <button
            onClick={fetchStudents}
            className="text-blue-500"
            disabled={isLoading}
          >
            <FontAwesomeIcon icon={faSyncAlt} className="mr-1" />
            Reload
          </button>
          <button
            onClick={() => {
              const selectedIds = students
                .filter((s) => s.selected)
                .map((s) => s.id);
              if (selectedIds.length === 0) {
                alert('No students selected');
                return;
              }
              handleDelete(selectedIds[0]); // Delete first selected for simplicity
            }}
            className="text-red-500"
          >
            <FontAwesomeIcon icon={faTrashAlt} className="mr-1" />
            Delete Selected
          </button>
          <button
            onClick={() => exportToPDF(false)}
            className="text-green-500"
          >
            <FontAwesomeIcon icon={faFilePdf} className="mr-1" />
            Export All
          </button>
          <button
            onClick={() => exportToPDF(true)}
            className="text-green-500"
          >
            <FontAwesomeIcon icon={faFilePdf} className="mr-1" />
            Export Selected
          </button>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 mb-4 dark:bg-gray-800 dark:text-white">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded flex-grow dark:bg-gray-800 dark:text-white"
        />
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="border p-2 rounded dark:bg-gray-800 dark:text-white"
        >
          <option value="">All Courses</option>
          {courses.map((course) => (
            <option key={course} value={course}>
              {course}
            </option>
          ))}
        </select>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="border p-2 rounded dark:bg-gray-800 dark:text-white"
        >
          <option value="">All Years</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
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
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setStudents(
                      students.map((s) => ({ ...s, selected: checked }))
                    );
                  }}
                />
              </th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Course</th>
              <th className="py-2 px-4 border-b">Enrollment Year</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : filteredStudents.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No students found
                </td>
              </tr>
            ) : (
              filteredStudents.map((student) => (
                <tr
                  key={student.id}
                  onClick={() => handleEdit(student)}
                >
                  <td className="py-2 px-4 border-b">
                    <input
                      type="checkbox"
                      checked={student.selected || false}
                      onChange={(e) => {
                        e.stopPropagation();
                        setStudents(
                          students.map((s) =>
                            s.id === student.id
                              ? { ...s, selected: e.target.checked }
                              : s
                          )
                        );
                      }}
                    />
                  </td>
                  <td className="py-2 px-4 border-b">{student.name}</td>
                  <td className="py-2 px-4 border-b">{student.email}</td>
                  <td className="py-2 px-4 border-b">{student.course}</td>
                  <td className="py-2 px-4 border-b">{student.enrollmentYear}</td>
                  <td className="py-2 px-4 border-b">{student.status}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(student);
                      }}
                      className="bg-blue-500 text-white py-1 px-2 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(student.id);
                      }}
                      className="bg-red-500 text-white py-1 px-2 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddedStudentTable;