import React, { useMemo, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartPie, faChartLine, faUsers } from '@fortawesome/free-solid-svg-icons';
import PieChart from '../components/charts/PieChart';
import LineChart from '../components/charts/LineChart';
import Loader from '../components/Loader';

const Analytics = ({ students, isLoading }) => {
  // Add debugging console.log
  useEffect(() => {
    console.log("Students data in Analytics:", students);
  }, [students]);

  // Calculate analytics data
  const analyticsData = useMemo(() => {
    if (!students || !students.length) return null;

    console.log("Processing analytics data");

    // Course distribution data for pie chart
    const courseDistribution = students.reduce((acc, student) => {
      // Default to "Unknown" if course is missing
      const course = student.course || "Unknown";
      if (!acc[course]) {
        acc[course] = 0;
      }
      acc[course]++;
      return acc;
    }, {});

    console.log("Course distribution:", courseDistribution);

    // Year-wise enrollment data for line chart
    const knownCourses = ['Computer Science', 'Mechanical Engineering', 'Electrical Engineering', 'Civil Engineering'];
    
    const yearlyData = students.reduce((acc, student) => {
      // Default to current year if enrollment year is missing
      const year = student.enrollmentYear || new Date().getFullYear().toString();
      const course = student.course || "Unknown";
      
      if (!acc[year]) {
        acc[year] = {};
        // Initialize all courses to 0 for this year
        knownCourses.forEach(c => (acc[year][c] = 0));
        acc[year]["Unknown"] = 0;
      }
      
      // Increment the course count for this year
      if (acc[year][course] !== undefined) {
        acc[year][course]++;
      } else {
        acc[year]["Unknown"] = (acc[year]["Unknown"] || 0) + 1;
      }
      
      return acc;
    }, {});

    console.log("Yearly data:", yearlyData);

    // Status distribution
    const statusDistribution = students.reduce((acc, student) => {
      // Default to "Unknown" if status is missing
      const status = student.status || "Unknown";
      if (!acc[status]) {
        acc[status] = 0;
      }
      acc[status]++;
      return acc;
    }, {});

    console.log("Status distribution:", statusDistribution);

    return {
      courseDistribution,
      yearlyData,
      statusDistribution,
      totalStudents: students.length
    };
  }, [students]);

  if (isLoading) return <Loader />;

  if (!analyticsData) {
    return (
      <div className="container mx-auto bg-white p-6 rounded-lg shadow dark:bg-gray-800 dark:text-white">
        <h2 className="text-2xl font-bold mb-4">Analytics Dashboard</h2>
        <p>No student data available for analysis.</p>
      </div>
    );
  }

  // Ensure we have at least one value for each chart
  const hasCourseData = Object.values(analyticsData.courseDistribution).length > 0;
  const hasYearlyData = Object.keys(analyticsData.yearlyData).length > 0;

  return (
    <div className="container mx-auto bg-white p-6 rounded-lg shadow dark:bg-gray-800 dark:text-white">
      <h2 className="text-2xl font-bold mb-6">Analytics Dashboard</h2>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg shadow">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faUsers} className="text-blue-500 text-3xl mr-3" />
            <div>
              <h3 className="text-lg font-medium">Total Students</h3>
              <p className="text-2xl font-bold">{analyticsData.totalStudents}</p>
            </div>
          </div>
        </div>
        <div className="bg-green-50 dark:bg-gray-700 p-4 rounded-lg shadow">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faChartPie} className="text-green-500 text-3xl mr-3" />
            <div>
              <h3 className="text-lg font-medium">Most Popular Course</h3>
              <p className="text-2xl font-bold">
                {hasCourseData 
                  ? Object.entries(analyticsData.courseDistribution).sort((a, b) => b[1] - a[1])[0][0]
                  : 'N/A'}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-purple-50 dark:bg-gray-700 p-4 rounded-lg shadow">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faChartLine} className="text-purple-500 text-3xl mr-3" />
            <div>
              <h3 className="text-lg font-medium">Latest Year Growth</h3>
              <p className="text-2xl font-bold">
                {hasYearlyData
                  ? Object.keys(analyticsData.yearlyData).sort().slice(-1)[0]
                  : 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-4">Course Distribution</h3>
          <div className="h-80" style={{ minHeight: "300px" }}>
            {hasCourseData ? (
              <PieChart data={analyticsData.courseDistribution} />
            ) : (
              <div className="flex h-full items-center justify-center">
                <p>No course data available</p>
              </div>
            )}
          </div>
        </div>
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-4">Enrollment Trends by Year</h3>
          <div className="h-80" style={{ minHeight: "300px" }}>
            {hasYearlyData ? (
              <LineChart data={analyticsData.yearlyData} />
            ) : (
              <div className="flex h-full items-center justify-center">
                <p>No yearly enrollment data available</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Status Distribution */}
      <div className="mt-8 bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
        <h3 className="text-xl font-bold mb-4">Status Distribution</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(analyticsData.statusDistribution).map(([status, count]) => (
            <div 
              key={status} 
              className="bg-gray-50 dark:bg-gray-600 p-4 rounded-lg text-center"
            >
              <h4 className="text-lg font-medium">{status}</h4>
              <p className="text-2xl font-bold">{count}</p>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                {((count / analyticsData.totalStudents) * 100).toFixed(1)}%
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;