import React, { useState } from 'react';
import SignInPopup from './SignInPopup';

const AddNewStudentForm = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('');
  const [enrollmentYear, setEnrollmentYear] = useState(new Date().getFullYear().toString());
  const [showPopup, setShowPopup] = useState(false);

  const courses = [
    'Computer Science',
    'Mechanical Engineering',
    'Electrical Engineering',
    'Civil Engineering',
    'Business Administration',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPopup(true);
  };

  return (
    <div className="container mx-auto bg-white p-6 rounded-lg shadow dark:bg-gray-800 dark:text-white mb-8">
      <h2 className="text-2xl font-bold mb-4 dark:bg-gray-800 dark:text-white">
        Add New Student
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="fullName" className="block text-gray-700 dark:bg-gray-800 dark:text-white mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="John Doe"
            className="w-full p-2 border border-gray-300 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-700 dark:bg-gray-800 dark:text-white mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@example.com"
            className="w-full p-2 border border-gray-300 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600"
            required
          />
        </div>
        <div>
          <label htmlFor="course" className="block text-gray-700 dark:bg-gray-800 dark:text-white mb-1">
            Course
          </label>
          <select
            id="course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600"
            required
          >
            <option value="">Select Course</option>
            {courses.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="enrollmentYear" className="block text-gray-700 dark:bg-gray-800 dark:text-white mb-1">
            Enrollment Year
          </label>
          <input
            type="text"
            id="enrollmentYear"
            value={enrollmentYear}
            onChange={(e) => setEnrollmentYear(e.target.value)}
            placeholder={new Date().getFullYear().toString()}
            pattern="\d{4}"
            title="Enter a 4-digit year"
            className="w-full p-2 border border-gray-300 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600"
            required
          />
        </div>
        <div className="col-span-1 md:col-span-2">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 dark:focus:ring-offset-gray-800 transition duration-150 ease-in-out"
          >
            Add Student
          </button>
        </div>
      </form>
      <SignInPopup
        show={showPopup}
        onClose={() => setShowPopup(false)}
        message="Please sign in to use this feature."
      />
    </div>
  );
};

export default AddNewStudentForm;