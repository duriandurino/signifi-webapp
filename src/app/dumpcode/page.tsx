"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import './role.css'; // The stylesheet for this page

const RoleSelectPage = () => {
    const [selectedRole, setSelectedRole] = useState<string | null>(null);

  return (
    <div className="onboarding-container">
      {/* --- Main Header --- */}
      <header className="onboarding-header">
        <div className="logo-area">
          <Image src="/SigniFi.png" alt="SigniFi Logo" width={32} height={32} />
          <span>SigniFi</span>
        </div>
        <nav className="header-nav">
          <a href="#" className="nav-link active">Home</a>
          <a href="#" className="nav-link">About</a>
          <a href="#" className="nav-link">Services</a>
          <a href="#" className="nav-link">Contact</a>
        </nav>
      </header>

      {/* --- Main Content Area --- */}
      <main className="onboarding-main">
        <div className="main-content-wrapper">
          <div className="text-header">
            <h2>Select your role</h2>
            <p>To proceed, choose your role so we can set up your account correctly.</p>
          </div>
          
          <div className="role-selection-grid">
            {/* Educator Card */}
            <div 
              className={`role-card ${selectedRole === 'educator' ? 'selected' : ''}`}
              onClick={() => setSelectedRole('educator')}
            >
              <div className="illustration-wrapper">
                <Image src="/educator.svg" alt="Educator Illustration" width={160} height={160} />
              </div>
              <h4>Educator</h4>
            </div>
            
            {/* Admin Card */}
            <div 
              className={`role-card ${selectedRole === 'admin' ? 'selected' : ''}`}
              onClick={() => setSelectedRole('admin')}
            >
              <div className="illustration-wrapper">
                <Image src="/admin.svg" alt="Admin Illustration" width={160} height={160} />
              </div>
              <h4>Admin</h4>
            </div>
          </div>
          
          <div className="onboarding-footer">
            <button className="btn-next">Next</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RoleSelectPage;