// src/components/DailyRecommendations.js
import React, { useEffect, useState } from 'react';

const DailyRecommendations = ({ userId }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock data for demonstration
  const mockRecommendations = [
    { task: "Drink 2L of water", dueDate: "2025-02-23" },
    { task: "30 minutes of cardio", dueDate: "2025-02-23" },
    { task: "Prepare healthy meals for the day", dueDate: "2025-02-23" },
  ];

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        // Uncomment the following lines when the API is ready
        // const response = await fetch(`/api/recommendations/${userId}`);
        // if (!response.ok) {
        //   throw new Error('Network response was not ok');
        // }
        // const data = await response.json();
        // setRecommendations(data.recommendations);

        // For now, use mock data
        setRecommendations(mockRecommendations);
      } catch (err) {
        setError('Failed to fetch recommendations: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex w-full max-w-3xl height mx-auto px-4 relative grow flex flex-col gap-6 pt-6">
      <h2 className="text-xl font-bold mb-4">Daily Recommendations</h2>
      <ul className="list-disc pl-5">
        {recommendations.map((rec, index) => (
          <li key={index} className="mb-2">
            <span className="font-medium">{rec.task}</span> - Due by {new Date(rec.dueDate).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DailyRecommendations;
