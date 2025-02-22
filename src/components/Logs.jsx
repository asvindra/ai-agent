import React from 'react';
import './Logs.css'

const Logs = () => {
  const dummyLogs = [
    { message: 'User logged in', time: '2023-10-01 10:00:00' },
    { message: 'User updated profile', time: '2023-10-01 10:05:00' },
    { message: 'User logged out', time: '2023-10-01 10:10:00' },
    { message: 'User deleted account', time: '2023-10-01 10:15:00' },
    { message: 'User created a new post', time: '2023-10-01 10:20:00' },
    { message: 'User commented on a post', time: '2023-10-01 10:25:00' },
    { message: 'User liked a post', time: '2023-10-01 10:30:00' },
    { message: 'User followed another user', time: '2023-10-01 10:35:00' },
  ];

  return (
    <div className="logs-container p-6 bg-gray-900 text-white rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6">Activity Logs</h2>
      <ul className="logs-list space-y-4">
        {dummyLogs.map((log, index) => (
          <li key={index} className="log-entry p-4 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition duration-300 ease-in-out">
            <div>{log.message}</div>
            <div className="text-sm text-gray-400">{log.time}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Logs;