import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc' or 'desc'

  useEffect(() => {
    const fetchResults = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('https://online-examination-system-uje7.onrender.com/api/admin/results', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const sorted = sortResults(response.data, sortOrder);
        setResults(sorted);
        setFilteredResults(sorted);
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };
    fetchResults();
  }, [sortOrder]);

  const sortResults = (data, order) => {
    return data.sort((a, b) =>
      order === 'asc' ? a.score - b.score : b.score - a.score
    );
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = results.filter((result) =>
      result.userId.username.toLowerCase().includes(value)
    );
    setFilteredResults(filtered);
  };

  const handleSortToggle = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newOrder);
    const reSorted = sortResults([...results], newOrder);
    const filtered = reSorted.filter((result) =>
      result.userId.username.toLowerCase().includes(searchTerm)
    );
    setFilteredResults(filtered);
  };

  return (
    <div className="admin-dashboard">
      <h1>📊 Admin Dashboard</h1>

      {/* Optional: Keep search on top */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by username..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <section className="top-rank-section">
        <h2>🏆 Top 3 Rank Holders</h2>
        <ol>
          {[...results]
            .sort((a, b) => b.score - a.score)
            .slice(0, 3)
            .map((result, index) => (
              <li key={result._id} className={`rank rank-${index + 1}`}>
                <span>{result.userId.username}</span>
                <span>{result.score}/{result.totalQuestions}</span>
              </li>
            ))}
        </ol>
      </section>

      {/* Move sort button below Top 3 */}
      <div className="controls">
        <button onClick={handleSortToggle}>
          Sort: {sortOrder === 'asc' ? '⬆ Ascending' : '⬇ Descending'}
        </button>
      </div>

      <section className="results-section">
        <h2>All Results (Ranked)</h2>
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Username</th>
              <th>Score</th>
              <th>Total Questions</th>
            </tr>
          </thead>
          <tbody>
            {filteredResults.map((result, index) => (
              <tr key={result._id}>
                <td>{index + 1}</td>
                <td>{result.userId.username}</td>
                <td>{result.score}</td>
                <td>{result.totalQuestions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AdminDashboard;
