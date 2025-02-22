// src/components/DailyRecommendations.js
import { get } from "@/api";
import { getAccessToken } from "@/utils";
import React, { useEffect, useState } from "react";
import Toaster from "../Toaster";
import Spinner from "../Spinner";
import moment from "moment";

const DailyRecommendations = ({ userId }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

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
        const response = await get(`/recommendations/${getAccessToken()}/`);
        if (response) {
          setMessage(response.details);
        } else {
          setMessage(response.details);
        }
        // const data = await response.json();
        setRecommendations(response.recommendations);
      } catch (err) {
        setMessage("Failed to fetch recommendations: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [userId]);

  if (loading) return <Spinner />;

  return (
    <div className="flex w-full max-w-3xl height mx-auto px-4 relative grow flex flex-col gap-6 pt-6">
      <h2 className="text-xl font-bold mb-4">Daily Recommendations</h2>
      {recommendations?.length === 0 && (
        <h6>There are no recommendations available.</h6>
      )}
      <ul className="list-disc pl-5">
        {recommendations.map((rec, index) => (
          <li key={index} className="mb-2">
            <span className="font-medium">{rec.task}</span> - Due by{" "}
            {moment(rec.dueDate).toDate().toISOString()}
          </li>
        ))}
      </ul>
      {message && (
        <Toaster
          type={message.includes("successfull") ? "success" : "error"}
          message={message}
        />
      )}
    </div>
  );
};

export default DailyRecommendations;
