import { get, post } from "@/api";
import { getAccessToken } from "@/utils";
import { FaCheckCircle, FaTimesCircle, FaRegCircle } from "react-icons/fa";

import React, { useEffect, useState } from "react";
import Toaster from "../Toaster";
import Spinner from "../Spinner";
import moment from "moment";

const DailyRecommendations = ({ userId }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  const fetchRecommendations = async () => {
    try {
      const response = await get(`/recommendations/${getAccessToken()}/`);
      if (response) {
        setMessage(response.details);
      } else {
        setMessage(response.details);
      }
      setRecommendations(response.recommendations);
    } catch (err) {
      setMessage("Failed to fetch recommendations: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDone = (id) => {
    const markDone = async (id) => {
      try {
        setLoading(true);
        const response = await post(`/markTaskDone`, { task_id: id });
        if (response) {
          setMessage(response.details || response.message);
          await fetchRecommendations(); // Refresh the recommendations list
        } else {
          setMessage(response.details || response.message);
        }
        setLoading(false);
      } catch (err) {
        setMessage("Failed to Mark Done: " + err.message);
      } finally {
        setLoading(false);
      }
    };
    markDone(id);
  };

  useEffect(() => {
    fetchRecommendations();
  }, [userId]);

  if (loading) return <Spinner />;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Daily Recommendations</h2>
      {recommendations?.length === 0 ? (
        <div className="flex flex-col items-center">
          <img
            src="/public/nodata.jpg"
            alt="No recommendations"
            className="mt-4"
            width="600"
            height="400"
          />
        </div>
      ) : (
        <ul className="list-none">
          {recommendations.map((rec, index) => (
            <li
              key={index}
              className="mb-4 p-4 border rounded-lg shadow flex items-center justify-between"
            >
              <div>
                <span className="font-medium text-lg">{rec.task}</span>
                <div className="text-sm text-gray-500 flex items-center">
                  Due by {moment(rec.dueDate).format("MMMM Do YYYY, h:mm:ss a")}
                </div>
              </div>
              <div className="flex items-center">
                {rec.is_done ? (
                  <>
                    <span className="mr-2 text-blue-500">Done</span>
                    <FaCheckCircle className="text-green-500" size={20} />
                  </>
                ) : (
                  <FaTimesCircle className="text-red-500" size={20} />
                )}
                {!rec.is_done && (
                  <button
                    onClick={() => handleDone(rec._id.$oid)}
                    className="ml-4 text-blue-500 hover:text-blue-700 flex items-center "
                  >
                    Mark Done{" "}
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
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
