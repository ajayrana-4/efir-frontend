import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/App.css';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EnquiryPage from './pages/EnquiryPage';
import RegisterFIRPage from './pages/RegisterFIRPage';
import FIREnquiryPage from './pages/FIREnquiryPage';
import MyFIRsPage from './pages/MYFIRsPage';
import FIRDetailsPage from './pages/FIRDetailsPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  
  // Mock authentication for frontend demo
  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);
  
  // Login function for frontend demo
  const login = (userData) => {
    // In a real app, this would make an API call
    // For demo, we'll just store in localStorage
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
  };
  
  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };
  
  // Protected route component
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<HomePage user={user} logout={logout} />} />
        <Route path="/login" element={<LoginPage login={login} />} />
        <Route path="/register" element={<RegisterPage login={login} />} />
        <Route path="/enquiry" element={<EnquiryPage user={user} logout={logout} />} />
        
        {/* Protected Routes */}
        <Route 
          path="/register-fir" 
          element={
            <ProtectedRoute>
              <RegisterFIRPage user={user} logout={logout} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/fir-enquiry" 
          element={
            <ProtectedRoute>
              <FIREnquiryPage user={user} logout={logout} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/my-firs" 
          element={
            <ProtectedRoute>
              <MyFIRsPage user={user} logout={logout} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/fir-details/:id" 
          element={
            <ProtectedRoute>
              <FIRDetailsPage user={user} logout={logout} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <ProfilePage user={user} logout={logout} />
            </ProtectedRoute>
          } 
        />
        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;