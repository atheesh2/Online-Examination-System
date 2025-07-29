// frontend/src/components/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleNormalLogin = () => {
    navigate('/login');
  };

  const handleAdminLogin = () => {
    navigate('/admin/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="container">
      <div className="left-section">
        <img src="../illustration.png" alt="Exam illustration" />
        <h3>Online Examination System</h3>
        <p>Unleash Your Academic Success with Our Exam Excellence Platform</p>
      </div>
      <div className="right-section">
        <h2>Online Examination System</h2>
        <button onClick={handleNormalLogin}>Login</button>
        <button onClick={handleAdminLogin}>Admin Login</button>
        <button onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
};

export default Home;
