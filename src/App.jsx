import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SplashScreen from "./pages/SplashScreen";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

import AppLayout from "./layout/AppLayout";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Loading screen */}
        <Route path="/" element={<SplashScreen />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />

        {/* Main Chat Layout */}
        <Route path="/app" element={<AppLayout />} />

        {/* Profile */}
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}
