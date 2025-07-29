// frontend/src/components/Results.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Results = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/results');
        setResults(response.data);
      } catch (err) {
        console.error('Error fetching results:', err);
      }
    };

    fetchResults();
  }, []);

  return (
    <div>
      <h2>Results</h2>
      <ul>
        {results.map(result => (
          <li key={result._id}>
            {result.userId.username} - {result.score}/{result.totalQuestions}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Results;
