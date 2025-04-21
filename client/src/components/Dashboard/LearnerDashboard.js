// src/components/LearnerDashboard.js
import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';  // Import AuthContext
import { getPaths } from '../../api/paths';
import './LearnerDashboard.css';

export default function LearnerDashboard() {
  const { user } = useContext(AuthContext);  // Get user data from AuthContext
  const [paths, setPaths] = useState([]);
  const navigate = useNavigate();  // Use navigate hook for redirection

  useEffect(() => {
    if (user && user.role !== 'learner') {
      // Redirect if user is not a learner
      navigate('/');  // Redirect to home or another appropriate page
    } else {
      getPaths().then(r => setPaths(r.data));  // Fetch paths only if user is a learner
    }
  }, [user, navigate]);

  return (
    <div className="learner-dashboard">
      <h2>Your Learning Paths</h2>
      <ul className="paths-list">
        {paths.map(p => (
          <li key={p.id} className="path-item">
            <Link to={`/paths/${p.id}`} className="path-link">
              {p.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
