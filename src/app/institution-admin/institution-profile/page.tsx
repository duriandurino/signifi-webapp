"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Camera, Pencil, Check, X } from "lucide-react";
import "./profile.css";

export default function InstitutionAdminProfile() {
  const [activeTab, setActiveTab] = useState<"profile" | "settings">("profile");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [schoolImage, setSchoolImage] = useState("/school-placeholder.png");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileURL = URL.createObjectURL(e.target.files[0]);
      setSchoolImage(fileURL);
    }
  };

  const [institutionInfo, setInstitutionInfo] = useState({
    name: "Philippine School for the Deaf",
    address: "123 Manila St., Quezon City, Philippines",
    contact: "+63 912 345 6789",
    email: "info@psd.edu.ph",
  });

  const [adminInfo, setAdminInfo] = useState({
    fullName: "Maria Santos",
    role: "Registrar",
    email: "maria.santos@psd.edu.ph",
    contact: "+63 987 654 3210",
  });

  const [editingSection, setEditingSection] = useState<"institution" | "admin" | null>(null);

  const handleChange = (
    section: "institution" | "admin",
    field: string,
    value: string
  ) => {
    if (section === "institution") {
      setInstitutionInfo({ ...institutionInfo, [field]: value });
    } else {
      setAdminInfo({ ...adminInfo, [field]: value });
    }
  };

  const startEdit = (section: "institution" | "admin") => setEditingSection(section);
  const cancelEdit = () => setEditingSection(null);
  const saveEdit = () => setEditingSection(null);

  return (
    <div className="institution-profile-page">
      {/* === Unified Card === */}
      <div className="profile-page-header">
        <h2>Institution Profile Settings</h2>
      </div>
      <div className="info-card unified-profile-card">

       <div className="banner-image-wrapper">
        {schoolImage ? (
            <Image src={schoolImage} alt="School Image" fill className="banner-image" />
        ) : (
            <div className="banner-placeholder">
            <Camera size={48} />
            <span>Upload Banner</span>
            </div>
        )}

        <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            className="hidden-input"
            onChange={handleFileChange}
        />
        <button
            className="btn-edit-banner"
            onClick={() => fileInputRef.current?.click()}
            aria-label="Change school banner"
        >
            <Camera size={16} />
        </button>
        </div>
        
        {/* --- Tabs --- */}
        <div className="tabs">
          <button
            className={activeTab === "profile" ? "active" : ""}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </button>
          <button
            className={activeTab === "settings" ? "active" : ""}
            onClick={() => setActiveTab("settings")}
          >
            Account Settings
          </button>
        </div>

        {/* --- PROFILE TAB --- */}
        {activeTab === "profile" && (
          <>
            {/* Institution Info */}
            <div className="card-section">
              <div className="card-header-personalinformation">
                <h4>Institution Information</h4>
                {!editingSection ? (
                  <button className="btn-edit-settings" onClick={() => startEdit("institution")}>
                    <Pencil size={14} /> Edit
                  </button>
                ) : editingSection === "institution" ? (
                  <div className="edit-actions">
                    <button className="btn-save" onClick={saveEdit}>
                     Save
                    </button>
                    <button className="btn-cancel" onClick={cancelEdit}>
                      Cancel
                    </button>
                  </div>
                ) : null}
              </div>
              <div className="card-body-grid">
                {Object.entries(institutionInfo).map(([key, value]) => (
                  <div key={key} className="info-item full-width">
                    <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                    {editingSection === "institution" ? (
                      <input
                        value={value}
                        onChange={(e) => handleChange("institution", key, e.target.value)}
                      />
                    ) : (
                      <span>{value}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Admin Info */}
            <div className="card-section">
              <div className="card-header-personalinformation">
                <h4>Admin Information</h4>
                {!editingSection ? (
                  <button className="btn-edit-settings" onClick={() => startEdit("admin")}>
                    <Pencil size={14} /> Edit
                  </button>
                ) : editingSection === "admin" ? (
                  <div className="edit-actions">
                    <button className="btn-save" onClick={saveEdit}>
                       Save
                    </button>
                    <button className="btn-cancel" onClick={cancelEdit}>
                       Cancel
                    </button>
                  </div>
                ) : null}
              </div>
              <div className="card-body-grid">
                {Object.entries(adminInfo).map(([key, value]) => (
                  <div key={key} className="info-item full-width">
                    <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                    {editingSection === "admin" ? (
                      <input
                        value={value}
                        onChange={(e) => handleChange("admin", key, e.target.value)}
                      />
                    ) : (
                      <span>{value}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* --- SETTINGS TAB --- */}
        {activeTab === "settings" && (
        <div className="card-section">
            <div className="card-header-personalinformation">
            <h4>Account Settings</h4>
            </div>
            <div className="card-body-grid">
            {/* --- Change Password --- */}
            <div className="info-item full-width">
                <label>Change Password</label>
                <div className="form-row">
                <div className="form-group">
                    <input
                    type="password"
                    placeholder="Current Password"
                    />
                </div>
                <div className="form-group">
                    <input
                    type="password"
                    placeholder="New Password"
                    />
                </div>
                <div className="form-group">
                    <input
                    type="password"
                    placeholder="Confirm New Password"
                    />
                </div>
                </div>
                <div className="form-actions">
                <button className="btn btn-update">Update</button>
                </div>
            </div>
            </div>
        </div>
        )}

      </div>
    </div>
  );
}
