import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Home.css';  // Add this for the styling

export default function Home() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="home-container">
      <div className="welcome-section">
        <h1 className="heading">Welcome to Interactive Learning Platform</h1>
        <p className="subheading">Interactive Learning Path Builder - Create, Learn, Achieve</p>
      </div>

      <div className="auth-section">
        {user ? (
          <div className="user-info">
            <p className="user-greeting">
              Hello, <b>{user.name || 'User'}</b>! You are logged in as <span className="user-role">{user.role}</span>.
            </p>
            <button className="logout-btn" onClick={logout}>Logout</button>
          </div>
        ) : (
          <div className="auth-links">
            <Link to="/login" className="auth-btn">Login</Link> | 
            <Link to="/signup" className="auth-btn">Sign Up</Link>
          </div>
        )}
      </div>
    </div>
  );
}
