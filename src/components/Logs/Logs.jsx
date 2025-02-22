import React, { useState } from "react";
import "./Logs.css";

const Logs = () => {
  const [calories, setCalories] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [message, setMessage] = useState("");

  const dummyLogs = [
    { message: "User logged in", time: "2023-10-01 10:00:00" },
    { message: "User updated profile", time: "2023-10-01 10:05:00" },
    { message: "User logged out", time: "2023-10-01 10:10:00" },
    { message: "User deleted account", time: "2023-10-01 10:15:00" },
    { message: "User created a new post", time: "2023-10-01 10:20:00" },
    { message: "User commented on a post", time: "2023-10-01 10:25:00" },
    { message: "User liked a post", time: "2023-10-01 10:30:00" },
    { message: "User followed another user", time: "2023-10-01 10:35:00" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/log", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        calories: Number(calories),
        activityLevel: Number(activityLevel),
      }),
    });
    const data = await response.json();
    setMessage(data.message);
  };

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
        {message && <p className="mt-4 text-green-500">{message}</p>}
      </div>
      <div className="logs-list-container w-1/2 pl-4">
        <h2 className="text-xl font-semibold mb-6">Activity Logs</h2>
        <ul className="logs-list space-y-4">
          {dummyLogs.map((log, index) => (
            <li
              key={index}
              className="log-entry p-4 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition duration-300 ease-in-out"
            >
              <div>{log.message}</div>
              <div className="text-sm text-gray-400">{log.time}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Logs;
