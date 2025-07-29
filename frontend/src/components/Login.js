// frontend/src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://online-examination-system-uje7.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        localStorage.setItem('userId', data.userId);
        setError('');
        navigate('/exam');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      setError('Error occurred during login');
    }
  };

  return (
    <div className="container">
      <div className="left-section">
        <img src="../illustration.png" alt="Login Illustration" />
        <h3>Welcome Back!</h3>
        <p>Enter your credentials to access the exam portal.</p>
      </div>

      <div className="right-section">
  <h2>Welcome Back 👋</h2>
  <p>Please login to continue</p>

  <form onSubmit={handleLogin}>
    <div className="form-group">
      <label htmlFor="email">Email:</label>
      <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
    </div>
    <div className="form-group">
      <label htmlFor="password">Password:</label>
      <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
    </div>
    {error && <div className="error">{error}</div>}
    <button type="submit">Login</button>
  </form>
</div>

    </div>
  );
};

export default Login;
