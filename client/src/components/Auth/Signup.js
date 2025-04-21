import React, { useState } from 'react';
import { signup } from '../../api/auth';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState(''); // To store error message
  const nav = useNavigate();

  const handleChange = e =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await signup(form); // Sending form data without the role
      nav('/login');
    } catch (err) {
      setError(err.response ? err.response.data.message : 'An error occurred'); // Display the error message from backend
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
      {['name', 'email', 'password'].map(f => ( // Removed 'role'
        <input 
          key={f} 
          name={f} 
          type={f === 'password' ? 'password' : 'text'} 
          placeholder={f} 
          value={form[f]} 
          onChange={handleChange} 
        />
      ))}
      <button type="submit">Sign Up</button>
    </form>
  );
}
