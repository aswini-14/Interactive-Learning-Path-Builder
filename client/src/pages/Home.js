import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Home() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div>
      <h1>Welcome to ILP Builder</h1>
      {user ? (
        <>
          <p>Hello, {user.name || 'User'}! You are logged in as <b>{user.role}</b>.</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link> | <Link to="/signup">Sign Up</Link>
        </>
      )}
    </div>
  );
}
