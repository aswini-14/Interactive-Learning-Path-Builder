import React, { useEffect, useState } from 'react';
import { getPaths } from '../../api/paths';
import { Link } from 'react-router-dom';
import './CreatorDashboard.css'; // Importing the CSS

export default function CreatorDashboard() {
  const [paths, setPaths] = useState([]);

  useEffect(() => {
    getPaths().then(r => setPaths(r.data));
  }, []);

  return (
    <div className="creator-dashboard">
      <h2>Your Paths</h2>
      <Link to="/paths/create" className="create-new-path">+ Create New Path</Link>
      <ul className="paths-list">
        {paths.map(p => (
          <li key={p.id} className="path-item">
            <Link to={`/paths/${p.id}`} className="path-link">{p.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
