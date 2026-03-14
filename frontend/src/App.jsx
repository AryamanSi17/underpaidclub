import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import { DotPattern } from './components/ui/DotPattern';
import './App.css';

function App() {
  return (
    <div className="app-container dark">
      <DotPattern className="opacity-80" glowColor="#b38728" />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
