import React from 'react';
import './Dashboard.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const handleClick=()=>{
    navigate("/");
  }
  const profileData = {
    name: 'John Doe',
    age: 30,
    height: '6ft',
    weight: '180lbs'
  };

  const logsData = [
    { date: '2023-01-01', activity: 'Running', duration: '30 mins' },
    { date: '2023-01-02', activity: 'Cycling', duration: '45 mins' }
  ];

  const workoutsData = [
    { name: 'Push-ups', sets: 3, reps: 15 },
    { name: 'Squats', sets: 3, reps: 20 }
  ];

  const settingsData = {
    theme: 'Dark Mode',
    notifications: 'Enabled'
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Fitness Dashboard</h1>
        <nav>
          <ul>
            <li><a href="#profile">Profile</a></li>
            <li><a href="#logs">Logs</a></li>
            <li><a href="#workouts">Workouts</a></li>
            <li><a href="#settings" onClick={handleClick}>Ask AI Agent</a></li>
          </ul>
        </nav>
      </header>
      <div className="dashboard-content">
        <aside className="dashboard-sidebar">
          <ul>
            <li><a href="#profile">Profile</a></li>
            <li><a href="#logs">Logs</a></li>
            <li><a href="#workouts">Workouts</a></li>
            <li><a href="#settings" onClick={handleClick}>Ask AI Agent</a></li>
          </ul>
        </aside>
        <main className="dashboard-main">
          <section id="profile" className="dashboard-section">
            <h2>Profile</h2>
            <div className="profile-card">
              <p><strong>Name:</strong> {profileData.name}</p>
              <p><strong>Age:</strong> {profileData.age}</p>
              <p><strong>Height:</strong> {profileData.height}</p>
              <p><strong>Weight:</strong> {profileData.weight}</p>
            </div>
          </section>
          <section id="logs" className="dashboard-section">
            <h2>Logs</h2>
            <ul className="logs-list">
              {logsData.map((log, index) => (
                <li key={index} className="log-item">
                  <span>{log.date}</span> - <span>{log.activity}</span> for <span>{log.duration}</span>
                </li>
              ))}
            </ul>
          </section>
          <section id="workouts" className="dashboard-section">
            <h2>Workouts</h2>
            <ul className="workouts-list">
              {workoutsData.map((workout, index) => (
                <li key={index} className="workout-item">
                  <span>{workout.name}:</span> {workout.sets} sets of {workout.reps} reps
                </li>
              ))}
            </ul>
          </section>
          <section id="settings" className="dashboard-section">
            <h2>Ask AI Agent</h2>
            <div className="settings-card">
              <p><strong>Theme:</strong> {settingsData.theme}</p>
              <p><strong>Notifications:</strong> {settingsData.notifications}</p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;