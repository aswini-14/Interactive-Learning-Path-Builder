import React, { useState, useEffect } from 'react';
import { getPaths } from '../../api/paths';  // Your function to get paths from backend

const PathList = () => {
  const [paths, setPaths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch paths when the component is mounted
    const fetchPaths = async () => {
      try {
        const response = await getPaths();  // Make a GET request to fetch paths
        setPaths(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching paths');
        setLoading(false);
      }
    };

    fetchPaths();
  }, []);

  if (loading) {
    return <p>Loading paths...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h3>Admin - Learning Paths</h3>
      <ul>
        {paths.map((path) => (
          <li key={path.id}>
            <h4>{path.title}</h4>
            <p>{path.description}</p>

          </li>
        ))}
      </ul>
    </div>
  );
};

export default PathList;
