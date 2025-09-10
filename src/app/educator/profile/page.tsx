"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronDown, Pencil, User, Plus, CheckCircle, MoreVertical,Trash2} from "lucide-react";
import "./profile.css";

const ProfilePage = () => {
  // Simulated educator profile data (mock data)
  const profile = {
    name: "Signifi Educator",
    title: "Licensed FSL Educator",
    location: "Cebu City, Philippines",
    firstName: "Signifi",
    lastName: "Educator",
    email: "signifi@gmail.com",
    phone: "+63 912 345 6789",
    bio: "Passionate FSL Educator with 5+ years of teaching experience.",
    country: "Philippines",
    city: "Cebu",
    postal: "6000",
    taxId: "AS45645756",
  };

  // Active tab state
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <>
      {/* --- Main Header --- */}
      <header className="main-header">
        <div className="startheader">
          <span>Account Information</span>
        </div>
      </header>

      {/* --- Settings Content Layout --- */}
      <div className="settings-layout">
        {/* Left Side Navigation */}
        <aside className="settings-nav-card">
          <nav>
            <button
              className={`settings-nav-link ${activeTab === "profile" ? "active" : ""}`}
              onClick={() => setActiveTab("profile")}
            >
              My Profile
            </button>
            <button
              className={`settings-nav-link ${activeTab === "education" ? "active" : ""}`}
              onClick={() => setActiveTab("education")}
            >
              Education & Certification
            </button>
            <button
              className={`settings-nav-link ${activeTab === "account" ? "active" : ""}`}
              onClick={() => setActiveTab("account")}
            >
              Account Settings
            </button>
            <div className="nav-divider"></div>
            <button
              className={`settings-nav-link danger ${activeTab === "delete" ? "active" : ""}`}
              onClick={() => setActiveTab("delete")}
            >
              Delete Account
            </button>
          </nav>
        </aside>

        {/* Right Side Content */}
        <div className="settings-content">
          <div className="info-card unified-profile-card">
            {activeTab === "profile" && (
              <>
                <div className="card-header-myprofile">
                  <h4>My Profile</h4>
                </div>

                <div className="profile-main-card">
                  <div className="card-body-profile">
                    <Image
                      src="/profile.jpg"
                      alt="Profile Picture"
                      width={64}
                      height={64}
                      className="settings-avatar"
                    />
                    <div className="profile-details">
                      <span className="profile-name">{profile.name}</span>
                      <span className="profile-title">{profile.title}</span>
                      <span className="profile-location">{profile.location}</span>
                    </div>
                  </div>
                </div>

                <div className="section-divider"></div>

                {/* Personal Information */}
                <div className="card-section">
                  <div className="card-header-personalinformation">
                    <h4>Personal Information</h4>
                    <button className="btn-edit-settings">
                      <Pencil size={14} /> Edit
                    </button>
                  </div>
                  <div className="card-body-grid">
                    <div className="info-item">
                      <label>First Name</label>
                      <span>{profile.firstName}</span>
                    </div>
                    <div className="info-item">
                      <label>Last Name</label>
                      <span>{profile.lastName}</span>
                    </div>
                    <div className="info-item">
                      <label>Email</label>
                      <span>{profile.email}</span>
                    </div>
                    <div className="info-item">
                      <label>Phone</label>
                      <span>{profile.phone}</span>
                    </div>
                    <div className="info-item full-width">
                      <label>Bio</label>
                      <span>{profile.bio}</span>
                    </div>
                  </div>
                </div>

                <div className="section-divider"></div>

                {/* Address */}
                <div className="card-section">
                  <div className="card-header-settings">
                    <h4>Address</h4>
                    <button className="btn-edit-settings">
                      <Pencil size={14} /> Edit
                    </button>
                  </div>
                  <div className="card-body-grid">
                    <div className="info-item">
                      <label>Country</label>
                      <span>{profile.country}</span>
                    </div>
                    <div className="info-item">
                      <label>City/Province</label>
                      <span>{profile.city}</span>
                    </div>
                    <div className="info-item">
                      <label>Postal Code</label>
                      <span>{profile.postal}</span>
                    </div>
                    <div className="info-item">
                      <label>TAX ID</label>
                      <span>{profile.taxId}</span>
                    </div>
                  </div>
                </div>
              </>
            )}

            
            {activeTab === "education" && (
            <div className="info-card"> 
                <div className="card-header-edu">
                <h4>Education & Certifications</h4>
                <button className="btn btn-add-cert">
                    <Plus size={16} /> Add Certification
                </button>
                </div>
                
                <div className="certifications-list">
                
                {/* --- Item 1 --- */}
                <div className="certification-item">
                    <div className="cert-details">
                    <h5>Bachelor of Education in Special Education</h5>
                    <span className="cert-issuer">University of Cebu - Banilad</span>
                    <span className="cert-meta">2015 - 2019 • Magna Cum Laude</span>
                    <span className="cert-status verified">
                        <CheckCircle size={14} /> Verified
                    </span>
                    </div>
                    <button className="btn-more-options">
                    <MoreVertical size={16} />
                    </button>
                </div> 
                
                {/* --- Item 2 --- */}
                <div className="certification-item">
                    <div className="cert-details">
                    <h5>Certified Filipino Sign Language Interpreter</h5>
                    <span className="cert-issuer">Philippine Federation of the Deaf</span>
                    <span className="cert-meta">2019 • Level 3 Certification</span>
                    <span className="cert-status verified">
                        <CheckCircle size={14} /> Verified
                    </span>
                    </div>
                    <button className="btn-more-options">
                    <MoreVertical size={16} />
                    </button>
                </div>
                
                {/* --- Item 3 --- */}
                <div className="certification-item">
                    <div className="cert-details">
                    <h5>Digital Teaching Certification</h5>
                    <span className="cert-issuer">Department of Education - Philippines</span>
                    <span className="cert-meta">2021 • Online Learning Specialist</span>
                    <span className="cert-status verified">
                        <CheckCircle size={14} /> Verified
                    </span>
                    </div>
                    <button className="btn-more-options">
                    <MoreVertical size={16} />
                    </button>
                </div>  
                </div>
            </div>
            )}

            {activeTab === "account" && (
            <div className="info-card">
              <div className="card-header-settings">
                <h4>Account Settings</h4>
              </div>

              {/* --- Profile Info Update --- */}
              <form className="account-settings-form">
                <h5>Personal Information</h5>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" id="firstName" defaultValue="Kent" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" id="lastName" defaultValue="Professor" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <div className="phone-input-group">
                        <span className="country-code">+63</span>
                        <input type="tel" id="phone" defaultValue="9171234567" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="timezone">Time Zone</label>
                    <select id="timezone">
                        <option>Asia/Manila (GMT+8)</option>
                        <option>America/New_York (GMT-4)</option>
                        <option>Europe/London (GMT+1)</option>
                    </select>
                  </div>
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </form>

              <div className="section-divider"></div>

              {/* --- Password Update --- */}
              <form className="account-settings-form">
                <h5>Update Password</h5>

                <div className="form-group">
                  <label htmlFor="currentPassword">Current Password</label>
                  <input type="password" id="currentPassword" placeholder="Enter current password" />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="newPassword">New Password</label>
                    <input type="password" id="newPassword" placeholder="Enter new password" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm New Password</label>
                    <input type="password" id="confirmPassword" placeholder="Confirm new password" />
                  </div>
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn btn-primary">
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          )}


          {activeTab === "delete" && (
            <div className="delete-account-card">
              <h4 className="delete-header">
                <Trash2 size={18} className="delete-icon" />
                Delete Account
              </h4>
              <p>This action is permanent. Are you sure you want to delete your account?</p>
              <button className="btn-delete-account">Yes, Delete My Account</button>
            </div>
          )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
