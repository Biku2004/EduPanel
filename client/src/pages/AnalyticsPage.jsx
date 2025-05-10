import React, { useState, useEffect } from 'react';
import Analytics from './Analytics';
import { getFreshToken } from '../utils/auth';

const AnalyticsPage = () => {
  // Removed unused 'students' state variable
  const [isLoading, setIsLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [error, setError] = useState(null);

    const fetchAnalytics = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = await getFreshToken();
      const response = await fetch('http://localhost:5000/api/analytics', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch analytics');
      }
      const data = await response.json();
      setAnalyticsData(data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      setError(error.message || 'Failed to fetch analytics. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Analytics</h2>
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <pre>{JSON.stringify(analyticsData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default AnalyticsPage;