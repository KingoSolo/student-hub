
// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Onboarding from './components/Onboarding';
import Signup from './components/SignUp';
import Loading from './components/Loading';
import UploadDocs from './components/UploadDocs';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';
import LandingPage from './components/Landing';

function App() {
  return (
    <Router>
      <Routes>
        {/* The onboarding route is here so you can follow the template to create subsequent routes */}
        <Route path="/loading" element={<Loading />} />
       <Route path="/signup" element={<Signup />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/upload" element={<UploadDocs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/landing" element={<LandingPage />} />
      </Routes>
    </Router>

  );
}

export default App;
