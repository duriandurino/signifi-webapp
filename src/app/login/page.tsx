"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Video, Target, BarChart2, Chrome, Facebook } from 'lucide-react';
import './login.css';

const LoginPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="login-container">
      {/* Left Panel */}
      <div className="left-panel">
        <div className="left-content">
          <div className="logo-section">
            {/* Logo Image */}
            <img 
              src="/white_logo.png"  
              alt="SigniFi Logo" 
              className="logo-img"
            />
            <h2>SigniFi</h2>
            <p>Filipino Sign Language Learning Platform</p>
          </div>

          <div className="features-containers">
          <ul className="feature-list">
            <li>
              <Video className="feature-icon" size={24} />
              <div>
                <h3>Interactive Video Lessons</h3>
              </div>
            </li>
            <li>
              <Target className="feature-icon" size={24} />
              <div>
                <h3>Real-time Gesture Recognition</h3>
              </div>
            </li>
            <li>
              <BarChart2 className="feature-icon" size={24} />
              <div>
                <h3>Comprehensive Analytics</h3>
              </div>
            </li>  
          </ul>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="right-panel">
        <div className="right-content">
          <div className="form-header">
            <h2>Login to your Account</h2>
          </div>

          <form className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <Mail className="input-icon" size={20} />
                <input type="email" id="email" placeholder="Enter your email" />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <Lock className="input-icon" size={20} />
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  id="password"
                  placeholder="Enter your password"
                />
                <button type="button" onClick={togglePasswordVisibility} className="password-toggle">
                  {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="form-options">
              <a href="#" className="forgot-password">Forgot Password?</a>
            </div>

            <button type="submit" className="btn btn-primary">
              Sign In
            </button>
          </form>

          <div className="signup-link">
            <p>Don't have an account? <a href="#">Create Account</a></p>
          </div>
          
          <div className="terms">
            By signing in, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
};



export default LoginPage;

