import React, { useEffect, useState } from 'react';
import { getPaths } from '../../api/paths';
import { Link } from 'react-router-dom';
import './LearnerDashboard.css';  // Import the CSS for custom styles

export default function LearnerDashboard() {
  const [paths, setPaths] = useState([]);

  useEffect(() => {
    getPaths().then(r => setPaths(r.data));
  }, []);

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
