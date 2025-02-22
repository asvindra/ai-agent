import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import App from "./App";
import Login from "./components/Login/Login";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import Logs from "./components/Logs/Logs";
import Help from "./components/Help/Help";
import DailyRecommendations from "./components/Recommendation/DailyRecommendations";
import OnBoarding from "./components/Onboarding/OnBoarding";

const isAuthenticated = () => {
  // Replace with actual authentication logic
  return localStorage.getItem("userId") !== null || false;
};

const AuthenticatedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

const NonAuthenticatedRoute = ({ children }) => {
  return !isAuthenticated() ? children : <Navigate to="/dashboard" />;
};

const AppRouter = () => {
  const userId = ""; //user id
  return (
    <Router>
      {isAuthenticated() && <Header />}
      <div className="app-container">
        {isAuthenticated() && <Sidebar />}
        <Routes>
          import OnBoarding from './OnBoarding'; // Existing routes
          <Route
            path="/login"
            element={
              <NonAuthenticatedRoute>
                <Login />
              </NonAuthenticatedRoute>
            }
          />
          <Route
            path="/logs"
            element={
              <AuthenticatedRoute>
                <Logs />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/help"
            element={
              <AuthenticatedRoute>
                <Help />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/recommendations"
            element={
              <AuthenticatedRoute>
                <DailyRecommendations userId={userId} />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/onboarding"
            element={
              <AuthenticatedRoute>
                <OnBoarding />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/*"
            element={
              <AuthenticatedRoute>
                <App />
              </AuthenticatedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default AppRouter;
