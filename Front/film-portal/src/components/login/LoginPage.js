import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css'; // Import your CSS file for custom styling
import api from '../../api/axiosConfig'; // Import the 'api' Axios instance from your custom axiosConfig.js

const LoginPage = () => {
  // Define state variables to store the user's input and role
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [userRole, setUserRole] = useState('UnregUser'); // Initialize user role

  // Define a state variable to store any error messages
  const [errorMessage, setErrorMessage] = useState('');

  // Access the history object for redirection
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await api.post('/api/v1/auth/login', formData);

      if (response.status === 200) {
        // Update the user's role to 'RegUser'
        setUserRole('RegUser');
        
        // Store the username in a cookie
        const username = formData.username;
        document.cookie = `username=${username}; path=/`; // Set a cookie named 'username'

        // Redirect the user to the home page upon successful login
        
        navigate('/');

        window.location.reload();
      } else {
        setErrorMessage('Invalid username or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Login failed. Please try again later.');
    }
  };

  // Function to update form data when the user types
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-header">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}
          <div className="login-button">
            <button type="submit" className="btn btn-primary">Login</button>
          </div>
        </form>
        <p className="register-link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
