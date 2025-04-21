import React, { useState, useContext } from 'react';
import { login as apiLogin } from '../../api/auth';
import { AuthContext } from '../../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // To store error message
  const { login } = useContext(AuthContext);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await apiLogin({ email, password });
      login(res.data.token);
    } catch (err) {
      setError(err.response ? err.response.data.message : 'An error occurred'); // Display the error message from backend
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
      <input placeholder="Email"    value={email}    onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
}
