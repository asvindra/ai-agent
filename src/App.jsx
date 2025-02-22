import React from "react";
import Chatbot from "@/components/ChatBot/Chatbot";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DailyRecommendations from "./components/Recommendation/DailyRecommendations";

const App = () => {
  const userId = "your_user_id_here"; // Replace with actual user ID
  return <Chatbot />;
};

export default App;
