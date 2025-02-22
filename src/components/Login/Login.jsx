import React, { useState } from 'react';
import './Login.css'; // Import the CSS file for styling

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission
    event.stopPropagation(); // Fix the typo here

    const formData = {
      username,
      password,
    };

    try {
      const response = await fetch('https://your-api-endpoint.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful', data);
        // Handle successful login (e.g., redirect to another page)
      } else {
        console.error('Login failed', response.statusText);
        // Handle login failure (e.g., show error message)
      }
    } catch (error) {
      console.error('Error submitting form', error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login to ChatBot AI</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;