import React, { useState } from 'react';
import { getFreshToken } from '../utils/auth';
import StudentTable from './StudentTable';

const AddStudent = ({
  students,
  setStudents,
  fetchStudents,
  selectedStudent,
  setSelectedStudent,
  isLoading,
}) => {
  const [formData, setFormData] = useState(
    selectedStudent || {
      name: '',
      email: '',
      course: '',
      enrollmentYear: '',
    }
  );
  const [selectedCourse, setSelectedCourse] = useState('');
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [error, setError] = useState(null);

  const courses = ['Computer Science', 'Mechanical Engineering', 'Electrical Engineering', 'Civil Engineering'];

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsFormLoading(true);
    setError(null);
    try {
      if (selectedStudent) {
        await onUpdateStudent(selectedStudent.id, formData);
        setSelectedStudent(null);
      } else {
        await onAddStudent(formData);
      }
      setFormData({ name: '', email: '', course: '', enrollmentYear: '' });
      alert(selectedStudent ? 'Student updated successfully' : 'Student added successfully');
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'Failed to save student. Please try again.');
    } finally {
      setIsFormLoading(false);
    }
  };

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setFormData({
      name: student.name,
      email: student.email,
      course: student.course,
      enrollmentYear: student.enrollmentYear,
    });
    setError(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await onDeleteStudent(id);
        alert('Student deleted successfully');
      } catch (error) {
        console.error('Error deleting student:', error);
        setError(error.message || 'Failed to delete student. Please try again.');
      }
    }
  };

  const isFormValid = () => {
    return (
      formData.name.trim() !== '' &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
      formData.course !== '' &&
      formData.enrollmentYear.match(/^\d{4}$/)
    );
  };

  const onAddStudent = async (data) => {
    const token = await getFreshToken();
    const response = await fetch('http://localhost:5000/api/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to add student');
    }
    const newStudent = await response.json();
    setStudents([...students, newStudent]);
    return newStudent;
  };

  const onUpdateStudent = async (id, data) => {
      const token = await getFreshToken();
      const response = await fetch(`http://localhost:5000/api/students/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update student');
      }
      const updatedStudent = await response.json();
      setStudents(students.map((s) => (s.id === id ? updatedStudent : s)));
      return updatedStudent;
    };

  const onDeleteStudent = async (id) => {
      const token = await getFreshToken();
      const response = await fetch(`http://localhost:5000/api/students/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete student');
      }
      setStudents(students.filter((s) => s.id !== id));
      return id;
    };

  return (
    <div className="container mx-auto">
      <div className="bg-white p-6 rounded-lg shadow dark:bg-gray-800 dark:text-white">
        <h2 className="text-2xl font-bold mb-4 dark:bg-gray-800 dark:text-white">
          {selectedStudent ? 'Edit Student' : 'Add New Student'}
        </h2>
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleFormSubmit} className="grid grid-cols-2 gap-4 dark:bg-gray-800 dark:text-white">
          <div>
            <label className="block text-gray-700 dark:bg-gray-800 dark:text-white">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              className="w-full p-2 border border-gray-300 rounded dark:bg-gray-800 dark:text-white"
              placeholder="John Doe"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:bg-gray-800 dark:text-white">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              className="w-full p-2 border border-gray-300 rounded dark:bg-gray-800 dark:text-white"
              placeholder="john@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:bg-gray-800 dark:text-white">Course</label>
            <select
              name="course"
              value={formData.course}
              onChange={handleFormChange}
              className="w-full p-2 border border-gray-300 rounded dark:bg-gray-800 dark:text-white"
              required
            >
              <option value="">Select Course</option>
              {courses.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 dark:bg-gray-800 dark:text-white">Enrollment Year</label>
            <input
              type="text"
              name="enrollmentYear"
              value={formData.enrollmentYear}
              onChange={handleFormChange}
              className="w-full p-2 border border-gray-300 rounded dark:bg-gray-800 dark:text-white"
              placeholder="2023"
              required
            />
          </div>
          <div className="col-span-2">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-blue-400"
              disabled={!isFormValid() || isFormLoading}
            >
              {isFormLoading
                ? selectedStudent
                  ? 'Updating...'
                  : 'Adding...'
                : selectedStudent
                ? 'Update Student'
                : 'Add Student'}
            </button>
            {selectedStudent && (
              <button
                type="button"
                className="ml-4 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                onClick={() => {
                  setSelectedStudent(null);
                  setFormData({ name: '', email: '', course: '', enrollmentYear: '' });
                  setError(null);
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <StudentTable
        students={students}
        setStudents={setStudents}
        selectedCourse={selectedCourse}
        setSelectedCourse={setSelectedCourse}
        fetchStudents={fetchStudents}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        isLoading={isLoading}
      />
    </div>
  );
};

export default AddStudent;