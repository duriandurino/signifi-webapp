"use client";

import React from 'react';
import Image from 'next/image';
import { Type } from 'lucide-react'; // Using 'Type' for a stylized 'R'
import './triallogin.css';

// A helper component to generate random decorative pluses and circles
const BackgroundDecorations = () => {
  // You can adjust the number of shapes
  const shapes = Array.from({ length: 20 }); 
  return (
    <div className="decorations-container" aria-hidden="true">
      {shapes.map((_, i) => {
        const style = {
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          transform: `scale(${Math.random() * 0.5 + 0.5})`,
          opacity: Math.random() * 0.3 + 0.1,
        };
        return Math.random() > 0.5 ? (
          <span key={i} className="deco-shape plus" style={style}>+</span>
        ) : (
          <span key={i} className="deco-shape circle" style={style}></span>
        );
      })}
    </div>
  );
};

// Main Login Page Component
const RecruitifyLoginPage = () => {
  return (
    <div className="login-page-wrapper">
      <BackgroundDecorations />
      
      <div className="login-content-area">
        <header className="login-header">
          <div className="logo-top">
            <div className="logo-icon-top"><Type size={18} /></div>
            <span>Recruitify</span>
          </div>
          <div className="language-selector">
            {/* In a real app, this might be a component */}
            <span className="flag-icon">🇬🇧</span> 
            <span>EN</span>
          </div>
        </header>

        <main className="login-main">
          <div className="logo-main-icon"><Type size={40} /></div>
          <h1>Sign in</h1>
          <p>Sign in and start managing your candidates!</p>
          
          <form className="login-form-recruitify">
            <input type="text" placeholder="Login" />
            <input type="password" placeholder="Password" />
            
            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <a href="#">Forgot password?</a>
            </div>
            
            <button type="submit" className="btn-login">Login</button>
          </form>
        </main>
      </div>

      <footer className="login-footer">
        <p>© 2018 Recruitify. All rights reserved</p>
        <p>Designed by Ludmila Bieliková</p>
      </footer>

      {/* --- SVG Wave --- */}
      <div className="wave-container">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#153d47" fillOpacity="0.5" d="M0,224L48,229.3C96,235,192,245,288,218.7C384,192,480,128,576,128C672,128,768,192,864,213.3C960,235,1056,213,1152,186.7C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          <path fill="#11323b" fillOpacity="0.6" d="M0,288L48,261.3C96,235,192,181,288,176C384,171,480,213,576,202.7C672,192,768,128,864,112C960,96,1056,128,1152,149.3C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default RecruitifyLoginPage;