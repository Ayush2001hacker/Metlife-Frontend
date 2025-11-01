import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Home from "./pages/home";
import SubmitClaim from "./pages/SubmitClaim";
import TrackClaims from "./pages/TrackClaims";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";

const AppLayout = () => {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/submit-claim" element={<ProtectedRoute><SubmitClaim /></ProtectedRoute>} />
        <Route path="/track-claims" element={<ProtectedRoute><TrackClaims /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
};

// Simple Protected Route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return isLoggedIn ? <>{children}</> : <Navigate to="/login" replace />;
};

const App = () => (
  <Router>
    <AppLayout />
  </Router>
);

export default App;
