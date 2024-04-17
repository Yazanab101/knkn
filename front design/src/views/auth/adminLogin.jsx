import React, { useState } from 'react';
import axios from 'axios';
import './adminLogin.css'; // Import the CSS file

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if email and password are provided
    if (!email || !password) {
      setError('Please provide both email and password');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5002/admin/login', { email, password });
      if (response.data.status === 'ok') {
        alert('Login successful');
        localStorage.setItem('isAdmin', 'true');
        localStorage.setItem('token', response.data.token);
      console.log('Token',response.data.token)
        localStorage.removeItem('isOwner');
        localStorage.removeItem('isClient');
        window.location.replace('/admin-dashboard');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Invalid credentials');
      } else {
        setError('An error occurred. Please try again.');
        console.error('An error occurred:', error);
      }
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="form-title">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-field">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="submit-button">Login</button>
          {error && <p className="form-error">{error}</p>}

        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
