"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Pencil,
  Plus,
  CheckCircle,
  MoreVertical,
  Trash2,
  Camera,
  Check,
  X,
} from "lucide-react";
import "./profile.css";

const ProfilePage = () => {
  // profile state (editable)
  const [profile, setProfile] = useState({
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
  });

  // Active tab state
  const [activeTab, setActiveTab] = useState("profile");

  // Avatar upload state
  const [avatar, setAvatar] = useState<string>("/profile.jpg");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const prevObjectUrlRef = useRef<string | null>(null);

  useEffect(() => {
    // cleanup created object URL on unmount
    return () => {
      if (prevObjectUrlRef.current) URL.revokeObjectURL(prevObjectUrlRef.current);
    };
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      // revoke previous if any
      if (prevObjectUrlRef.current) URL.revokeObjectURL(prevObjectUrlRef.current);
      prevObjectUrlRef.current = imageUrl;
      setAvatar(imageUrl);
      // TODO: upload file to server here
    }
  };

  // Editing states & form
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [editForm, setEditForm] = useState({ ...profile });

  // Keep editForm in sync if profile externally changes
  useEffect(() => {
    setEditForm({ ...profile });
  }, [profile]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const startEditPersonal = () => {
    setEditForm({ ...profile });
    setIsEditingPersonal(true);
  };
  const cancelEditPersonal = () => {
    setEditForm({ ...profile });
    setIsEditingPersonal(false);
  };
  const savePersonal = () => {
    setProfile((prev) => ({
      ...prev,
      firstName: editForm.firstName,
      lastName: editForm.lastName,
      email: editForm.email,
      phone: editForm.phone,
      bio: editForm.bio,
      // keep other fields untouched
    }));
    setIsEditingPersonal(false);
  };

  const startEditAddress = () => {
    setEditForm({ ...profile });
    setIsEditingAddress(true);
  };
  const cancelEditAddress = () => {
    setEditForm({ ...profile });
    setIsEditingAddress(false);
  };
  const saveAddress = () => {
    setProfile((prev) => ({
      ...prev,
      country: editForm.country,
      city: editForm.city,
      postal: editForm.postal,
      taxId: editForm.taxId,
    }));
    setIsEditingAddress(false);
  };

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
            {/* === PROFILE TAB === */}
            {activeTab === "profile" && (
              <>
                <div className="card-header-myprofile">
                  <h4>My Profile</h4>
                </div>
                <div className="profile-main-card">
                  <div className="card-body-profile">
                    {/* ADD THIS NEW CONTAINER DIV */}
                    <div className="avatar-container">
                      <div
                        className="avatar-wrapper"
                        style={{
                          position: "relative", // Keep this
                          width: "80px",
                          height: "80px",
                          borderRadius: "50%",
                          overflow: "hidden", // Keep this
                        }}
                      >
                        <Image
                          src={avatar}
                          alt="Profile Picture"
                          fill
                          style={{ objectFit: "cover" }}
                          className="settings-avatar"
                        />
                      </div>
                      {/* Hidden file input */}
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                      />
                      {/* Camera button - MOVE IT HERE, OUTSIDE avatar-wrapper */}
                      <button
                        type="button"
                        className="btn-edit-avatar"
                        onClick={() => fileInputRef.current?.click()}
                        aria-label="Change profile photo"
                      >
                        <Camera size={14} />
                      </button>
                    </div>
                    
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

                    {!isEditingPersonal ? (
                      <button className="btn-edit-settings" onClick={startEditPersonal}>
                        <Pencil size={14} /> Edit
                      </button>
                    ) : (
                      <div className="edit-actions">
                        <button className="btn-save" onClick={savePersonal}>
                         Save
                        </button>
                        <button className="btn-cancel" onClick={cancelEditPersonal}>
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="card-body-grid">
                    {isEditingPersonal ? (
                      <>
                        <div className="info-item">
                          <label>First Name</label>
                          <input
                            name="firstName"
                            value={editForm.firstName}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="info-item">
                          <label>Last Name</label>
                          <input
                            name="lastName"
                            value={editForm.lastName}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="info-item">
                          <label>Email</label>
                          <input name="email" value={editForm.email} onChange={handleChange} />
                        </div>
                        <div className="info-item">
                          <label>Phone</label>
                          <input name="phone" value={editForm.phone} onChange={handleChange} />
                        </div>
                        <div className="info-item full-width">
                          <label>Bio</label>
                          <textarea name="bio" value={editForm.bio} onChange={handleChange} />
                        </div>
                      </>
                    ) : (
                      <>
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
                      </>
                    )}
                  </div>
                </div>

                <div className="section-divider"></div>

                {/* Address */}
                <div className="card-section">
                  <div className="card-header-settings">
                    <h4>Address</h4>

                    {!isEditingAddress ? (
                      <button className="btn-edit-settings" onClick={startEditAddress}>
                        <Pencil size={14} /> Edit
                      </button>
                    ) : (
                      <div className="edit-actions">
                        <button className="btn-save" onClick={saveAddress}>
                           Save
                        </button>
                        <button className="btn-cancel" onClick={cancelEditAddress}>
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="card-body-grid">
                    {isEditingAddress ? (
                      <>
                        <div className="info-item">
                          <label>Country</label>
                          <input name="country" value={editForm.country} onChange={handleChange} />
                        </div>
                        <div className="info-item">
                          <label>City/Province</label>
                          <input name="city" value={editForm.city} onChange={handleChange} />
                        </div>
                        <div className="info-item">
                          <label>Postal Code</label>
                          <input name="postal" value={editForm.postal} onChange={handleChange} />
                        </div>
                        <div className="info-item">
                          <label>TAX ID</label>
                          <input name="taxId" value={editForm.taxId} onChange={handleChange} />
                        </div>
                      </>
                    ) : (
                      <>
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
                      </>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* === EDUCATION TAB === */}
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

            {/* === ACCOUNT TAB === */}
            {activeTab === "account" && (
              <div className="info-card">
                <div className="card-header-settings">
                  <h4>Account Settings</h4>
                </div>

                {/* --- Profile Info Update --- */}
                <form className="account-settings-form" onSubmit={(e) => e.preventDefault()}>
                  <h5>Personal Information</h5>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="accFirstName">First Name</label>
                      <input
                        type="text"
                        id="accFirstName"
                        defaultValue={profile.firstName}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="accLastName">Last Name</label>
                      <input
                        type="text"
                        id="accLastName"
                        defaultValue={profile.lastName}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="accPhone">Phone Number</label>
                      <div className="phone-input-group">
                        <span className="country-code">+63</span>
                        <input type="tel" id="accPhone" defaultValue={profile.phone.replace('+63 ', '')} />
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
                <form className="account-settings-form" onSubmit={(e) => e.preventDefault()}>
                  <h5>Update Password</h5>

                  <div className="form-group">
                    <label htmlFor="currentPassword">Current Password</label>
                    <input
                      type="password"
                      id="currentPassword"
                      placeholder="Enter current password"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="newPassword">New Password</label>
                      <input
                        type="password"
                        id="newPassword"
                        placeholder="Enter new password"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="confirmPassword">Confirm New Password</label>
                      <input
                        type="password"
                        id="confirmPassword"
                        placeholder="Confirm new password"
                      />
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

            {/* === DELETE TAB === */}
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
