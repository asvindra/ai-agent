import React, { useEffect, useState } from "react";
import "./Logs.css";
import { get, post } from "@/api";
import { getAccessToken } from "@/utils";
import Toaster from "../Toaster";
import moment from "moment";
import Spinner from "../Spinner";

const Logs = () => {
  const [calories, setCalories] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [message, setMessage] = useState("");
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setIsLoading(true);
        const response = await get(`/profile/${getAccessToken()}`);
        setIsLoading(false);
        if (response) {
          setLogs(response?.user?.daily_logs);
        } else {
          setMessage("Failed to fetch logs");
        }
      } catch (error) {
        setIsLoading(false);
        setMessage("Failed to fetch logs");
      }
    };

    fetchLogs();
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await post(
      "/log",
      {
        userId: getAccessToken(),
        calories: Number(calories),
        activityLevel: Number(activityLevel),
      },
      getAccessToken()
    );
    setIsLoading(false);
    setMessage(response.message);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="logs-container p-6 bg-gray-500 text-white rounded-lg shadow-lg max-w-4xl mx-auto flex">
      <div className="form-container w-1/2 pr-4">
        <h2 className="text-2xl font-semibold mb-6">Daily Log Submission</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-white-300">
              Calories
            </label>
            <input
              type="number"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              className="mt-1 p-2 block w-full bg-white-800 text-black rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-white-300">
              Activity Level
            </label>
            <input
              type="number"
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value)}
              className="mt-1 p-2 block w-full bg-white-800 text-black rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="p-2 bg-sky-700 text-white rounded-md hover:bg-sky-300 transition duration-300 ease-in-out"
          >
            Submit
          </button>
        </form>
      </div>
      <div className="logs-list-container w-1/2 pl-4">
        <h2 className="text-xl font-semibold mb-6">Activity Logs</h2>
        <ul className="logs-list space-y-4">
          {logs.map((log, index) => (
            <li
              key={index}
              className="log-entry p-4 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition duration-300 ease-in-out"
            >
              <div>
                Calories
                <div className="text-sm text-gray-400">{log.calories}</div>
              </div>
              <div>
                Activity Level
                <div className="text-sm text-gray-400">
                  {log.activity_level}
                </div>
              </div>
              <div>
                Time
                <div className="text-sm text-gray-400">
                  {moment(log.date.$date).toDate().toString()}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {message && (
        <Toaster
          type={message.includes("successfull") ? "success" : "error"}
          message={message}
        />
      )}
    </div>
  );
};

export default Logs;
