// frontend/src/components/AdminLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminLogin.css'; // You can reuse Home.css styles if preferred

const AdminLogin = () => {
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/admin/login', {
        email: adminEmail,
        password: adminPassword,
      });

      localStorage.setItem('token', response.data.token);
      setError('');
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Error during admin login:', error);
      setError('Invalid credentials');
    }
  };

  return (
    <div className="container">
      <div className="left-section">
        <img src="../illustration.png" alt="Admin Illustration" />
        <h3>Welcome Admin!</h3>
        <p>Access and manage the exam system securely from your dashboard.</p>
      </div>

      <div className="right-section">
        <h2>Admin Login</h2>
        <form onSubmit={handleAdminLogin}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              required
              placeholder="Enter admin email"
            />
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              required
              placeholder="Enter password"
            />
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
