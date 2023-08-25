import React from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css'; // Import your CSS file for custom styling

const LoginPage = () => {
  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-header">Login</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input type="text" className="form-control" id="username" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" />
          </div>
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
