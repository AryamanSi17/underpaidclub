import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Blocked from './pages/Blocked';
import Dashboard from './pages/Dashboard';
import ProfileSetup from './pages/ProfileSetup';
import Gauntlet from './pages/Gauntlet';
import ResumePage from './pages/ResumePage';
import Bounties from './pages/Bounties';
import Cohort from './pages/Cohort';
import Community from './pages/Community';
import ProtectedRoute from './components/ProtectedRoute';
import { DotPattern } from './components/ui/DotPattern';
import './App.css';

function App() {
  return (
    <Routes>
      {/* Public routes — keep existing home untouched */}
      <Route
        path="/"
        element={<Home />}
      />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/blocked" element={<Blocked />} />

      {/* Protected student dashboard routes */}
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><ProfileSetup /></ProtectedRoute>} />
      <Route path="/gauntlet" element={<ProtectedRoute><Gauntlet /></ProtectedRoute>} />
      <Route path="/resume" element={<ProtectedRoute><ResumePage /></ProtectedRoute>} />
      <Route path="/bounties" element={<ProtectedRoute><Bounties /></ProtectedRoute>} />
      <Route path="/cohort" element={<ProtectedRoute><Cohort /></ProtectedRoute>} />
      <Route path="/community" element={<ProtectedRoute><Community /></ProtectedRoute>} />
    </Routes>
  );
}

export default App;
