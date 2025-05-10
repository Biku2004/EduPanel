import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const LineChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // Color palette for different courses
  const courseColors = React.useMemo(() => ({
    'Computer Science': '#4F46E5',
    'Mechanical Engineering': '#10B981',
    'Electrical Engineering': '#F59E0B',
    'Civil Engineering': '#EF4444',
    'Unknown': '#888888',
  }), []);

  useEffect(() => {
    // Debug log
    console.log("LineChart data:", data);
    
    if (!data || Object.keys(data).length === 0) {
      console.log("No data for LineChart");
      return;
    }

    // Ensure the canvas is present
    const canvas = chartRef.current;
    if (!canvas) {
      console.error("Canvas ref is not available");
      return;
    }

    // Destroy previous chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    try {
      // Sort years for the x-axis
      const years = Object.keys(data).sort();
      
      // Get all unique courses from the data
      const allCourses = new Set();
      Object.values(data).forEach(yearData => {
        Object.keys(yearData).forEach(course => allCourses.add(course));
      });
      const courses = Array.from(allCourses);

      console.log("Creating LineChart with years:", years, "and courses:", courses);

      // Create datasets for each course
      const datasets = courses.map(course => {
        return {
          label: course,
          data: years.map(year => (data[year] && data[year][course]) || 0),
          borderColor: courseColors[course] || '#888888',
          backgroundColor: `${courseColors[course] || '#888888'}33`,
          tension: 0.2,
          fill: false,
          pointBackgroundColor: courseColors[course] || '#888888',
          pointRadius: 4,
          pointHoverRadius: 6
        };
      });

      // Get canvas context
      const ctx = canvas.getContext('2d');
      
      // Create new chart
      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: years,
          datasets: datasets
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                precision: 0,
                color: document.documentElement.classList.contains('dark') ? 'white' : 'black',
              },
              grid: {
                color: document.documentElement.classList.contains('dark') ? '#444' : '#ddd',
              },
              title: {
                display: true,
                text: 'Number of Students',
                color: document.documentElement.classList.contains('dark') ? 'white' : 'black',
              }
            },
            x: {
              ticks: {
                color: document.documentElement.classList.contains('dark') ? 'white' : 'black',
              },
              grid: {
                color: document.documentElement.classList.contains('dark') ? '#444' : '#ddd',
              },
              title: {
                display: true,
                text: 'Enrollment Year',
                color: document.documentElement.classList.contains('dark') ? 'white' : 'black',
              }
            }
          },
          plugins: {
            legend: {
              position: 'top',
              labels: {
                color: document.documentElement.classList.contains('dark') ? 'white' : 'black',
                padding: 15
              }
            },
            tooltip: {
              mode: 'index',
              intersect: false
            }
          },
          interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false
          }
        }
      });
      
      console.log("LineChart created successfully");
    } catch (error) {
      console.error("Error creating LineChart:", error);
    }

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, courseColors]);

  return (
    <canvas ref={chartRef} height="300" />
  );
};

export default LineChart;