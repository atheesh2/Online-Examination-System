// frontend/src/components/AdminPanel.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminLogin.css'; // Assuming you have a CSS file for styling

const AdminPanel = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/results', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
        });
        setResults(response.data);
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };

    fetchResults();
  }, []);

  return (
    <div>
      <h2>Admin Results</h2>
      <ul>
        {results.map((result) => (
          <li key={result._id}>
            {result.userId.username} - {result.score}/{result.totalQuestions}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
