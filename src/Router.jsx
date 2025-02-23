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
import { getAccessToken } from "./utils";

const isAuthenticated = () => {
  return getAccessToken() !== null;
};

const AuthenticatedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/onboarding" />;
};

const NonAuthenticatedRoute = ({ children }) => {
  return !isAuthenticated() ? children : <Navigate to="/logs" />;
};

const AppRouter = () => {
  const userId = getAccessToken();
  return (
    <Router>
      {<Header />}
      <div className="app-container">
        {<Sidebar />}
        <Routes>
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
            path="/*"
            element={
              <NonAuthenticatedRoute>
                <OnBoarding />
              </NonAuthenticatedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default AppRouter;
