import React, { useState } from 'react';
import { signup } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import './Signup.css';  // Add this for styling

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');  // Added state for success message
  const nav = useNavigate();

  const handleChange = e =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await signup(form); // Sending form data without the role
      setSuccessMessage('Registration successful! You can now log in.');
      setTimeout(() => nav('/login'), 2000);  // Redirect to login after 2 seconds
    } catch (err) {
      setError(err.response ? err.response.data.message : 'An error occurred');
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2 className="form-heading">Sign Up</h2>
        {error && <p className="error-message">{error}</p>}  {/* Display error message */}
        {successMessage && <p className="success-message">{successMessage}</p>} {/* Display success message */}
        
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="input-field"
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="input-field"
          />
        </div>

        <button type="submit" className="submit-btn">Sign Up</button>
        <div>
        <p className="login-redirect">
        Already registered? <a href="/login">Go to Login</a>
      </p>
        </div>
      </form>
      
    </div>
  );
}
