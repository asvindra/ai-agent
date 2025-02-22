import React from 'react';
import Chatbot from '@/components/Chatbot';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DailyRecommendations from './components/DailyRecommendations';

const App = () => {
  const userId = 'your_user_id_here'; // Replace with actual user ID
  return (
      <div className="container mx-auto">
        <Routes>
        <Route path="/" element={<Chatbot />} /> {/* Render Chatbot at the root path */}
        <Route path="/recommendations" element={<DailyRecommendations userId={userId} />} />
        </Routes>
      </div>
  );
};

export default App;