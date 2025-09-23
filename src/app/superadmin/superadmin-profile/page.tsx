"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Camera, KeyRound } from "lucide-react";
import "./superadminprofile.css"; // The stylesheet for this page

const SuperAdminProfilePage = () => {
  // Example state (can be fetched/updated via backend later)
  const [user, setUser] = useState({
    firstName: "Admin",
    lastName: "User",
    email: "admin@signifi.com",
    phone: "+63 912 345 6789",
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Placeholder backend call
  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();

    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }

    // Later: Call backend API (e.g., fetch/axios)
    console.log("Submitting password change:", passwords);
    alert("Password updated (placeholder).");
  };

  return (
    <>
      {/* --- Profile Content Grid --- */}
      <div className="sp-grid">
        {/* Left Column */}
        <div className="sp-left-column">
          <div className="sp-card">
            <h3 className="sp-card-title">Profile Picture</h3>
            <div className="sp-profile-picture-area">
              <Image
                src="/profile.jpg"
                alt="Admin User Avatar"
                width={100}
                height={100}
                className="sp-avatar"
              />
              <h4 className="sp-user-name">
                {user.firstName} {user.lastName}
              </h4>
              <p className="sp-user-title">System Administrator</p>
              <button className="sp-btn-change-photo">
                <Camera size={16} /> Change Photo
              </button>
            </div>
          </div>

          <div className="sp-card">
            <h3 className="sp-card-title">Account Overview</h3>
            <div className="sp-overview-list">
              <div className="sp-overview-item">
                <span>Account Type</span>
                <span className="sp-highlight-blue">Super Admin</span>
              </div>
              <div className="sp-overview-item">
                <span>Last Login</span>
                <span>Today, 9:30 AM</span>
              </div>
              <div className="sp-overview-item">
                <span>Account Status</span>
                <span className="sp-highlight-green">Active</span>
              </div>
              <div className="sp-overview-item">
                <span>Member Since</span>
                <span>Jan 2024</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="sp-right-column">
          <div className="sp-card">
            <h3 className="sp-card-title">Personal Information</h3>
            <form className="sp-form">
              <div className="sp-form-row">
                <div className="sp-form-group">
                  <label>First Name</label>
                  <input type="text" value={user.firstName} readOnly />
                </div>
                <div className="sp-form-group">
                  <label>Last Name</label>
                  <input type="text" value={user.lastName} readOnly />
                </div>
              </div>
              <div className="sp-form-row">
                <div className="sp-form-group">
                  <label>Email Address</label>
                  <input type="email" value={user.email} readOnly />
                </div>
                <div className="sp-form-group">
                  <label>Phone Number</label>
                  <input type="tel" value={user.phone} readOnly />
                </div>
              </div>
              {/* 👇 Bio textarea removed */}
            </form>
          </div>

          <div className="sp-card">
            <h3 className="sp-card-title">Security Settings</h3>
            <form className="sp-form" onSubmit={handlePasswordChange}>
              <div className="sp-form-row">
                <div className="sp-form-group">
                  <label>Current Password</label>
                  <input
                    type="password"
                    placeholder="Enter current password"
                    value={passwords.currentPassword}
                    onChange={(e) =>
                      setPasswords({
                        ...passwords,
                        currentPassword: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="sp-form-group">
                  <label>New Password</label>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    value={passwords.newPassword}
                    onChange={(e) =>
                      setPasswords({
                        ...passwords,
                        newPassword: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="sp-form-row">
                <div className="sp-form-group">
                  <label>Confirm New Password</label>
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    value={passwords.confirmPassword}
                    onChange={(e) =>
                      setPasswords({
                        ...passwords,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="sp-form-group sp-align-bottom">
                  <button type="submit" className="sp-btn-change-password">
                    <KeyRound size={16} /> Change Password
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuperAdminProfilePage;
