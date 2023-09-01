import React from 'react';
import { Link } from 'react-router-dom';
import './RegisterPage.css'; 

const RegisterPage = () => {
  return (
    <div className="register-container">
      <div className="register-form">
        <h2 className="register-header">Register</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input type="text" className="form-control" id="username" />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" id="confirmPassword" />
          </div>
          <div className="register-button">
            <button type="submit" className="btn btn-primary">Register</button>
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
