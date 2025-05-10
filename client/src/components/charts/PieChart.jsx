import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PieChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // Color palette for the chart
  const colorPalette = [
    '#4F46E5', // Indigo
    '#0EA5E9', // Sky
    '#10B981', // Emerald
    '#F59E0B', // Amber
    '#EF4444', // Red
    '#8B5CF6', // Violet
    '#EC4899', // Pink
    '#06B6D4', // Cyan
  ];

  useEffect(() => {
    // Debug log
    console.log("PieChart data:", data);
    
    if (!data || Object.keys(data).length === 0) {
      console.log("No data for PieChart");
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
      // Prepare chart data
      const labels = Object.keys(data);
      const values = Object.values(data);
      const backgroundColors = labels.map((_, i) => colorPalette[i % colorPalette.length]);

      console.log("Creating PieChart with labels:", labels, "and values:", values);

      // Get canvas context
      const ctx = canvas.getContext('2d');
      
      // Create new chart
      chartInstance.current = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            data: values,
            backgroundColor: backgroundColors,
            borderColor: 'white',
            borderWidth: 2,
            hoverOffset: 10,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'right',
              labels: {
                color: document.documentElement.classList.contains('dark') ? 'white' : 'black',
                font: {
                  size: 12
                },
                padding: 15
              }
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const label = context.label || '';
                  const value = context.raw || 0;
                  const total = context.dataset.data.reduce((acc, curr) => acc + curr, 0);
                  const percentage = ((value / total) * 100).toFixed(1);
                  return `${label}: ${value} (${percentage}%)`;
                }
              }
            }
          },
        }
      });
      
      console.log("PieChart created successfully");
    } catch (error) {
      console.error("Error creating PieChart:", error);
    }

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return (
    <canvas ref={chartRef} height="300" />
  );
};

export default PieChart;