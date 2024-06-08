// src/App.js
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, AuthContext } from './components/AuthContext';
import Welcome from './components/Welcome';
import Login from './components/Login';
import Layout from './components/Layout';
import PlaylistMaker from './components/PlaylistMaker';
import Vault from './components/Vault';
import Timeline from './components/Timeline';
import Chatbot from './components/Chatbot';
import Achievements from './components/Achievements';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './components/Profile';
import './App.css';

const AppRoutes = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route 
          path="profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="playlist-maker" 
          element={
            <ProtectedRoute>
              <PlaylistMaker />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="vault" 
          element={
            <ProtectedRoute>
              <Vault />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="timeline" 
          element={
            <ProtectedRoute>
              <Timeline />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="chatbot" 
          element={
            <ProtectedRoute>
              <Chatbot />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="achievements" 
          element={
            <ProtectedRoute>
              <Achievements />
            </ProtectedRoute>
          } 
        />
      </Route>
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App;
