import React from 'react';
import AddNewStudentForm from './AddNewStudentForm';
import StudentList from './StudentList';
import { Routes, Route, Navigate } from 'react-router-dom';

const MainContent = () => {
  return (
    <main className="flex-grow p-6 bg-gray-100 dark:bg-gray-900 overflow-y-auto">
      <Routes>
        <Route path="/" element={<Navigate to="add-student" replace />} />
        <Route path="add-student" element={
          <>
            <AddNewStudentForm />
            <StudentList />
          </>
        } />
        <Route path="student-list" element={
          <>
            <AddNewStudentForm />
            <StudentList />
          </>
        } />
        <Route path="dashboard" element={<div>Dashboard Placeholder</div>} />
        <Route path="tasks" element={<div>Tasks Placeholder</div>} />
      </Routes>
    </main>
  );
};

export default MainContent;