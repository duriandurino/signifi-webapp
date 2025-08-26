"use client";

import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, UserPlus } from 'lucide-react';
import './signup.css'; 

const RegisterPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    // The main container now just holds the form panel
    <div className="register-container">
      {/* The form panel is now the only direct child */}
      <div className="form-panel">
        <div className="form-wrapper">
          <div className="form-header">
            {/* You can add your logo here if you want */}
            {/* <img src="/logo.png" alt="SigniFi Logo" className="form-logo" /> */}
            <h2>Create Your Educator Account</h2>
            <p>Join SigniFi and start teaching FSL today</p>
          </div>

          <form className="register-form">
            <div className="name-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" placeholder="Enter first name" />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" placeholder="Enter last name" />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <input type="email" id="email" placeholder="Enter your email" />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  id="password"
                  placeholder="Create a strong password"
                />
                <button type="button" onClick={togglePasswordVisibility} className="password-toggle">
                  {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="institution">Educational Institution</label>
              <input type="text" id="institution" placeholder="University/College name" />
            </div>

            <div className="terms-agreement">
              <input type="checkbox" id="terms" />
              <label htmlFor="terms">
                I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
              </label>
            </div>

            <button type="submit" className="btn-create-account">
              <UserPlus size={20} />
              Create Account
            </button>
          </form>

          <div className="signin-link-footer">
            Already have an account? <a href="/login">Sign In</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;