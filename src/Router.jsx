import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import App from './App';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

const isAuthenticated = () => {
  // Replace with actual authentication logic
  return true || localStorage.getItem('authToken') !== null;
};

const AuthenticatedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

const NonAuthenticatedRoute = ({ children }) => {
  return !isAuthenticated() ? children : <Navigate to="/dashboard" />;
};

const AppRouter = () => {
  return (
    <Router>
      {isAuthenticated() && <Header />}
      <div className="app-container">
        {isAuthenticated() && <Sidebar />}
        <Routes>
          <Route path="/login" element={<NonAuthenticatedRoute><Login /></NonAuthenticatedRoute>} />
          <Route path="/*" element={<AuthenticatedRoute><App /></AuthenticatedRoute>} />
        </Routes>
      </div>
    </Router>
  );
};

export default AppRouter;