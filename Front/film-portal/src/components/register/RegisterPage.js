import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './RegisterPage.css';
import api from '../../api/axiosConfig';

const RegisterPage = () => {
  const navigate = useNavigate();

  const [registrationData, setRegistrationData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [registrationError, setRegistrationError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData({
      ...registrationData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (registrationData.password !== registrationData.confirmPassword) {
      setRegistrationError("Passwords don't match.");
      return;
    }

    if (registrationData.password.length < 6) {
      setRegistrationError('Password must be at least 6 characters.');
      return;
    }

    try {
      const response = await api.post('/api/v1/register', registrationData);

      console.log('Registration successful!', response.data);

      // Redirect to the login page
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);

      if (error.response && error.response.data) {
        setRegistrationError(error.response.data);
      } else {
        setRegistrationError('Registration failed. Please try again later.');
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        {registrationError && (
          <div className="error-box">
            {registrationError}
          </div>
        )}
        <h2 className="register-header">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={registrationData.username}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={registrationData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={registrationData.password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              value={registrationData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <div className="register-button">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
        </form>
        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
