import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import AddStudent from '../components/AddStudent';
import StudentList from '../components/StudentList';
import Header from '../components/Header';
import AnalyticsPage from './AnalyticsPage';
import { getFreshToken } from '../utils/auth';
import LineChart from '../components/charts/LineChart';
import PieChart from '../components/charts/PieChart';
import Analytics from './Analytics';


const Dashboard = () => {
  
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const fetchStudents = async () => {
    setIsLoading(true);
    try {
      const token = await getFreshToken();
      const response = await fetch('http://localhost:5000/api/students', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch students');
      }
      const data = await response.json();
      console.log("Fetched students:", data); // Debug log
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
      alert(`Failed to fetch students: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const addStudent = async (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newStudent = { ...data, id: students.length + 1, status: 'Active' };
        setStudents([...students, newStudent]);
        resolve(newStudent);
      }, 1000);
    });
  };

  const updateStudent = async (id, data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const updatedStudent = { ...data, id };
        setStudents(students.map((s) => (s.id === id ? updatedStudent : s)));
        resolve(updatedStudent);
      }, 1000);
    });
  };

  const deleteStudent = async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setStudents(students.filter((s) => s.id !== id));
        resolve(id);
      }, 1000);
    });
  };

  const handleEdit = (student) => {
    setSelectedStudent(student);
    window.location.href = '/dashboard/add-student'; // Navigate to AddStudent route
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      setIsLoading(true);
      try {
        await deleteStudent(id);
        alert('Student deleted successfully');
      } catch (error) {
        console.error('Error deleting student:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

// Create sample data for testing when real data is not available yet
  const sampleStudents = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      course: "Computer Science",
      enrollmentYear: "2022",
      status: "Active"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      course: "Mechanical Engineering",
      enrollmentYear: "2021",
      status: "Active"
    },
    {
      id: 3,
      name: "Robert Johnson",
      email: "robert@example.com",
      course: "Electrical Engineering",
      enrollmentYear: "2022",
      status: "On Leave"
    },
    {
      id: 4,
      name: "Emily Brown",
      email: "emily@example.com",
      course: "Computer Science",
      enrollmentYear: "2023",
      status: "Active"
    },
    {
      id: 5,
      name: "Michael Wilson",
      email: "michael@example.com", 
      course: "Civil Engineering",
      enrollmentYear: "2022",
      status: "Active"
    }
  ];


  const displayStudents = students.length > 0 ? students : sampleStudents;


  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 p-6">
      <Header/>
        <Routes>
          <Route
            path="/"
            element={
              <div className="container mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Dashboard Overview</h2>
                <p className="text-gray-700 dark:text-gray-300">Welcome to the Centurion University Student Management Dashboard.</p>
                
                {/* 
                <LineChart />
                <PieChart /> */}
                <Analytics 
                  students={displayStudents} 
                  isLoading={isLoading} 
                />
                {/* <AnalyticsPage /> */}
            </div>
            
            }
          />
          <Route
            path="/add-student"
            element={
              <AddStudent
                onAddStudent={addStudent}
                onUpdateStudent={updateStudent}
                onDeleteStudent={deleteStudent}
                selectedStudent={selectedStudent}
                setSelectedStudent={setSelectedStudent}
                students={students}
                setStudents={setStudents}
                fetchStudents={fetchStudents}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path="/student-list"
            element={
              <StudentList
                students={students}
                setStudents={setStudents}
                selectedCourse={selectedCourse}
                setSelectedCourse={setSelectedCourse}
                fetchStudents={fetchStudents}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path="/tasks"
            element={
              <div className="container mx-auto bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-4">Tasks</h2>
                <p>Manage your tasks here.</p>
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;