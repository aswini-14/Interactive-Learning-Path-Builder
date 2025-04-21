import React, { useEffect, useState } from 'react';
import { getPaths } from '../../api/paths';
import { Link } from 'react-router-dom';

export default function CreatorDashboard() {
  const [paths, setPaths] = useState([]);
  useEffect(() => { getPaths().then(r=>setPaths(r.data)); }, []);
  return (
    <div>
      <h2>Your Paths</h2>
      <Link to="/paths">+ Create New Path</Link>
      <ul>{paths.map(p=>(
        <li key={p.id}>
          <Link to={`/paths/${p.id}`}>{p.title}</Link>
        </li>
      ))}</ul>
    </div>
  );
}
